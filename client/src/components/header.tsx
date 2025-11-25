import { Link } from "wouter";
import { Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer hover-elevate rounded-md px-3 py-2 -ml-3" data-testid="link-home">
            <Mountain className="h-7 w-7 text-primary" />
            <span className="font-heading text-2xl font-bold text-foreground">
              Chalet Stay
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/">
            <span className="text-sm font-medium text-foreground hover-elevate rounded-md px-3 py-2 cursor-pointer transition-colors" data-testid="link-explore">
              Explore Chalets
            </span>
          </Link>
          <Link href="/">
            <span className="text-sm font-medium text-foreground hover-elevate rounded-md px-3 py-2 cursor-pointer transition-colors" data-testid="link-destinations">
              Destinations
            </span>
          </Link>
          <Link href="/">
            <span className="text-sm font-medium text-foreground hover-elevate rounded-md px-3 py-2 cursor-pointer transition-colors" data-testid="link-about">
              About
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/list-property">
            <Button variant="outline" className="hidden sm:inline-flex" data-testid="button-list-property">
              List Your Property
            </Button>
          </Link>
          <Button data-testid="button-contact">Contact Us</Button>
        </div>
      </div>
    </header>
  );
}
