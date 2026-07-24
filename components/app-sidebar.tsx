"use client"
import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: "inventory_2",
  },
  {
    title: "Donations",
    url: "/donations",
    icon: "volunteer_activism",
  },
  {
    title: "Verification",
    url: "/verification",
    icon: "verified",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: "analytics",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <>
      <nav className="md:hidden fixed top-0 w-full z-50 bg-surface/70 dark:bg-inverse-surface/70 backdrop-blur-md border-b border-outline-variant/10 shadow-sm flex justify-between items-center h-16 px-gutter">
        <Link href="/" className="font-headline-md text-headline-md text-primary font-black">
          VITAMEND
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-on-surface-variant p-2"
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-surface dark:bg-inverse-surface border-b border-outline-variant/10 z-40 flex flex-col p-4 gap-2 shadow-lg">
          {mainNavItems.map((item) => {
            const isActive = pathname.startsWith(item.url)
            return (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-body-md text-body-md ${
                  isActive
                    ? "text-primary font-bold border-l-4 border-primary bg-primary-container/10"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary-container/10"
                }`}
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.icon}
                </span>
                {item.title}
              </Link>
            )
          })}
          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary-container/10 transition-all font-body-md text-body-md mt-4 border-t border-outline-variant/10"
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
        </div>
      )}

      <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-xl border-r border-outline-variant/20 shadow-md flex-col py-6 z-40">
        <div className="px-6 mb-8">
          <Link href="/" className="block font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim font-bold">
            VITAMEND
          </Link>
          <div className="font-body-sm text-body-sm text-on-surface-variant">Medical Logistics</div>
        </div>
        <div className="flex flex-col gap-1 px-4 flex-1">
          {mainNavItems.map((item) => {
            const isActive = pathname.startsWith(item.url)
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-transform scale-95 active:scale-90 font-body-md text-body-md ${
                  isActive
                    ? "text-primary font-bold border-r-4 border-primary bg-primary-container/10"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary-container/20"
                }`}
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.icon}
                </span>
                {item.title}
              </Link>
            )
          })}
          
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-transform scale-95 active:scale-90 font-body-md text-body-md mt-auto ${
              pathname.startsWith("/settings")
                ? "text-primary font-bold border-r-4 border-primary bg-primary-container/10"
                : "text-on-surface-variant hover:text-primary hover:bg-primary-container/20"
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
        </div>
      </aside>
    </>
  )
}
