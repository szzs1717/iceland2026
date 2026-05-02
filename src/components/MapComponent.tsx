import React, { useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { Location } from '../data/itinerary';
import { cn } from '../lib/utils';

interface MapLocation extends Location {
  day?: number;
}

interface MapComponentProps {
  locations: MapLocation[];
  selectedLocation: MapLocation | null;
  onSelectLocation?: (location: MapLocation) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({ locations, selectedLocation, onSelectLocation }) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef>(null);
  const [scale, setScale] = React.useState(1);

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
      // Small timeout ensures the element exists in DOM and Map has calculated its position
      const timeoutId = setTimeout(() => {
        zoomToElement(`marker-${selectedLocation.id}`, 3.5, 1000);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedLocation]);

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="relative w-full aspect-[4/3] bg-[#F2EFE9] rounded-3xl overflow-hidden border border-[#D9D4C7] shadow-xl group">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
        
        {/* Grid Lines (Subtle) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

        <TransformWrapper
          ref={transformComponentRef}
          initialScale={1}
          minScale={0.8}
          maxScale={12}
          centerOnInit={true}
          doubleClick={{ disabled: false }}
          panning={{ velocityDisabled: true }}
          onTransformed={(ref) => setScale(ref.state.scale)}
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
                {/* Text Halo Filter for better readability */}
                <filter id="halo" x="-20%" y="-20%" width="140%" height="140%">
                  <feMorphology in="SourceAlpha" result="dilated" operator="dilate" radius="0.3" />
                  <feFlood floodColor="white" floodOpacity="0.8" result="flood" />
                  <feComposite in="flood" in2="dilated" operator="in" result="outline" />
                  <feGaussianBlur in="outline" stdDeviation="0.1" result="blurred" />
                  <feMerge>
                    <feMergeNode in="blurred" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
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
              <g clipPath="url(#iceland-clip)" opacity={selectedLocation ? 0.3 : 0.6} className="transition-opacity duration-500">
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
                    filter="url(#halo)"
                    className="font-bold uppercase fill-[#666] serif opacity-40 pointer-events-none"
                    style={{ 
                      letterSpacing: '0.15em',
                      fontSize: `${Math.max(0.8, 1.8 / Math.sqrt(scale))}px`
                    }}
                  >
                    {region.name}
                  </text>
                );
              })}

              {/* Inactive Markers Layer */}
              {markers.filter(loc => selectedLocation?.id !== loc.id).map((loc) => {
                const pos = project(loc.coordinates.lat, loc.coordinates.lng);
                return (
                  <g 
                    key={loc.id} 
                    className="cursor-pointer group/marker"
                    onClick={() => onSelectLocation?.(loc)}
                    opacity={selectedLocation ? 0.4 : 1}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={Math.max(0.8, 1.8 / Math.sqrt(scale))}
                      fill="#8C8C8C"
                      className="group-hover/marker:fill-ink transition-colors duration-300"
                    />
                    {loc.day && (
                      <text
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-white font-bold pointer-events-none"
                        style={{ fontSize: `${Math.max(0.6, 1.2 / Math.sqrt(scale))}px` }}
                      >
                        {loc.day}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Active Marker & Labels Layer (Top-most) */}
              {selectedLocation && (() => {
                const loc = selectedLocation;
                const pos = project(loc.coordinates.lat, loc.coordinates.lng);
                return (
                  <g key={loc.id} id={`marker-${loc.id}`}>
                    {/* Ripple animation */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={Math.max(2, 6 / Math.sqrt(scale))}
                      fill="none"
                      stroke="#1A1A1A"
                      strokeWidth={0.1 / Math.sqrt(scale)}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />

                    {/* Active Marker Dot */}
                    <motion.g animate={{ scale: 1.2 }}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={Math.max(1, 2.2 / Math.sqrt(scale))}
                        fill="#1A1A1A"
                      />
                      {loc.day && (
                        <text
                          x={pos.x}
                          y={pos.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-white font-bold pointer-events-none"
                          style={{ fontSize: `${Math.max(0.7, 1.4 / Math.sqrt(scale))}px` }}
                        >
                          {loc.day}
                        </text>
                      )}
                    </motion.g>

                    {/* Active Labels with Halo */}
                    <motion.g
                      initial={{ opacity: 0, y: 1 }}
                      animate={{ opacity: 1, y: 0 }}
                      filter="url(#halo)"
                    >
                      <text
                        x={pos.x}
                        y={pos.y - (8 / Math.sqrt(scale))}
                        textAnchor="middle"
                        className="font-black serif fill-black"
                        style={{ fontSize: `${Math.max(3.5, 9 / Math.sqrt(scale))}px` }}
                      >
                        {loc.name}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y - (4.5 / Math.sqrt(scale))}
                        textAnchor="middle"
                        className="font-bold uppercase tracking-widest fill-gray-500 serif"
                        style={{ fontSize: `${Math.max(1.8, 4.5 / Math.sqrt(scale))}px` }}
                      >
                        {loc.nameEn}
                      </text>
                    </motion.g>
                  </g>
                );
              })()}
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
