import React, { useState, useEffect, useRef } from "react";

function Upload() {

  const weatherRef = useRef(null); // ✅ fixed
  // ✅ UPGRADE ADDED (no changes to original)
  const resultRef = useRef(null);
  const [animateBar, setAnimateBar] = useState(0);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [tipIndex, setTipIndex] = useState(0);

  const [showWeather, setShowWeather] = useState(false);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [searchCrop, setSearchCrop] = useState("");
const [selectedCrop, setSelectedCrop] = useState(null);
const [openEncyclopedia, setOpenEncyclopedia] = useState(false);
const [showResult, setShowResult] = useState(false);



  const API_KEY = "6cb092256c630dfa19d9a0ac9dc1ae61";

// ✅ CROP ENCYCLOPEDIA (added only — nothing changed)
const encyclopedia = {
  rice: "Staple tropical crop requiring high heat, humidity, and flooded fields.",
  wheat: "Major winter grain grown in cool dry climates with fertile loam soil.",
  maize: "Versatile cereal used for food, feed, and biofuel in warm climates.",
  barley: "Cold-tolerant cereal used for food, fodder, and brewing.",
  millet: "Drought-resistant grain ideal for arid and semi-arid regions.",
  sorghum: "Heat-tolerant cereal grown in dry climates.",
  oats: "Cool-season grain used as livestock feed and health food.",
  rye: "Hardy grain crop for poor soils and cold climates.",
  quinoa: "Protein-rich pseudo-cereal tolerant to harsh climates.",
  buckwheat: "Fast-growing crop suited to poor soil and cool weather.",

  sugarcane: "Tropical crop used for sugar and ethanol production.",
  cotton: "Fiber crop grown in warm climates with black soil.",
  jute: "Fiber crop grown in humid river basins.",
  tobacco: "Cash crop requiring warm climate and well-drained soil.",
  coffee: "Shade-grown plantation crop in tropical highlands.",
  tea: "Perennial crop grown in cool humid hill regions.",
  cocoa: "Tropical plantation crop used for chocolate production.",
  rubber: "Latex-producing plantation crop in humid climates.",
  coconut: "Coastal tropical tree crop with multiple uses.",
  oilpalm: "High-yield oil crop grown in humid tropical regions.",

  potato: "Cool climate tuber crop grown in fertile soil.",
  tomato: "Warm-season vegetable requiring sunlight and irrigation.",
  onion: "Bulb crop grown in well-drained loamy soil.",
  garlic: "Cool-season bulb crop with medicinal value.",
  carrot: "Root vegetable grown in loose sandy soil.",
  beetroot: "Cold-tolerant root vegetable rich in nutrients.",
  radish: "Fast-growing root crop suited to cool weather.",
  cabbage: "Leafy vegetable grown in temperate climates.",
  cauliflower: "Cool-season vegetable sensitive to heat.",
  spinach: "Leafy green crop rich in iron and vitamins.",

  lettuce: "Salad crop grown in cool climates.",
  broccoli: "Nutritious vegetable grown in temperate regions.",
  peas: "Protein-rich legume crop grown in cool seasons.",
  beans: "Warm-season legume used for protein and soil fertility.",
  chickpea: "Drought-tolerant pulse crop grown in dry winters.",
  lentil: "Cold-season pulse crop high in protein.",
  soybean: "Oilseed and protein crop grown in warm climates.",
  groundnut: "Oilseed crop requiring sandy soil and sunlight.",
  mustard: "Winter oilseed crop grown in cool climates.",
  sunflower: "Oilseed crop requiring bright sunlight.",

  mango: "Tropical fruit tree known as the king of fruits.",
  banana: "High-yield tropical fruit grown year-round.",
  apple: "Temperate fruit requiring cold winters.",
  orange: "Citrus fruit grown in subtropical climates.",
  lemon: "Acidic citrus fruit with medicinal use.",
  grapes: "Fruit vine grown in dry sunny climates.",
  guava: "Hardy tropical fruit tree with high vitamin C.",
  papaya: "Fast-growing tropical fruit tree.",
  pineapple: "Tropical fruit grown in warm humid regions.",
  watermelon: "Summer fruit requiring sandy soil and heat.",

  muskmelon: "Sweet summer fruit grown in warm climates.",
  pomegranate: "Drought-resistant fruit tree.",
  strawberry: "Cool-season fruit crop grown in hills.",
  cherry: "Temperate fruit grown in cold regions.",
  peach: "Stone fruit grown in temperate climates.",
  pear: "Cool climate fruit tree.",
  plum: "Seasonal temperate fruit crop.",
  kiwi: "High-altitude fruit crop.",
  avocado: "Nutrient-rich fruit grown in warm climates.",
  fig: "Mediterranean fruit crop.",

  cucumber: "Summer vegetable with high water content.",
  pumpkin: "Vine crop grown in warm seasons.",
  bottle_gourd: "Hydrating vegetable grown in summer.",
  bitter_gourd: "Medicinal vine vegetable.",
  ridge_gourd: "Climbing vegetable grown in warm climates.",
  brinjal: "Eggplant crop requiring warm soil.",
  chili: "Spicy vegetable grown in hot climates.",
  capsicum: "Bell pepper grown in mild climates.",
  okra: "Heat-loving vegetable crop.",
  sweetcorn: "Vegetable maize harvested early.",

  turmeric: "Medicinal spice crop grown in humid climates.",
  ginger: "Rhizome crop grown in tropical regions.",
  coriander: "Herb crop grown in cool seasons.",
  mint: "Aromatic herb grown in moist soil.",
  basil: "Medicinal herb requiring sunlight.",
  fennel: "Spice crop grown in temperate regions.",
  cumin: "Dry climate spice crop.",
  cardamom: "High-value spice grown in hills.",
  clove: "Tropical spice crop.",
  black_pepper: "Climbing spice vine.",

  alfalfa: "High-protein fodder crop.",
  clover: "Soil-enriching fodder plant.",
  sugarbeet: "Temperate sugar crop.",
  flax: "Fiber and oilseed crop.",
  hemp: "Industrial fiber crop.",
  sesame: "Oilseed crop tolerant to drought.",
  safflower: "Dry climate oilseed crop.",
  castor: "Industrial oilseed plant.",
  amaranth: "Nutrient-rich leafy crop.",
  moringa: "Medicinal tree crop."
};


  const cropTips = [
    "🌱 Rotate crops yearly to maintain soil nutrients.",
    "💧 Early morning watering prevents fungal diseases.",
    "☀️ 6+ hours sunlight improves crop immunity.",
    "🌿 Remove infected leaves immediately.",
    "🧪 Test soil once per season for best yield.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % cropTips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://api.allorigins.win/raw?url=https://rss.nytimes.com/services/xml/rss/nyt/Climate.xml")
      .then(res => res.text())
      .then(str => {
        const parser = new window.DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const items = xml.querySelectorAll("item");

        const headlines = Array.from(items)
          .slice(0, 5)
          .map(item => item.querySelector("title").textContent);

        setNews(headlines);
      })
      .catch(() => setNews(["Wait a while for latest agri news"]));
  }, []);

    // ✅ UPGRADE ADDED — smooth result animation
