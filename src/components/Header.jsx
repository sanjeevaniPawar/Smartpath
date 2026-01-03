import React from 'react';
import { MapPin, Accessibility, Menu, Globe } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 w-full z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-teal-700">
                    <Globe className="w-8 h-8" />
                    <h1 className="text-xl font-bold tracking-tight">SmartPath</h1>
                </div>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <select className="bg-transparent text-gray-700 font-medium focus:outline-none cursor-pointer">
                    <option>Main Campus</option>
                    <option>North Campus</option>
                    <option>Medical Center</option>
                </select>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Near Engineering Block B</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">Wheelchair Mode</span>
                    <button
                        className="w-12 h-6 bg-teal-600 rounded-full relative transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        aria-checked="true"
                        role="switch"
                    >
                        <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
                    </button>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
};

export default Header;
