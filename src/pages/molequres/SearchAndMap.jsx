import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Button from "@mui/material/Button";
import { PostTextField } from "./PostTextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const SearchAndMap = ({ setAddress, address, label, id }) => {
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
  
  return (
    <div className="font-Comic my-5">
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
        <Button
          className="hover:bg-pink-500 text-lg bg-pink-400 py-2 text-white"
          variant="contained"
          onClick={search}
        >
          さがす
        </Button>
      </div>
      <div style={{ height: "100px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
          defaultCenter={defaultLatLng}
          defaultZoom={15}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
      <div className="my-5">
        <ArrowDownwardIcon className="text-pink-400" />
      </div>
    </div>
  );
};
