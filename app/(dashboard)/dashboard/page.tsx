"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/auth/signin")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session?.user) return null

  const user = session.user

  const recentActivity = [
    { action: "Donation Received", item: "Ibuprofen 400mg", time: "2 hours ago" },
    { action: "AI Verification Complete", item: "Amoxicillin 500mg", time: "5 hours ago" },
    { action: "Request Fulfilled", item: "Insulin Glargine", time: "1 day ago" },
  ]

  const verificationStatus = [
    { item: "Amoxicillin 500mg", batch: "BTH-8492", status: "Verified", date: "Today, 10:42 AM" },
    { item: "Lisinopril 10mg", batch: "BTH-7731", status: "Pending", date: "Today, 09:15 AM" },
    { item: "Metformin 500mg", batch: "BTH-9022", status: "Flagged", date: "Yesterday, 14:30 PM" },
  ]

  const activeZones = [
    { name: "Downtown Clinic", demand: "High", distance: "2.4 miles" },
    { name: "Westside Hospital", demand: "Medium", distance: "5.1 miles" },
    { name: "North Community Center", demand: "Urgent", distance: "8.7 miles" },
  ]

  return (
    <div className="p-margin-mobile md:p-margin-desktop bg-background min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-md mb-xl">
        <div>
          <p className="font-label-md text-label-md text-primary tracking-widest uppercase mb-xs">
            Overview
          </p>
          <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface">
            Welcome back, {user?.name || 'User'}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs max-w-2xl">
            Your contributions are currently tracking across {activeZones.length} active delivery zones. System networks are optimal.
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <button className="relative p-sm rounded-full bg-surface-container-lowest border border-outline-variant/20 shadow-sm text-on-surface hover:text-primary hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface-container-lowest"></span>
          </button>
          <Link href="/donate" className="flex items-center gap-base px-md py-sm bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-sm hover:shadow-md transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
            New Request
          </Link>
        </div>
      </header>

      {/* Bento Grid: Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-xl">
        {/* Impact Metric */}
        <div className="bento-card md:col-span-4 bg-gradient-to-br from-surface-container-lowest to-surface-container-low relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-5 text-primary">
            <span className="material-symbols-outlined text-[150px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
          </div>
          <div className="flex items-center justify-between mb-auto">
            <div className="p-sm bg-primary-container/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">vital_signs</span>
            </div>
            <span className="font-label-sm text-label-sm text-primary flex items-center gap-xs bg-primary-container/10 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% this month
            </span>
          </div>
          <div className="mt-md">
            <h3 className="font-display-lg text-display-lg text-on-surface">142</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Donations Impacted</p>
          </div>
        </div>

        {/* AI Insight Widget */}
        <div className="bento-card md:col-span-5 bg-surface-container-lowest border-l-4 border-l-secondary-container">
          <div className="flex items-start gap-md mb-sm">
            <div className="p-sm bg-secondary-container/10 rounded-lg text-secondary-container">
              <span className="material-symbols-outlined">neurology</span>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface">AI Supply Insight</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                Predictive model indicates a localized shortage based on recent trauma admissions.
              </p>
            </div>
          </div>
          <div className="mt-auto bg-surface-container p-sm rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-error">warning</span>
              <span className="font-label-md text-label-md text-on-surface">Urgent Demand: O- Blood</span>
            </div>
            <button className="font-label-sm text-label-sm text-secondary hover:underline">View Logistics</button>
          </div>
        </div>

        {/* Active Connections */}
        <div className="bento-card md:col-span-3 bg-surface-container-lowest">
          <div className="flex items-center justify-between mb-md">
            <span className="font-label-md text-label-md text-on-surface-variant">Active Nodes</span>
            <span className="material-symbols-outlined text-on-surface-variant">hub</span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-high" cx="48" cy="48" fill="transparent" r="44" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-secondary-container" cx="48" cy="48" fill="transparent" r="44" stroke="currentColor" strokeDasharray="276" strokeDashoffset="276" strokeWidth="4"></circle>
              </svg>
              <span className="absolute font-headline-md text-headline-md text-on-surface">{activeZones.length}</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">Clinics Connected</p>
          </div>
        </div>
      </section>

      {/* Two Column Operations Area */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Operations */}
        <div className="lg:col-span-8 space-y-gutter">
          {/* Your Donations List */}
          <div className="bento-card">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">Your Recent Donations</h3>
              <button className="font-label-sm text-label-sm text-primary hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="py-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Consignment ID</th>
                    <th className="py-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Type</th>
                    <th className="py-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Date</th>
                    <th className="py-sm font-label-sm text-label-sm text-on-surface-variant font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {verificationStatus.map((item, i) => (
                    <tr key={i} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="py-md pr-sm font-label-sm text-on-surface">{item.batch}</td>
                      <td className="py-md pr-sm font-body-sm text-on-surface">{item.item}</td>
                      <td className="py-md pr-sm font-body-sm text-on-surface-variant">{item.date}</td>
                      <td className="py-md text-right">
                        <span className={`inline-flex items-center gap-xs px-2 py-1 rounded-full font-label-sm text-label-sm ${
                          item.status === 'Verified' ? 'bg-primary-container/10 text-primary' :
                          item.status === 'Pending' ? 'bg-secondary-container/10 text-secondary' :
                          'bg-error/10 text-error'
                        }`}>
                          <span className="material-symbols-outlined text-[14px]">
                            {item.status === 'Verified' ? 'check_circle' :
                             item.status === 'Pending' ? 'schedule' : 'error'}
                          </span>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {verificationStatus.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-md text-center font-body-sm text-on-surface-variant">
                        No recent donations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* High-Tech Map UI */}
          <div className="bento-card p-0 overflow-hidden relative min-h-[300px]">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBclT0XQ8h1cgzJ2v0HeKPminXtZ79AMOl32w1oXvsQYFSsAeIQQ-AORUy1m_elMgkismU9BHnl0Iyx_mxI5a6GHQINfVPH8Vz8yPiU-R44GLh5eOMqv67Ki4Ra12gDhTjk3Joh-ywwj4d1ZZsF6mZKCpdPIzcHgm9cn84L0eIqa14GHf3NDCad82BSR3W0QSjsvoyNgzul6WZ_HzqBpiNrW9hzuR8JMNqsXvZq21ry2ayJ5W9siwzyFgCkm-WtINC2QjJPZCGu4Fk')" }}
            ></div>
            {/* Map Overlay UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent flex flex-col justify-between p-md">
              <div className="flex justify-between items-start">
                <div className="glass-overlay p-sm rounded-lg border border-white/20 shadow-sm inline-block">
                  <h4 className="font-label-md text-label-md text-on-surface">Nearby Delivery Zones</h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs flex items-center gap-xs">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span> {activeZones.length} Active Routes
                  </p>
                </div>
                <button className="glass-overlay p-sm rounded-full border border-white/20 text-on-surface hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
              </div>
              {/* Floating Node Info */}
              <div className="glass-overlay p-sm rounded-xl border border-white/20 shadow-lg self-start max-w-sm flex items-center gap-sm">
                <div className="p-xs bg-primary-container text-on-primary rounded-lg">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Route Alpha - En Route</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">ETA: 14 mins to Bay General</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feed & Transparency */}
        <div className="lg:col-span-4 space-y-gutter">
          {/* Transparency Widget */}
          <div className="bento-card bg-inverse-surface text-on-primary">
            <div className="flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined text-primary-fixed">security</span>
              <h3 className="font-label-md text-label-md text-on-primary">Chain of Custody</h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-primary/70 mb-sm">
              Latest verified transaction block hash ensuring tamper-proof delivery records.
            </p>
            <div className="bg-black/30 p-sm rounded-lg font-mono text-xs text-primary-fixed break-all border border-primary-fixed/20">
              0x7a8f9c2d1b4e6a5f3c8d7e9b0a1f2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b
            </div>
            <div className="mt-md flex justify-between items-center border-t border-white/10 pt-sm">
              <span className="font-label-sm text-label-sm text-on-primary/50">Verified by Vitamend Network</span>
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">check_circle</span>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bento-card flex-1">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Activity Feed</h3>
            <div className="relative border-l-2 border-surface-container-high ml-sm space-y-lg pb-md">
              {recentActivity.map((activity, i) => (
                <div key={i} className="relative pl-md">
                  <div className="absolute -left-[21px] top-0.5 p-1 bg-surface-container-lowest rounded-full">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
                  </div>
                  <p className="font-label-sm text-label-sm text-primary mb-1">{activity.time}</p>
                  <p className="font-label-md text-label-md text-on-surface">{activity.action}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{activity.item}</p>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <div className="relative pl-md">
                  <p className="font-body-sm text-on-surface-variant">Your activity will appear here once you start using Vitamend.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
