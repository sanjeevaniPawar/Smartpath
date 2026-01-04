import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapArea from './components/MapArea';
import BottomDrawer from './components/BottomDrawer';
import AIGuide from './components/AIGuide';

function App() {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // IIT Delhi Data Source
  const locations = [
    // Hostels (West Side)
    { id: 'h1', name: 'Nalanda', x: 25, y: 70, w: 10, h: 8, z: 25, color: 'bg-yellow-100', type: 'Hostel', access: 'Restricted', dist: '0.5 km', status: 'Open' },
    { id: 'h3', name: 'Karakoram', x: 25, y: 50, w: 10, h: 8, z: 25, color: 'bg-yellow-100', type: 'Hostel', access: 'Restricted', dist: '0.6 km', status: 'Open' },
    { id: 'h5', name: 'Jwalamukhi', x: 25, y: 30, w: 10, h: 8, z: 25, color: 'bg-yellow-100', type: 'Hostel', access: 'Restricted', dist: '0.7 km', status: 'Open' },
    { id: 'h11', name: 'Kailash', x: 75, y: 25, w: 10, h: 8, z: 25, color: 'bg-yellow-100', type: 'Hostel', access: 'Restricted', dist: '0.3 km', status: 'Open' },

    // Academic Departments (Central)
    { id: 'b1', name: 'Bio Med', x: 60, y: 30, w: 8, h: 6, z: 30, color: 'bg-blue-100', type: 'Academic', access: 'Public', dist: '0.2 km', status: 'Open' },
    { id: 'b2', name: 'Elect Engg', x: 65, y: 35, w: 8, h: 6, z: 35, color: 'bg-blue-100', type: 'Academic', access: 'Public', dist: '0.2 km', status: 'Busy' },
    { id: 'b2a', name: 'Comp Sci', x: 60, y: 50, w: 12, h: 10, z: 40, color: 'bg-blue-200', type: 'Academic', access: 'Public', dist: '0.1 km', status: 'Busy' },
    { id: 'tt', name: 'Textile', x: 70, y: 45, w: 10, h: 8, z: 30, color: 'bg-blue-100', type: 'Academic', access: 'Public', dist: '0.2 km', status: 'Open' },

    // Gates & Landmarks
    { id: 'g1', name: 'Main Gate', x: 80, y: 20, w: 6, h: 4, z: 15, color: 'bg-pink-300', type: 'Gate', access: 'Public', dist: '0.0 km', status: 'Open 24/7' },
    { id: 'ms', name: 'Multi Story', x: 65, y: 45, w: 10, h: 20, z: 50, color: 'bg-stone-200', type: 'Admin', access: 'Restricted', dist: '0.1 km', status: 'Open' },
  ];

  const handleLocationSelect = (id) => {
    setSelectedLocationId(id);
    setIsDrawerOpen(true);
  };

  const selectedLocation = locations.find(l => l.id === selectedLocationId);

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Grid */}
      <main className="flex pt-16 h-full relative">
        {/* Left Sidebar - Fixed Width */}
        <Sidebar
          locations={locations}
          selectedId={selectedLocationId}
          onSelect={handleLocationSelect}
        />

        {/* Center Map Area - Flex Grow */}
        <div className="flex-1 relative isolate">
          <MapArea
            locations={locations}
            selectedId={selectedLocationId}
            onSelect={handleLocationSelect}
          />

          {/* Overlays */}
          {/* Bottom Drawer Overlay */}
          <BottomDrawer
            isOpen={isDrawerOpen}
            onToggle={(state) => setIsDrawerOpen(state)}
            selectedLocation={selectedLocation}
          />

          {/* AI Guide Floating Action */}
          <AIGuide />
        </div>
      </main>
    </div>
  );
}

export default App;
