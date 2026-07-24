"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerificationReportPage() {
  return (
    <>
      <header className="px-gutter py-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/10 bg-surface/50 backdrop-blur-md sticky top-0 z-30 md:static md:bg-transparent md:border-none">
        <div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-1">
            <Link href="/dashboard" className="cursor-pointer hover:text-primary transition-colors">Verification</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Report #BTH-8492</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">AI Verification Detail</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-primary text-primary font-label-md text-label-md hover:bg-primary-container/10 transition-colors shadow-sm h-12">
            <span className="material-symbols-outlined text-[20px]">share</span>
            Share
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm hover:shadow-md h-12">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Download PDF
          </button>
        </div>
      </header>

      <div className="p-gutter flex-1 pb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-md max-w-[1400px] mx-auto">
          
          <div className="md:col-span-4 bg-surface rounded-[24px] p-md shadow-sm border border-outline-variant/10 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-surface opacity-50 z-0"></div>
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="font-label-md text-label-md text-on-surface-variant mb-6 uppercase tracking-wider">AI Confidence Score</h3>
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-surface-container-highest" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary transition-all duration-1000 ease-out" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="282.7" strokeDashoffset="16.96" strokeWidth="8"></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-display-lg text-display-lg text-on-surface">94<span className="text-headline-md text-on-surface-variant">%</span></span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-primary bg-primary-container/10 px-4 py-2 rounded-full">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span className="font-label-md text-label-md">High Confidence</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-primary text-on-primary rounded-[24px] p-md shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-wider">Authentication Status</span>
                <span className="material-symbols-outlined text-[24px] text-primary-fixed-dim">verified_user</span>
              </div>
              <h2 className="font-display-lg text-display-lg mt-4">Verified</h2>
              <p className="font-body-md text-body-md text-primary-fixed mt-2">Authenticity confirmed via multi-spectral AI analysis and blockchain ledger matching.</p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/20 flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-primary-fixed">Scanned: Today, 10:42 AM</span>
              <button className="font-label-md text-label-md bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">View Ledger</button>
            </div>
          </div>

          <div className="md:col-span-4 bg-surface rounded-[24px] p-md shadow-sm border border-outline-variant/10 flex flex-col justify-between">
            <div>
              <h3 className="font-label-md text-label-md text-on-surface-variant mb-6 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">warning</span> Risk Profile
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-on-surface">Storage Temperature</span>
                    <span className="text-primary font-semibold">Optimal</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-on-surface">Transit Shock</span>
                    <span className="text-on-surface-variant">Minimal (1.2G max)</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-11/12 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-on-surface">Recall Database Match</span>
                    <span className="text-primary font-semibold">Clear</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-surface-container-low p-4 rounded-xl flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary">update</span>
              <div>
                <div className="font-label-md text-label-md text-on-surface">Predicted Expiry Stability</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">AI models predict 99.8% compound stability until stated expiry (Oct 2025).</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-surface rounded-[24px] p-md shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">AI Spectral Analysis</h3>
              <span className="bg-surface-container-low text-secondary font-label-sm text-label-sm px-3 py-1 rounded-full">Processing Complete</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border border-outline-variant/20 rounded-xl p-4">
                <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Active Pharmaceutical Ingredient</div>
                <div className="font-headline-md text-headline-md text-on-surface">Match 99.4%</div>
                <div className="font-body-sm text-body-sm text-primary mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check</span> Expected Signature Detected</div>
              </div>
              <div className="border border-outline-variant/20 rounded-xl p-4">
                <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Excipient Profile</div>
                <div className="font-headline-md text-headline-md text-on-surface">Standard</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant mt-2">No unlisted compounds detected</div>
              </div>
            </div>
            <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-4 font-mono text-sm h-32 overflow-y-auto leading-relaxed">
              &gt; Initiating deep spectral scan...<br/>
              &gt; Wavelength range: 400nm - 2500nm<br/>
              &gt; Cross-referencing manufacturer baselines...<br/>
              &gt; Molecular marker #A49-B identified at 1420nm.<br/>
              &gt; Binder composition matches batch #BTH-8492 nominal variance.<br/>
              <span className="text-primary-fixed-dim">&gt; SYNTHESIS: Product verified authentic.</span>
            </div>
          </div>

          <div className="md:col-span-5 rounded-[24px] overflow-hidden shadow-sm border border-outline-variant/10 relative min-h-[300px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCfaf97FuHrFvtr1fLGu-KhPz0ZHn5Il2e-N5jWPR-qKkmsyekb_zBvh5SawHviEsa8YUwYASWABcmKCiHbHDSqlu8lcNGyWwQLIwfSL8qD1vhvDZw7jH62peh19P8-9717RdhhOZCVhttslq3P1S1AksvzVX_nJ2JkPM8eoH9lDTWsn_5HGIojmVjJVDQXbR08Jifbjtk40K73gD1lVch4jEfj-EY7XvqhUraK8sn52hFFPVrhs-fwq99g21zZ3bssEG24MrzmSw')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-white tracking-widest uppercase">Live Micro-Scan Render</span>
              </div>
              <div className="font-body-sm text-body-sm text-white/80">Visual AI detection of tamper-evident seals intact.</div>
            </div>
          </div>

          <div className="md:col-span-12 bg-surface rounded-[24px] p-md shadow-sm border border-outline-variant/10">
            <h3 className="font-label-md text-label-md text-on-surface-variant mb-8 uppercase tracking-wider">Verification Timeline</h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-highest -translate-y-1/2 z-0"></div>
              
              <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:w-1/4">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 border-4 border-surface shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">factory</span>
                </div>
                <div className="text-left md:text-center">
                  <div className="font-label-md text-label-md text-on-surface">Manufactured</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Oct 12, 2023 • Facility A</div>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:w-1/4">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 border-4 border-surface shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
                <div className="text-left md:text-center">
                  <div className="font-label-md text-label-md text-on-surface">Donor Transit</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Nov 05, 2023 • Cold Chain</div>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:w-1/4">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 border-4 border-surface shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">login</span>
                </div>
                <div className="text-left md:text-center">
                  <div className="font-label-md text-label-md text-on-surface">Intake Facility</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Nov 18, 2023 • Vitamend Hub</div>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:w-1/4">
                <div className="w-10 h-10 rounded-full bg-surface text-primary border-2 border-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">document_scanner</span>
                </div>
                <div className="text-left md:text-center">
                  <div className="font-label-md text-label-md text-primary">AI Scan Complete</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Today, 10:42 AM</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
