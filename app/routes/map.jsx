import { Await, useLoaderData } from '@remix-run/react';
import { defer } from '@shopify/remix-oxygen';

export async function loader({ context }) {
  const apiKey = context.env.GOOGLE_MAPS_API_KEY;
  const location = "Somalwada, Nagpur"; 
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

  try {
    const response = await fetch(googleMapsUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    const data = await response.json();
    return defer({ data });
  } catch (error) {
    console.error("Error fetching Google Maps data:", error);
    return defer({ data: null });
  }
}

export default function MapPage() {
  const { data } = useLoaderData();

  return (
    <div>
      <h2>Location Coordinates</h2>
      <Await resolve={data}>
        {(resolvedData) => {
          if (!resolvedData || !resolvedData.results || resolvedData.results.length === 0) {
            return <p>Location data not available.</p>;
          }
          const { lat, lng } = resolvedData.results[0].geometry.location;
          return (
            <div>
              <p><strong>Latitude:</strong> {lat}</p>
              <p><strong>Longitude:</strong> {lng}</p>
            </div>
          );
        }}
      </Await>
    </div>
  );
}
