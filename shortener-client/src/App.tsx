import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Auth from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";

import RedirectHandler from "./pages/RedirectHandler";
import UserUrls from "./components/UserUrls";
import LandingPage from "./pages/Landing";
import { GuestPage } from "./pages/Guest";

export default function App() {



  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/go/:shortUrl" element={<RedirectHandler />} />
        <Route path="/urls" element={<ProtectedRoute><UserUrls /></ProtectedRoute>} />
        <Route path="/guest" element={<GuestPage />} />


      </Routes>
    </Router>
  );
}
