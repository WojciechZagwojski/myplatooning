var map

var test = [{
  "Type":1,
  "StartTime":1519244844298,
  "StartPos":{
    "lat":52.498297,
    "lon":13.375655
  },
  "EndPos":{
    "lat":52.498689,
    "lon":13.376492
  },
  "Data":{
    "temp": 3
  }
},{
  "Type":1,
  "StartTime":1519244844298,
  "StartPos":{
    "lat":52.499708,
    "lon":13.377748
  },
  "EndPos":{
    "lat":52.500217,
    "lon":13.377233
  },
  "Data":{
    "temp": 5
  }
}]

var type = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

update()
var mainIntervall = setInterval(update, 2000)

function update(){
    $.getJSON( "http://52.166.116.121:3001/collection", function( json ) {
        if(json){
            json.forEach((entry)=>{

                // Glatteis
                if(entry.Type == 1){
                      var tempCoordinates = [{"lat":entry.StartPos.lat, "lng":entry.StartPos.lon}, {"lat":entry.EndPos.lat, "lng":entry.EndPos.lon}]

                      var center = {"lat":(entry.StartPos.lat+entry.EndPos.lat)/2, "lng":(entry.StartPos.lon+entry.EndPos.lon)/2}

                      var imageMarker = new google.maps.Marker({
                          position: center,
                          map: map,
                          icon: {
                            url: 'attention.png',
                            size: new google.maps.Size(30, 26),
                            anchor: new google.maps.Point(40, 20)
                          }
                      })

                      var slipperyPath = new google.maps.Polyline({
                          path:tempCoordinates,
                          geodesic: true,
                          strokeColor: 'blue',
                          strokeOpacity: 0.6,
                          strokeWeight: 6
                      })
                      slipperyPath.setMap(map);
                }

                // Blitzer
                if(entry.Type == 2){
                      var imageMarker = new google.maps.Marker({
                          position: {"lat":entry.StartPos.lat, "lng":entry.StartPos.lon},
                          map: map,
                          icon: {
                            url: 'blitzer.png'
                          }
                      })
                }

                // Schlagloch
                if(entry.Type == 3){
                      var tempCoordinates = [{"lat":entry.StartPos.lat, "lng":entry.StartPos.lon}, {"lat":entry.EndPos.lat, "lng":entry.EndPos.lon}]

                      var center = {"lat":(entry.StartPos.lat+entry.EndPos.lat)/2, "lng":(entry.StartPos.lon+entry.EndPos.lon)/2}

                      var imageMarker = new google.maps.Marker({
                          position: center,
                          map: map,
                          icon: {
                            url: 'bumpy.png',
                            anchor: new google.maps.Point(40, 20)
                          }
                      })

                      var slipperyPath = new google.maps.Polyline({
                          path:tempCoordinates,
                          geodesic: true,
                          strokeColor: 'purple',
                          strokeOpacity: 0.6,
                          strokeWeight: 6
                      })
                      slipperyPath.setMap(map);
                }


            })
        }else{
          console.log('No valid Data')
        }
    });
}

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: {lat: 52.5, lng: 13.372}
        });

         var styledMapType = new google.maps.StyledMapType(type)
         map.mapTypes.set('styled_map', styledMapType);
         map.setMapTypeId('styled_map');
}
