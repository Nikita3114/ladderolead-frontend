// src/app/pricing/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center pt-10 text-center">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="mt-2 text-muted-foreground">Start for free. Pay only for the value you get.</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <Card className="border-primary">
                <CardHeader>
                    <CardTitle>1-Week Free Trial</CardTitle>
                    <CardDescription>Experience the full power of Ladder O Lead, no credit card required.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-left text-sm">
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Unlimited Lead Extraction</li>
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> WhatsApp Integration</li>
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> AI Chatbot (Optional)</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/login">Start Your Free Trial</Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Pay-As-You-Go</CardTitle>
                    <CardDescription>After your trial, continue with our simple, value-based pricing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-5xl font-bold">$1.39</div>
                    <p className="text-muted-foreground">per extracted lead</p>
                    <p className="text-sm text-muted-foreground mt-4">You will be invoiced at the end of your 30-day billing cycle.</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant="outline" disabled>Active After Trial</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}