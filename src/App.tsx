import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import MyEvents from "./pages/MyEvents";
import Events from "./pages/Events";
import ViewEvent from "./pages/ViewEvent";
import ManageEvent from "./pages/ManageEvent";

// React Toastify import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateEvent from "./pages/CreateEvent";
import MentorshipProgram from "./pages/MentorshipForm";
import MentorshipForm from "./pages/MentorshipForm";
import MentorshipPage from "./pages/MentorshipPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        {/* Toast containers */}
        <Toaster />
        <Sonner />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/event/:eventId" element={<ViewEvent />} />
              <Route path="/event/manage/:eventId" element={<ManageEvent />} />
              <Route path="/create/event" element={<CreateEvent />} />
              <Route path="/mentorship-page" element={<MentorshipPage />} />
              <Route path="/mentorship-form" element={<MentorshipForm />} />
              {/* <Route path="/my-events" element={<MyEvents />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
