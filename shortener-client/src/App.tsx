import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Auth from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";

import RedirectHandler from "./pages/RedirectHandler";
import UserUrls from "./pages/UserUrls";
import LandingPage from "./pages/Landing";
import { GuestPage } from "./pages/Guest";
import RedirectGuestHandler from "./pages/RedirectGuestHandler";

export default function App() {



  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/go/:shortUrl" element={<RedirectHandler />} />
        <Route path="/g/:shortUrl" element={<RedirectGuestHandler />} />

        <Route path="/urls" element={<ProtectedRoute><UserUrls /></ProtectedRoute>} />
        <Route path="/guest" element={<GuestPage />} />


      </Routes>
    </Router>
  );
}
