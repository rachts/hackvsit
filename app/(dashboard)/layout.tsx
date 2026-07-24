import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased flex">
      <AppSidebar />
      <main className="flex-1 md:ml-64 pt-20 md:pt-0 min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  )
}
