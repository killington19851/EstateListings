import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Chalet } from "@shared/schema";
import { Search, MapPin, Calendar, Users, Home as HomeIcon, Flame, Waves, Mountain, Bed, Bath, Maximize } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@assets/generated_images/hero_banner_mountain_chalet.png";

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [bathrooms, setBathrooms] = useState<string>("all");
  const [hasHotTub, setHasHotTub] = useState(false);
  const [hasSkiAccess, setHasSkiAccess] = useState(false);
  const [hasFireplace, setHasFireplace] = useState(false);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    if (searchLocation) params.append("location", searchLocation);
    
    if (priceRange === "0-500") {
      params.append("minPrice", "0");
      params.append("maxPrice", "500");
    } else if (priceRange === "500-1000") {
      params.append("minPrice", "500");
      params.append("maxPrice", "1000");
    } else if (priceRange === "1000-2000") {
      params.append("minPrice", "1000");
      params.append("maxPrice", "2000");
    } else if (priceRange === "2000+") {
      params.append("minPrice", "2000");
    }
    
    if (bedrooms !== "all") params.append("bedrooms", bedrooms);
    if (bathrooms !== "all") params.append("bathrooms", bathrooms);
    if (hasHotTub) params.append("hasHotTub", "true");
    if (hasSkiAccess) params.append("hasSkiAccess", "true");
    if (hasFireplace) params.append("hasFireplace", "true");
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  const { data: chalets, isLoading, isError } = useQuery<Chalet[]>({
    queryKey: [`/api/chalets${buildQueryString()}`],
  });

  const getImagePath = (imageName: string) => {
    try {
      return new URL(`../../assets/generated_images/${imageName}`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury mountain chalet with snow-covered peaks"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <h1 className="mb-4 font-heading text-5xl font-bold text-white md:text-6xl lg:text-7xl text-center">
            Find Your Perfect Mountain Escape
          </h1>
          <p className="mb-8 text-lg text-white/90 md:text-xl text-center max-w-2xl">
            Discover luxury chalets in the world's most breathtaking alpine destinations
          </p>

          <div className="w-full max-w-4xl rounded-xl bg-white/95 backdrop-blur-md p-6 shadow-xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Where do you want to go?"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 min-h-9"
                  data-testid="input-search-location"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="date"
                  placeholder="Check-in"
                  className="pl-10 min-h-9"
                  data-testid="input-checkin"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Guests"
                  min="1"
                  className="pl-10 min-h-9"
                  data-testid="input-guests"
                />
              </div>
            </div>
            <Button className="mt-4 w-full" size="lg" data-testid="button-search">
              <Search className="mr-2 h-5 w-5" />
              Search Chalets
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <h2 className="font-heading text-3xl font-bold">Available Chalets</h2>
          <Separator orientation="vertical" className="h-8 hidden md:block" />
          <div className="flex flex-wrap items-center gap-3">
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[180px]" data-testid="select-price">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-500">$0 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                <SelectItem value="2000+">$2,000+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="w-[150px]" data-testid="select-bedrooms">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Bedrooms</SelectItem>
                <SelectItem value="2">2+ Bedrooms</SelectItem>
                <SelectItem value="3">3+ Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
                <SelectItem value="5">5+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>

            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger className="w-[150px]" data-testid="select-bathrooms">
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Bathrooms</SelectItem>
                <SelectItem value="2">2+ Bathrooms</SelectItem>
                <SelectItem value="3">3+ Bathrooms</SelectItem>
                <SelectItem value="4">4+ Bathrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={hasHotTub ? "default" : "outline"}
            size="sm"
            onClick={() => setHasHotTub(!hasHotTub)}
            className="gap-2"
            data-testid="button-filter-hottub"
          >
            <Waves className="h-4 w-4" />
            Hot Tub
          </Button>
          <Button
            variant={hasSkiAccess ? "default" : "outline"}
            size="sm"
            onClick={() => setHasSkiAccess(!hasSkiAccess)}
            className="gap-2"
            data-testid="button-filter-ski"
          >
            <Mountain className="h-4 w-4" />
            Ski Access
          </Button>
          <Button
            variant={hasFireplace ? "default" : "outline"}
            size="sm"
            onClick={() => setHasFireplace(!hasFireplace)}
            className="gap-2"
            data-testid="button-filter-fireplace"
          >
            <Flame className="h-4 w-4" />
            Fireplace
          </Button>
        </div>

        {isError ? (
          <div className="flex flex-col items-center justify-center py-20">
            <HomeIcon className="h-16 w-16 text-destructive mb-4" />
            <h3 className="font-heading text-2xl font-semibold mb-2" data-testid="text-error">Error loading chalets</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We're having trouble loading the chalets. Please try again later or contact support if the problem persists.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : chalets && chalets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chalets.map((chalet) => (
              <Link key={chalet.id} href={`/chalet/${chalet.id}`}>
                <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer" data-testid={`card-chalet-${chalet.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={getImagePath(chalet.images[0])}
                      alt={chalet.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/95 backdrop-blur-sm text-foreground font-semibold text-base px-3 py-1 border border-white/20" data-testid={`text-price-${chalet.id}`}>
                        ${chalet.price}/night
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-2 line-clamp-1" data-testid={`text-title-${chalet.id}`}>
                      {chalet.title}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm line-clamp-1" data-testid={`text-location-${chalet.id}`}>{chalet.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span data-testid={`text-bedrooms-${chalet.id}`}>{chalet.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span data-testid={`text-bathrooms-${chalet.id}`}>{chalet.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="h-4 w-4 text-muted-foreground" />
                        <span data-testid={`text-sqft-${chalet.id}`}>{chalet.sqft} sqft</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {chalet.hasFireplace && (
                        <Badge variant="secondary" className="text-xs" data-testid={`badge-fireplace-${chalet.id}`}>
                          <Flame className="h-3 w-3 mr-1" />
                          Fireplace
                        </Badge>
                      )}
                      {chalet.hasHotTub && (
                        <Badge variant="secondary" className="text-xs" data-testid={`badge-hottub-${chalet.id}`}>
                          <Waves className="h-3 w-3 mr-1" />
                          Hot Tub
                        </Badge>
                      )}
                      {chalet.hasSkiAccess && (
                        <Badge variant="secondary" className="text-xs" data-testid={`badge-ski-${chalet.id}`}>
                          <Mountain className="h-3 w-3 mr-1" />
                          Ski Access
                        </Badge>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <HomeIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-heading text-2xl font-semibold mb-2">No chalets found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Try adjusting your filters or search in a different location to find your perfect mountain escape.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
