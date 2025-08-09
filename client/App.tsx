import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <div className="dark">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </div>
);

// Create root only once
const container = document.getElementById("root")!;
let root: ReturnType<typeof createRoot>;

// Check if we're in development and root might already exist
if (import.meta.hot) {
  // In development, store root on the window object to persist across HMR
  if (!(window as any).__reactRoot) {
    (window as any).__reactRoot = createRoot(container);
  }
  root = (window as any).__reactRoot;
} else {
  // In production, create root normally
  root = createRoot(container);
}

root.render(<App />);
