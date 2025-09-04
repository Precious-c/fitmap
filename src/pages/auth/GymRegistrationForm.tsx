import React, { useState, FormEvent } from "react";
import { UserType, GymRegistrationData } from "@/types";
import logo from "@/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import appleLogo from "@/assets/images/apple-logo.svg";
import { useRegistration } from "@/hooks/useRegistration";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface GymRegistrationFormProps {
  setUserType: (userType: UserType) => void;
}

const GymRegistrationForm: React.FC<GymRegistrationFormProps> = ({
  setUserType,
}) => {
  const [formData, setFormData] = useState<GymRegistrationData>({
    email: "",
    password: "",
    gymName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    description: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof GymRegistrationData, string>>
  >({});

  const { registerGym, loading } = useRegistration();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Partial<Record<keyof GymRegistrationData, string>> = {};
    if (!formData.gymName.trim()) {
      newErrors.gymName = "Gym Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid (10 digits expected).";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }
    if (!formData.city?.trim()) {
      newErrors.city = "City is required.";
    }
    if (!formData.state?.trim()) {
      newErrors.state = "State is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await registerGym(formData);
      toast.success("Gym account created successfully!");
      navigate("/login");
    } catch (err: any) {
      let errorMessage = "Error creating an account";
      if (err.message) {
        // Check for specific Supabase unique constraint error
        if (
          err.message.includes("duplicate key value violates unique constraint")
        ) {
          errorMessage =
            "An account with this email already exists. Please sign in or use a different email.";
        } else {
          errorMessage = err.message;
        }
      }
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin, // Redirects back to the app
        },
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Error signing in with Google.");
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: window.location.origin, // Redirects back to the app
        },
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Error signing in with Apple.");
    }
  };

  return (
    <div className="max-w-sm mx-auto lg:mx-auto min-h-screen bg-white text-black flex flex-col justify-center items-center pt-8 px-4 sm:px-0">
      <div className="relative w-full flex flex-col items-center justify-center gap-0 mb-6">
        <img src={logo} alt="fitmap-logo" className="w-36 h-36" />
        <p className="font-poppins text-3xl font-semibold">Fit Map</p>
        <h3 className="text-xl font-medium w-80 text-center">
          Register Your Gym
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label htmlFor="gymName" className="text-lg mb-1 font-medium block">
            Gym Name
          </label>
          <input
            id="gymName"
            type="text"
            placeholder="Enter gym name"
            value={formData.gymName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gymName: e.target.value }))
            }
            className="w-full p-3 border rounded-[20px]"
          />
          {errors.gymName && (
            <p className="text-red-500 text-xs mt-1">{errors.gymName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-lg mb-1 font-medium block">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full p-3 border rounded-[20px]"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="text-lg mb-1 font-medium block">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full p-3 border rounded-[20px]"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="text-lg mb-1 font-medium block">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Gym phone number"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full p-3 border rounded-[20px]"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="text-lg mb-1 font-medium block">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Street address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full p-3 border rounded-[20px]"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="text-lg mb-1 font-medium block">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
              className="w-full p-3 border rounded-[20px]"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="text-lg mb-1 font-medium block">
              State
            </label>
            <input
              id="state"
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, state: e.target.value }))
              }
              className="w-full p-3 border rounded-[20px]"
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white p-3 rounded-[20px] hover:bg-accent/85 disabled:opacity-50 transition-colors duration-200 cursor-pointer"
        >
          {loading ? "Creating Gym Account..." : "Create Gym Account"}
        </button>
      </form>

      <div className="relative my-5 w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border"></span>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white text-[16px] font-medium px-2 text-muted-foreground">
            Or Create account with
          </span>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <button
          type="button"
          className="spring-animation touch-target flex items-center justify-center gap-3 border-[1px] border-gray-800 rounded-xl p-3 w-[150px]"
          onClick={handleGoogleSignIn} // Bind Google sign-in
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          className="spring-animation touch-target flex items-center justify-center gap-3 border-[1px] border-gray-800 rounded-xl p-3 w-[150px]"
          onClick={handleAppleSignIn} // Bind Apple sign-in
        >
          <img src={appleLogo} className="w5 h-5" />
          Apple
        </button>
      </div>

      <p className="pt-4">
        Already have an Account?{" "}
        <Link to={"/signin"} className="text-accent">
          Sign in
        </Link>
      </p>
      <p
        className="pb-4 text-accent  cursor-pointer"
        onClick={() => setUserType("person")}
      >
        Register as User
      </p>
    </div>
  );
};

export default GymRegistrationForm;
