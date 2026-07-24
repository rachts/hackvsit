import { Navigation } from "@/components/navigation"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <div className="flex-1">
        {children}
      </div>
    </>
  )
}
