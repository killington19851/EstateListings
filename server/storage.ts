import { users, type User, type InsertUser, type Chalet, type InsertChalet } from "../shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getChalets(): Promise<Chalet[]>;
  getChalet(id: number): Promise<Chalet | undefined>;
  createChalet(chalet: InsertChalet): Promise<Chalet>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chalets: Map<number, Chalet>;
  private currentUserId: number;
  private currentChaletId: number;

  constructor() {
    this.users = new Map();
    this.chalets = new Map();
    this.currentUserId = 1;
    this.currentChaletId = 1;

    // Seed initial chalets
    const demoChalets: InsertChalet[] = [
      {
        title: "Alpine Luxury Lodge",
        location: "Zermatt, Switzerland",
        description: "Experience the epitome of luxury in this stunning chalet with panoramic Matterhorn views. Features floor-to-ceiling windows, a private spa, and direct ski-in/ski-out access.",
        price: 1200,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3500,
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80",
        ],
        amenities: ["WiFi", "Spa", "Ski-in/Ski-out", "Fireplace", "Chef Service"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 10,
      },
      {
        title: "Cozy Mountain Retreat",
        location: "Aspen, Colorado",
        description: "A charming rustic chalet nestled in the heart of the Rockies. Perfect for family getaways with a warm fireplace and easy access to hiking trails.",
        price: 850,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2100,
        images: [
          "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80",
        ],
        amenities: ["WiFi", "Fireplace", "Hot Tub", "Parking"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: false,
        hasMountainView: true,
        maxGuests: 6,
      },
      {
        title: "Vista Peak Chalet",
        location: "Whistler, Canada",
        description: "Modern design meets alpine tradition. This chalet offers spectacular views, a gourmet kitchen, and a private outdoor hot tub.",
        price: 950,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
        ],
        amenities: ["WiFi", "Hot Tub", "Gourmet Kitchen", "Mountain View"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 8,
      },
      {
        title: "Lakeside Haven",
        location: "Lake Tahoe, USA",
        description: "Peaceful lakeside chalet with private dock and stunning water views. Ideal for summer and winter retreats.",
        price: 1100,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3000,
        images: [
          "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1593696140826-c58b5e6368d6?auto=format&fit=crop&q=80",
        ],
        amenities: ["WiFi", "Lake Access", "Fireplace", "Boat Dock"],
        hasFireplace: true,
        hasHotTub: false,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 10,
      },
      {
        title: "Skyline Chalet",
        location: "Chamonix, France",
        description: "High-altitude chalet offering breathtaking views of Mont Blanc. Modern amenities combined with traditional charm.",
        price: 1500,
        bedrooms: 6,
        bathrooms: 5,
        sqft: 4000,
        images: [
          "https://images.unsplash.com/photo-1464288550599-deb4d543fc11?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1502005229766-3c8ef95a5d78?auto=format&fit=crop&q=80",
        ],
        amenities: ["WiFi", "Sauna", "Ski Room", "Concierge"],
        hasFireplace: true,
        hasHotTub: true,
        hasSkiAccess: true,
        hasMountainView: true,
        maxGuests: 12,
      },
      {
        title: "Nordic Escape",
        location: "Rovaniemi, Finland",
        description: "Glass-roofed chalet perfect for viewing the Northern Lights. Provides a unique Arctic experience with luxury comfort.",
        price: 1300,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1500,
        images: [
          "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1515224526905-51c7d77c7bb8?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80",
        ],
        amenities: ["WiFi", "Glass Roof", "Sauna", "Fireplace"],
        hasFireplace: true,
        hasHotTub: false,
        hasSkiAccess: false,
        hasMountainView: false,
        maxGuests: 4,
      },
    ];

    demoChalets.forEach((chalet) => {
      const id = this.currentChaletId++;
      this.chalets.set(id, { ...chalet, id: id.toString() });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id: id.toString() };
    this.users.set(id, user);
    return user;
  }

  async getChalets(): Promise<Chalet[]> {
    return Array.from(this.chalets.values());
  }

  async getChalet(id: number): Promise<Chalet | undefined> {
    return this.chalets.get(id);
  }

  async createChalet(insertChalet: InsertChalet): Promise<Chalet> {
    const id = this.currentChaletId++;
    const chalet: Chalet = { ...insertChalet, id: id.toString() };
    this.chalets.set(id, chalet);
    return chalet;
  }
}

export const storage = new MemStorage();
