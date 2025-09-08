import logo from "@/assets/images/logo.png";
import appleLogo from "@/assets/images/apple-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const { signIn, loading } = useAuth(); // Use signIn and loading from useAuth
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
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
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Error signing in with Apple.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        let errorMessage = "Error signing in.";

        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password.";
        } else {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      } else {
        toast.success("Signed in successfully!");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(
        err.message || "An unexpected error occurred during sign in."
      );
    }
  };

  return (
    <div className="max-w-sm mx-auto  lg:mx-auto min-h-screen bg-white text-black flex flex-col justify-center items-center py-1 px-3 sm:px-1">
      <div className="flex flex-col items-center justify-center gap-0 mb-4">
        <img src={logo} alt="fitmap-logo" className="w-36 h-36" />
        <p className="font-poppins text-3xl font-semibold">Fit Map</p>
        <h3 className="text-xl font-medium">Sign into your Account</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative mx-auto w-full  flex flex-col items-center  gap-4"
      >
        <div className="w-full">
          <label htmlFor="email" className=" flex text-lg mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="w-full h-12 rounded-[20px] border border-gray-300 px-4"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="w-full relative">
          <label htmlFor="password" className="flex mb-2 font-medium ">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full h-12 r rounded-[20px]  border border-gray-300 px-4"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}

          <div className="absolute right-3 py-2 gap-2 flex items-center justify-center">
            <label htmlFor="remember" className="text-sm font-medium">
              <Link to={"/forgotten-password"}>Forgotten password?</Link>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white p-3 my-6 rounded-[20px] hover:bg-accent/85 disabled:opacity-50 transition-colors duration-200 cursor-pointer"
        >
          {loading ? "Signing In..." : "Sign in"}
        </button>
      </form>

      <div className="relative my-5 w-full ">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border"></span>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white text-[16px] font-medium  px-2 text-muted-foreground">
            Or Create account with
          </span>
        </div>
      </div>

      <div className="flex justify-between w-full ">
        <button
          type="button"
          // variant="outline"
          className=" spring-animation touch-target flex items-center justify-center gap-3 border-[1px] border-gray-800 rounded-xl p-3 w-[150px] cursor-pointer"
          onClick={() => handleGoogleSignIn}
          data-testid="button-google"
          disabled={loading}
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
          // variant="outline"
          className=" spring-animation touch-target flex items-center justify-center gap-3 border-[1px] border-gray-800 rounded-xl p-3 w-[150px] cursor-pointer"
          onClick={() => handleAppleSignIn}
          data-testid="button-google"
          disabled={loading}
        >
          <img src={appleLogo} className="w5 h-5" />
          Apple
        </button>
      </div>
      <p className="py-4">
        Don't have an Account?{" "}
        <Link to="/signup" className="text-accent ">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Signin;
