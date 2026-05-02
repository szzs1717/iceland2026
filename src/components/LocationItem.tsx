import React from 'react';
import { Navigation, MapPin, Utensils, Car, Hotel, Info, Tag, ShoppingBag, UtensilsCrossed, Key, AlertTriangle, Droplets } from 'lucide-react';
import { Location } from '../data/itinerary';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LocationItemProps {
  location: Location;
}

export const LocationItem: React.FC<LocationItemProps> = ({ location }) => {
  const openNav = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const getIcon = () => {
    switch (location.type) {
      case 'sight': return <MapPin className="w-5 h-5" />;
      case 'restaurant': return <Utensils className="w-5 h-5" />;
      case 'transport': return <Car className="w-5 h-5" />;
      case 'hotel': return <Hotel className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-10 last:pb-0 border-l border-gray-200 ml-3"
    >
      {/* Timeline Dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-ink z-10" />
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">{location.time}</span>
          <button 
            onClick={openNav}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-white text-xs font-medium hover:bg-opacity-80 transition-all active:scale-95"
          >
            <Navigation className="w-3.5 h-3.5" />
            導航
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold serif leading-tight mb-0.5">{location.name}</h3>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">{location.nameEn}</p>
          <p className="text-base text-accent leading-relaxed">{location.description}</p>
        </div>

        {/* Tags & Insights */}
        <div className="flex flex-wrap gap-2 mt-1">
          {location.stayDuration && location.type === 'hotel' && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-bold">
              <Hotel className="w-3.5 h-3.5" />
              住宿: {location.stayDuration} 晚
            </div>
          )}
          {location.stayDuration && location.type !== 'hotel' && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-100 rounded text-xs font-bold">
              <Info className="w-3.5 h-3.5" />
              預計停留: {location.stayDuration} 分鐘
            </div>
          )}
          {location.breakfastIncluded && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded text-xs font-bold">
              <Utensils className="w-3.5 h-3.5" />
              包早餐
            </div>
          )}
          {location.selfCatering && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 rounded text-xs font-bold animate-pulse">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              需自理 (自炊)
            </div>
          )}
          {location.waterproofRequired && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-bold">
              <Droplets className="w-3.5 h-3.5" />
              必備防水衣物
            </div>
          )}
          {location.mustEat?.map((item, i) => (
            <div key={i} className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-must-eat border border-orange-100 rounded text-xs font-bold">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              必吃: {item}
            </div>
          ))}
          {location.mustBuy?.map((item, i) => (
            <div key={i} className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-must-buy border border-green-100 rounded text-xs font-bold">
              <ShoppingBag className="w-3.5 h-3.5" />
              必買: {item}
            </div>
          ))}
        </div>

        {location.story && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg border-l-2 border-accent italic text-sm text-accent leading-relaxed">
            <span className="font-bold block mb-1 not-italic text-xs uppercase tracking-wider">景點故事</span>
            「{location.story}」
          </div>
        )}

        {location.tips && location.tips.length > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            {location.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-accent">
                <div className="mt-1 w-1 h-1 rounded-full bg-accent shrink-0" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}

        {location.bookingNotes && location.bookingNotes.length > 0 && (
          <div className="mt-2 p-3 bg-red-50 rounded-lg border-l-2 border-red-500 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-red-700 font-bold text-xs uppercase tracking-wider">
              <Key className="w-3.5 h-3.5" />
              必備項目 / 憑證 (Booking Essential)
            </div>
            {location.bookingNotes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-red-700 font-bold leading-relaxed">
                <div className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {location.precautions && location.precautions.length > 0 && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg border-l border-gray-100 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase tracking-wider">
              <Info className="w-3.5 h-3.5" />
              注意事項
            </div>
            {location.precautions.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                <div className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {location.driveInfo && (
          <div className="mt-4 flex items-center gap-3 py-2 px-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Car className="w-3.5 h-3.5 text-ink" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Next Drive</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-ink">{location.driveInfo.time}</span>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-500">{location.driveInfo.distance}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
