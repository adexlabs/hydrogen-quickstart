import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  if (status === Status.LOADING) return <p>Loading...</p>;
  if (status === Status.FAILURE) return <p>Failed to load</p>;
  return null;
};

const MapComponent = ({ center, zoom }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
        disableDefaultUI: true, // Hides default UI controls
      });
    }
  }, [center, zoom]);

  return <div ref={ref} style={{ width: "100%", height: "400px" }} />;
};

const GoogleMap = () => {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API Key
  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent center={{ lat: 37.7749, lng: -122.4194 }} zoom={8} />
    </Wrapper>
  );
};

export default GoogleMap;
