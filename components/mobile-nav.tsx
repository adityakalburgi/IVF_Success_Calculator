"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col space-y-4 ">
          <Link href="#" className="text-sm hover:text-primary">Donor Programme</Link>
          <Link href="#" className="text-sm hover:text-primary">Fertility Preservation</Link>
          <Link href="#" className="text-sm hover:text-primary">Advanced Treatments</Link>
          <Link href="#" className="text-sm hover:text-primary">Infertility Treatments</Link>
          <Link href="#" className="text-sm hover:text-primary">IVF Testing</Link>
          <Link href="#" className="text-sm hover:text-primary">About Us</Link>
          <Button variant="destructive">Talk to Us</Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

