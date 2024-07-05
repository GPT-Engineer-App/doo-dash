import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Change layout to sidebar
import Index from "./pages/Index.jsx";
import { Inbox, Calendar, CalendarCheck } from "lucide-react"; // Import icons
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Inbox",
    to: "/inbox",
    icon: <Inbox className="h-4 w-4" />,
  },
  {
    title: "Today",
    to: "/today",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Upcoming",
    to: "/upcoming",
    icon: <CalendarCheck className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              {/* Add more routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;