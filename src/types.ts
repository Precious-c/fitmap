export type UserType = "person" | "gym";

export interface BaseProfile {
  id: string;
  user_type: UserType;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface PersonProfile extends BaseProfile {
  user_type: "person";
  person_profile: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    phone?: string;
    profile_image_url?: string;
    fitness_goals?: string[];
    experience_level?: "beginner" | "intermediate" | "advanced";
  };
}

export interface GymProfile extends BaseProfile {
  user_type: "gym";
  gym_profile: {
    gym_name: string;
    business_license?: string;
    address?: string;
    phone?: string;
    website?: string;
    description?: string;
    logo_url?: string;
    verified: boolean;
    operating_hours?: Record<string, any>;
  };
}

export type UserProfile = PersonProfile | GymProfile;

// Registration form types
export interface PersonRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  // dateOfBirth?: string;
  // fitnessGoals?: string[];
  // experienceLevel?: "beginner" | "intermediate" | "advanced";
}

export interface GymRegistrationData {
  email: string;
  password: string;
  gymName: string;
  businessLicense?: string;
  address: string;
  city?: string;
  state?: string;
  phone?: string;
  website?: string;
  description?: string;
}

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
