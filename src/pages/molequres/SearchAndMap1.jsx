import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Button from "@mui/material/Button";
import { PostTextField } from "../molequres/PostTextField";

export const SearchAndMap1 = ({ setAddress, address, label, id }) => {
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
        address: address.name,
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
        setAddress({
          name: address.name,
          location: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          },
          id: address.id,
        });
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
        value={address.name}
        onChange={(e) =>
          setAddress({
            location: address.location,
            name: e.target.value,
            id: address.id,
          })
        }
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
