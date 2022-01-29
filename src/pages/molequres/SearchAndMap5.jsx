import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

export const SearchAndMap1 = () => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState(null);
  const [marker, setMarker] = useState(null);

  const defaultLatLng = {
    lat: 35.6809591,
    lng: 139.7673068,
  };

  const handleApiLoaded = (obj) => {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  };

  const search = () => {
    geocoder.geocode(
      {
        address,
      },
      (results, status) => {
        if (status === maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          if (marker) {
            marker.setMap(null);
          }
          setMarker(
            new maps.Marker({
              map,
              position: results[0].geometry.location,
            })
          );
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
        }
      }
    );
  };
  return (
    <>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="button" onClick={search}>
        Search
      </button>
      <div style={{ height: "300px", width: "300px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCFm7KI6nHVnYoiaMWRs3-xWdCG4VTXK5A" }}
          defaultCenter={defaultLatLng}
          defaultZoom={16}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
    </>
  );
};
