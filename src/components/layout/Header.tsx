// src/components/layout/Header.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from './LogoutButton';

export default async function Header() {
  const supabase = await createClient(); // ✅ Await the async function

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg">Ladder O Lead</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
          <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
          <Link href="/faq" className="transition-colors hover:text-foreground/80 text-foreground/60">FAQ</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm"><Link href="/dashboard">Dashboard</Link></Button>
              <LogoutButton />
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Start Free Trial</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
