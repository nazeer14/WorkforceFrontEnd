// MapPicker.js
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ position, onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

function MapPicker({ value, onChange }) {
  return (
    <div className="mt-2 h-64 w-full">
      <MapContainer
        center={value || [20.5937, 78.9629]} // Default: center of India
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={value} onSelect={onChange} />
      </MapContainer>
    </div>
  );
}

export default MapPicker;
