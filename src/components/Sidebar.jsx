import React, { useState } from 'react';
import { Search, Filter, Warehouse, Coffee, Utensils, Zap, Check, Accessibility, MapPin, Star, Clock, Navigation } from 'lucide-react';

const Sidebar = ({ locations = [], selectedId, onSelect }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState({
        wheelchair: true,
        crowded: false
    });

    const categories = [
        { icon: Warehouse, label: 'Classrooms', color: 'bg-blue-50 text-blue-600', filter: 'Classrooms' },
        { icon: Zap, label: 'Restrooms', color: 'bg-amber-50 text-amber-600', filter: 'Restrooms' },
        { icon: Utensils, label: 'Dining', color: 'bg-orange-50 text-orange-600', filter: 'Dining' },
        { icon: Accessibility, label: 'Entrances', color: 'bg-teal-50 text-teal-600', filter: 'Entrances' },
    ];

    // Filter Logic
    const filteredLocations = locations.filter(loc => {
        const matchesSearch = loc.name.toLowerCase().includes(searchText.toLowerCase()) ||
            loc.type.toLowerCase().includes(searchText.toLowerCase());

        const matchesCategory = activeCategory !== null
            ? loc.type.includes(categories[activeCategory].filter) // Simple mock match
            : true;

        // Mock filter logic (assuming data supports it, otherwise passes through)
        const matchesWheelchair = filters.wheelchair ? loc.access === 'High' : true;
        // const matchesCrowd = filters.crowded ? loc.status === 'Quiet' : true; 

        return matchesSearch && matchesCategory && matchesWheelchair;
    });

    return (
        <div className="w-[400px] bg-white border-r border-gray-100 h-[calc(100vh-64px)] flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 relative">
            {/* Search Header */}
            <div className="p-6 pb-2">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-teal-600" />
                    <input
                        type="text"
                        placeholder="Where to?"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 hover:bg-gray-100 focus:bg-white border-none rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-medium shadow-inner"
                    />
                </div>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto px-6 py-2 space-y-8 scrollbar-hide">

                {/* Categories */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Explore</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveCategory(activeCategory === idx ? null : idx)}
                                className={`flex flex-col items-center gap-2 p-2 rounded-2xl transition-all duration-300 ${activeCategory === idx ? 'bg-teal-50 scale-105 ring-2 ring-teal-500/20' : 'hover:bg-gray-50 hover:scale-105'}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.color} mb-1 shadow-sm`}>
                                    <cat.icon className="w-5 h-5" />
                                </div>
                                <span className={`text-[11px] font-semibold ${activeCategory === idx ? 'text-teal-700' : 'text-gray-600'}`}>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preferences</h3>
                        <button className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline">Edit</button>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 hover:border-teal-100 hover:bg-teal-50/30 cursor-pointer transition-all group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={filters.wheelchair}
                                    onChange={(e) => setFilters(prev => ({ ...prev, wheelchair: e.target.checked }))}
                                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-lg checked:bg-teal-500 checked:border-teal-500 transition-colors"
                                />
                                <Check className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                            <div>
                                <span className="block text-sm font-semibold text-gray-700 group-hover:text-teal-900">Wheelchair Friendly</span>
                                <span className="block text-xs text-gray-400 group-hover:text-teal-600/70">Ramps & Elevators</span>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 hover:border-teal-100 hover:bg-teal-50/30 cursor-pointer transition-all group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={filters.crowded}
                                    onChange={(e) => setFilters(prev => ({ ...prev, crowded: e.target.checked }))}
                                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-lg checked:bg-teal-500 checked:border-teal-500 transition-colors"
                                />
                                <Check className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                            <div>
                                <span className="block text-sm font-semibold text-gray-700 group-hover:text-teal-900">Less Crowded</span>
                                <span className="block text-xs text-gray-400 group-hover:text-teal-600/70">Quiet routes</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Nearby Locations */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Nearby</h3>
                    <div className="space-y-4">
                        {filteredLocations.length > 0 ? (
                            filteredLocations.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => onSelect(item.id)}
                                    className={`group p-4 bg-white border rounded-3xl cursor-pointer transition-all duration-300 
                                        ${selectedId === item.id
                                            ? 'border-teal-500 shadow-md ring-1 ring-teal-500/20'
                                            : 'border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-teal-100'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl transition-colors ${selectedId === item.id ? 'bg-teal-50' : 'bg-gray-50 group-hover:bg-teal-50'}`}>
                                                <MapPin className={`w-5 h-5 ${selectedId === item.id ? 'text-teal-600' : 'text-gray-500 group-hover:text-teal-600'}`} />
                                            </div>
                                            <div>
                                                <h4 className={`font-bold transition-colors ${selectedId === item.id ? 'text-teal-700' : 'text-gray-900 group-hover:text-teal-700'}`}>{item.name}</h4>
                                                <p className="text-xs text-gray-500 font-medium">{item.type}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${item.access === 'High' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {item.access} Access
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-400 pl-[52px]">
                                        <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> {item.dist}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.status}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-8 text-gray-400">
                                <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                <p className="text-sm">No locations found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
    );
};

export default Sidebar;
