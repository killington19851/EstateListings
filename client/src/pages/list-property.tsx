import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(1, "Price is required"),
    location: z.string().min(1, "Location is required"),
    imageUrl: z.string().min(1, "Image URL is required"),
    bedrooms: z.coerce.number().min(1, "Bedrooms required"),
    bathrooms: z.coerce.number().min(1, "Bathrooms required"),
    sqft: z.coerce.number().min(1, "Sqft required"),
    maxGuests: z.coerce.number().min(1, "Max guests required"),
    amenities: z.string().optional(),
    hasFireplace: z.boolean().default(false),
    hasHotTub: z.boolean().default(false),
    hasSkiAccess: z.boolean().default(false),
    hasMountainView: z.boolean().default(false),
});

export default function ListProperty() {
    const { toast } = useToast();
    const [, setLocation] = useLocation();
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
                  title: "",
                  description: "",
                  price: 0,
                  location: "",
                  imageUrl: "",
                  bedrooms: 1,
                  bathrooms: 1,
                  sqft: 100,
                  maxGuests: 1,
                  amenities: "",
                  hasFireplace: false,
                  hasHotTub: false,
                  hasSkiAccess: false,
                  hasMountainView: false,
          },
    });

    const mutation = useMutation({
          mutationFn: async (values: z.infer<typeof formSchema>) => {
                  const payload = {
                            ...values,
                            images: [values.imageUrl], // Backend expects array
                            amenities: values.amenities ? values.amenities.split(",").map(s => s.trim()) : [],
                  };
                  const res = await apiRequest("POST", "/api/chalets", payload);
                  return res.json();
          },
          onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["/api/chalets"] });
                  toast({
                            title: "Success",
                            description: "Your chalet has been listed successfully.",
                  });
                  setLocation("/");
          },
          onError: (error) => {
                  toast({
                            title: "Error",
                            description: error instanceof Error ? error.message : "Failed to list property",
                            variant: "destructive",
                  });
          },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
          mutation.mutate(values);
    }

    return (
          <div className="container mx-auto px-4 py-8 max-w-2xl">
                <h1 className="text-3xl font-bold mb-8">List Your Chalet</h1>h1>
                <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                  <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                                <FormItem>
                                                                                <FormLabel>Chalet Name</FormLabel>
                                                                                <FormControl>
                                                                                                  <Input placeholder="Alpine Haven" {...field} />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                </FormItem>
                                              )}
                                            />
                                  
                                            <FormField
                                                          control={form.control}
                                                          name="description"
                                                          render={({ field }) => (
                                                                          <FormItem>
                                                                                          <FormLabel>Description</FormLabel>
                                                                                          <FormControl>
                                                                                                            <Textarea placeholder="Beautiful chalet with mountain views..." {...field} />
                                                                                            </FormControl>
                                                                                          <FormMessage />
                                                                          </FormItem>
                                                        )}
                                                      />
                                            
                                                      <div className="grid grid-cols-2 gap-4">
                                                                  <FormField
                                                                                  control={form.control}
                                                                                  name="price"
                                                                                  render={({ field }) => (
                                                                                                    <FormItem>
                                                                                                                      <FormLabel>Price per Night ($)</FormLabel>
                                                                                                                      <FormControl>
                                                                                                                                          <Input type="number" {...field} />
                                                                                                                        </FormControl>
                                                                                                                      <FormMessage />
                                                                                                      </FormItem>
                                                                                )}
                                                                              />
                                                                              <FormField
                                                                                              control={form.control}
                                                                                              name="location"
                                                                                              render={({ field }) => (
                                                                                                                <FormItem>
                                                                                                                                  <FormLabel>Location</FormLabel>
                                                                                                                                  <FormControl>
                                                                                                                                                      <Input placeholder="Zermatt, Switzerland" {...field} />
                                                                                                                                    </FormControl>
                                                                                                                                  <FormMessage />
                                                                                                                  </FormItem>
                                                                                            )}
                                                                                          />
                                                                              </FormField>
                                                                  
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                        <FormField
                                                                                                        control={form.control}
                                                                                                        name="bedrooms"
                                                                                                        render={({ field }) => (
                                                                                                                          <FormItem>
                                                                                                                                            <FormLabel>Bedrooms</FormLabel>
                                                                                                                                            <FormControl>
                                                                                                                                                                <Input type="number" {...field} />
                                                                                                                                              </FormControl>
                                                                                                                                            <FormMessage />
                                                                                                                            </FormItem>
                                                                                                      )}
                                                                                                    />
                                                                                                    <FormField
                                                                                                                    control={form.control}
                                                                                                                    name="bathrooms"
                                                                                                                    render={({ field }) => (
                                                                                                                                      <FormItem>
                                                                                                                                                        <FormLabel>Bathrooms</FormLabel>
                                                                                                                                                        <FormControl>
                                                                                                                                                                            <Input type="number" {...field} />
                                                                                                                                                          </FormControl>
                                                                                                                                                        <FormMessage />
                                                                                                                                        </FormItem>
                                                                                                                  )}
                                                                                                                />
                                                                                                      </FormField>
                                                                                        
                                                                                                  <div className="grid grid-cols-2 gap-4">
                                                                                                              <FormField
                                                                                                                              control={form.control}
                                                                                                                              name="sqft"
                                                                                                                              render={({ field }) => (
                                                                                                                                                <FormItem>
                                                                                                                                                                  <FormLabel>Square Footage</FormLabel>
                                                                                                                                                                  <FormControl>
                                                                                                                                                                                      <Input type="number" {...field} />
                                                                                                                                                                    </FormControl>
                                                                                                                                                                  <FormMessage />
                                                                                                                                                  </FormItem>
                                                                                                                            )}
                                                                                                                          />
                                                                                                                          <FormField
                                                                                                                                          control={form.control}
                                                                                                                                          name="maxGuests"
                                                                                                                                          render={({ field }) => (
                                                                                                                                                            <FormItem>
                                                                                                                                                                              <FormLabel>Max Guests</FormLabel>
                                                                                                                                                                              <FormControl>
                                                                                                                                                                                                  <Input type="number" {...field} />
                                                                                                                                                                                </FormControl>
                                                                                                                                                                              <FormMessage />
                                                                                                                                                              </FormItem>
                                                                                                                                        )}
                                                                                                                                      />
                                                                                                                            </FormField>
                                                                                                              
                                                                                                                        <FormField
                                                                                                                                      control={form.control}
                                                                                                                                      name="amenities"
                                                                                                                                      render={({ field }) => (
                                                                                                                                                      <FormItem>
                                                                                                                                                                      <FormLabel>Amenities (comma separated)</FormLabel>
                                                                                                                                                                      <FormControl>
                                                                                                                                                                                        <Input placeholder="Wifi, Kitchen, Parking" {...field} />
                                                                                                                                                                        </FormControl>
                                                                                                                                                                      <FormMessage />
                                                                                                                                                        </FormItem>
                                                                                                                                    )}
                                                                                                                                  />
                                                                                                                        
                                                                                                                                  <FormField
                                                                                                                                                control={form.control}
                                                                                                                                                name="imageUrl"
                                                                                                                                                render={({ field }) => (
                                                                                                                                                                <FormItem>
                                                                                                                                                                                <FormLabel>Image URL</FormLabel>
                                                                                                                                                                                <FormControl>
                                                                                                                                                                                                  <Input placeholder="https://..." {...field} />
                                                                                                                                                                                  </FormControl>
                                                                                                                                                                                <FormMessage />
                                                                                                                                                                  </FormItem>
                                                                                                                                              )}
                                                                                                                                            />
                                                                                                                                  
                                                                                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                                                                                        <FormField
                                                                                                                                                                        control={form.control}
                                                                                                                                                                        name="hasFireplace"
                                                                                                                                                                        render={({ field }) => (
                                                                                                                                                                                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                                                                                                                                                                            <FormControl>
                                                                                                                                                                                                                                <Checkbox
                                                                                                                                                                                                                                                        checked={field.value}
                                                                                                                                                                                                                                                        onCheckedChange={field.onChange}
                                                                                                                                                                                                                                                      />
                                                                                                                                                                                                                              </FormControl>
                                                                                                                                                                                                            <div className="space-y-1 leading-none">
                                                                                                                                                                                                                                <FormLabel>Has Fireplace</FormLabel>
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                          </FormItem>
                                                                                                                                                                      )}
                                                                                                                                                                    />
                                                                                                                                                                    <FormField
                                                                                                                                                                                    control={form.control}
                                                                                                                                                                                    name="hasHotTub"
                                                                                                                                                                                    render={({ field }) => (
                                                                                                                                                                                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                                                                                                                                                                                        <FormControl>
                                                                                                                                                                                                                                            <Checkbox
                                                                                                                                                                                                                                                                    checked={field.value}
                                                                                                                                                                                                                                                                    onCheckedChange={field.onChange}
                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                          </FormControl>
                                                                                                                                                                                                                        <div className="space-y-1 leading-none">
                                                                                                                                                                                                                                            <FormLabel>Has Hot Tub</FormLabel>
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                      </FormItem>
                                                                                                                                                                                  )}
                                                                                                                                                                                />
                                                                                                                                                                                <FormField
                                                                                                                                                                                                control={form.control}
                                                                                                                                                                                                name="hasSkiAccess"
                                                                                                                                                                                                render={({ field }) => (
                                                                                                                                                                                                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                                                                                                                                                                                                    <FormControl>
                                                                                                                                                                                                                                                        <Checkbox
                                                                                                                                                                                                                                                                                checked={field.value}
                                                                                                                                                                                                                                                                                onCheckedChange={field.onChange}
                                                                                                                                                                                                                                                                              />
                                                                                                                                                                                                                                                      </FormControl>
                                                                                                                                                                                                                                    <div className="space-y-1 leading-none">
                                                                                                                                                                                                                                                        <FormLabel>Ski-in/Ski-out</FormLabel>
                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                  </FormItem>
                                                                                                                                                                                              )}
                                                                                                                                                                                            />
                                                                                                                                                                                            <FormField
                                                                                                                                                                                                            control={form.control}
                                                                                                                                                                                                            name="hasMountainView"
                                                                                                                                                                                                            render={({ field }) => (
                                                                                                                                                                                                                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                                                                                                                                                                                                                <FormControl>
                                                                                                                                                                                                                                                                    <Checkbox
                                                                                                                                                                                                                                                                                            checked={field.value}
                                                                                                                                                                                                                                                                                            onCheckedChange={field.onChange}
                                                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                  </FormControl>
                                                                                                                                                                                                                                                <div className="space-y-1 leading-none">
                                                                                                                                                                                                                                                                    <FormLabel>Mountain View</FormLabel>
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                              </FormItem>
                                                                                                                                                                                                          )}
                                                                                                                                                                                                        />
                                                                                                                                                                                              </FormField>
                                                                                                                                                                                
                                                                                                                                                                                          <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                                                                                                                                                                            {mutation.isPending ? "Listing Property..." : "List Property"}
                                                                                                                                                                                            </Button>
                                                                                                                                                                                  </FormField>
                                                                                                                                                                      </FormField>
                                                                                                                                                          </FormField>
                                                                                                                                              );
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
          }
    })
}
})
}