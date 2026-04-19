import React from "react";
import Upload from "../components/Upload";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bg.jpg"})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Logout button */}
    <button
        onClick={logout}
        className="
          fixed top-16 right-4 z-50
          bg-red-700 text-white
          px-3 py-2 rounded-lg
          shadow-lg
          transition-all duration-200
          hover:bg-red-700 hover:scale-110
          active:scale-95
          font-semibold
        "
      >
        🚪 Logout
      </button>

      {/* Content */}
      <div className="relative z-10">
        <Upload />
      </div>
    </div>
  );
}

export default Dashboard;
