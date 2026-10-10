import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AIChatbot from "../components/ai/AIChatbot";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import DestinationDetail from "../pages/DestinationDetail";
import MapPage from "../pages/MapPage";
import Planner from "../pages/Planner";
import WorldCup2030 from "../pages/WorldCup2030";
import Experiences from "../pages/Experiences";
import Passport from "../pages/Passport";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/world-cup-2030" element={<WorldCup2030 />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/passport" element={<Passport />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </BrowserRouter>
  );
}
