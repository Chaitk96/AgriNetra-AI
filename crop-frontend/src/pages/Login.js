import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IndiaMap from "../components/IndiaMap";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  const cropData = {
    Rice: "Rice is the primary staple food crop of India, covering nearly one-fourth of the total cultivated area and feeding more than half of the country’s population. India is the world’s second-largest rice producer, contributing approximately 20% of global production, and is also a leading exporter. Rice is mainly grown as a Kharif crop and requires high temperatures (above 25°C), annual rainfall of 100–300 cm, and high humidity. Major rice-producing states include West Bengal, Uttar Pradesh, and Punjab.",
    Wheat: "Wheat is India's second most important staple food crop after rice, grown as a primary Rabi (winter) season crop on 13% of the country's cultivated land. As the world's second-largest producer, India produces over 110 million tonnes annually, with major production in Uttar Pradesh, Punjab, Haryana, and Madhya Pradesh.",
    Sugarcane: "Sugarcane is a vital commercial and industrial crop in India, which is the world's second-largest producer after Brazil and its largest consumer. It provides a direct livelihood to approximately 50 million farmers and supports the country's second-largest agro-based industry.",
    Cotton: "Cotton is India's most important commercial crop, often called White Gold, providing the primary raw material for its vast textile industry and sustaining the livelihoods of millions. India is the world's largest producer of cotton by area, accounting for nearly 40% of the global acreage, and ranks as the second-largest producer by volume. ",
    Maize: "Maize is cultivated throughout the year across all states in India. The predominant maize-growing states that contribute more than 80% of the total national production. While primarily a Kharif (monsoon) crop (sown in June-July), it is also grown in the Rabi and spring seasons in irrigated areas, with the latter two often yielding higher production due to better water management and lower pest incidence."
  };

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (user === "farmer" && pass === "1234") {
        localStorage.setItem("auth", "true");
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/bg.jpg"})` }}
    >

      {/* BRAND STATEMENT */}
      <div className="fixed top-12 left-4 z-40 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg text-xs md:text-sm">
        <p className="text-gray-200">
          Agri-Tech developed for <b>INDIA</b>
        </p>
        <p className="text-base md:text-lg font-bold">
          <span className="text-orange-400 font-bold">An</span>{" "}
          <span className="text-white font-bold">AgriNetra AI</span>{" "}
          <span className="text-green-400 font-bold">Initiative</span>
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="relative bg-white/85 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md text-center z-10">

        <h2 className="text-2xl font-bold mb-2">🚜 Farmer Portal</h2>
        <p className="text-gray-600 mb-6">Login to access crop dashboard</p>

        <input
          placeholder="Username"
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-green-500"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-green-500"
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-green-600 text-white px-4 py-3 w-full rounded-lg hover:bg-green-700 transition flex justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : "Login"}
        </button>
      </div>

      {/* TOP RIGHT CROPS */}
      <div className="hidden md:block fixed right-4 top-4 w-80 bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-5 text-sm z-10">

        <h3 className="font-bold mb-2 text-green-700">🌾 Top Crops in India</h3>

        {Object.keys(cropData).map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            className="block w-full text-left mb-2 hover:text-green-600"
          >
            {crop}
          </button>
        ))}

        <img
          src={process.env.PUBLIC_URL + "/india.png"}
          alt="India map"
          className="w-full cursor-pointer rounded mt-3 hover:scale-105 transition"
          onClick={() => setShowMap(true)}
        />

        <p className="text-xs mt-1 text-center">
          Click map to view crop patterns
        </p>
      </div>

      {/* SERVICES */}
      <div className="hidden md:block fixed right-4 bottom-4 w-80 bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-5 text-sm z-10">

        <h3 className="font-bold mb-2 text-green-700">🌱 Reach Govt Services</h3>

        <a href="https://mahadbt.maharashtra.gov.in/farmer/Agrilogin/Agrilogin" target="_blank" rel="noreferrer" className="block mb-2 hover:text-green-600">
          <strong>Agri Loan MAHADBT</strong><br/>
          Apply for government subsidies
        </a>

        <a href="https://pmkisan.gov.in/farmerstatus.aspx" target="_blank" rel="noreferrer" className="block mb-2 hover:text-green-600">
          <strong>PM KISAN Portal</strong><br/>
          Check scheme payment status
        </a>

        <a href="https://www.mkisan.gov.in/Home/FarmerRegistration" target="_blank" rel="noreferrer" className="block hover:text-green-600">
          <strong>M KISAN Portal</strong><br/>
          Register for SMS alerts
        </a>
      </div>

      {/* CROP MODEL */}
      {selectedCrop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] md:w-96 shadow-xl text-center">
            <h2 className="font-bold text-lg mb-2">{selectedCrop}</h2>
            <p className="mb-4">{cropData[selectedCrop]}</p>
            <button
              onClick={() => setSelectedCrop(null)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showMap && <IndiaMap onClose={() => setShowMap(false)} />}
    </div>
  );
}

export default Login;
