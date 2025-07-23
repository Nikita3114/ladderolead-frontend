// src/components/OnboardingForm.tsx
'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // We need to add this!
import { useRouter } from 'next/navigation';

export default function OnboardingForm({ userId }: { userId: string }) {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [extractionDetails, setExtractionDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                phone_number: phoneNumber,
                extraction_details: extractionDetails,
                has_completed_onboarding: true,
            })
            .eq('id', userId);

        if (error) {
            alert('Error updating profile: ' + error.message);
        } else {
            // Refresh the page to show the normal dashboard
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Welcome to Ladder O Lead!</CardTitle>
                <CardDescription>Let's get your account set up. Please provide a few details to get started.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Piyush Jagtap" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number (with country code)</Label>
                        <Input id="phoneNumber" placeholder="+91 9876543210" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="extractionDetails">What information do you want to extract from chats?</Label>
                        <Textarea id="extractionDetails" placeholder="e.g., Customer Name, Phone Number, Budget, Property Location..." required value={extractionDetails} onChange={(e) => setExtractionDetails(e.target.value)} />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Saving...' : 'Complete Setup'}
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}