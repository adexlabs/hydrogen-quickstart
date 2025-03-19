export async function loader() {
  const apiKey = process.env.PUBLIC_GOOGLE_MAPS_API_KEY;
  return new Response(
    await fetch(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`).then(res => res.text()),
    {
      headers: { "Content-Type": "application/javascript" }
    }
  );
}
