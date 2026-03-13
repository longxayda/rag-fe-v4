import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toLeafletLatLng } from '../utils/mapCoordinates';

// Fix default marker icons in React-Leaflet (required for bundlers)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function getLeafletPos(location) {
  return toLeafletLatLng(location?.normalizedCoordinates ?? location?.coordinates);
}

function MapController({ mapRef }) {
  const map = useMap();

  useEffect(() => {
    if (map && mapRef) {
      mapRef.current = map;
      return () => {
        if (mapRef) mapRef.current = null;
      };
    }
    return undefined;
  }, [map, mapRef]);

  return null;
}

export default function MapPageLeaflet({ locations = [], onLocationClick, mapRef }) {
  const validLocations = locations.filter((location) => getLeafletPos(location));

  return (
    <div className="map-container">
      <MapContainer
        center={[9.0, 105.0]}
        zoom={9}
        style={{ height: '100%', width: '100%' }}
        className="leaflet-ca-mau z-0"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController mapRef={mapRef} />
        {validLocations.map((location) => {
          const pos = getLeafletPos(location);
          if (!pos) return null;

          return (
            <Marker
              key={location.id}
              position={pos}
              eventHandlers={{
                click: () => onLocationClick && onLocationClick(location),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {location.name}
                  </h3>
                  {location.address && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{location.address}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => onLocationClick && onLocationClick(location)}
                    className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Xem chi tiet
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
