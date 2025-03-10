
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import RabbitHole from "./pages/RabbitHole";
import NotFound from "./pages/NotFound";
import RabbitEarsButton from "./components/RabbitEarsButton";

const queryClient = new QueryClient();

// Create a wrapper component to handle conditional rendering of RabbitEarsButton
const AppRoutes = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === "/";
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/rabbit-hole" element={<RabbitHole />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isIndexPage && <RabbitEarsButton />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
