import { useEffect } from "react";

const MapData = () => {


    // Check if we're in the browser and ensure the scripts are added only once.
    if (typeof window !== 'undefined' && !window.googleMapScriptInjected) {
      window.googleMapScriptInjected = true; // flag to avoid duplicate injections
  
      // Create a script tag for the map initialization function
      const scriptFunc = document.createElement('script');
      scriptFunc.innerHTML = `
        function myMap() {
          var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
          };
          var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        }
      `;
      document.body.appendChild(scriptFunc);
  
      // Create the script tag for the Google Maps API with the callback set to myMap
      const scriptApi = document.createElement('script');
      scriptApi.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDBMS1tN1aVb1EPpImw7EnfBRl5PGwewJo&amp;callback=myMap';
      scriptApi.async = true;
      scriptApi.defer = true;
      document.body.appendChild(scriptApi);
    }
  
    // Render the map container div
    return <div id="googleMap" style={{ width: '100%', height: '400px' }}></div>;
  };
  

  
  
export default MapData;
