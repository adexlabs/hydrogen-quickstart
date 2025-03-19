import { Map } from '@googlemaps/react-wrapper'

function MyApp() {
  return (
    <div>
      <Map
  apiKey="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBMS1tN1aVb1EPpImw7EnfBRl5PGwewJo&amp;callback=myMap"
  defaultZoom={8}
  defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
  defaultOptions={{ styles: customMapStyles, disableDefaultUI: true }}
>
</Map>

    </div>
  )
}

export default MyApp
