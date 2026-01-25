import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/**
 * MapController Component
 * Helper component to control map view
 */
const MapController = ({ selectedHeritage }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedHeritage && selectedHeritage.location?.coordinates) {
      const { lat, lng } = selectedHeritage.location.coordinates;
      map.setView([lat, lng], 15, { animate: true });
    }
  }, [selectedHeritage, map]);

  return null;
};

/**
 * InteractiveMap Component
 * 
 * Interactive map showing heritage sites
 * Features: Leaflet map, markers, popups, filtering, zoom controls
 */
const InteractiveMap = ({ filters, selectedHeritage, onMarkerClick }) => {
  const [heritageLocations, setHeritageLocations] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    // Mock heritage locations
    const mockLocations = [
      {
        id: '1',
        name: 'Hoàng Thành Thăng Long',
        category: 'Di tích lịch sử',
        location: {
          address: 'Hà Nội',
          coordinates: { lat: 21.0285, lng: 105.8542 }
        },
        image: '/placeholder1.jpg'
      },
      {
        id: '2',
        name: 'Phố Cổ Hội An',
        category: 'Di sản văn hóa',
        location: {
          address: 'Quảng Nam',
          coordinates: { lat: 15.8801, lng: 108.3380 }
        },
        image: '/placeholder2.jpg'
      },
      {
        id: '3',
        name: 'Chùa Một Cột',
        category: 'Di tích kiến trúc',
        location: {
          address: 'Hà Nội',
          coordinates: { lat: 21.0369, lng: 105.8336 }
        },
        image: '/placeholder3.jpg'
      }
    ];

    // Apply filters
    let filtered = mockLocations;
    if (filters.category !== 'all') {
      filtered = filtered.filter(loc => loc.category === filters.category);
    }
    if (filters.searchQuery) {
      filtered = filtered.filter(loc =>
        loc.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    setHeritageLocations(filtered);
  }, [filters]);

  // Custom marker icon
  const createCustomIcon = (category) => {
    const color = category === 'Di tích lịch sử' ? 'red' :
                  category === 'Di sản văn hóa' ? 'blue' : 'green';
    
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        ref={mapRef}
        center={[16.0544, 108.2022]} // Center of Vietnam
        zoom={6}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {heritageLocations.map((heritage) => (
          <Marker
            key={heritage.id}
            position={[
              heritage.location.coordinates.lat,
              heritage.location.coordinates.lng
            ]}
            icon={createCustomIcon(heritage.category)}
            eventHandlers={{
              click: () => onMarkerClick(heritage)
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <img
                  src={heritage.image}
                  alt={heritage.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-bold text-lg mb-1">{heritage.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{heritage.category}</p>
                <p className="text-sm text-gray-500">{heritage.location.address}</p>
                <button
                  onClick={() => window.location.href = `/heritage/${heritage.id}`}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 w-full"
                >
                  Xem chi tiết
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController selectedHeritage={selectedHeritage} />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;

