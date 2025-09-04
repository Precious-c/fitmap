import logo from "@/assets/images/logo.png";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // This will be the new path for setting the new password
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setMessage("Password reset email sent. Check your inbox!");
        toast.success("Password reset email sent. Check your inbox!");
        setEmail(""); // Clear email field after sending
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto  lg:mx-auto min-h-screen bg-red-500 text-black flex flex-col justify-center items-center px-4 sm:px-0">
      <div className="flex flex-col items-center justify-center gap-0 mb-6">
        <img src={logo} alt="fitmap-logo" className="w-36 h-36" />
        <p className="font-poppins text-3xl font-semibold mb-2">Fit Map</p>
        <h3 className="text-2xl font-medium">Forgotten Password</h3>
      </div>

      <form
        onSubmit={handleRequestReset}
        className="relative mx-auto w-full flex flex-col items-center  gap-6"
      >
        <div className="w-full">
          <label htmlFor="email" className="flex text-lg mb-2 font-medium">
            Enter your email to reset password
          </label>
          <input
            id="email"
            type="email"
            className="w-full h-12 rounded-[20px] border border-gray-300 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-[220px] h-[50px] p-[10px] text-xl font-medium bg-accent rounded-2xl my-4 mt-8 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="pt-4">
        Remembered your password?{" "}
        <Link to="/signin" className="text-accent">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default ForgottenPassword;
