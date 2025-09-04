import logo from "@/assets/images/logo.png";
import appleLogo from "@/assets/images/apple-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>("");

  const { signUp, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (!email || !password || !fullName) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long");
      return;
    }

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      toast.error(error.message);
    } else {
      toast.success(
        "Signed up successfully! Please check your email to confirm."
      );
      navigate("/signin");
    }
  };
  return (
    <div className="min-h-screen  max-w-md bg-white text-black flex flex-col justify-center items-center pt-8">
      <div className="flex flex-col items-center justify-center gap-0 mb-4">
        <img src={logo} alt="fitmap-logo" className="w-36 h-36" />
        <p className="font-poppins text-3xl font-semibold">Fit Map</p>
        <h3 className="text-xl font-medium w-80 text-center">
          Sign up and Get the Best of Fitness
        </h3>
      </div>

      <div className="mx-auto w-full flex flex-col items-center gap-4">
        <div className="w-full">
          <label htmlFor="fullName" className=" flex text-lg mb-2 font-medium">
            Full Name
          </label>
          <input
            type="text"
            className="w-full h-12 rounded-[20px] border border-gray-300 px-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="email" className=" flex text-lg mb-2 font-medium">
            Email
          </label>
          <input
            type="text"
            className="w-full h-12 rounded-[20px] border border-gray-300 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="flex mb-2 font-medium ">
            Password
          </label>
          <input
            type="password"
            className="w-full h-12 r rounded-[20px]  border border-gray-300 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute right-4 py-2 gap-2 flex items-center justify-center">
            <input
              type="checkbox"
              name="remember"
              id=""
              className="mr-2 w-4 h-4"
            />
            <label htmlFor="remember" className="text-s">
              Remember me
            </label>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          className="w-[220px] h-[50px] p-[10px] text-xl font-medium bg-accent rounded-2xl my-4 mt-7"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>

      <div className="relative my-5 w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border"></span>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white text-[16px] font-medium  px-2 text-muted-foreground">
            Or Create account with
          </span>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <button
          type="button"
          // variant="outline"
          className=" spring-animation touch-target flex items-center justify-center gap-3 border-[1px] border-gray-800 rounded-xl p-3 w-[150px]"
          // onClick={() => handleGoogleAuth}
          data-testid="button-google"
          // disabled={isLoading}
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
          className=" spring-animation touch-target flex items-center justify-center gap-3 border-[1px] border-gray-800 rounded-xl p-3 w-[150px]"
          // onClick={() => handleGoogleAuth}
          data-testid="button-google"
          // disabled={isLoading}
        >
          <img src={appleLogo} className="w5 h-5" />
          Apple
        </button>
      </div>
      <p className="py-4">
        Already have an Account?{" "}
        <Link to={"/signin"} className="text-accent ">
          Sign in
        </Link>
      </p>
    </div>
  );
};
