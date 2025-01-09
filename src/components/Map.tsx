"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { Icon } from "leaflet";

// Fix icon không hiển thị (Leaflet không tự load icon khi dùng với Webpack)
// delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
export interface IPosition {
  lat: number;
  lng: number;
}

function Map({ lat, lng }: IPosition) {
  const position: [number, number] = [lat, lng];
  return (
    <MapContainer
      style={{ height: "200px", width: "100%" }}
      center={position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Latitude: {lat}, Longitude: {lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
