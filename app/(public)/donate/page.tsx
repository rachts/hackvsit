import DonationForm from "./donation-form"

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-16 pb-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">Donate Medicines</h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Help reduce medical waste and improve access to care. Upload photos and our AI will automatically extract medicine details.
          </p>
        </div>

        {/* Donation Form */}
        <DonationForm />
      </div>
    </main>
  )
}
