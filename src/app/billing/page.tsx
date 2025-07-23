// src/app/billing/page.tsx
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
    const amountDue = 58.38; 

    const handlePayment = () => {
        alert(`This will open Razorpay to pay $${amountDue}. Integration coming soon!`);
    };

    return (
        <div className="flex justify-center items-center pt-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Pay Your Invoice</CardTitle>
                    <CardDescription>Complete your payment to continue using Ladder O Lead.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Amount Due</p>
                        <p className="text-5xl font-bold">${amountDue.toFixed(2)}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handlePayment} className="w-full">Pay with Razorpay</Button>
                </CardFooter>
            </Card>
        </div>
    );
}