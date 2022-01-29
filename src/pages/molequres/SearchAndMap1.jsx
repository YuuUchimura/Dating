import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SearchAndMap1 = ({ setLat, setLng, address, setAddress }) => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
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
        }
        setLat(results[0].geometry.location.lat());
        setLng(results[0].geometry.location.lng());
      }
    );
  };
  return (
    <>
      <TextField
        required
        id="standard-required"
        label="デートスポット１"
        variant="standard"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button variant="contained" onClick={search}>
        検索
      </Button>
      <div style={{ height: "200px", width: "200px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
          defaultCenter={defaultLatLng}
          defaultZoom={15}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
    </>
  );
};
