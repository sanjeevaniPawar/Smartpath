import React, { useState } from 'react';
import { Sparkles, Mic, Eye, Route, Volume2, X } from 'lucide-react';

const AIGuide = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const handleVoiceClick = () => {
        setIsListening(true);
        // Simulate listening delay
        setTimeout(() => {
            setIsListening(false);
            setIsOpen(true);
            // In a real app, this would process speech
            alert("Voice Command: 'Find nearest library' (Simulated)");
        }, 2000);
    };

    return (
        <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* Expanded AI Card */}
            {isOpen && (
                <div className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl w-80 mb-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-teal-500 fill-current" />
                                Smart Guide
                            </h3>
                            <p className="text-xs text-gray-500">How can I assist you today?</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleVoiceClick}
                            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all group ${isListening ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-gray-50 hover:bg-teal-50 hover:scale-[1.02] border border-transparent hover:border-teal-100'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isListening ? 'bg-red-500' : 'bg-gray-900'} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
                            </div>
                            <div className="text-left">
                                <span className={`block font-bold text-sm ${isListening ? 'text-red-600' : 'text-gray-900'}`}>{isListening ? 'Listening...' : 'Voice Navigation'}</span>
                                <span className="block text-[10px] text-gray-400">"Take me to the library"</span>
                            </div>
                        </button>

                        <button className="w-full p-4 bg-gray-50 hover:bg-teal-50 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition-all border border-transparent hover:border-teal-100 group">
                            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Eye className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block font-bold text-sm text-gray-900">Visual Assistance</span>
                                <span className="block text-[10px] text-gray-400">Describe surroundings</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="pointer-events-auto h-16 bg-gray-900 text-white pl-4 pr-6 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all group"
                >
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center relative">
                        <Sparkles className="w-5 h-5 text-white fill-white" />
                        <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div className="text-left">
                        <span className="block text-sm font-bold">Ask AI</span>
                        <span className="block text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors">Start Assistant</span>
                    </div>
                </button>
            )}
        </div>
    );
};

export default AIGuide;
