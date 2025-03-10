import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Auth from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";

import RedirectHandler from "./pages/RedirectHandler";
import UserUrls from "./pages/UserUrls";
import LandingPage from "./pages/Landing";
import { GuestPage } from "./pages/Guest";
import RedirectGuestHandler from "./pages/RedirectGuestHandler";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {



  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/G/:shortUrl" element={<RedirectHandler />} />
        <Route path="/gi/:shortUrl" element={<RedirectGuestHandler />} />

        <Route path="/urls" element={<ProtectedRoute><UserUrls /></ProtectedRoute>} />
        <Route path="/guest" element={<GuestPage />} />


      </Routes>
    </Router>
  );
}
