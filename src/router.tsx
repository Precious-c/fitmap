import { createBrowserRouter, Navigate } from "react-router-dom";
import OnboardingPage from "./pages/onboarding/Onboarding";
import { Signin } from "./pages/SignIn";
import { Signup } from "./pages/SignUp";
import { ForgottenPassword } from "./pages/ForgottenPassword";
import Home from "./pages/Home";
import Search from "./pages/Search";

const Dashboard = () => (
  <div className="flex min-h-screen items-center justify-center bg-accent">
    <h1 className="text-4xl font-bold">Dashboard</h1>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgotten-password",
    element: <ForgottenPassword />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
