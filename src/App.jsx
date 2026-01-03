import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapArea from './components/MapArea';
import BottomDrawer from './components/BottomDrawer';

function App() {
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Grid */}
      <main className="flex pt-16 h-full relative">
        {/* Left Sidebar - Fixed Width */}
        <Sidebar />

        {/* Center Map Area - Flex Grow */}
        <div className="flex-1 relative">
          <MapArea />

          {/* Bottom Drawer Overlay inside Map Container (or fixed to screen) */}
          <BottomDrawer />
        </div>
      </main>
    </div>
  );
}

export default App;
