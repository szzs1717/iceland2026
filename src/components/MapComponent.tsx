import React, { useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { Location } from '../data/itinerary';
import { cn } from '../lib/utils';

interface MapComponentProps {
  locations: Location[];
  selectedLocation: Location | null;
  onSelectLocation?: (location: Location) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({ locations, selectedLocation, onSelectLocation }) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef>(null);

  // Iceland bounding box for mapping coordinates to SVG
  const bounds = {
    minLat: 63.3,
    maxLat: 66.6,
    minLng: -24.5,
    maxLng: -13.5
  };

  const project = (lat: number, lng: number) => {
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    const y = 100 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
    return { x, y };
  };

  // More accurate Iceland outline path
  const icelandPath = "M 30,30 L 26,26 C 22,18 15,15 12,18 C 10,22 12,28 18,32 C 15,35 10,38 12,45 C 14,48 18,50 16,55 C 12,58 8,62 14,70 C 16,75 20,82 26,85 L 35,88 L 45,86 L 55,92 L 65,90 L 75,88 L 85,95 L 92,85 L 98,75 L 95,60 L 92,50 L 90,40 L 95,30 L 90,20 L 85,10 L 70,5 L 60,8 L 50,12 L 40,5 L 35,10 L 32,15 Z";

  const regionColors = [
    { id: 'westfjords', color: '#E2E8D5', label: 'Westfjords (西峽灣)', cx: 18, cy: 25, r: 20 },
    { id: 'north', color: '#F5E6D3', label: 'North (北部)', cx: 60, cy: 25, r: 30 },
    { id: 'east', color: '#E8D5E2', label: 'East (東部)', cx: 85, cy: 55, r: 25 },
    { id: 'south', color: '#D5E2E8', label: 'South (南部)', cx: 55, cy: 80, r: 35 },
    { id: 'west', color: '#D5E8E2', label: 'West (西部)', cx: 20, cy: 60, r: 25 },
    { id: 'highlands', color: '#F0F0F0', label: 'Highlands (高地)', cx: 55, cy: 50, r: 20 }
  ];

  const markers = useMemo(() => {
    return locations.filter(l => l.type === 'sight' || l.type === 'hotel' || l.type === 'restaurant');
  }, [locations]);

  const majorCities = [
    { name: "Reykjavík", lat: 64.1466, lng: -21.9426 },
    { name: "Akureyri", lat: 65.6835, lng: -18.0879 },
    { name: "Vík", lat: 63.4194, lng: -19.0060 },
    { name: "Höfn", lat: 64.2539, lng: -15.2082 },
    { name: "Keflavík", lat: 63.9994, lng: -22.5583 },
    { name: "KEF Airport", lat: 63.9850, lng: -22.6056 },
    { name: "Egilsstaðir", lat: 65.2669, lng: -14.3948 },
    { name: "Ísafjörður", lat: 66.0749, lng: -23.1251 },
    { name: "Selfoss", lat: 63.9335, lng: -21.0013 }
  ];

  const regions = [
    { name: "Westfjords", lat: 65.9, lng: -22.5 },
    { name: "North Iceland", lat: 65.5, lng: -18.5 },
    { name: "East Iceland", lat: 65.0, lng: -14.5 },
    { name: "South Coast", lat: 63.7, lng: -18.5 },
    { name: "Snaefellsnes", lat: 64.8, lng: -23.5 },
    { name: "Golden Circle", lat: 64.2, lng: -20.5 },
    { name: "Vatnajökull", lat: 64.4, lng: -16.8 },
    { name: "Highlands", lat: 64.7, lng: -18.0 }
  ];

  // Handle programmatic zoom when selectedLocation changes
  useEffect(() => {
    if (selectedLocation && transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current;
      zoomToElement(`marker-${selectedLocation.id}`, 2.5, 800);
    }
  }, [selectedLocation]);

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="relative w-full aspect-[4/3] bg-[#F2EFE9] rounded-3xl overflow-hidden border border-[#D9D4C7] shadow-inner group">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
        
        {/* Grid Lines (Subtle) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

        <TransformWrapper
          ref={transformComponentRef}
          initialScale={1}
          minScale={0.8}
          maxScale={8}
          centerOnInit={true}
          doubleClick={{ disabled: false }}
          panning={{ velocityDisabled: true }}
        >
          <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full p-8 drop-shadow-sm"
            >
              <defs>
                <clipPath id="iceland-clip">
                  <path d={icelandPath} />
                </clipPath>
              </defs>

              {/* Iceland Outline Background */}
              <motion.path
                d={icelandPath}
                fill="#E8E4D8"
                stroke="#A6A295"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Colored Regions (Clipped to Iceland) */}
              <g clipPath="url(#iceland-clip)" opacity="0.6">
                {regionColors.map(r => (
                  <circle key={r.id} cx={r.cx} cy={r.cy} r={r.r} fill={r.color} />
                ))}
              </g>

              {/* Arctic Circle */}
              <line x1="0" y1="1.5" x2="100" y2="1.5" stroke="#A6A295" strokeWidth="0.1" strokeDasharray="1 1" opacity="0.3" />
              <text x="2" y="3" className="text-[1.5px] fill-[#A6A295] serif opacity-30">Arctic Circle</text>

              {/* Ocean Labels */}
              <text x="50" y="5" textAnchor="middle" className="text-[3px] italic fill-[#A6A295] serif opacity-20 pointer-events-none tracking-[0.5em]">Greenland Sea</text>
              <text x="5" y="50" textAnchor="middle" transform="rotate(-90 5 50)" className="text-[3px] italic fill-[#A6A295] serif opacity-20 pointer-events-none tracking-[0.5em]">Denmark Strait</text>
              <text x="95" y="50" textAnchor="middle" transform="rotate(90 95 50)" className="text-[3px] italic fill-[#A6A295] serif opacity-20 pointer-events-none tracking-[0.5em]">Norwegian Sea</text>
              <text x="50" y="95" textAnchor="middle" className="text-[3px] italic fill-[#A6A295] serif opacity-20 pointer-events-none tracking-[0.5em]">North Atlantic Ocean</text>

              {/* Regions (Subtle Labels) */}
              {regions.map((region) => {
                const pos = project(region.lat, region.lng);
                return (
                  <text
                    key={region.name}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    className="text-[1.8px] font-bold uppercase fill-[#666] serif opacity-40 pointer-events-none"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    {region.name}
                  </text>
                );
              })}

              {/* Major Cities (Background Labels) */}
              {majorCities.map((city) => {
                const pos = project(city.lat, city.lng);
                return (
                  <g key={city.name} className="pointer-events-none opacity-40">
                    <circle cx={pos.x} cy={pos.y} r="0.4" fill="#A6A295" />
                    <text
                      x={pos.x}
                      y={pos.y + 2}
                      textAnchor="middle"
                      className="text-[2.5px] font-bold uppercase tracking-widest fill-[#8C8C8C] serif"
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}

              {/* Markers */}
              {markers.map((loc) => {
                const pos = project(loc.coordinates.lat, loc.coordinates.lng);
                const isSelected = selectedLocation?.id === loc.id;
                
                return (
                  <g key={loc.id} id={`marker-${loc.id}`}>
                    {/* Connection Line (if selected) */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r="4"
                          fill="none"
                          stroke="#1A1A1A"
                          strokeWidth="0.2"
                          strokeDasharray="1 1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.3 }}
                          exit={{ scale: 0, opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Marker Dot */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? 1.5 : 1}
                      fill={isSelected ? "#1A1A1A" : "#8C8C8C"}
                      className="cursor-pointer transition-colors duration-300"
                      whileHover={{ scale: 1.5 }}
                      onClick={() => onSelectLocation?.(loc)}
                      animate={{ 
                        scale: isSelected ? 1.2 : 1,
                        fill: isSelected ? "#1A1A1A" : "#8C8C8C"
                      }}
                    />

                    {/* Label (only for selected or on hover) */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.g
                          initial={{ opacity: 0, y: 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 2 }}
                        >
                          <text
                            x={pos.x}
                            y={pos.y - 6}
                            textAnchor="middle"
                            className="text-[8px] font-black serif fill-ink"
                            style={{ filter: 'drop-shadow(0px 1px 1px rgba(255,255,255,0.9))' }}
                          >
                            {loc.name}
                          </text>
                          <text
                            x={pos.x}
                            y={pos.y - 3}
                            textAnchor="middle"
                            className="text-[4px] font-bold uppercase tracking-widest fill-gray-500 serif"
                            style={{ filter: 'drop-shadow(0px 1px 1px rgba(255,255,255,0.9))' }}
                          >
                            {loc.nameEn}
                          </text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}
            </svg>
          </TransformComponent>
        </TransformWrapper>

        {/* Compass Rose (Decorative) */}
        <div className="absolute bottom-4 right-4 opacity-20 pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40" className="rotate-12">
            <circle cx="20" cy="20" r="18" fill="none" stroke="#A6A295" strokeWidth="0.5" strokeDasharray="1 2" />
            <path d="M 20,2 L 20,38 M 2,20 L 38,20" stroke="#A6A295" strokeWidth="0.5" />
            <text x="20" y="6" textAnchor="middle" className="text-[4px] fill-[#A6A295] font-serif">N</text>
          </svg>
        </div>

        {/* Scale Bar */}
        <div className="absolute bottom-16 right-4 flex flex-col items-end gap-1 opacity-40">
          <div className="flex items-end h-1 border-x border-b border-[#A6A295] w-12" />
          <span className="text-[6px] font-mono text-[#A6A295]">100 km</span>
        </div>

        {/* Zoom Controls (Floating) */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <button 
            onClick={() => transformComponentRef.current?.zoomIn()}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-2xl font-bold shadow-md active:scale-90 transition-transform"
          >
            +
          </button>
          <button 
            onClick={() => transformComponentRef.current?.zoomOut()}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-2xl font-bold shadow-md active:scale-90 transition-transform"
          >
            -
          </button>
        </div>
      </div>

      {/* Map Legend - Moved outside the map area */}
      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-gray-100 pb-1 mb-2 block">冰島區域說明 (Iceland Regions)</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-2">
          {regionColors.map(r => (
            <div key={r.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: r.color }} />
              <span className="text-[10px] font-medium text-gray-600 whitespace-nowrap">{r.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
