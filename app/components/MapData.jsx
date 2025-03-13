 import { useEffect, useRef } from "react";
 export default function MapData () {

  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) return;
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 51.508742, lng: -0.12085 },
        zoom: 5,
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDBMS1tN1aVb1EPpImw7EnfBRl5PGwewJo&amp;callback=myMap`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      document.body.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};




