import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
