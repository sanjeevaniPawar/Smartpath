import React, { useState, useEffect } from 'react';
import { ArrowRight, MonitorSmartphone, Timer, Ruler, ThumbsUp, X, Navigation } from 'lucide-react';

const BottomDrawer = ({ isOpen, onToggle, selectedLocation }) => {
    const [selectedRoute, setSelectedRoute] = useState(0);

    // Expand whenever a new location is selected
    useEffect(() => {
        if (selectedLocation) {
            onToggle(true);
        }
    }, [selectedLocation, onToggle]);

    if (!selectedLocation && !isOpen) return null; // Or keep a collapsed state if you prefer

    return (
        <div
            className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out ${isOpen ? 'h-[500px]' : 'h-28'}`}
        >
            {/* Glass Container */}
            <div className="h-full w-full bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[32px] flex flex-col overflow-hidden relative">

                {/* Drag Handle */}
                <div
                    onClick={() => onToggle(!isOpen)}
                    className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors z-20"
                >
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="p-8 pt-6 flex flex-col h-full">
                    {/* Header / Collapsed View */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 font-semibold mb-1">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span> Current Location</span>
                                <ArrowRight className="w-4 h-4 text-gray-300" />
                                <span className="text-gray-900">{selectedLocation ? selectedLocation.name : 'Select Destination'}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                {selectedLocation ? '8 min' : '-- min'} <span className="text-base font-normal text-gray-500">(Fastest)</span>
                            </h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="bg-gray-900 text-white p-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:scale-100" disabled={!selectedLocation}>
                                <MonitorSmartphone className="w-5 h-5" />
                                Start Navigation
                            </button>
                        </div>
                    </div>

                    {/* Expanded Route Options */}
                    <div className={`transition-opacity duration-300 delay-100 flex-1 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {selectedLocation ? (
                            <div className="pb-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Suggested Routes</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: 0, time: '8 min', dist: '0.3 mi', access: '100%', tag: 'High Access', color: 'teal', icon: ThumbsUp },
                                        { id: 1, time: '12 min', dist: '0.4 mi', access: '95%', tag: 'Quiet', color: 'blue', icon: Timer },
                                        { id: 2, time: '6 min', dist: '0.25 mi', access: '40%', tag: 'Has Stairs', color: 'orange', icon: X }
                                    ].map((route, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedRoute(idx)}
                                            className={`relative p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 group
                                            ${selectedRoute === idx
                                                    ? `bg-${route.color}-50/50 border-${route.color}-500 shadow-lg scale-[1.02]`
                                                    : 'bg-white/50 border-gray-100 hover:border-gray-300 hover:shadow-md'
                                                }
                                        `}
                                        >
                                            {selectedRoute === idx && (
                                                <div className={`absolute -top-3 left-6 px-3 py-1 bg-${route.color}-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg`}>
                                                    Selected
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-2 rounded-xl bg-${route.color}-100 text-${route.color}-600`}>
                                                    <route.icon className="w-5 h-5" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider text-${route.color}-700`}>{route.tag}</span>
                                            </div>

                                            <div className="mb-2">
                                                <span className="text-3xl font-bold text-gray-900">{route.time}</span>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                                <span className="flex items-center gap-1"><Ruler className="w-3 h-3" /> {route.dist}</span>
                                                <span className="flex items-center gap-1">Access: <span className="text-gray-900">{route.access}</span></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <Navigation className="w-12 h-12 mb-2 opacity-20" />
                                <p>Select a location on the map or sidebar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomDrawer;
