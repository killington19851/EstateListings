import { type User, type InsertUser, type Chalet, type InsertChalet } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getChalets(filters?: {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    location?: string;
    hasFireplace?: boolean;
    hasHotTub?: boolean;
    hasSkiAccess?: boolean;
    hasMountainView?: boolean;
  }): Promise<Chalet[]>;
  getChalet(id: string): Promise<Chalet | undefined>;
  createChalet(chalet: InsertChalet): Promise<Chalet>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private chalets: Map<string, Chalet>;

  constructor() {
    this.users = new Map();
    this.chalets = new Map();
    this.initializeSampleChalets();
  }

  private initializeSampleChalets() {
    const sampleChalets: InsertChalet[] = [
      {
        title: "Alpine Paradise Retreat",
        location: "Chamonix, French Alps",
        description: "Stunning luxury chalet with panoramic mountain views, modern amenities, and direct ski access. Perfect for families or groups seeking the ultimate alpine experience. Features include heated floors, a gourmet kitchen, and a private sauna.",
        price: 850,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3200,
        images: ["modern_luxury_chalet_exterior.png"],
        amenities: ["Wi-Fi", "Fireplace", "Hot Tub", "Ski Storage", "Mountain View", "Sauna", "Heated Floors", "Gourmet Kitchen"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 10,
      },
      {
        title: "Rustic Mountain Haven",
        location: "Zermatt, Switzerland",
        description: "Charming traditional chalet with authentic wooden interiors and breathtaking views of the Matterhorn. Cozy atmosphere with modern comforts, featuring a stone fireplace and exposed timber beams throughout.",
        price: 650,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2400,
        images: ["traditional_rustic_alpine_chalet.png"],
        amenities: ["Wi-Fi", "Fireplace", "Mountain View", "Balcony", "Wood Stove", "Cable TV", "Washer/Dryer"],
        hasFireplace: true,
        hasHotTub: false,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 8,
      },
      {
        title: "Contemporary Summit Lodge",
        location: "Aspen, Colorado",
        description: "Modern A-frame chalet with floor-to-ceiling windows offering spectacular mountain vistas. Features sleek contemporary design, spa-like bathrooms, and a chef's kitchen. Ski-in/ski-out access to world-class slopes.",
        price: 1200,
        bedrooms: 6,
        bathrooms: 5,
        sqft: 4500,
        images: ["contemporary_a-frame_chalet_design.png"],
        amenities: ["Wi-Fi", "Fireplace", "Hot Tub", "Ski Storage", "Mountain View", "Home Theater", "Wine Cellar", "Game Room"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 12,
      },
      {
        title: "Lakeside Alpine Escape",
        location: "Whistler, British Columbia",
        description: "Exclusive multi-level chalet with stunning lake and mountain views. Featuring wrap-around decks, outdoor hot tub, and proximity to Whistler Blackcomb. Perfect blend of luxury and nature.",
        price: 950,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3800,
        images: ["upscale_alpine_lodge_hot_tub.png"],
        amenities: ["Wi-Fi", "Hot Tub", "Mountain View", "Lake View", "BBQ Grill", "Fire Pit", "Deck", "Parking"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: false,
        hasMountainView: true,
        maxGuests: 10,
      },
      {
        title: "Summer Meadow Chalet",
        location: "Interlaken, Switzerland",
        description: "Picturesque chalet surrounded by wildflower meadows with stunning mountain backdrop. Ideal for summer retreats, hiking adventures, and peaceful relaxation. Features traditional alpine architecture with modern updates.",
        price: 450,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        images: ["summer_alpine_chalet_meadow.png"],
        amenities: ["Wi-Fi", "Mountain View", "Garden", "Hiking Trails", "Bike Storage", "Terrace", "BBQ"],
        hasFireplace: true,
        hasHotTub: false,
        hasSkiAccess: false,
        hasMountainView: true,
        maxGuests: 6,
      },
      {
        title: "Grand Ski-In Ski-Out Estate",
        location: "Val d'Isère, France",
        description: "Luxurious mountain estate offering unparalleled ski-in/ski-out access. Expansive living spaces, premium finishes, and breathtaking alpine views. Perfect for discerning guests seeking the finest mountain experience.",
        price: 1500,
        bedrooms: 7,
        bathrooms: 6,
        sqft: 5200,
        images: ["grand_ski-in_ski-out_estate.png"],
        amenities: ["Wi-Fi", "Fireplace", "Hot Tub", "Ski Storage", "Mountain View", "Cinema Room", "Gym", "Concierge", "Private Chef Available"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 14,
      },
      {
        title: "Cozy Winter Cabin",
        location: "Lake Tahoe, California",
        description: "Intimate mountain cabin perfect for romantic getaways or small families. Wood-burning fireplace, cozy interiors, and stunning winter views. Close to skiing and hiking trails.",
        price: 350,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        images: ["cozy_intimate_mountain_cabin.png"],
        amenities: ["Wi-Fi", "Fireplace", "Mountain View", "Wood Stove", "Deck", "Parking"],
        hasFireplace: true,
        hasHotTub: false,
        hasSkiAccess: false,
        hasMountainView: true,
        maxGuests: 4,
      },
      {
        title: "Ultra-Luxury Mountain Villa",
        location: "St. Moritz, Switzerland",
        description: "Extraordinary alpine villa featuring an infinity pool with mountain views, contemporary architecture, and world-class amenities. The pinnacle of luxury mountain living with every detail perfected.",
        price: 2500,
        bedrooms: 8,
        bathrooms: 7,
        sqft: 6800,
        images: ["luxury_chalet_infinity_pool.png"],
        amenities: ["Wi-Fi", "Fireplace", "Hot Tub", "Infinity Pool", "Mountain View", "Spa", "Gym", "Wine Cellar", "Home Theater", "Concierge", "Private Chef", "Helipad"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 16,
      },
    ];

    sampleChalets.forEach(chalet => {
      const id = randomUUID();
      this.chalets.set(id, { ...chalet, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getChalets(filters?: {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    location?: string;
    hasFireplace?: boolean;
    hasHotTub?: boolean;
    hasSkiAccess?: boolean;
    hasMountainView?: boolean;
  }): Promise<Chalet[]> {
    let chalets = Array.from(this.chalets.values());

    if (filters) {
      if (filters.minPrice !== undefined) {
        chalets = chalets.filter(c => c.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        chalets = chalets.filter(c => c.price <= filters.maxPrice!);
      }
      if (filters.bedrooms !== undefined) {
        chalets = chalets.filter(c => c.bedrooms >= filters.bedrooms!);
      }
      if (filters.bathrooms !== undefined) {
        chalets = chalets.filter(c => c.bathrooms >= filters.bathrooms!);
      }
      if (filters.location) {
        chalets = chalets.filter(c => 
          c.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.hasFireplace !== undefined) {
        chalets = chalets.filter(c => c.hasFireplace === filters.hasFireplace);
      }
      if (filters.hasHotTub !== undefined) {
        chalets = chalets.filter(c => c.hasHotTub === filters.hasHotTub);
      }
      if (filters.hasSkiAccess !== undefined) {
        chalets = chalets.filter(c => c.hasSkiAccess === filters.hasSkiAccess);
      }
      if (filters.hasMountainView !== undefined) {
        chalets = chalets.filter(c => c.hasMountainView === filters.hasMountainView);
      }
    }

    return chalets;
  }

  async getChalet(id: string): Promise<Chalet | undefined> {
    return this.chalets.get(id);
  }

  async createChalet(insertChalet: InsertChalet): Promise<Chalet> {
    const id = randomUUID();
    const chalet: Chalet = { ...insertChalet, id };
    this.chalets.set(id, chalet);
    return chalet;
  }
}

export const storage = new MemStorage();
