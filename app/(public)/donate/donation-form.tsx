"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { OCRService } from "@/lib/ai/ocr-service"

export default function DonationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingOCR, setIsProcessingOCR] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const { toast } = useToast()
  
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const processImageWithOCR = async (file: File) => {
    setIsProcessingOCR(true)

    try {
      toast({
        title: "AI Processing Image",
        description: "Extracting medicine information using our backend service...",
      })

      const result = await OCRService.processImage(file)

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

      if (result.expiry && !formData.expiryDate) {
        setFormData((prev) => ({ ...prev, expiryDate: result.expiry as string }))
        toast({
          title: "Expiry Date Detected",
          description: `Auto-filled: ${result.expiry}`,
        })
      }

      if (result.batch) {
        setFormData((prev) => ({ 
          ...prev, 
          notes: prev.notes ? `${prev.notes}\nBatch Code: ${result.batch}` : `Batch Code: ${result.batch}`
        }))
      }

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
          quantity: Number.parseInt(formData.quantity) || 1,
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
    <>
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 max-w-lg mx-auto relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-variant -z-10 -translate-y-1/2"></div>
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-primary -z-10 -translate-y-1/2 transition-all duration-300"
          style={{ width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%' }}
        ></div>
        
        <div className="flex flex-col items-center gap-2 bg-background px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md ring-4 ring-background shadow-md transition-colors ${currentStep >= 1 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-sm">photo_camera</span>
          </div>
          <span className={`font-label-sm text-label-sm ${currentStep >= 1 ? 'text-primary' : 'text-on-surface-variant'}`}>Capture</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 bg-background px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md ring-4 ring-background shadow-md transition-colors ${currentStep >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
          <span className={`font-label-sm text-label-sm ${currentStep >= 2 ? 'text-primary' : 'text-on-surface-variant'}`}>Details</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 bg-background px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md ring-4 ring-background shadow-md transition-colors ${currentStep >= 3 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-sm">done_all</span>
          </div>
          <span className={`font-label-sm text-label-sm ${currentStep >= 3 ? 'text-primary' : 'text-on-surface-variant'}`}>Review</span>
        </div>
      </div>

      <div className="bg-[#F0FAF7] rounded-[24px] p-sm lg:p-md shadow-sm">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-md animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Left: Capture / Upload */}
              <div className="glass-panel rounded-[24px] p-md flex flex-col min-h-[500px]">
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary mb-2">Capture Packaging</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                    Upload clear photos of the medicine box showing name, dosage, and expiry date. Our AI will automatically extract the details.
                  </p>
                </div>
                
                <div 
                  className="flex-grow border-2 border-dashed border-outline-variant rounded-[16px] flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-surface transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {isProcessingOCR ? (
                    <>
                      <Loader2 className="h-[48px] w-[48px] text-primary mb-4 opacity-70 animate-spin" />
                      <p className="font-label-md text-label-md text-on-surface mb-1">AI analyzing images...</p>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[48px] text-primary mb-4 opacity-70">
                        {images.length > 0 ? 'check_circle' : 'add_a_photo'}
                      </span>
                      <p className="font-label-md text-label-md text-on-surface mb-1">
                        {images.length > 0 ? 'Files loaded ready for AI analysis' : 'Drag & Drop images here'}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">or click to browse from your device</p>
                      <button type="button" className="px-4 py-2 border border-primary text-primary rounded-[16px] font-label-sm text-label-sm hover:bg-primary-container/10 transition-colors pointer-events-none">
                        Select Files
                      </button>
                    </>
                  )}
                  <input 
                    ref={fileInputRef}
                    accept="image/*" 
                    className="hidden" 
                    multiple 
                    type="file" 
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Preview Area */}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden h-24 bg-surface-variant border border-outline-variant/30">
                        <img 
                          className="w-full h-full object-cover" 
                          src={URL.createObjectURL(img)}
                          alt="preview"
                        />
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                          className="absolute top-1 right-1 bg-error/90 text-on-error rounded-full p-1 hover:bg-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Specifications Form */}
              <div className="glass-panel rounded-[24px] p-md flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline-md text-headline-md text-primary">Medicine Specifications</h2>
                  <span className="bg-primary-container/20 text-primary font-label-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    AI Assisted
                  </span>
                </div>
                
                <div className="space-y-4 flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Medicine Name *</label>
                      <input name="medicineName" value={formData.medicineName} onChange={handleInputChange} required className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md" placeholder="Enter name" type="text" />
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Brand (Optional)</label>
                      <input name="brand" value={formData.brand} onChange={handleInputChange} className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md" placeholder="e.g. Tylenol" type="text" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Dosage / Strength</label>
                      <input name="dosage" value={formData.dosage} onChange={handleInputChange} className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md" placeholder="e.g. 500mg" type="text" />
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Quantity *</label>
                      <input name="quantity" value={formData.quantity} onChange={handleInputChange} required className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md" placeholder="e.g. 1" type="number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Expiry Date *</label>
                      <input name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md" type="month" />
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Category</label>
                      <select name="category" value={formData.category} onChange={handleInputChange} className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md">
                        <option value="antibiotic">Antibiotic</option>
                        <option value="pain_relief">Pain Relief</option>
                        <option value="cardiovascular">Cardiovascular</option>
                        <option value="tablet">Tablet / Pill</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Condition *</label>
                    <div className="flex gap-4 mt-2">
                      <label className={`flex items-center gap-2 cursor-pointer p-3 rounded-[12px] border hover:bg-surface-variant transition-colors flex-1 ${formData.condition === 'unopened' ? 'border-primary bg-primary-container/5' : 'border-outline-variant'}`}>
                        <input name="condition" value="unopened" checked={formData.condition === 'unopened'} onChange={handleInputChange} className="text-primary focus:ring-primary h-5 w-5" type="radio" />
                        <span className="font-body-sm">Sealed</span>
                      </label>
                      <label className={`flex items-center gap-2 cursor-pointer p-3 rounded-[12px] border hover:bg-surface-variant transition-colors flex-1 ${formData.condition === 'opened' ? 'border-primary bg-primary-container/5' : 'border-outline-variant'}`}>
                        <input name="condition" value="opened" checked={formData.condition === 'opened'} onChange={handleInputChange} className="text-primary focus:ring-primary h-5 w-5" type="radio" />
                        <span className="font-body-sm">Opened</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-4 border-t border-outline-variant/20 mt-8">
                  <button type="button" className="px-6 py-3 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
                    Save Draft
                  </button>
                  <button type="button" onClick={nextStep} className="bg-primary-container text-on-primary font-label-md text-label-md px-8 py-3 rounded-[16px] shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
                    Proceed to Donor Details
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="glass-panel rounded-[24px] p-md max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Donor Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Full Name *</label>
                    <input name="donorName" value={formData.donorName} onChange={handleInputChange} required className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md" placeholder="John Doe" type="text" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Email Address *</label>
                    <input name="donorEmail" value={formData.donorEmail} onChange={handleInputChange} required className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md" placeholder="john@example.com" type="email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Phone Number *</label>
                    <input name="donorPhone" value={formData.donorPhone} onChange={handleInputChange} required className="w-full h-[56px] px-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Pickup Address *</label>
                  <textarea name="donorAddress" value={formData.donorAddress} onChange={handleInputChange} required className="w-full p-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md min-h-[100px]" placeholder="Enter full address..."></textarea>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Additional Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="w-full p-4 rounded-[12px] border border-outline-variant bg-surface focus:ring-primary focus:border-primary font-body-md min-h-[80px]" placeholder="Any specific instructions..."></textarea>
                </div>
              </div>
              <div className="pt-6 flex justify-between gap-4 border-t border-outline-variant/20 mt-8">
                <button type="button" onClick={prevStep} className="px-6 py-3 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Back
                </button>
                <button type="button" onClick={nextStep} className="bg-primary-container text-on-primary font-label-md text-label-md px-8 py-3 rounded-[16px] shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
                  Review Submission
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="glass-panel rounded-[24px] p-md max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Review Donation</h2>
              
              <div className="space-y-6">
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6">
                  <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-4 border-b border-outline-variant/20 pb-2">Medicine Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-label-sm text-on-surface-variant mb-1">Name</p>
                      <p className="font-body-md text-on-surface">{formData.medicineName || '-'}</p>
                    </div>
                    <div>
                      <p className="font-label-sm text-on-surface-variant mb-1">Brand</p>
                      <p className="font-body-md text-on-surface">{formData.brand || '-'}</p>
                    </div>
                    <div>
                      <p className="font-label-sm text-on-surface-variant mb-1">Quantity</p>
                      <p className="font-body-md text-on-surface">{formData.quantity || '-'}</p>
                    </div>
                    <div>
                      <p className="font-label-sm text-on-surface-variant mb-1">Expiry Date</p>
                      <p className="font-body-md text-on-surface">{formData.expiryDate || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6">
                  <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-4 border-b border-outline-variant/20 pb-2">Donor Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-label-sm text-on-surface-variant mb-1">Name</p>
                      <p className="font-body-md text-on-surface">{formData.donorName || '-'}</p>
                    </div>
                    <div>
                      <p className="font-label-sm text-on-surface-variant mb-1">Phone</p>
                      <p className="font-body-md text-on-surface">{formData.donorPhone || '-'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-label-sm text-on-surface-variant mb-1">Address</p>
                      <p className="font-body-md text-on-surface">{formData.donorAddress || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-between gap-4 border-t border-outline-variant/20 mt-8">
                <button type="button" onClick={prevStep} className="px-6 py-3 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Back
                </button>
                <button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3 rounded-[16px] shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      Confirm & Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      
      {/* Trust Banner */}
      <div className="mt-xl flex items-center justify-center gap-2 text-on-surface-variant opacity-70">
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
        <span className="font-label-sm text-label-sm tracking-wider uppercase">Secured by VITAMEND AI</span>
      </div>
    </>
  )
}
