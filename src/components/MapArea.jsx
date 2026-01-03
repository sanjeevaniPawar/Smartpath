import React from 'react';
import { Navigation, MapPin } from 'lucide-react';

const MapArea = () => {
    return (
        <div className="flex-1 bg-gray-50 relative overflow-hidden h-full">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>

            {/* Mock Map Elements */}
            <div className="absolute inset-0">
                {/* Building Shapes (Mock) */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500 font-bold transform -rotate-6">Eng. Block A</div>
                <div className="absolute top-1/3 left-1/2 w-48 h-24 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500 font-bold">Library</div>
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gray-200 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500 font-bold">Stadium</div>
            </div>

            {/* Accessible Route Line (Mock) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                    d="M 300 200 Q 450 300 600 250 T 800 400"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="12 4"
                    className="drop-shadow-md"
                />
                <circle cx="300" cy="200" r="8" fill="#0d9488" className="animate-pulse" />
                <circle cx="800" cy="400" r="8" fill="#ef4444" />
            </svg>

            {/* User Location Marker */}
            <div className="absolute top-[200px] left-[300px] -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                    <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center animate-ping absolute inset-0"></div>
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center relative z-20">
                        <Navigation className="w-5 h-5 text-teal-600 fill-teal-600 transform rotate-45" />
                    </div>
                </div>
            </div>

            {/* Destination Marker */}
            <div className="absolute top-[400px] left-[800px] -translate-x-1/2 -translate-y-full z-10">
                <MapPin className="w-10 h-10 text-red-500 fill-red-100 drop-shadow-lg filter" />
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold text-xl">+</button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold text-xl">-</button>
            </div>
        </div>
    );
};

export default MapArea;
