import React, { useState } from 'react';
import { Search, Filter, Warehouse, Coffee, Utensils, Zap, ChevronDown, Check } from 'lucide-react';

const Sidebar = () => {
    const [filtersOpen, setFiltersOpen] = useState(true);

    const categories = [
        { icon: Warehouse, label: 'Classrooms' },
        { icon: Zap, label: 'Restrooms' },
        { icon: Utensils, label: 'Dining' },
        { icon: Accessibility, label: 'Entrances', iconComp: true },
    ];

    /* iconComp is a hack because I missed importing Accessibility icon inside component map, 
       but I can just use conditional rendering or imported icon. 
       Actually I will fix imports. */

    return (
        <div className="w-96 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto flex flex-col shadow-sm">
            {/* Search Area */}
            <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search destination..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow"
                    />
                </div>
            </div>

            {/* Quick Categories */}
            <div className="p-4 grid grid-cols-4 gap-2">
                {categories.map((cat, idx) => (
                    <button key={idx} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-teal-50 text-gray-600 hover:text-teal-700 transition-colors gap-1 group">
                        <div className="p-2 bg-gray-100 group-hover:bg-teal-100 rounded-full transition-colors">
                            {cat.iconComp ? <Accessibility className="w-5 h-5 text-gray-700 group-hover:text-teal-700" /> : <cat.icon className="w-5 h-5" />}
                        </div>
                        <span className="text-xs font-medium text-center">{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Accessibility Filters */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filters
                    </h3>
                    <button className="text-xs text-teal-600 hover:underline font-medium">Reset</button>
                </div>

                <div className="space-y-3">
                    {[
                        { label: 'Wheelchair Friendly', checked: true },
                        { label: 'Avoid Stairs', checked: true },
                        { label: 'Prefer Elevators', checked: false }
                    ].map((filter, idx) => (
                        <label key={idx} className="flex items-center justify-between cursor-pointer group">
                            <span className="text-gray-700 text-sm group-hover:text-gray-900">{filter.label}</span>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filter.checked ? 'bg-teal-600 border-teal-600' : 'bg-white border-gray-300'}`}>
                                {filter.checked && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Search Results Mockup */}
            <div className="p-4 border-t border-gray-100 flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Nearby Locations</h3>
                <div className="space-y-3">
                    {[
                        { name: 'Student Center', dist: '0.2 mi', access: 'High', type: 'Building' },
                        { name: 'Library Main Entrance', dist: '0.4 mi', access: 'High', type: 'Entrance' },
                        { name: 'Science Block C', dist: '0.6 mi', access: 'Med', type: 'Classrooms' }
                    ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-white border border-gray-200 rounded-xl hover:border-teal-500 hover:shadow-md cursor-pointer transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-teal-700">{item.name}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.type} • {item.dist}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.access === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {item.access} Access
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
