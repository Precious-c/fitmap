import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "@/assets/images/logo.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      toast.error("Invalid or missing reset token.");
      navigate("/forgotten-password", { replace: true });
    }
  }, [accessToken, navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        toast.error(updateError.message);
      } else {
        toast.success(
          "Password updated successfully! Please sign in with your new password."
        );
        navigate("/signin");
      }
    } catch (err: any) {
      setError(
        err.message || "An unexpected error occurred during password reset."
      );
      toast.error(
        err.message || "An unexpected error occurred during password reset."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" max-w-sm mx-auto  lg:mx-auto min-h-screen bg-white text-black flex flex-col justify-center items-center py-1 px-4 sm:px-0">
      <div className="flex flex-col items-center justify-center gap-0 mb-6">
        <img src={logo} alt="fitmap-logo" className="w-36 h-36" />
        <p className="font-poppins text-3xl font-semibold mb-2">Fit Map</p>
        <h3 className="text-2xl font-medium">Set New Password</h3>
      </div>

      <form
        onSubmit={handleResetPassword}
        className="relative mx-auto w-full flex flex-col items-center gap-6"
      >
        <div className="w-full">
          <label htmlFor="password" className="flex text-lg mb-2 font-medium">
            New Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full h-12 rounded-[20px] border border-gray-300 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="flex text-lg mb-2 font-medium"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full h-12 rounded-[20px] border border-gray-300 px-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-[220px] h-[50px] p-[10px] text-xl font-medium bg-accent rounded-2xl my-4 mt-8 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
