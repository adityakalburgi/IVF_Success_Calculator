"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MobileNav } from "@/components/mobile-nav";

export default function IVFCalculator() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    ageRange: "under-30",
    ivfCycles: 1,
    icsiProcedure: "no",
    pgtTesting: "no",
    medicalConditions: [] as string[],
  });

  const handleChange = (name: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      medicalConditions: checked
        ? [...prev.medicalConditions, value]
        : prev.medicalConditions.filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryString = new URLSearchParams(
      Object.entries(formData).reduce((acc, [key, val]) => {
        acc[key] = Array.isArray(val) ? val.join(",") : String(val);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    router.push( `/calculator/result?ageRange=${formData.ageRange}&icsiProcedure=${formData.icsiProcedure}&pgtTesting=${formData.pgtTesting}&ivfCycles=${formData.ivfCycles}&medicalConditions=${formData.medicalConditions}`);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF5] font-poppins">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2 ml-8">
            <div className="bg-black text-white px-3 py-1 text-xl font-bold">IVF</div>
            <span className="text-xl font-semibold">Pulse</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm hover:text-primary">
              Donor Programme
            </Link>
            <Link href="#" className="text-sm hover:text-primary">
              Fertility Preservation
            </Link>
            <Link href="#" className="text-sm hover:text-primary">
              Advanced Treatments
            </Link>
            <Link href="#" className="text-sm hover:text-primary">
              Infertility Treatments
            </Link>
            <Link href="#" className="text-sm hover:text-primary">
              IVF Testing
            </Link>
            <Link href="#" className="text-sm hover:text-primary">
              About Us
            </Link>
            <Button variant="destructive">Talk to Us</Button>
          </nav>
          <MobileNav className="md:hidden" />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm ml-7">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span>/</span>
          <span>IVF Success Rate Calculator</span>
        </div>
      </div>

      {/* Main Form */}
      <main className="container max-w-2xl mx-auto py-8 px-4 md:px-0">
        <form className="space-y-12">
          {/* Age Range */}
          <h2 className="text-2xl leading-none font-medium text-center">Which age range applies to you?</h2>
          <RadioGroup
            value={formData.ageRange}
            onValueChange={(value) => handleChange("ageRange", value)}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[
              { id: "under-30", label: "Under 30" },
              { id: "30-34", label: "30 - 34" },
              { id: "35-37", label: "35 - 37" },
              { id: "38-40", label: "38 - 40" },
              { id: "41-43", label: "41 - 43" },
              { id: "above-43", label: "Above 43" },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-2 justify-center">
                <RadioGroupItem value={id} id={id} className="checked:bg-orange-500" />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </RadioGroup>

          {/* IVF Cycles */}
          <h2 className="text-2xl leading-none font-medium text-center">Number of IVF Cycles?</h2>
          <div className="px-4">
            <Slider
              value={[formData.ivfCycles]}
              onValueChange={(value) => handleChange("ivfCycles", value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-center mt-2">
              <span className="inline-block bg-primary text-white rounded-full w-6 h-6 text-sm leading-6">
                {formData.ivfCycles}
              </span>
            </div>
          </div>

          {/* Previous Procedures */}
          <h2 className="text-2xl leading-none font-medium text-center">Have you undergone these procedures before?</h2>
          <div className="md:flex justify-center">

            {[
              { name: "icsiProcedure", label: "ICSI Procedure" },
              { name: "pgtTesting", label: "PGT Testing" },
            ].map(({ name, label }) => (
              <div key={name} className="flex space-y-2 m-5">
                <Label className="mt-2 me-5 text-1xl">{label}:</Label>
                <RadioGroup
                  value={formData[name]}
                  onValueChange={(value) => handleChange(name, value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`${name}-yes`} className="checked:bg-orange-500" />
                    <Label htmlFor={`${name}-yes`}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${name}-no`} className="checked:bg-orange-500" />
                    <Label htmlFor={`${name}-no`}>No</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>

          {/* Medical Conditions */}
          <h2 className="text-2xl leading-none font-medium text-center">Do you have any of these medical conditions?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex justify-center gap-4">
            {["PCOS", "Endometriosis", "Low Ovarian Reserve", "Male Factor Infertility"].map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition.toLowerCase().replace(" ", "-")}
                  checked={formData.medicalConditions.includes(condition)}
                  onCheckedChange={(checked) => handleCheckboxChange(condition, checked)}
                />
                <Label htmlFor={condition.toLowerCase().replace(" ", "-")} className="text-1xl">{condition}</Label>
              </div>
            ))}
          </div>

          {/* Submit Button */}
        </form>
      </main>
      <div className="flex justify-center fixed w-[100%] bottom-10">
        <Button type="submit" variant="destructive" size="lg" onClick={handleSubmit}>
          Calculate
        </Button>
      </div>
    </div>
  );
}
