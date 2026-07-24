import DonationForm from "./donation-form"

export default function DonatePage() {
  return (
    <main className="flex-grow pt-24 pb-12 px-gutter max-w-screen-2xl mx-auto w-full">
      {/* Header & Progress */}
      <div className="mb-lg max-w-3xl mx-auto text-center">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-sm">Guided Medicine Donation</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">Contribute securely to our verified medical logistics network.</p>
      </div>

      {/* Donation Wizard */}
      <DonationForm />
    </main>
  )
}
