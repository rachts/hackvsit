import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">
      <div className="text-center px-4 bg-surface p-xl rounded-[24px] shadow-sm border border-outline-variant/20">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-headline-lg text-headline-lg mb-4">Page Not Found</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm h-12"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
