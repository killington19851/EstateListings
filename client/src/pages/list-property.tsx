mport { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

export default function ListProperty() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
          title: "",
          description: "",
          price: "",
          location: "",
          bedrooms: "",
          bathrooms: "",
          sqft: "",
          maxGuests: "",
          imageUrl: "",
          hasFireplace: false,
          hasHotTub: false,
          hasSkiAccess: false,
          hasMountainView: false,
    });

    const mutation = useMutation({
          mutationFn: async (data: typeof formData) => {
                  const payload = {
                            ...data,
                            price: Number(data.price),
                            bedrooms: Number(data.bedrooms),
                            bathrooms: Number(data.bathrooms),
                            sqft: Number(data.sqft),
                            maxGuests: Number(data.maxGuests),
                            images: [data.imageUrl],
                            amenities: [],
                  };
                  // remove temporary imageUrl field
                  delete (payload as any).imageUrl;

                  const res = await apiRequest("POST", "/api/listings", payload);
                  return res.json();
          },
          onSuccess: () => {
                  toast({
                            title: "Success",
                            description: "Chalet listed successfully",
                  });
                  setLocation("/");
          },
          onError: (error) => {
                  toast({
                            title: "Error",
                            description: error.message || "Failed to list chalet",
                            variant: "destructive",
                  });
          },
    });

    const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          mutation.mutate(formData);
    };

    const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
              const { name, value } = e.target;
              setFormData((prev) => ({ ...prev, [name]: value }));
        };

    const handleSwitchChange = (name: string) => (checked: boolean) => {
          setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    return (
          <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                                  <CardTitle>List Your Chalet</CardTitle>CardTitle>
                                  <CardDescription>
                                              Share your property with travelers seeking a mountain getaway
                                  </CardDescription>CardDescription>
                        </CardHeader>CardHeader>
                        <CardContent>
                                  <form onSubmit={handleSubmit} className="space-y-6">
                                              <div className="space-y-2">
                                                            <Label htmlFor="title">Property Title</Label>Label>
                                                            <Input
                                                                              id="title"
                                                                              name="title"
                                                                              required
                                                                              value={formData.title}
                                                                              onChange={handleChange}
                                                                              placeholder="e.g. Cozy Mountain Cabin"
                                                                            />
                                              </div>div>
                                  
                                              <div className="space-y-2">
                                                            <Label htmlFor="location">Location</Label>Label>
                                                            <Input
                                                                              id="location"
                                                                              name="location"
                                                                              required
                                                                              value={formData.location}
                                                                              onChange={handleChange}
                                                                              placeholder="e.g. Aspen, CO"
                                                                            />
                                              </div>div>
                                              
                                              <div className="space-y-2">
                                                            <Label htmlFor="imageUrl">Image URL</Label>Label>
                                                            <Input
                                                                              id="imageUrl"
                                                                              name="imageUrl"
                                                                              required
                                                                              value={formData.imageUrl}
                                                                              onChange={handleChange}
                                                                              placeholder="https://images.unsplash.com/..."
                                                                            />
                                              </div>div>
                                  
                                              <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="price">Price per Night ($)</Label>Label>
                                                                            <Input
                                                                                                id="price"
                                                                                                name="price"
                                                                                                type="number"
                                                                                                required
                                                                                                min="1"
                                                                                                value={formData.price}
                                                                                                onChange={handleChange}
                                                                                              />
                                                            </div>div>
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="maxGuests">Max Guests</Label>Label>
                                                                            <Input
                                                                                                id="maxGuests"
                                                                                                name="maxGuests"
                                                                                                type="number"
                                                                                                required
                                                                                                min="1"
                                                                                                value={formData.maxGuests}
                                                                                                onChange={handleChange}
                                                                                              />
                                                            </div>div>
                                              </div>div>
                                  
                                              <div className="grid grid-cols-3 gap-4">
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="bedrooms">Bedrooms</Label>Label>
                                                                            <Input
                                                                                                id="bedrooms"
                                                                                                name="bedrooms"
                                                                                                type="number"
                                                                                                required
                                                                                                min="1"
                                                                                                value={formData.bedrooms}
                                                                                                onChange={handleChange}
                                                                                              />
                                                            </div>div>
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="bathrooms">Bathrooms</Label>Label>
                                                                            <Input
                                                                                                id="bathrooms"
                                                                                                name="bathrooms"
                                                                                                type="number"
                                                                                                required
                                                                                                min="1"
                                                                                                value={formData.bathrooms}
                                                                                                onChange={handleChange}
                                                                                              />
                                                            </div>div>
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="sqft">Square Feet</Label>Label>
                                                                            <Input
                                                                                                id="sqft"
                                                                                                name="sqft"
                                                                                                type="number"
                                                                                                required
                                                                                                min="1"
                                                                                                value={formData.sqft}
                                                                                                onChange={handleChange}
                                                                                              />
                                                            </div>div>
                                              </div>div>
                                  
                                              <div className="space-y-2">
                                                            <Label htmlFor="description">Description</Label>Label>
                                                            <Textarea
                                                                              id="description"
                                                                              name="description"
                                                                              required
                                                                              value={formData.description}
                                                                              onChange={handleChange}
                                                                              className="min-h-[100px]"
                                                                            />
                                              </div>div>
                                  
                                              <div className="grid grid-cols-2 gap-4">
                                                            <div className="flex items-center justify-between space-x-2">
                                                                            <Label htmlFor="hasFireplace">Fireplace</Label>Label>
                                                                            <Switch
                                                                                                id="hasFireplace"
                                                                                                checked={formData.hasFireplace}
                                                                                                onCheckedChange={handleSwitchChange("hasFireplace")}
                                                                                              />
                                                            </div>div>
                                                            <div className="flex items-center justify-between space-x-2">
                                                                            <Label htmlFor="hasHotTub">Hot Tub</Label>Label>
                                                                            <Switch
                                                                                                id="hasHotTub"
                                                                                                checked={formData.hasHotTub}
                                                                                                onCheckedChange={handleSwitchChange("hasHotTub")}
                                                                                              />
                                                            </div>div>
                                                            <div className="flex items-center justify-between space-x-2">
                                                                            <Label htmlFor="hasSkiAccess">Ski Access</Label>Label>
                                                                            <Switch
                                                                                                id="hasSkiAccess"
                                                                                                checked={formData.hasSkiAccess}
                                                                                                onCheckedChange={handleSwitchChange("hasSkiAccess")}
                                                                                              />
                                                            </div>div>
                                                            <div className="flex items-center justify-between space-x-2">
                                                                            <Label htmlFor="hasMountainView">Mountain View</Label>Label>
                                                                            <Switch
                                                                                                id="hasMountainView"
                                                                                                checked={formData.hasMountainView}
                                                                                                onCheckedChange={handleSwitchChange("hasMountainView")}
                                                                                              />
                                                            </div>div>
                                              </div>div>
                                  
                                              <Button
                                                              type="submit"
                                                              className="w-full"
                                                              disabled={mutation.isPending}
                                                            >
                                                {mutation.isPending ? (
                                                                              <>
                                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                                Creating Listing...
                                                                              </>>
                                                                            ) : (
                                                                              "List Chalet"
                                                                            )}
                                              </Button>Button>
                                  </form>form>
                        </CardContent>CardContent>
                </Card>Card>
          </div>div>
        );
} 
$)</Label>
                    <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
  </div>
                    <div className="space-y-2">
                                      <Label htmlFor="sqft">Square Feet</Label>Label>
                                      <Input id="sqft" name="sqft" type="number" value={formData.sqft} onChange={handleChange} required />
                    </div>div>
  </div>
  
                <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                                  <Label htmlFor="bedrooms">Bedrooms</Label>Label>
                                                  <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} required />
                                </div>div>
                                <div className="space-y-2">
                                                  <Label htmlFor="bathrooms">Bathrooms</Label>Label>
                                                  <Input id="bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} required />
                                </div>div>
                  <div className="space-y-2">
                                    <Label htmlFor="maxGuests">Max Guests</Label>Label>
                                    <Input id="maxGuests" name="maxGuests" type="number" value={formData.maxGuests} onChange={handleChange} required />
                  </div>div>
  </div>
  
                <div className="space-y-2">
                                <Label htmlFor="imageUrl">Image URL</Label>Label>
                                <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/chalet.jpg" required />
                </div>div>
  
                <div className="space-y-2">
                                <Label htmlFor="amenities">Amenities (comma separated)</Label>Label>
                                <Input id="amenities" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="WiFi, Parking, Pool" />
                </div>div>
  
                <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                                  <Checkbox id="hasFireplace" checked={formData.hasFireplace} onCheckedChange={handleCheckboxChange("hasFireplace")} />
                                                  <Label htmlFor="hasFireplace">Has Fireplace</Label>Label>
                                </div>div>
                                <div className="flex items-center space-x-2">
                                                  <Checkbox id="hasHotTub" checked={formData.hasHotTub} onCheckedChange={handleCheckboxChange("hasHotTub")} />
                                                  <Label htmlFor="hasHotTub">Has Hot Tub</Label>Label>
                                </div>div>
                                <div className="flex items-center space-x-2">
                                                  <Checkbox id="hasSkiAccess" checked={formData.hasSkiAccess} onCheckedChange={handleCheckboxChange("hasSkiAccess")} />
                                                  <Label htmlFor="hasSkiAccess">Ski-in/Ski-out</Label>Label>
                                </div>div>
                                <div className="flex items-center space-x-2">
                                                  <Checkbox id="hasMountainView" checked={formData.hasMountainView} onCheckedChange={handleCheckboxChange("hasMountainView")} />
                                                  <Label htmlFor="hasMountainView">Mountain View</Label>Label>
                                </div>div>
                </div>div>
  
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Listing Property..." : "List Property"}
                </Button>Button>
  </form>
  </CardContent>
    </Card>
  </div>
  </div>
    );
}
EOF
  cat << 'EOF' > client/src/pages/list-property.tsx
    import React, { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function ListProperty() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const [formData, setFormData] = useState({
          title: "",
          description: "",
          location: "",
          price: "",
          bedrooms: "",
          bathrooms: "",
          sqft: "",
              maxGuests: "",
          imageUrl: "",
          amenities: "",
          hasFireplace: false,
          hasHotTub: false,
          hasSkiAccess: false,
          hasMountainView: false,
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleCheckboxChange = (name: string) => (checked: boolean) => {
          setFormData((prev) => ({ ...prev, [name]: checked }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsSubmitting(true);
      
          try {
                  const submitData = {
                            title: formData.title,
                            description: formData.description,
                            location: formData.location,
                            price: parseFloat(formData.price),
                            bedrooms: parseInt(formData.bedrooms),
                            bathrooms: parseInt(formData.bathrooms),
                            sqft: parseInt(formData.sqft),
                            maxGuests: parseInt(formData.maxGuests),
                            images: formData.imageUrl ? [formData.imageUrl] : [],
                            amenities: formData.amenities.split(",").map((s) => s.trim()).filter(Boolean),
                            hasFireplace: formData.hasFireplace,
                            hasHotTub: formData.hasHotTub,
                            hasSkiAccess: formData.hasSkiAccess,
                            hasMountainView: formData.hasMountainView,
                  };
            
                  const res = await fetch("/api/chalets", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(submitData),
                  });
            
                  if (!res.ok) {
                            const errorText = await res.text();
                            throw new Error(errorText || "Failed to list property");
                  }
            
                  toast({
                            title: "Success!",
                            description: "Your chalet has been listed successfully.",
                  });
                  setLocation("/");
          } catch (error) {
                  console.error("Listing error:", error);
                  toast({
                            title: "Error",
                            description: error instanceof Error ? error.message : "Failed to list property",
                            variant: "destructive",
                  });
          } finally {
                  setIsSubmitting(false);
          }
    };
  
    return (
          <div className="min-h-screen bg-background p-6">
                <div className="max-w-2xl mx-auto">
                        <Card>
                                  <CardHeader>
                                              <CardTitle>List Your Chalet</CardTitle>CardTitle>
                                  </CardHeader>CardHeader>
                                  <CardContent>
                                              <form onSubmit={handleSubmit} className="space-y-4">
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="title">Property Title</Label>Label>
                                                                            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                                                            </div>div>
                                                            
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="location">Location</Label>Label>
                                                                            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                                                            </div>div>
                                              
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="description">Description</Label>Label>
                                                                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                                                            </div>div>
                                              
                                                            <div className="grid grid-cols-2 gap-4">
                                                                            <div className="space-y-2">
                                                                                              <Label htmlFor="price">Price per Night ($)</Label>Label>
                                                                                              <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                                                                            </div>div>
                                                                            <div className="space-y-2">
                                                                                              <Label htmlFor="sqft">Square Feet</Label>Label>
                                                                                              <Input id="sqft" name="sqft" type="number" value={formData.sqft} onChange={handleChange} required />
                                                                            </div>div>
                                                            </div>div>
                                              
                                                            <div className="grid grid-cols-3 gap-4">
                                                                            <div className="space-y-2">
                                                                                              <Label htmlFor="bedrooms">Bedrooms</Label>Label>
                                                                                              <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} required />
                                                                            </div>div>
                                                                            <div className="space-y-2">
                                                                                              <Label htmlFor="bathrooms">Bathrooms</Label>Label>
                                                                                              <Input id="bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} required />
                                                                            </div>div>
                                                                            <div className="space-y-2">
                                                                                              <Label htmlFor="maxGuests">Max Guests</Label>Label>
                                                                                              <Input id="maxGuests" name="maxGuests" type="number" value={formData.maxGuests} onChange={handleChange} required />
                                                                            </div>div>
                                                            </div>div>
                                              
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="imageUrl">Image URL</Label>Label>
                                                                            <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/chalet.jpg" required />
                                                            </div>div>
                                              
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="amenities">Amenities (comma separated)</Label>Label>
                                                                            <Input id="amenities" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="WiFi, Parking, Pool" />
                                                            </div>div>
                                              
                                                            <div className="grid grid-cols-2 gap-4">
                                                                            <div className="flex items-center space-x-2">
                                                                                              <Checkbox id="hasFireplace" checked={formData.hasFireplace} onCheckedChange={handleCheckboxChange("hasFireplace")} />
                                                                                              <Label htmlFor="hasFireplace">Has Fireplace</Label>Label>
                                                                            </div>div>
                                                                            <div className="flex items-center space-x-2">
                                                                                              <Checkbox id="hasHotTub" checked={formData.hasHotTub} onCheckedChange={handleCheckboxChange("hasHotTub")} />
                                                                                              <Label htmlFor="hasHotTub">Has Hot Tub</Label>Label>
                                                                            </div>div>
                                                                            <div className="flex items-center space-x-2">
                                                                                              <Checkbox id="hasSkiAccess" checked={formData.hasSkiAccess} onCheckedChange={handleCheckboxChange("hasSkiAccess")} />
                                                                                              <Label htmlFor="hasSkiAccess">Ski-in/Ski-out</Label>Label>
                                                                            </div>div>
                                                                            <div className="flex items-center space-x-2">
                                                                                              <Checkbox id="hasMountainView" checked={formData.hasMountainView} onCheckedChange={handleCheckboxChange("hasMountainView")} />
                                                                                              <Label htmlFor="hasMountainView">Mountain View</Label>Label>
                                                                            </div>div>
                                                            </div>div>
                                              
                                                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                                              {isSubmitting ? "Listing Property..." : "List Property"}
                                                            </Button>Button>
                                              </form>form>
                                  </CardContent>CardContent>
                        </Card>Card>
                </div>div>
          </div>div>
        );
}
EOF
  </></div>
    )
    }
        }
    )
    }
                  })
          }
                  })
          }
                  }
          }
    })
    })
}
}