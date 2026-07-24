"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload, X, Check, Image as ImageIcon } from "lucide-react"
import { OCRService } from "@/lib/ai/ocr-service"

export default function DonationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingOCR, setIsProcessingOCR] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    medicineName: "",
    brand: "",
    genericName: "",
    dosage: "",
    quantity: "",
    expiryDate: "",
    condition: "unopened",
    category: "tablet",
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    donorAddress: "",
    notes: "",
  })

  useEffect(() => {
    // DB no longer needed on client
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images",
        variant: "destructive",
      })
      return
    }

    setImages((prev) => [...prev, ...files])

    if (files.length > 0 && !formData.medicineName) {
      await processImageWithOCR(files[0])
    }
  }

  const processImageWithOCR = async (file: File) => {
    setIsProcessingOCR(true)

    try {
      toast({
        title: "AI Processing Image",
        description: "Extracting medicine information using our backend service...",
      })

      const result = await OCRService.processImage(file)

      // Auto-fill medicine name if found
      if (result.medicine_name && !formData.medicineName) {
        setFormData((prev) => ({ 
          ...prev, 
          medicineName: result.medicine_name as string,
          brand: result.medicine_name as string 
        }))
        toast({
          title: "Medicine Detected",
          description: `Auto-filled: ${result.medicine_name}`,
        })
      }

      // Auto-fill expiry date if found
      if (result.expiry && !formData.expiryDate) {
        setFormData((prev) => ({ ...prev, expiryDate: result.expiry as string }))
        toast({
          title: "Expiry Date Detected",
          description: `Auto-filled: ${result.expiry}`,
        })
      }

      // Auto-fill batch if available
      if (result.batch) {
        setFormData((prev) => ({ 
          ...prev, 
          notes: prev.notes ? `${prev.notes}\nBatch Code: ${result.batch}` : `Batch Code: ${result.batch}`
        }))
      }

      // Handle validation results
      if (result.tampered) {
        toast({
          title: "Security Warning",
          description: "Potential tampering detected in the packaging. Please review manually.",
          variant: "destructive",
        })
      } else if (result.expired) {
        toast({
          title: "Medicine Expired",
          description: "Our AI detected this medicine has already expired.",
          variant: "destructive",
        })
      } else if (!result.needs_review) {
        toast({
          title: "Medicine Verified",
          description: `AI confidence: ${Math.round(result.confidence * 100)}%`,
        })
      } else {
        toast({
          title: "Review Required",
          description: "Some details couldn't be fully verified. Please check manually.",
        })
      }

    } catch (error) {
      console.error("OCR error:", error)
      toast({
        title: "OCR Processing Failed",
        description: "Please enter medicine details manually",
        variant: "destructive",
      })
    } finally {
      setIsProcessingOCR(false)
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const nextStep = () => setCurrentStep(s => Math.min(3, s + 1))
  const prevStep = () => setCurrentStep(s => Math.max(1, s - 1))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const imageUrls: string[] = []

      const result = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medicineName: formData.medicineName,
          brand: formData.brand,
          genericName: formData.genericName || undefined,
          dosage: formData.dosage,
          quantity: Number.parseInt(formData.quantity),
          expiryDate: formData.expiryDate,
          condition: formData.condition,
          category: formData.category,
          donorName: formData.donorName,
          donorEmail: formData.donorEmail,
          donorPhone: formData.donorPhone,
          donorAddress: formData.donorAddress,
          notes: formData.notes || undefined,
          imageUrls,
        }),
      }).then(res => res.json())

      if (result.success) {
        toast({
          title: "Donation Submitted!",
          description: result.message,
        })
        // Reset form
        setFormData({
          medicineName: "", brand: "", genericName: "", dosage: "", quantity: "",
          expiryDate: "", condition: "unopened", category: "tablet",
          donorName: "", donorEmail: "", donorPhone: "", donorAddress: "", notes: "",
        })
        setImages([])
        setCurrentStep(1)
      } else {
        throw new Error(result.error || result.message)
      }
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full border-slate-200 shadow-lg rounded-2xl overflow-hidden bg-white">
      {/* Stepper Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-6 flex items-center justify-between">
        {[
          { num: 1, label: "Medicine Details" },
          { num: 2, label: "Donor Information" },
          { num: 3, label: "Review" }
        ].map((step, idx) => (
          <div key={step.num} className="flex items-center">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full font-semibold text-sm ${currentStep >= step.num ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {currentStep > step.num ? <Check className="h-4 w-4" /> : step.num}
            </div>
            <span className={`ml-3 text-sm font-medium hidden sm:block ${currentStep >= step.num ? 'text-slate-900' : 'text-slate-500'}`}>
              {step.label}
            </span>
            {idx < 2 && (
              <div className={`h-[2px] w-12 sm:w-24 mx-4 ${currentStep > step.num ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Image Upload Box */}
              <div className="border-2 border-dashed border-emerald-200 bg-emerald-50/50 rounded-xl p-8 text-center transition-colors hover:bg-emerald-50">
                <div className="mx-auto h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">Upload Medicine Photos</h3>
                <p className="text-sm text-slate-500 mb-4">Our AI will automatically extract the details from clear photos.</p>
                
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isProcessingOCR}
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("images")?.click()}
                  disabled={isProcessingOCR}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6"
                >
                  {isProcessingOCR ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</>
                  ) : (
                    <><Upload className="mr-2 h-4 w-4" />Upload Photos</>
                  )}
                </Button>

                {images.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-emerald-200 shadow-sm">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Medicine ${index + 1}`}
                          className="h-24 w-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 h-6 w-6 bg-white/90 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="medicineName">Medicine Name <span className="text-red-500">*</span></Label>
                  <Input id="medicineName" name="medicineName" value={formData.medicineName} onChange={handleInputChange} required className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand / Manufacturer <span className="text-red-500">*</span></Label>
                  <Input id="brand" name="brand" value={formData.brand} onChange={handleInputChange} required className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity <span className="text-red-500">*</span></Label>
                  <Input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleInputChange} required className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date <span className="text-red-500">*</span></Label>
                  <Input id="expiryDate" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleInputChange} required className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition <span className="text-red-500">*</span></Label>
                  <select id="condition" name="condition" value={formData.condition} onChange={handleInputChange} required className="w-full h-10 px-3 rounded-md border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                    <option value="unopened">Unopened / Sealed</option>
                    <option value="opened">Opened (Unused)</option>
                    <option value="partial">Partially Used</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="e.g. Needs refrigeration" className="bg-slate-50 border-slate-200 focus:bg-white min-h-[100px]" />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="button" onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 rounded-full">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="donorName">Full Name <span className="text-red-500">*</span></Label>
                  <Input id="donorName" name="donorName" value={formData.donorName} onChange={handleInputChange} required className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donorEmail">Email Address <span className="text-red-500">*</span></Label>
                  <Input id="donorEmail" name="donorEmail" type="email" value={formData.donorEmail} onChange={handleInputChange} required className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donorPhone">Phone Number <span className="text-red-500">*</span></Label>
                  <Input id="donorPhone" name="donorPhone" type="tel" value={formData.donorPhone} onChange={handleInputChange} required className="bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="donorAddress">Pickup Address <span className="text-red-500">*</span></Label>
                  <Textarea id="donorAddress" name="donorAddress" value={formData.donorAddress} onChange={handleInputChange} required className="bg-slate-50 border-slate-200 focus:bg-white min-h-[100px]" />
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep} className="rounded-full">Back</Button>
                <Button type="button" onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 rounded-full">Review</Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50 rounded-xl p-6 space-y-6 border border-slate-200">
                <div>
                  <h4 className="text-sm font-semibold text-emerald-700 mb-3 uppercase tracking-wider">1. Medicine Info</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500 block mb-1">Name:</span> <span className="font-medium text-slate-900">{formData.medicineName || '-'}</span></div>
                    <div><span className="text-slate-500 block mb-1">Brand:</span> <span className="font-medium text-slate-900">{formData.brand || '-'}</span></div>
                    <div><span className="text-slate-500 block mb-1">Quantity:</span> <span className="font-medium text-slate-900">{formData.quantity || '-'}</span></div>
                    <div><span className="text-slate-500 block mb-1">Expiry Date:</span> <span className="font-medium text-slate-900">{formData.expiryDate || '-'}</span></div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-sm font-semibold text-emerald-700 mb-3 uppercase tracking-wider">2. Donor Info</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500 block mb-1">Name:</span> <span className="font-medium text-slate-900">{formData.donorName || '-'}</span></div>
                    <div><span className="text-slate-500 block mb-1">Phone:</span> <span className="font-medium text-slate-900">{formData.donorPhone || '-'}</span></div>
                    <div className="col-span-2"><span className="text-slate-500 block mb-1">Address:</span> <span className="font-medium text-slate-900">{formData.donorAddress || '-'}</span></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep} className="rounded-full">Back</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 rounded-full">
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                  ) : (
                    "Confirm & Submit"
                  )}
                </Button>
              </div>
            </div>
          )}

        </form>
      </CardContent>
    </Card>
  )
}
