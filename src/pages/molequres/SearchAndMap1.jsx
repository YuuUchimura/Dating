import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Button from "@mui/material/Button";
import { PostTextField } from "../molequres/PostTextField";

export const SearchAndMap1 = ({
  setLat,
  setLng,
  address,
  setAddress,
  label,
}) => {
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

  const buttonStyle = {
    backgroundColor: "#ff00ff",
    "&:hover": {
      backgroundColor: "#ff00ff",
      opacity: 0.8,
    },
  };
  return (
    <>
      <PostTextField
        label={label}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="text-right my-2">
        <Button sx={buttonStyle} variant="contained" onClick={search}>
          検索
        </Button>
      </div>
      <div style={{ margin: "0 auto", height: "100px", width: "90%" }}>
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