useEffect(() => {
  if (result) {
    setTimeout(() => {
      setAnimateBar(result.confidence);
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  }
}, [result]);

  // AI advisor
  const generateAdvisorText = (temp, humidity, condition, crops) => ({
    summary: `Current climate shows ${temp}°C temperature with ${humidity}% humidity under "${condition}" conditions.`,
    recommendation: `Best suited crops: ${crops}.`,
    risks: humidity > 65
      ? "⚠ High fungal risk"
      : temp > 32
      ? "⚠ Heat stress risk"
      : "✅ Moderate climate stress",
    checklist: [
      "Apply preventive antifungal spray",
      "Ensure soil drainage",
      "Irrigate early morning",
      "Monitor pest activity",
      "Balance fertilizer",
      "Use resistant seeds",
      "Inspect leaves daily",
      "Avoid overwatering",
      "Maintain airflow",
      "Track climate daily",
    ],
    impact: "Following this reduces crop loss and improves profitability.",
  });

  const analyzeClimate = (temp, humidity, condition) => {
    let crops = [];
    let risk = "";

    if (temp > 30 && humidity > 65) {
      crops = ["Rice", "Sugarcane", "Banana", "Papaya", "Coconut", "Turmeric"];
      risk = "⚠ Tropical fungal risk";
    } else if (temp >= 24 && temp <= 30 && humidity >= 45 && humidity <= 65) {
      crops = ["Maize", "Wheat", "Tomato", "Chili", "Mango", "Guava", "Groundnut"];
      risk = "✅ Ideal mixed farming";
    } else if (temp >= 15 && temp < 24) {
      crops = ["Wheat", "Barley", "Peas", "Potato", "Apple", "Strawberry"];
      risk = "⚠ Cold nights risk";
    } else if (temp > 32 && humidity < 40) {
      crops = ["Millet", "Sorghum", "Cotton", "Sunflower", "Dates"];
      risk = "⚠ Drought stress";
    } else {
      crops = ["Seasonal vegetables", "Pulses", "Mixed grains"];
      risk = "Stable mixed farming";
    }

    return {
      crops,
      risk,
      advisor: generateAdvisorText(temp, humidity, condition, crops.join(", ")),
    };
  };

  const fetchWeather = async () => {
    if (!location) return alert("Enter location");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].description;

      const analysis = analyzeClimate(temp, humidity, condition);

      setWeather({ temp, humidity, condition, ...analysis });
      setShowWeather(true);

      setTimeout(() => {
        weatherRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);

    } catch {
      alert("Location not found");
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) return alert("Select an image");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      setShowResult(true);
    } catch {
      alert("Almost the frontend is done, team is working on the backend please stay tunned ..!");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>

      {/* NEWS */}
      <div className="fixed top-0 left-0 w-full bg-black text-white text-sm py-2 z-50">
        <marquee>
          {news.length > 0
            ? news.map((n, i) => <span key={i} className="mr-10">📰 {n}</span>)
            : "Loading agriculture news..."}
        </marquee>
      </div>

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

      {/* RIGHT SIDE CARDS */}
      <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row gap-6">

          {/* CROP CARD */}
          <div className="bg-white/85 backdrop-blur-md shadow-2xl rounded-2xl p-6 w-80 text-center relative max-h-[520px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
  <h1 className="text-xl font-bold">🌱 Crop Disease Detection</h1>

  {showResult && (
    <button
      onClick={() => setShowResult(false)}
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
    >
      ✖
    </button>
  )}
</div>


            <input type="file" onChange={handleImageChange} className="mb-4 w-full" />

            {preview && (
              <img src={preview} alt="preview" className="w-40 mx-auto rounded-lg mb-4 transition-transform hover:scale-105" />
            )}

            <button onClick={handleUpload} className="bg-green-600 text-white px-4 py-2 rounded-lg w-full">
              {loading ? "Analyzing..." : "Predict Disease"}
              {/* ✅ AI Loading Spinner (upgrade only) */}
                {loading && (
                  <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600"></div>
                </div>
            )}
            </button>

            {result && (
              <div className="mt-6 bg-green-50 p-4 rounded-lg text-sm">
                {/* ✅ ADVANCED RESULT CARD — ADDED ONLY */}
{result && (
  <div
    ref={resultRef}
    className="mt-6 bg-gradient-to-br from-green-100 to-green-50 p-5 rounded-xl shadow-xl text-left animate-fade-in"
  >
    <h2 className="text-lg font-bold text-green-800 mb-2">
      🌿 AI Diagnosis Result
    </h2>

    <p className="font-semibold text-gray-800">
      Disease Detected: {result.crop_disease}
    </p>

    <div className="mt-3">
      <p className="text-sm mb-1">Confidence Level</p>

      <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
        <div
          className="bg-green-600 h-4 transition-all duration-1000"
          style={{ width: `${animateBar}%` }}
        />
      </div>

      <p className="text-xs mt-1">{result.confidence}% Accuracy</p>
    </div>

    <div className="mt-4 bg-white p-3 rounded-lg shadow">
      <p className="font-semibold text-green-700">
        Recommended Treatment
      </p>
      <p className="text-sm text-gray-700 mt-1">
        {result.treatment}
      </p>
    </div>
  </div>
)}
                <h2>Disease: {result.crop_disease}</h2>
                <p>Confidence: {result.confidence}%</p>
                <p>Treatment: {result.treatment}</p>
              </div>
            )}
          </div>

          {/* WEATHER CARD */}
          <div
            ref={weatherRef}
            className="bg-blue-100 shadow-xl rounded-2xl p-6 w-80 text-left overflow-y-auto max-h-[450px]"
          >

            {!showWeather ? (
              <>
                <h2 className="text-xl font-bold mb-2">🌦 Weather Prediction</h2>

                <input
                  placeholder="Enter location"
                  className="border p-2 w-full mb-3 rounded"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <button onClick={fetchWeather} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                  Analyze Climate
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-3 text-center">🌦 Weather Forecast</h2>

                <p>Temperature: {weather.temp}°C</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>{weather.risk}</p>

                <div className="bg-white p-3 rounded mt-3 space-y-2 text-sm">

                  <p>
                    <b>Recommended Crops:</b>{" "}
                    {weather.crops.map((crop, i) => (
                      <span key={i} className="font-bold text-green-700">
                        {crop}{i < weather.crops.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>

                  <p><b>Climate:</b> {weather.advisor.summary}</p>
                  <p><b>Recommendation:</b> {weather.advisor.recommendation}</p>
                  <p className="text-red-600"><b>Risk:</b> {weather.advisor.risks}</p>

                  <ul className="list-disc ml-5">
                    {weather.advisor.checklist.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>

                  <p className="text-green-700 font-semibold">
                    {weather.advisor.impact}
                  </p>

                </div>

                <button
                  onClick={() => setShowWeather(false)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                  Close
                </button>
              </>
            )}

          </div>

        </div>
      </div>
      
      {/* 📘 Crop Encyclopedia — Collapsible */}
<div className="fixed bottom-20 right-6 w-96 text-sm">

  {/* Toggle Button */}
  <button
    onClick={() => setOpenEncyclopedia(!openEncyclopedia)}
    className="w-full bg-green-700 text-white px-4 py-2 rounded-t-xl font-bold shadow-lg hover:bg-green-800 transition"
  >
    📘 Crop Encyclopedia {openEncyclopedia ? "▲" : "▼"}
  </button>

  {openEncyclopedia && (
    <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-b-2xl p-4 animate-fade-in">

      {/* Search */}
      <input
        placeholder="Search crop..."
        value={searchCrop}
        onChange={(e) => setSearchCrop(e.target.value)}
        className="border w-full p-2 rounded mb-3"
      />

      {/* Crop list */}
      <div className="max-h-[240px] overflow-y-auto border rounded p-2 space-y-2">

        {Object.entries(encyclopedia)
          .filter(([crop]) =>
            crop.toLowerCase().includes(searchCrop.toLowerCase())
          )
          .map(([crop, description]) => (

            <div
              key={crop}
              className="bg-green-50 p-2 rounded hover:bg-green-100 transition"
            >
              <b className="capitalize text-green-800">{crop}</b>
              <p className="text-gray-700 mt-1 text-xs">
                {description}
              </p>
            </div>

          ))}

      </div>

    </div>
  )}

</div>



      

  {/* TIPS */}
<div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-900 text-white px-6 py-3 rounded shadow">
  {cropTips[tipIndex]}
</div>

{/* ✅ Animation Style */}
<style>
{`
.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity:0; transform:translateY(15px); }
  to { opacity:1; transform:translateY(0); }
}
`}
</style>

</div>
);
}

export default Upload;
