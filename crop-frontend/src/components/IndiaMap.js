import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const cropPatterns = {
  Punjab: "Wheat & Rice",
  Maharashtra: "Cotton & Sugarcane",
  Gujarat: "Cotton & Groundnut",
  UttarPradesh: "Wheat & Sugarcane",
  Karnataka: "Maize & Rice"
};

function IndiaMap({ onClose }) {
  const fakeGeo = {
    type: "FeatureCollection",
    features: Object.keys(cropPatterns).map((state, i) => ({
      type: "Feature",
      properties: { name: state },
      geometry: {
        type: "Point",
        coordinates: [77 + i, 20 + i] // placeholder points
      }
    }))
  };

  const onEach = (feature, layer) => {
    const name = feature.properties.name;
    layer.bindPopup(
      `<b>${name}</b><br/>Main Crops: ${cropPatterns[name]}`
    );
  };

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 h-5/6 rounded-xl shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white px-4 py-1 rounded"
        >
          Close
        </button>

        <MapContainer
          center={[22, 80]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={fakeGeo} onEachFeature={onEach} />
        </MapContainer>

        <div className="absolute bottom-0 left-0 w-full bg-white p-3 text-center text-sm">
          🌾 Trend: Rice & Wheat dominate north India, Cotton in west, Maize in south.
        </div>

      </div>
    </div>
  );
}

export default IndiaMap;
