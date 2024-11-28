"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/circular-progress";
import { url } from "inspector";
import { MobileNav } from "./mobile-nav";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [successRate, setSuccessRate] = useState<number>(0);

  useEffect(() => {
    // Extract data from the URL query parameters
    const data: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      data[key] = value;
    });
    setFormData(data);

    // Example logic to calculate success rate (adjust as needed)
    const baseRate = 50; // Base rate for IVF success
    let rate = baseRate;

    if (data.ageRange === "under-30") rate += 10;
    else if (data.ageRange === "30-34") rate += 5;
    else if (data.ageRange === "35-37") rate -= 5;
    else if (data.ageRange === "38-40") rate -= 10;
    else if (data.ageRange === "41-43") rate -= 15;
    else if (data.ageRange === "above-43") rate -= 20;

    if (data.icsiProcedure === "yes") rate += 5;
    if (data.pgtTesting === "yes") rate += 5;
    if (data.medicalConditions?.includes("Endometriosis")) rate -= 5;

    // Adjust rate based on number of IVF cycles
    const cycles = parseInt(data.ivfCycles || "1", 10);
    rate = rate * (1 - Math.exp(-cycles / 3)); // Diminishing returns for multiple cycles

    setSuccessRate(Math.min(Math.max(rate, 0), 100)); // Ensure success rate is between 0 and 100
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#303030] text-white font-poppins">
      {/* Header */}
      <header className="border-b bg-white border-zinc-800">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center ml-7 gap-2">
            <div className="bg-black text-white px-3 py-1 text-xl font-bold">IVF</div>
            <span className="text-xl text-black font-semibold">Pulse</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm text-black">Donor Programme</Link>
            <Link href="#" className="text-sm text-black">Fertility Preservation</Link>
            <Link href="#" className="text-sm text-black">Advanced Treatments</Link>
            <Link href="#" className="text-sm text-black">Infertility Treatments</Link>
            <Link href="#" className="text-sm text-black ">IVF Testing</Link>
            <Link href="#" className="text-sm text-black">About Us</Link>
            <Button variant="destructive">Talk to Us</Button>
          </nav>
          <MobileNav className="md:hidden"></MobileNav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm ml-7 text-white">
          <Link href="/" className="text-white hover:underline">Home</Link>
          <span>/</span>
          <Link href="/calculator" className="text-white hover:underline">IVF Success Rate Calculator</Link>
          <span>/</span>
          <span>Result</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-900/30 pointer-events-none" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-12">
            <div className="space-y-12">
              <h1 className="text-3xl md:text-4xl ml-7 font-bold text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary block" />
                Your estimated IVF Success Rate is
              </h1>
              
              <div className="flex flex-col items-center">
                <CircularProgress value={successRate} />
                <p className="mt-4 text-lg text-zinc-200">With {formData.ivfCycles || 1} IVF Cycle{formData.ivfCycles !== "1" ? "s" : ""}</p>
              </div>

              <div className="space-y-4 ml-9">
                <h2 className="text-2xl font-semibold">Your Inputs:</h2>
                <ul className="space-y-2 text-zinc-300">
                  <li>Age Range: {formData.ageRange?.replace('-', ' - ').replace('under', 'Under ').replace('above', 'Above ')}</li>
                  <li>ICSI Procedure: {formData.icsiProcedure === 'yes' ? 'Yes' : 'No'}</li>
                  <li>PGT Testing: {formData.pgtTesting === 'yes' ? 'Yes' : 'No'}</li>
                  <li>Medical Conditions: {formData.medicalConditions ? formData.medicalConditions.split(',').join(', ') : 'None'}</li>
                </ul>
              </div>

            </div>
            
            <div className="relative h-[600px] lg:block">
              <Image
                src="/assets/img-1.png"
                alt="Happy couple"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

