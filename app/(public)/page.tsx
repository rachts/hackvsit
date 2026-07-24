"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LiveDemo } from "@/components/live-demo"

export default function HomePage() {
  const [stats, setStats] = useState({
    medicines: 0,
    users: 0,
    volunteers: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
        const [medicinesRes, usersRes, volunteersRes] = await Promise.all([
          fetch(`${API_URL}/api/medicines`).catch(() => null),
          fetch(`${API_URL}/api/auth/users`).catch(() => null),
          fetch(`${API_URL}/api/volunteers`).catch(() => null),
        ]);

        const medicinesData = medicinesRes?.ok ? await medicinesRes.json() : [];
        const usersData = usersRes?.ok ? await usersRes.json() : [];
        const volunteersData = volunteersRes?.ok ? await volunteersRes.json() : [];

        setStats({
          medicines: Array.isArray(medicinesData) ? medicinesData.length : 0,
          users: Array.isArray(usersData) ? usersData.length : 0,
          volunteers: Array.isArray(volunteersData) ? volunteersData.length : 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    }
    fetchStats();
  }, []);

  return (
    <main className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-xl min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-fixed-dim/30 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-secondary-fixed-dim/30 rounded-full blur-[120px] -z-10 mix-blend-multiply"></div>
        <div className="max-w-screen-2xl mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-lg items-center z-10 w-full">
          <div className="flex flex-col gap-md max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-surface-container-low text-primary px-3 py-1.5 rounded-full w-max border border-primary/20">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">The Future of Medical Logistics</span>
            </div>
            <h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[72px] text-on-surface font-extrabold tracking-tight">
              Medicine for Everyone, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Powered by AI.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Vitamend bridges the gap between surplus medical supplies and those in need. Our intelligent platform uses computer vision and predictive routing to ensure no life-saving resource goes to waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm pt-sm">
              <Link href="/donate" className="bg-primary-container text-on-primary h-[56px] px-8 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Join the Network
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="#demo" className="bg-transparent border border-outline text-on-surface h-[56px] px-8 rounded-xl font-label-md text-label-md flex items-center justify-center hover:bg-surface-container-low transition-colors w-full sm:w-auto">
                Watch Demo
              </Link>
            </div>
          </div>
          <div className="relative h-[500px] lg:h-[600px] w-full rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] glass-panel border border-white/40 p-4 mt-12 lg:mt-0">
            <div className="w-full h-full rounded-[24px] overflow-hidden relative bg-surface-container">
              <img className="object-cover w-full h-full" alt="A pristine, highly modern clinical environment bathed in soft, diffused natural light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4Nipio2NxjsgSXH-YetKl6SmEPVMoEF7b5UOpFEbRrccx6IFLNCZbxiy9RDDl8qpTFJ3b7-7lKRwsQUC6rByZiOHKKkEQMYuOQCuL6de0hLnGFfOY9JJynJcHBQPSnL3RWzA4xJCaPZJFVYezG8vlNFvkweNdiYfmYo8UHeX3CTXZ_cRXBM2w_dIp-zxsBaC7u___LtpW3xPee5LchFh2yO_A7TDPVIZwiUrBspIqYzpO-OnFVdWEQeYG0j3hbtCKzBTCv3wgQY0" />
              {/* Floating UI Card overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-outline-variant/20 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Optical Verification Complete</p>
                  <p className="font-label-md text-label-md text-on-surface font-bold">140 Units Approved for Redistribution</p>
                </div>
                <div className="ml-auto">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section id="impact" className="py-xl bg-surface-container-lowest border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-gutter">
          <div className="text-center mb-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Measurable Global Impact</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Real-time data reflecting our commitment to reducing medical waste and improving healthcare access worldwide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="glass-panel p-lg rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>medication</span>
              <h3 className="font-display-lg text-display-lg text-on-surface font-bold mb-1">{stats.medicines}</h3>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Medicines Donated</p>
            </div>
            <div className="glass-panel p-lg rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border border-outline-variant/20 bg-surface-tint/5">
              <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <h3 className="font-display-lg text-display-lg text-on-surface font-bold mb-1 text-primary">{stats.users}</h3>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Lives Impacted</p>
            </div>
            <div className="glass-panel p-lg rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>recycling</span>
              <h3 className="font-display-lg text-display-lg text-on-surface font-bold mb-1">{stats.volunteers * 20}</h3>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Lbs Waste Diverted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Features Section */}
      <section id="features" className="py-xl bg-background">
        <div className="max-w-screen-2xl mx-auto px-gutter">
          <div className="mb-lg max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Intelligent Infrastructure for Healthcare</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Our platform leverages cutting-edge artificial intelligence to seamlessly verify, route, and deliver vital medical supplies to where they are needed most.</p>
          </div>
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md auto-rows-[minmax(300px,_auto)]">
            {/* Feature 1: Neural Optical Verification (Large, spans 8 cols) */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-[24px] p-lg shadow-sm border border-outline-variant/10 flex flex-col lg:flex-row gap-lg overflow-hidden relative group">
              <div className="flex-1 z-10 flex flex-col justify-center">
                <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined">center_focus_strong</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Neural Optical Verification</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Instantly authenticate medications, check expiration dates, and ensure packaging integrity using advanced computer vision models trained on millions of clinical data points.
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-sm text-body-sm text-on-surface">99.9% Accuracy Rate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-sm text-body-sm text-on-surface">Sub-second Processing</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 relative min-h-[250px] rounded-xl overflow-hidden bg-surface-container border border-outline-variant/20">
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Scanning interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0GkV6xWF1FhNFoC56W7qWH2VQ7UIEXbjku3ZHG5070STrGNGcbPgszaBpHPvq63S236ulpZBCBFu3dqfDQUgImZ27H18pb5dPkVLaVZ2N8Ts4ggN0trDytxR4OTCTFpqLDq2djKjYIsxexwFKiKmO530ToiYCehyOVKLqBbyv_GCcOVflfBCb4E9mT3p0axt4yzH_AA_XWG4Wme8CN6HlqP30AyDEjlBBFcA4qHBQcWoOXHvkP1F7hg30bKjziSWbTlq-Yh_uj1c" />
              </div>
            </div>
            
            {/* Feature 2: Smart Redistribution (Spans 4 cols) */}
            <div className="md:col-span-4 bg-[#F0FAF7] rounded-[24px] p-lg shadow-sm border border-primary/10 flex flex-col relative overflow-hidden group">
              {/* Decorative shape */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]"></div>
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm z-10">
                <span className="material-symbols-outlined">route</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3 z-10">Smart Redistribution</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 z-10">
                Predictive algorithms match available inventory with real-time demand signals from clinics and hospitals, optimizing logistics routes to minimize delivery times and carbon footprint.
              </p>
              <div className="mt-auto bg-surface rounded-xl p-4 shadow-sm z-10 border border-outline-variant/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Optimization Score</span>
                  <span className="font-label-md text-label-md text-primary">94%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2">
                  <div className="bg-primary-container h-2 rounded-full w-[94%]"></div>
                </div>
              </div>
            </div>
            
            {/* Feature 3: Real-time Analytics (Spans 6 cols) */}
            <div className="md:col-span-6 bg-surface-container-lowest rounded-[24px] p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-secondary-container/10 rounded-xl flex items-center justify-center text-secondary mb-6">
                  <span className="material-symbols-outlined">monitoring</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Real-time Analytics Dashboard</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Gain comprehensive visibility into your entire logistics pipeline. Monitor donation flows, track compliance metrics, and generate detailed impact reports instantly.
                </p>
              </div>
              <div className="h-40 rounded-xl border border-outline-variant/10 overflow-hidden relative bg-surface-container-low flex items-end p-4">
                {/* Abstract bar chart representation */}
                <div className="flex gap-2 items-end w-full h-full pt-4">
                  <div className="w-1/6 bg-secondary-fixed/50 rounded-t-md h-[40%]"></div>
                  <div className="w-1/6 bg-secondary-fixed/70 rounded-t-md h-[60%]"></div>
                  <div className="w-1/6 bg-secondary-fixed/40 rounded-t-md h-[30%]"></div>
                  <div className="w-1/6 bg-secondary rounded-t-md h-[80%]"></div>
                  <div className="w-1/6 bg-secondary-fixed/60 rounded-t-md h-[50%]"></div>
                  <div className="w-1/6 bg-secondary-fixed/80 rounded-t-md h-[70%]"></div>
                </div>
              </div>
            </div>
            
            {/* Feature 4: Secure Compliance (Spans 6 cols) */}
            <div className="md:col-span-6 bg-surface-container-lowest rounded-[24px] p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-tertiary-container/10 rounded-xl flex items-center justify-center text-tertiary mb-6">
                  <span className="material-symbols-outlined">gavel</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Automated Regulatory Compliance</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Built-in safeguards ensure all transactions meet FDA and local regulatory standards. Automated documentation trails provide a verifiable chain of custody for every unit.
                </p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">HIPAA Compliant</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Data encrypted at rest and in transit</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">DSCSA Ready</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Full supply chain traceability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-xl bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-gutter">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Try Vitamend AI</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Experience our computer vision technology in action. See how we verify the authenticity and eligibility of medical supplies in real-time.
            </p>
          </div>
          <LiveDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-xl relative overflow-hidden bg-primary-container">
        {/* Decorative subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
        <div className="max-w-screen-lg mx-auto px-gutter text-center relative z-10">
          <h2 className="font-display-lg text-display-lg text-on-primary mb-6">Ready to Transform Medical Logistics?</h2>
          <p className="font-body-lg text-body-lg text-on-primary max-w-2xl mx-auto mb-10 opacity-90">
            Join our network of hospitals, clinics, and pharmacies working together to eliminate medical waste and improve patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-surface text-primary-container h-[56px] px-8 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 hover:shadow-lg hover:bg-surface-bright transition-all">
              Join the Network Now
            </Link>
            <Link href="/contact" className="bg-transparent border border-outline text-on-primary h-[56px] px-8 rounded-xl font-label-md text-label-md flex items-center justify-center hover:bg-on-primary/10 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
