// src/app/api/get-user-data/route.ts

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// This is a secure, admin-level Supabase client.
// It uses the secret SERVICE_ROLE_KEY and can bypass Row Level Security.
// This client should ONLY be used in secure, server-side environments like this API route.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// This function handles POST requests to /api/get-user-data
export async function POST(request: Request) {
    try {
        // Your brother's backend will send a JSON request with the user's ID.
        // For example: { "userId": "some-uuid-of-a-user" }
        const { userId } = await request.json();

        // Basic validation to make sure a userId was sent.
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Securely fetch the user's profile from the database using the admin client.
        const { data, error } = await supabaseAdmin
            .from('profiles')
            .select('full_name, phone_number, extraction_details') // Select only the needed columns
            .eq('id', userId)
            .single(); // We expect only one user profile for the given ID

        // If there was an error fetching the data (e.g., user not found), throw an error.
        if (error) {
            throw error;
        }

        // If successful, return the user's data.
        return NextResponse.json(data);

    } catch (error: any) {
        // If any part of the process fails, return a generic server error.
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}