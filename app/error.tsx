"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">
      <div className="text-center px-4 max-w-md bg-surface p-xl rounded-[24px] shadow-sm border border-outline-variant/20">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error-container text-error">
          <span className="material-symbols-outlined text-[32px]">warning</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg mb-4">Something went wrong</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm h-12"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Try Again
          </button>
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl border border-primary text-primary font-label-md text-label-md hover:bg-primary-container/10 transition-colors shadow-sm h-12"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Go Home
          </Link>
        </div>
        {error.digest && <p className="mt-6 font-label-sm text-label-sm text-outline">Error ID: {error.digest}</p>}
      </div>
    </div>
  )
}
