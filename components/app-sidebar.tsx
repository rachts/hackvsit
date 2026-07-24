"use client"
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Package,
  HeartHandshake,
  ShieldCheck,
  BarChart3,
  PlusCircle,
  Settings,
  HelpCircle
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Package,
  },
  {
    title: "Donations",
    url: "/donations",
    icon: HeartHandshake,
  },
  {
    title: "Verification",
    url: "/verification",
    icon: ShieldCheck,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
]

const bottomNavItems = [
  {
    title: "New Donation",
    url: "/donate",
    icon: PlusCircle,
    isPrimary: true,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "/contact",
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="bg-slate-50/50 border-r border-slate-200">
      <SidebarHeader className="px-6 py-6 mb-4">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-emerald-700 tracking-tight">VITAMEND</span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1">AI Medical Logistics</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNavItems.map((item) => {
                const isActive = pathname.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} className={`w-full py-6 rounded-xl transition-all duration-200 ${isActive ? "bg-blue-50 text-blue-700 font-semibold shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"}`}>
                      <Link href={item.url} className="flex items-center gap-4">
                        <item.icon className={`h-[18px] w-[18px] ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-6 mt-auto">
        <SidebarMenu className="gap-1">
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className={`w-full py-6 rounded-xl transition-all duration-200 ${item.isPrimary ? "bg-emerald-700 text-white hover:bg-emerald-800 hover:text-white mb-4 shadow-md" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"}`}>
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon className={`h-[18px] w-[18px] ${item.isPrimary ? "text-white" : "text-slate-400"}`} />
                  <span className={item.isPrimary ? "font-semibold" : ""}>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
