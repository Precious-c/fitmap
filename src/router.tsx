import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import React, { Suspense, useEffect } from "react";

import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy  components
const OnboardingPage = React.lazy(
  () => import("./pages/onboarding/Onboarding")
);
const Signin = React.lazy(() => import("./pages/auth/SignIn"));
// const Signup = React.lazy(() => import("./pages/auth/SignUp"));
const ForgottenPassword = React.lazy(() => import("./pages/ForgottenPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const Search = React.lazy(() => import("./pages/Search"));
const Registration = React.lazy(() => import("./pages/auth/Registration"));

// loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
    <span className="ml-4 text-xl">Loading...</span>
  </div>
);

// handle initial route redirection
const InitialRouteHandler = () => {
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedApp");
    if (!hasVisited) {
      localStorage.setItem("hasVisitedApp", "true");
      // Redirect to onboarding if it's the first visit
      window.location.replace("/onboarding");
    }
  }, []);

  // If it's not the first visit, or after redirecting, render Home
  // This component will only render Home if the redirect above hasn't happened.
  // The actual redirect will cause a full page reload, so this return statement
  // is mainly for when hasVisited is true from the start.
  return <Home />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialRouteHandler />,
  },
  {
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    ),
    children: [
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
        element: <Registration />,
      },
      {
        path: "/forgotten-password",
        element: <ForgottenPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          // {
          //   path: "/dashboard",
          //   element: <Dashboard />,
          // },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
