"use client"

import { ChevronRight, CheckCircle2, AlertTriangle, Image as ImageIcon, ShieldCheck, Box, Calendar, Hash, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerificationReportPage() {
  return (
    <div className="pb-12 space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center text-sm text-slate-500 mb-4">
          <Link href="/dashboard" className="hover:text-slate-900 transition-colors">Dashboard</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/verification" className="hover:text-slate-900 transition-colors">Verification</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-slate-900 font-medium">Batch #BTH-8492</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Verification Report</h1>
            <p className="text-sm text-slate-500 mt-1">Analyzed on Today, 10:42 AM</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium border border-emerald-200 shadow-sm">
            <CheckCircle2 className="h-4 w-4" />
            Verified
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Image & Data */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 font-semibold text-slate-900 flex items-center justify-between">
              Analyzed Image
              <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">High Res</div>
            </div>
            <div className="p-4 bg-slate-50 flex items-center justify-center min-h-[200px]">
              <div className="text-center text-slate-400">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <span className="text-sm">Image Reference</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 font-semibold text-slate-900">
              Extracted Data
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Medicine Name</p>
                  <p className="text-sm font-semibold text-slate-900">Amoxicillin 500mg</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Box className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Manufacturer</p>
                  <p className="text-sm font-medium text-slate-900">MediCorp Pharmaceuticals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Expiry Date</p>
                  <p className="text-sm font-medium text-slate-900">Oct 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Batch Code</p>
                  <p className="text-sm font-medium text-slate-900">BTH-8492</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">AI Analysis Results</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Confidence Score:</span>
                <span className="text-xl font-bold text-emerald-600">94%</span>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Analysis Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold text-slate-900">Packaging Integrity</h3>
                  </div>
                  <p className="text-sm text-slate-600">Intact, no tampering detected. Seals appear original.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold text-slate-900">Expiry Validation</h3>
                  </div>
                  <p className="text-sm text-slate-600">Valid date. 14 months remaining before expiration.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold text-slate-900">Label Match</h3>
                  </div>
                  <p className="text-sm text-slate-600">Information matches national database records perfectly.</p>
                </div>
              </div>

              {/* Risk Profile */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Risk Profile</h3>
                <div className="bg-slate-50 rounded-full h-3 w-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full w-4/5"></div>
                  <div className="bg-amber-400 h-full w-1/5"></div>
                  <div className="bg-red-500 h-full w-0"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Low Risk (Verified)</span>
                  <span>High Risk</span>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Verification Timeline</h3>
                <div className="relative border-l border-emerald-200 ml-3 space-y-6 pb-2">
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                    <p className="text-sm font-medium text-slate-900">Image Uploaded</p>
                    <p className="text-xs text-slate-500">10:41 AM</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                    <p className="text-sm font-medium text-slate-900">OCR Data Extraction</p>
                    <p className="text-xs text-slate-500">10:41 AM</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                    <p className="text-sm font-medium text-slate-900">Database Cross-referencing</p>
                    <p className="text-xs text-slate-500">10:42 AM</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-2 top-0.5 h-4 w-4 rounded-full bg-emerald-600 ring-4 ring-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-sm font-medium text-emerald-700">Final Verdict: Verified</p>
                    <p className="text-xs text-emerald-600/70">10:42 AM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button variant="outline" className="text-slate-700 border-slate-300">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                Flag for Review
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve Batch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
