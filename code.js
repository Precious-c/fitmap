import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

const gyms = JSON.parse(fs.readFileSync("cleaned_data.json", "utf-8"));

const VITE_SUPABASE_URL = "https://ooorqkblvnspwbrmdqsy.supabase.co";
const VITE_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vb3Jxa2Jsdm5zcHdicm1kcXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5ODk4NTgsImV4cCI6MjA3MjU2NTg1OH0.F98qINfcfGOJANOuZUuNHh-3-MZ4HpM9JNs1ScgM0is";
// Initialize client
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY);
// generate id
function generateUUID() {
  // Generates a RFC4122 version 4 compliant UUID
  // https://stackoverflow.com/a/2117523/2715716
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// Generate logical pricing object
function generatePricing() {
  // Daily: 5000 - 15000
  const daily = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;

  // Weekly: 5x to 7x daily, but within 25000 - 50000
  let minWeekly = Math.max(25000, daily * 5);
  let maxWeekly = Math.min(50000, daily * 7);
  if (minWeekly > maxWeekly) {
    minWeekly = maxWeekly = Math.max(25000, daily * 5);
  }
  const weekly =
    Math.floor(Math.random() * (maxWeekly - minWeekly + 1)) + minWeekly;

  // Monthly: 2x to 4x weekly, but within 60000 - 150000
  let minMonthly = Math.max(60000, weekly * 2);
  let maxMonthly = Math.min(150000, weekly * 4);
  if (minMonthly > maxMonthly) {
    minMonthly = maxMonthly = Math.max(60000, weekly * 2);
  }
  const monthly =
    Math.floor(Math.random() * (maxMonthly - minMonthly + 1)) + minMonthly;

  // Yearly: 10x monthly (with a discount, e.g., pay for 10 months out of 12)
  const yearly = monthly * 10;

  return {
    daily,
    weekly,
    monthly,
    yearly,
  };
}

// format data for insertion
const formattedGyms = gyms.map((gym) => {
  return {
    id: generateUUID(),
    gym_name: gym.name,
    description: gym.description,
    address: gym.address,
    location: {
      address: gym.address,
      city: gym.city,
      state: gym.state,
      postal_code: gym.postal_code,
      geo_lat: gym.geo_lat,
      geo_lng: gym.geo_lng,
    },
    phone: gym.contact_phone,
    email: gym.email,
    pricing: generatePricing(),
    website: gym.website || null,
    opening_hours: {
      "Mon - Fri":
        gym.opening_hours
          ?.split("|")
          .map((part) => part.trim())
          .find((part) => part.startsWith("Mon - Fri:"))
          ?.split(":")[1]
          ?.trim() || "7:00 AM - 10:00 PM",
      Sat:
        gym.opening_hours
          ?.split("|")
          .map((part) => part.trim())
          .find((part) => part.startsWith("Sat:"))
          ?.split(":")[1]
          ?.trim() || "7:00 AM - 8:00 PM",
    },
    rating: 1,
    amenities: gym.amenities
      ? gym.amenities.split(";").map((amenity) => amenity.trim())
      : [],
  };
});

// console.log(formattedGyms);
// console.log(gyms[0]);

// Insert into "gyms" table
async function insertGyms() {
  const { data, error } = await supabase
    .from("gym_profiles")
    .insert(formattedGyms);

  if (error) {
    console.error("Error inserting gyms:", error);
  } else {
    console.log("Inserted gyms:", data);
  }
}

insertGyms();
// console.log(generateUUID());

// console.log(data);
