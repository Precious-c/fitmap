export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  role: "CUSTOMER" | "GYM_OWNER" | "ADMIN";
  profile: {
    preferences: {
      goals: ("strength" | "yoga" | "weight-loss" | "general fitness")[];
      amenities: ("pool" | "sauna" | "group classes" | "personal trainer")[];
      priceRange: {
        min: number;
        max: number;
      };
      hoursPreference: "morning | evening | anytime";
    };
    location: {
      address: string;
      city: string;
      state: string;
      country: string;
      geoData: {
        lat: number;
        lng: number;
      };
    };
    savedGyms: ["gymId1", "gymId2"];
    reviews: ["reviewId1", "reviewId2"];
  };
  auth: {
    provider: "email | google | apple";
    socialId: "string | null";
    lastLogin: "date";
  };
  createdAt: "date";
  updatedAt: "date";
}
export interface Gym {
  id: string;
  ownerId: string;
  name: string;
  logoUrl: string;
  description: string;
  location: {
    street: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
    geoData: {
      lat: number;
      lng: number;
    };
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  verification: {
    status: "PENDING" | "VERIFIED" | "REJECTED";
    documents: {
      gymPhotos: string[];
      cacDocs: string[];
      ninOrId: string[];
      ownerIdCard: string[];
      bankAccount: {
        bankName: string;
        accountNumber: string;
        accountName: string;
      };
    };
  };
  amenities: string[];
  //   membershipPlans: { type: string; price: number }[];
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  openingHours: {
    "Mon-Fri": string;
    Sat: string;
    Sun: string;
  };
  trainers?: [
    {
      id: string;
      name: string;
      specialty: string;
      yearsExperience: number;
      certifications: ["string"];
    }
  ];
  reviews: Review[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  gymId: string;
  userId: string;
  rating: number;
  comment: string;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: "uuid";
  userId: "uuid";
  gymId: "uuid";
  amount: "number";
  currency: "string";
  status: "enum: [PENDING, PAID, FAILED]";
  paymentMethod: "card | transfer | wallet";
  createdAt: "date";
  updatedAt: "date";
}

export interface Admin {
  id: "uuid";
  firstName: "string";
  lastName: "string";
  email: "string";
  phone: "string";
  permissions: [
    "view_users",
    "view_gyms",
    "approve_verifications",
    "view_invoices"
  ];
}
