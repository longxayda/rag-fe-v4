import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapPage.css';
import { heritageApi } from '../services/api';
import MapPageLeaflet from './MapPageLeaflet';
import { parseMapCoordinates, toLeafletLatLng } from '../utils/mapCoordinates';

const hasMapboxToken = !!(import.meta.env.VITE_MAPBOX_PK || '').trim();
if (hasMapboxToken) {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PK;
}

const MapPage = () => {
  const { t } = useTranslation();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const leafletMapRef = useRef(null);
  const open360Timeout = useRef(null);
  const panoramaContainer = useRef(null);
  const pannellumViewer = useRef(null);
  const audioRef = useRef(null);
  const markersRef = useRef([]);

  const [activeLocation, setActiveLocation] = useState(null);
  const [is360Open, setIs360Open] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationsError, setLocationsError] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [mapboxRetry, setMapboxRetry] = useState(0);
  const [, setIsAudioPlaying] = useState(false);

  const useLeaflet = !hasMapboxToken;

  const visibleLocations = useMemo(
    () =>
      locations
        .map((location) => {
          const normalizedCoordinates = parseMapCoordinates(location.coordinates);
          if (!normalizedCoordinates) return null;
          return { ...location, normalizedCoordinates };
        })
        .filter(Boolean),
    [locations]
  );

  const getAllLocations = async () => {
    try {
      setLocationsError(false);
      const response = await heritageApi.getAll();
      if (response && response.data) {
        setLocations(response.data);
      } else {
        setLocations([]);
      }
    } catch {
      setLocations([]);
      setLocationsError(true);
    }
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  const open360Viewer = (location) => {
    setIs360Open(true);
    setTimeout(() => {
      if (window.pannellum) {
        pannellumViewer.current = window.pannellum.viewer(panoramaContainer.current, {
          type: 'equirectangular',
          panorama: location.image360,
          autoLoad: true,
          showControls: true,
          compass: true,
          northOffset: 0,
          hfov: 100,
          pitch: 0,
          yaw: 0,
          mouseZoom: true,
          autoRotate: -2,
        });
      }
    }, 100);
  };

  const playAudio = (location) => {
    if (!location?.audio_url) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(location.audio_url);
    audioRef.current = audio;
    audio.play();
    setIsAudioPlaying(true);
    audio.onended = () => setIsAudioPlaying(false);
  };

  const flyToLocation = (location) => {
    const normalizedCoordinates = parseMapCoordinates(
      location.normalizedCoordinates ?? location.coordinates
    );
    if (!normalizedCoordinates) return;

    if (open360Timeout.current) {
      clearTimeout(open360Timeout.current);
    }

    setActiveLocation(location);
    playAudio(location);

    if (useLeaflet) {
      const latLng = toLeafletLatLng(normalizedCoordinates);
      if (latLng && leafletMapRef.current) {
        leafletMapRef.current.flyTo(latLng, 17, { duration: 2.5 });
      }
    } else if (map.current) {
      map.current.flyTo({
        center: normalizedCoordinates,
        zoom: 17,
        pitch: 60,
        bearing: 0,
        duration: 2500,
        essential: true,
      });
    }

    open360Timeout.current = setTimeout(() => {
      open360Viewer(location);
    }, 2600);
  };

  useEffect(() => {
    if (!hasMapboxToken || !mapContainer.current) return;
    if (map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [105.0, 9.0],
        zoom: 9,
        pitch: 45,
        bearing: 0,
      });
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.on('error', () => setMapError(true));
    } catch {
      setMapError(true);
      return;
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxRetry]);

  const retryMapbox = () => {
    setMapError(false);
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    setMapboxRetry((count) => count + 1);
  };

  useEffect(() => {
    if (useLeaflet || !map.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    visibleLocations.forEach((location) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <div class="marker-pulse"></div>
        <div class="marker-pin"></div>
      `;

      el.addEventListener('click', () => flyToLocation(location));

      const marker = new mapboxgl.Marker(el)
        .setLngLat(location.normalizedCoordinates)
        .addTo(map.current);

      markersRef.current.push(marker);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- flyToLocation intentionally not in deps
  }, [visibleLocations, useLeaflet]);

  const close360Viewer = () => {
    if (open360Timeout.current) {
      clearTimeout(open360Timeout.current);
      open360Timeout.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIs360Open(false);
    setActiveLocation(null);

    if (pannellumViewer.current) {
      pannellumViewer.current.destroy();
      pannellumViewer.current = null;
    }

    if (!useLeaflet && map.current) {
      map.current.flyTo({
        center: [105.0, 9.0],
        zoom: 9,
        pitch: 45,
        bearing: 0,
        duration: 2000,
      });
    } else if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([9.0, 105.0], 9, { duration: 2 });
    }
  };

  return (
    <div className="ca-mau-explorer">
      {useLeaflet ? (
        <MapPageLeaflet
          locations={visibleLocations}
          onLocationClick={flyToLocation}
          mapRef={leafletMapRef}
        />
      ) : (
        <div className="map-container-wrapper">
          <div ref={mapContainer} className="map-container" />
          {mapError && (
            <div className="map-error-overlay">
              <p>{t('map.mapError')}</p>
              <p className="text-sm opacity-90 mt-1">{t('map.mapTokenHint')}</p>
              <button
                type="button"
                onClick={retryMapbox}
                className="mt-4 px-4 py-2 rounded-lg bg-heritage-red-600 text-white hover:bg-heritage-red-700"
              >
                {t('common.retry') || 'Thu lai'}
              </button>
            </div>
          )}
        </div>
      )}

      {activeLocation && !is360Open && (
        <div className="info-panel">
          <div className="info-content">
            <h2>{activeLocation.name}</h2>
            <p>{activeLocation.address}</p>
            <div className="info-loading">
              <div className="loading-spinner"></div>
              <span>{t('map.loadingScene360') || 'Dang tai khung canh 360...'}</span>
            </div>
          </div>
        </div>
      )}

      {is360Open && (
        <div className="viewer-360-modal">
          <button className="close-button" onClick={close360Viewer}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="viewer-header">
            <h2>{activeLocation?.name}</h2>
            <p>{activeLocation?.address}</p>
          </div>

          <div ref={panoramaContainer} className="panorama-container" />
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                setIsAudioPlaying(false);
              }
            }}
          >
            {t('map.muteAudio') || 'Tat thuyet minh'}
          </button>
        </div>
      )}

      <div className="locations-sidebar">
        <div className="sidebar-header">
          <h1>{t('map.exploreTitle')}</h1>
          <p>{t('map.selectLocationToStart')}</p>
          {locationsError && (
            <p className="text-amber-600 dark:text-amber-400 text-sm mt-2">
              {t('map.loadError') || 'Khong tai duoc danh sach dia diem.'}
            </p>
          )}
        </div>

        <div className="locations-list">
          {visibleLocations.map((location) => (
            <button
              key={location.id}
              className={`location-item ${activeLocation?.id === location.id ? 'active' : ''}`}
              onClick={() => flyToLocation(location)}
            >
              <div className="location-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div className="location-details">
                <h3>{location.name}</h3>
                <p>{location.address}</p>
              </div>
            </button>
          ))}

          {!locationsError && locations.length > 0 && visibleLocations.length === 0 && (
            <p className="text-sm text-gray-300 px-3 py-2">
              {t('map.noValidLocations') ||
                'Khong co dia diem co toa do de hien thi tren ban do.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
