import React from 'react';
import {
  APIProvider,
  Map,
  Marker
} from '@vis.gl/react-google-maps';

const App = () => {

  const centerPosition = { lat: 33.6844, lng: 73.0479 };

  const locations = [
    { lat: 33.6456, lng: 73.0711, title: '6th Road Rawalpindi' },
    { lat: 33.5995, lng: 73.0551, title: 'Saddar Rawalpindi' },
    { lat: 31.5925, lng: 74.3095, title: 'Minar-e-Pakistan Lahore' }
  ];

  // Marker click handler
  const handleMarkerClick = (locationName) => {
    alert(`You clicked on: ${locationName}`);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <APIProvider apiKey="YourAPIKey">
        <Map
          defaultCenter={centerPosition}
          defaultZoom={6}
          style={{ width: '100%', height: '100%' }}
        >
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={{ lat: loc.lat, lng: loc.lng }}
              title={loc.title}
              onClick={() => handleMarkerClick(loc.title)}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default App;