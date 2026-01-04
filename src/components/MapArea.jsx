import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, ZoomIn, ZoomOut, Compass } from 'lucide-react';

const MapArea = ({ locations = [], selectedId, onSelect }) => {
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(45);
    const [animatedCams, setAnimatedCams] = useState(false);

    // Auto-focus on selection
    useEffect(() => {
        if (selectedId) {
            setAnimatedCams(true);
            setTimeout(() => setAnimatedCams(false), 500); // Visual shake/focus effect logic could go here
        }
    }, [selectedId]);

    const buildings = locations; // Use passed locations

    return (
        <div className="flex-1 bg-gray-100 relative overflow-hidden h-full [perspective:1000px] overflow-hidden">
            {/* 3D Scene Container */}
            <div
                className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d]"
                style={{
                    transform: `rotateX(55deg) rotateZ(${rotation}deg) scale(${scale}) translateZ(0px)`,
                }}
            >
                {/* Ground Plane (The Campus) */}
                <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[#e8eac8] [transform-style:preserve-3d] shadow-2xl origin-center border-[20px] border-white/50">
                    {/* Map Image Base */}
                    <img
                        src="/iit_delhi_map.png"
                        alt="IIT Delhi Campus Map"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
                    />

                    {/* Grid Pattern overlay for texture */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'linear-gradient(#059669 1px, transparent 1px), linear-gradient(90deg, #059669 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}>
                    </div>

                    {/* Elevated Wheelchair Route - Only show if selection active or default demo */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-xl" style={{ transform: 'translateZ(5px)' }}>
                        {selectedId && (
                            <>
                                <path
                                    d="M 40% 40% Q 55% 45% 55% 60% T 80% 70%"
                                    fill="none"
                                    stroke="#0d9488"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray="20 10"
                                    className="animate-pulse"
                                />
                                <path
                                    d="M 40% 40% Q 55% 45% 55% 60% T 80% 70%"
                                    fill="none"
                                    stroke="#2dd4bf"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    className="opacity-50 blur-sm"
                                />
                            </>
                        )}
                    </svg>

                    {/* 3D Buildings */}
                    {buildings.map((b) => {
                        const isSelected = selectedId === b.id;
                        return (
                            <div
                                key={b.id}
                                onClick={() => onSelect(b.id)}
                                className={`absolute group cursor-pointer transition-all duration-500 ease-out`}
                                style={{
                                    left: `${b.x}%`,
                                    top: `${b.y}%`,
                                    width: `${b.w}%`,
                                    height: `${b.h}%`,
                                    transformStyle: 'preserve-3d',
                                    transform: isSelected ? `translateZ(20px) scale(1.1)` : `translateZ(0px)` // Pop up effect
                                }}
                            >
                                {/* Shadow */}
                                <div className={`absolute inset-0 bg-black/20 blur-md translate-y-4 translate-x-2 rounded-xl transition-all ${isSelected ? 'opacity-80 scale-110 blur-xl' : 'opacity-40'}`}></div>

                                {/* Base Block */}
                                <div
                                    className={`absolute inset-0 rounded-lg border-2 transition-colors duration-300
                                        ${isSelected ? 'bg-teal-500 border-teal-300' : `${b.color} border-white/80`}
                                        shadow-sm`}
                                    style={{
                                        transform: `translateZ(${b.z}px)`,
                                        boxShadow: isSelected ? '0 0 40px rgba(20, 184, 166, 0.4)' : `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 0 20px rgba(255,255,255,0.5)`,
                                    }}
                                >
                                    {/* Roof Detail */}
                                    <div className="absolute inset-2 border border-black/5 rounded opacity-20"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`text-[10px] font-bold -rotate-45 select-none ${isSelected ? 'text-white' : 'text-gray-600/70'}`}>
                                            {b.name}
                                        </span>
                                    </div>
                                </div>

                                {/* 3D Extrusion Effect */}
                                <div
                                    className={`absolute inset-0 rounded-lg pointer-events-none ${isSelected ? 'bg-teal-600' : 'bg-gray-300'}`}
                                    style={{ transform: `translateZ(0px) scale(0.98)`, height: '100%' }}
                                ></div>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`absolute inset-0 rounded-lg pointer-events-none border-x border-gray-400/10 ${isSelected ? 'bg-teal-500/50' : 'bg-gray-300/50'}`}
                                        style={{ transform: `translateZ(${i * (b.z / 5)}px)` }}
                                    ></div>
                                ))}

                                {/* Selection Badge */}
                                {isSelected && (
                                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-2 rounded-xl shadow-xl whitespace-nowrap z-50 animate-bounce"
                                        style={{ transform: `rotateZ(-${rotation}deg) rotateX(-55deg)` }}>
                                        <div className="font-bold text-sm">Target Location</div>
                                        <div className="w-3 h-3 bg-teal-600 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Start Marker (Floating) */}
                    <div className="absolute left-[40%] top-[40%] z-50" style={{ transform: 'translateZ(60px)' }}>
                        <div className="relative group cursor-pointer" style={{ transform: `rotateZ(-${rotation}deg) rotateX(-55deg)` }}>
                            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce border-4 border-white">
                                <Navigation className="w-6 h-6 text-white fill-current transform rotate-45" />
                            </div>
                            <div className="absolute w-12 h-4 bg-black/20 blur-md rounded-[100%] top-14 left-0 animate-pulse"></div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Overlay Controls */}
            <div className="absolute bottom-32 right-6 flex flex-col gap-3 z-50">
                <button
                    onClick={() => setRotation(r => r - 45)}
                    className="p-3 bg-white rounded-xl shadow-lg hover:bg-gray-50 text-gray-700 transition-transform active:scale-95"
                    title="Rotate Map"
                >
                    <Compass className="w-6 h-6" />
                </button>
                <div className="flex flex-col bg-white rounded-xl shadow-lg divide-y divide-gray-100">
                    <button
                        onClick={() => setScale(s => Math.min(s + 0.2, 2))}
                        className="p-3 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                        <ZoomIn className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => setScale(s => Math.max(s - 0.2, 0.5))}
                        className="p-3 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                        <ZoomOut className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Current Status Badge */}
            <div className="absolute top-24 right-6 bg-white/80 backdrop-blur-md border border-white/50 px-4 py-2 rounded-2xl shadow-sm z-40 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-teal-900">Live Navigation</span>
            </div>

            {/* Vignette Overlay for focus */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]"></div>
        </div>
    );
};

export default MapArea;
