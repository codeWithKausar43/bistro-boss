import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/router";
import AuthProvider from "./Provider/AuthProvider";

import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-screen-xl mx-auto">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}>
      
          </RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  </StrictMode>
);
