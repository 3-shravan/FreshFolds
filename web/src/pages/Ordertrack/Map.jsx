import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function Tracker() {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });
  const [otherPositions, setOtherPositions] = useState([]);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition({ lat: latitude, lng: longitude });

        // Emit location update to the server
        socket.emit('location_update', { lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true }
    );

    // Listen for location updates from other users
    socket.on('new_location', (data) => {
      setOtherPositions((prev) => [...prev, data]);
    });

    return () => socket.off('new_location');
  }, []);

  return (
    <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position.lat, position.lng]}>
        <Popup>You are here</Popup>
      </Marker>
      {otherPositions.map((pos, index) => (
        <Marker key={index} position={[pos.lat, pos.lng]}>
          <Popup>Other user</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Tracker;
