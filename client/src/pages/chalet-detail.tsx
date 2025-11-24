import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Chalet } from "@shared/schema";
import { MapPin, Users, Bed, Bath, Maximize, ArrowLeft, Flame, Waves, Mountain, Eye, Check } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ChaletDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: chalet, isLoading, isError } = useQuery<Chalet>({
    queryKey: [`/api/chalets/${id}`],
  });

  const getImagePath = (imageName: string) => {
    try {
      return new URL(`../../assets/generated_images/${imageName}`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="h-8 w-32 bg-muted rounded animate-pulse mb-6" />
          <div className="aspect-video bg-muted rounded-xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-32 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-96 bg-muted rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || (!isLoading && !chalet)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-2" data-testid="text-error-title">
            {isError ? "Error loading chalet" : "Chalet not found"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isError 
              ? "We're having trouble loading this chalet. Please try again later." 
              : "The chalet you're looking for doesn't exist."}
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Button>
        </Link>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8">
          <img
            src={getImagePath(chalet.images[0])}
            alt={chalet.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="font-heading text-4xl font-bold mb-4" data-testid="text-chalet-title">
                {chalet.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-5 w-5" />
                <span className="text-lg" data-testid="text-chalet-location">{chalet.location}</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium" data-testid="text-chalet-bedrooms">{chalet.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium" data-testid="text-chalet-bathrooms">{chalet.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium" data-testid="text-chalet-sqft">{chalet.sqft} sqft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium" data-testid="text-chalet-guests">Up to {chalet.maxGuests} guests</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {chalet.hasFireplace && (
                  <Badge variant="secondary" className="gap-1">
                    <Flame className="h-4 w-4" />
                    Fireplace
                  </Badge>
                )}
                {chalet.hasHotTub && (
                  <Badge variant="secondary" className="gap-1">
                    <Waves className="h-4 w-4" />
                    Hot Tub
                  </Badge>
                )}
                {chalet.hasSkiAccess && (
                  <Badge variant="secondary" className="gap-1">
                    <Mountain className="h-4 w-4" />
                    Ski-In/Ski-Out
                  </Badge>
                )}
                {chalet.hasMountainView && (
                  <Badge variant="secondary" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Mountain View
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="font-heading text-2xl font-semibold mb-4">About this chalet</h2>
              <p className="text-foreground leading-relaxed" data-testid="text-chalet-description">{chalet.description}</p>
            </div>

            <Separator />

            <div>
              <h2 className="font-heading text-2xl font-semibold mb-6">Amenities</h2>
              {chalet.amenities && chalet.amenities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {chalet.amenities.map((amenity, index) => (
                    <div key={amenity} className="flex items-center gap-3" data-testid={`amenity-${index}`}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground" data-testid="text-no-amenities">
                  No amenities listed for this property.
                </p>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-bold text-foreground" data-testid="text-price">
                    ${chalet.price}
                  </span>
                  <span className="text-muted-foreground">/ night</span>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    data-testid="input-checkin-detail"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    data-testid="input-checkout-detail"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={chalet.maxGuests}
                    defaultValue="2"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    data-testid="input-guests-detail"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 p-6 pt-0">
                <Button className="w-full" size="lg" data-testid="button-reserve">
                  Reserve Now
                </Button>
                <p className="text-xs text-center text-muted-foreground" data-testid="text-booking-note">
                  You won't be charged yet
                </p>
              </CardFooter>
            </Card>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                Questions about this property? Contact us for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
