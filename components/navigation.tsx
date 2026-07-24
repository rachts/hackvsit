"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Moon } from "lucide-react"

export function Navigation() {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md shadow-sm border-b border-outline-variant/10">
      <div className="flex justify-between items-center h-16 px-gutter max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-md">
          <Link href="/" className="font-headline-md text-headline-md text-primary font-black tracking-tight">
            VITAMEND
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-md">
          <Link href="/#features" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all hover:opacity-80 active:opacity-100">
            Features
          </Link>
          <Link href="/#demo" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all hover:opacity-80 active:opacity-100">
            Live Demo
          </Link>
          <Link href="/#impact" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all hover:opacity-80 active:opacity-100">
            Impact
          </Link>
          <Link href="/donate" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all hover:opacity-80 active:opacity-100">
            Donate
          </Link>
        </div>
        <div className="flex items-center gap-sm">
          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-full transition-colors mr-2">
            <Moon className="w-5 h-5" />
          </button>
          {status === "loading" ? (
            <div className="h-10 w-24 bg-surface-container-high rounded-xl animate-pulse"></div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="hidden sm:block font-label-md text-label-md text-on-surface-variant hover:text-primary">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-surface-container-high text-on-surface rounded-xl px-4 py-2 font-label-md text-label-md hover:bg-surface-variant transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="hidden sm:flex bg-transparent border border-outline text-on-surface rounded-xl px-4 py-2 font-label-md text-label-md hover:bg-surface-container-low transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-primary-container text-on-primary rounded-xl px-4 py-2 font-label-md text-label-md hover:shadow-md transition-shadow"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
