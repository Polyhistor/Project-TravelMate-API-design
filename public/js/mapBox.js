console.log('hello from the client side');
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoicG9seWhpc3RvciIsImEiOiJja2I5Mmp0djcwYTM4MnJ1Zmlocjd4Z2x5In0.6_JCPSvezA9AqT-HANHz8Q';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/polyhistor/ckb93vd460mzs1ipg14nf06ss',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 180,
    left: 100,
    right: 100,
  },
});
