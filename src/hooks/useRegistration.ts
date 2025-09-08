import { useState } from "react";
import { supabase } from "../lib/supabase";
import { GymRegistrationData, PersonRegistrationData } from "@/types";
// import { PersonRegistrationData, GymRegistrationData, UserType } from "@/types";

// interface UseRegistrationReturn {
//   registerPerson: (data: PersonRegistrationData) => Promise<void>;
//   registerGym: (data: GymRegistrationData) => Promise<void>;
//   loading: boolean;
//   error: string | null;
// }

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerPerson = async (data: PersonRegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: `${data.firstName} ${data.lastName}`.trim(),
          },
        },
      });

      if (authError) throw authError;
      //   if (!authData.user) throw new Error("User creation failed");

      // Create base profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user!.id,
        user_type: "person",
        email: data.email,
      });

      if (profileError) throw profileError;

      //Create person-specific profile
      const { error: personError } = await supabase
        .from("user_profiles")
        .insert({
          id: authData.user!.id,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
        });

      if (personError) throw personError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerGym = async (data: GymRegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;
      //   if (!authData.user) throw new Error("User creation failed");

      // Create base profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user!.id,
        user_type: "gym",
        email: data.email,
      });

      if (profileError) throw profileError;

      // Create gym-specific profile
      const { error: gymError } = await supabase.from("gym_profiles").insert({
        id: authData.user!.id,
        gym_name: data.gymName,
        business_license: data.businessLicense,
        address: data.address,
        phone: data.phone,
        website: data.website,
        description: data.description,
        verified: false,
      });

      if (gymError) throw gymError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerPerson,
    registerGym,
    loading,
    error,
  };
};
