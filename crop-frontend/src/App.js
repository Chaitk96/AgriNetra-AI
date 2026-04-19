import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function Splash() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 text-white text-center overflow-hidden">

      <h1 className="text-4xl font-bold mb-4 animate-pulse">
        🌾 The BEST Agri-Tech 
      </h1>

      <p className="text-lg mb-8"><i>Smart Farming Assistant for Developing INDIA</i></p>

      {/* Emoji animation row */}
      <div className="flex gap-6 text-5xl animate-bounce">

        <span className="animate-float">🚜</span>
        <span className="animate-float">🌱</span>
        <span className="animate-float delay-200">☁️</span>
        <span className="animate-float delay-300">🌾</span>

      </div>

      <p className="mt-8 text-sm opacity-80">
        Loading smart farming tools...
      </p>

    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Splash />;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
