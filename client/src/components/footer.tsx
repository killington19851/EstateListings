import { Link } from "wouter";
import { Mountain, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">Chalet Stay</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover luxury mountain chalets in the world's most stunning alpine destinations. Your perfect winter escape awaits.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-all-chalets">
                    All Chalets
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-luxury">
                    Luxury Rentals
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-ski">
                    Ski Chalets
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-summer">
                    Summer Retreats
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-help">
                    Help Center
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-contact">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-privacy">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-terms">
                    Terms of Service
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers and travel inspiration.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="min-h-9"
                data-testid="input-newsletter"
              />
              <Button size="icon" data-testid="button-subscribe">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© 2024 Chalet Stay. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-foreground transition-colors" data-testid="link-trust-secure">
              Secure Booking
            </span>
            <span className="cursor-pointer hover:text-foreground transition-colors" data-testid="link-trust-verified">
              Verified Properties
            </span>
            <span className="cursor-pointer hover:text-foreground transition-colors" data-testid="link-trust-support">
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
