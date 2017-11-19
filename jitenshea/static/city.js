// Jitenshea functions for the 'city' page

// Note : the 'cityurl' function is in the 'app.js' file.

// List of stations with DataTables
// TODO: make id and name clickable with href to URL/city/<id>
$(document).ready(function() {
  $('#citytable').DataTable( {
    scrollY:        '80vh',
    scrollCollapse: true,
    paging:         false,
    processing: true,
    ajax: {
      url: cityurl("citytable") + "/station?limit=400"
    },
    columns: [
      { "data": "id" },
      { "data": "name"},
      { "data": "city"},
      { "data": "nb_bikes"},
      { "data": "address"}
    ]
  } );
} );


// Map with all stations with Leaflet
// TODO :
//  - change the icon
//  - hover it with the name and nb bikes
//  - is it possible to set a bbox (computed by turjs) instead of a zoom in the
//    'setView' function.
$(document).ready(function() {
  var station_map = L.map("station-map");
  var OSM_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  OSM_Mapnik.addTo(station_map);
  $.get(cityurl("station-map") + "/station?geojson=true&limit=400", function(data) {
    // Get the centroid of all stations.
    var centroid = turf.center(data);
    station_map.setView([centroid.geometry.coordinates[1],
                         centroid.geometry.coordinates[0]], 12);
    L.geoJSON(data).addTo(station_map);
  } );
} );