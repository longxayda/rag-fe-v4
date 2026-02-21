import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapPage.css';
import { heritageApi } from '../services/api';

// Set your Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PK;

const MapPage = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const [is360Open, setIs360Open] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const open360Timeout = useRef(null);
  const panoramaContainer = useRef(null);
  const pannellumViewer = useRef(null);
  const audioRef = useRef(null);
  const markersRef = useRef([]);


  const getAllLocations = async () => {
    const response = await heritageApi.getAll();
    if (response && response.data) {
      setLocations(response.data)
    }
  }

  useEffect(() => {
    getAllLocations()
  }, [])


  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [105.0, 9.0],
      zoom: 9,
      pitch: 45,
      bearing: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);


  useEffect(() => {
    if (!map.current || locations.length === 0) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    locations.forEach(location => {
      if (!isValidLngLat(location.coordinates)) {
        console.warn(
          '⚠️ Location skipped (invalid coordinates):',
          location.id,
          location.name,
          location.coordinates
        );
        return; // ⬅️ SKIP location này
      }

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
      <div class="marker-pulse"></div>
      <div class="marker-pin"></div>
    `;

      el.addEventListener('click', () => flyToLocation(location));

      const marker = new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .addTo(map.current);

      markersRef.current.push(marker);
    });
  }, [locations]);



  const isValidLngLat = (coordinates) => {
    if (!coordinates) return false;

    // Case: [lng, lat]
    if (Array.isArray(coordinates)) {
      if (coordinates.length !== 2) return false;

      const [lng, lat] = coordinates;
      return (
        typeof lng === 'number' &&
        typeof lat === 'number' &&
        lng >= -180 && lng <= 180 &&
        lat >= -90 && lat <= 90
      );
    }

    // Case: { lng, lat }
    if (
      typeof coordinates === 'object' &&
      typeof coordinates.lng === 'number' &&
      typeof coordinates.lat === 'number'
    ) {
      return true;
    }

    return false;
  };


  const flyToLocation = (location) => {
    if (!isValidLngLat(location.coordinates)) {
      alert('Địa điểm này chưa có dữ liệu vị trí trên bản đồ');
      return;
    }
    if (open360Timeout.current) {
      clearTimeout(open360Timeout.current)
    }
    setActiveLocation(location);

    playAudio(location)

    map.current.flyTo({
      center: location.coordinates,
      zoom: 17,
      pitch: 60,
      bearing: 0,
      duration: 2500,
      essential: true
    });

    open360Timeout.current = setTimeout(() => {
      open360Viewer(location);
    }, 2600);
  };

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
          autoRotate: -2
        });
      }
    }, 100);
  };

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

    map.current.flyTo({
      center: [105.0, 9.0],
      zoom: 9,
      pitch: 45,
      bearing: 0,
      duration: 2000
    });
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



  return (
    <div className="ca-mau-explorer">
      <div ref={mapContainer} className="map-container" />

      {activeLocation && !is360Open && (
        <div className="info-panel">
          <div className="info-content">
            <h2>{activeLocation.name}</h2>
            <p>{activeLocation.address}</p>
            <div className="info-loading">
              <div className="loading-spinner"></div>
              <span>Đang tải khung cảnh 360°...</span>
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
          <button onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause();
              setIsAudioPlaying(false);
            }
          }}>
            🔇 Tắt thuyết minh
          </button>
          {/* <div className="viewer-controls">
            <div className="control-hint">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Kéo để xoay • Cuộn để phóng to/thu nhỏ</span>
            </div>
          </div> */}
        </div>
      )}

      <div className="locations-sidebar">
        <div className="sidebar-header">
          <h1>Khám Phá Cà Mau</h1>
          <p>Chọn một địa điểm để bắt đầu</p>
        </div>

        <div className="locations-list">
          {locations.map(location => (
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
        </div>
      </div>
    </div>
  );
};

export default MapPage;
