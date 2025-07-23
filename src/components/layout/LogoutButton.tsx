// src/components/layout/LogoutButton.tsx
'use client';
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} variant="ghost" size="sm">Logout</Button>
  );
}