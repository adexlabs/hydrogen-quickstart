import { useState } from "react";

export default function StoreLocation() {
  const [GoogleMaps, setGoogleMaps] = useState(null);

  if (typeof window !== "undefined" && !GoogleMaps) {
    import("@vis.gl/react-google-maps")
      .then((module) => setGoogleMaps(module))
      .catch((err) => console.error("Google Maps failed to load:", err));
  }

  if (!GoogleMaps) return <p>Loading Google Maps...</p>;

  const { APIProvider, Map, AdvancedMarker, Pin } = GoogleMaps;
  const position = { lat: 53.54, lng: 10 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "400px", width: "100%" }}>
        <Map zoom={9} center={position} mapId={import.meta.env.VITE_MAP_ID}>
          <AdvancedMarker position={position}>
            <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"} />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
