import { createBrowserRouter, Navigate } from "react-router-dom";
import OnboardingPage from "./pages/onboarding/Onboarding";
import { Signin } from "./pages/auth/SignIn";
import { Signup } from "./pages/auth/SignUp";
import { ForgottenPassword } from "./pages/ForgottenPassword";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Registration from "./pages/auth/Registration";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = () => (
  <div className="flex min-h-screen items-center justify-center bg-accent">
    <h1 className="text-4xl font-bold">Dashboard</h1>
  </div>
);

export const router = createBrowserRouter([
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
    path: "/auth",
    element: <Registration />,
  },
  {
    path: "/forgotten-password",
    element: <ForgottenPassword />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
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
