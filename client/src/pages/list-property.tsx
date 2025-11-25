import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertChaletSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { z } from "zod";

const formSchema = insertChaletSchema.extend({
  price: z.coerce.number().min(1, "Price is required"),
  bedrooms: z.coerce.number().min(1, "Bedrooms is required"),
  bathrooms: z.coerce.number().min(1, "Bathrooms is required"),
  sqft: z.coerce.number().min(1, "Square footage is required"),
  maxGuests: z.coerce.number().min(1, "Max guests is required"),
});

export default function ListProperty() {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 0,
      maxGuests: 2,
      hasFireplace: false,
      hasHotTub: false,
      hasSkiAccess: false,
      hasMountainView: false,
      images: [
        "https://images.unsplash.com/photo-1518730518541-d0843268cacf",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
        "https://images.unsplash.com/photo-1542718610-a1d656d1884c"
      ],
      amenities: ["WiFi", "Kitchen", "Parking"]
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/chalets", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Chalet listed successfully" });
      setLocation("/properties");
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">List Your Chalet</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Chalet Name" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="location" render={({ field }) => (
            <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="Location" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Description" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="maxGuests" render={({ field }) => (
              <FormItem><FormLabel>Max Guests</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField control={form.control} name="bedrooms" render={({ field }) => (
              <FormItem><FormLabel>Bedrooms</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="bathrooms" render={({ field }) => (
              <FormItem><FormLabel>Bathrooms</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="sqft" render={({ field }) => (
              <FormItem><FormLabel>Sq Ft</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="hasFireplace" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Fireplace</FormLabel></FormItem>
            )} />
            <FormField control={form.control} name="hasHotTub" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Hot Tub</FormLabel></FormItem>
            )} />
            <FormField control={form.control} name="hasSkiAccess" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Ski Access</FormLabel></FormItem>
            )} />
            <FormField control={form.control} name="hasMountainView" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Mountain View</FormLabel></FormItem>
            )} />
          </div>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>List Chalet</Button>
        </form>
      </Form>
    </div>
  );
}
