"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Package, ShieldCheck, Activity, PlusCircle, 
  ArrowRight, Clock, MapPin, CheckCircle2, AlertCircle
} from "lucide-react"
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!session?.user) return null

  const user = session.user

  const stats = [
    { title: "Total Donations", value: "142", icon: Package, trend: "+12% this month" },
    { title: "Verified Items", value: "128", icon: ShieldCheck, trend: "90% success rate" },
    { title: "Active Requests", value: "12", icon: Activity, trend: "3 urgent" },
  ]

  const recentActivity = [
    { action: "Donation Received", item: "Ibuprofen 400mg", time: "2 hours ago", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { action: "AI Verification Complete", item: "Amoxicillin 500mg", time: "5 hours ago", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
    { action: "Request Fulfilled", item: "Insulin Glargine", time: "1 day ago", icon: CheckCircle2, color: "text-purple-500", bg: "bg-purple-50" },
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
    <div className="pb-12 max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
        >
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-slate-500 mt-1">Here is a summary of your Vitamend impact and current network status.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/donate" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm">
            <PlusCircle className="h-5 w-5" />
            <span>New Donation</span>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-slate-600" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
            <div className="mt-4 text-xs font-medium text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">
              {stat.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Verifications</h2>
            <Link href="/verification" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {verificationStatus.map((item, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    item.status === 'Verified' ? 'bg-emerald-100 text-emerald-600' :
                    item.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {item.status === 'Verified' ? <CheckCircle2 className="h-5 w-5" /> :
                     item.status === 'Pending' ? <Clock className="h-5 w-5" /> :
                     <AlertCircle className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.item}</h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Batch: {item.batch}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    item.status === 'Verified' ? 'bg-emerald-50 text-emerald-700' :
                    item.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-2">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Activity & Zones */}
        <div className="space-y-6 lg:col-span-1">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`mt-0.5 h-8 w-8 rounded-full ${activity.bg} flex items-center justify-center shrink-0`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{activity.item}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-medium tracking-wider">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Zones */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Active Zones</h2>
              <MapPin className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-4">
              {activeZones.map((zone, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{zone.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{zone.distance}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    zone.demand === 'Urgent' ? 'bg-red-50 text-red-600' :
                    zone.demand === 'High' ? 'bg-orange-50 text-orange-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {zone.demand}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
