import React, { useEffect } from "react";

const MarkerComponent = ({ map, position }) => {
  useEffect(() => {
    if (!map) return;

    const marker = new window.google.maps.Marker({
      position,
      map,
    });

    return () => {
      marker.setMap(null);
    };
  }, [map, position]);

  return null;
};

export default MarkerComponent;
