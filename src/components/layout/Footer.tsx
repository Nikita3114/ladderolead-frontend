// src/components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg">Ladder O Lead</h3>
            <p className="text-muted-foreground text-sm">AI-Powered Smart Assistant for MSME Lead Management.</p>
          </div>
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-1 text-muted-foreground"><li className="py-1"><Link href="/#features" className="hover:text-foreground">Features</Link></li><li className="py-1"><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li><li className="py-1"><Link href="/faq" className="hover:text-foreground">FAQ</Link></li></ul>
          </div>
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-1 text-muted-foreground"><li className="py-1"><Link href="#" className="hover:text-foreground">About Us</Link></li><li className="py-1"><Link href="#" className="hover:text-foreground">Contact</Link></li></ul>
          </div>
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-1 text-muted-foreground"><li className="py-1"><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li><li className="py-1"><Link href="#" className="hover:text-foreground">Terms of Service</Link></li></ul>
          </div>
        </div>
        <hr className="my-8 border-white/10" />
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ladder O Lead. Built with ❤️ for the MSMEs of India.
        </div>
      </div>
    </footer>
  );
}