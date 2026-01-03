import React, { useState } from 'react';
import { ArrowRight, Clock, Ruler, ThumbsUp, ChevronUp, ChevronDown, MonitorSmartphone } from 'lucide-react';

const BottomDrawer = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(0);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div className={`fixed bottom-0 left-96 right-0 bg-white shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 z-20 rounded-t-2xl border-t border-gray-100 ${expanded ? 'h-96' : 'h-24'}`}>

            {/* Handle / Header */}
            <div
                className="h-8 flex items-center justify-center cursor-pointer border-b border-gray-50 hover:bg-gray-50 rounded-t-2xl"
                onClick={toggleExpand}
            >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="px-8 pb-4 h-full flex flex-col">
                {/* Collapsed/Header View */}
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-semibold uppercase">From</span>
                            <span className="font-medium text-gray-900">Current Location</span>
                        </div>
                        <ArrowRight className="text-gray-400 w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-semibold uppercase">To</span>
                            <span className="font-medium text-gray-900">Engineering Block A</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <div className="text-lg font-bold text-teal-700">8 min</div>
                            <div className="text-xs text-gray-500">Fastest accessible route</div>
                        </div>
                        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-bold text-lg shadow-lg shadow-teal-200 transition-all transform hover:scale-105 flex items-center gap-2">
                            <MonitorSmartphone className="w-5 h-5" /> Start Navigation
                        </button>
                    </div>
                </div>

                {/* Expanded View: Route Options */}
                {expanded && (
                    <div className="mt-4 grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {[
                            { id: 0, time: '8 min', dist: '0.3 mi', access: '100%', tag: 'Recommended', color: 'teal' },
                            { id: 1, time: '12 min', dist: '0.4 mi', access: '95%', tag: 'Less Crowded', color: 'blue' },
                            { id: 2, time: '6 min', dist: '0.25 mi', access: '40%', tag: 'Has Stairs', color: 'orange' }
                        ].map((route, idx) => (
                            <div
                                key={idx}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedRoute === idx ? `border-${route.color}-500 bg-${route.color}-50` : 'border-gray-100 hover:border-gray-300 bg-white'}`}
                                onClick={() => setSelectedRoute(idx)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${route.tag === 'Has Stairs' ? 'bg-orange-100 text-orange-700' : 'bg-teal-100 text-teal-700'}`}>
                                        {route.tag}
                                    </span>
                                    {selectedRoute === idx && <div className={`w-4 h-4 rounded-full bg-${route.color}-500 flex items-center justify-center`}>
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>}
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">{route.time}</div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1"><Ruler className="w-4 h-4" /> {route.dist}</div>
                                    <div className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {route.access} Score</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BottomDrawer;
