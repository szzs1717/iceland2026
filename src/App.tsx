import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Calendar, Map, Info, ChevronRight, Menu, X, Share2, ArrowRight, Sun, Sunrise, Sunset, Filter, RefreshCw, Coins } from 'lucide-react';
import { ITINERARY_DATA, DayPlan } from './data/itinerary';
import { LocationItem } from './components/LocationItem';
import { WeatherWidget } from './components/WeatherWidget';
import { MapComponent } from './components/MapComponent';
import { cn } from './lib/utils';
import { Location } from './data/itinerary';

export default function App() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'map' | 'calendar' | 'info'>('itinerary');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filter, setFilter] = useState<'all' | 'sight' | 'restaurant' | 'hotel'>('all');
  const [resetMapKey, setResetMapKey] = useState(0);
  const [exchangeRates, setExchangeRates] = useState<{HKD: number, CAD: number, USD: number} | null>(null);
  const [inputAmount, setInputAmount] = useState<string>('1000');
  const [targetCurrency, setTargetCurrency] = useState<'HKD' | 'CAD' | 'USD'>('HKD');

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=ISK&to=HKD,CAD,USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setExchangeRates(data.rates);
        }
      })
      .catch(err => console.error('Failed to fetch exchange rates', err));
  }, []);

  const currentDayPlan = ITINERARY_DATA.find(d => d.day === activeDay) || ITINERARY_DATA[0];

  const handleResetMap = () => {
    setSelectedLocation(null);
    setResetMapKey(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'itinerary':
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
            {/* Day Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-accent">{currentDayPlan.date}</span>
                <WeatherWidget location={currentDayPlan.locationName} />
              </div>
              
              {/* Daylight Info */}
              <div className="flex items-center gap-4 mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Sunrise className="w-4 h-4 text-orange-400" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Sunrise</span>
                    <span className="text-xs font-bold">06:12</span>
                  </div>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex items-center gap-2">
                  <Sunset className="w-4 h-4 text-blue-400" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Sunset</span>
                    <span className="text-xs font-bold">20:45</span>
                  </div>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-accent" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Daylight</span>
                    <span className="text-xs font-bold">14h 33m</span>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold serif leading-tight">{currentDayPlan.title}</h2>
              <div className="h-1 w-12 bg-ink mt-4" />
            </div>

              {/* Timeline */}
              <div className="flex flex-col">
                {currentDayPlan.locations.map((loc) => (
                  <LocationItem key={loc.id} location={loc} />
                ))}
              </div>

              {/* Next Day Preview */}
              {activeDay < ITINERARY_DATA.length && (
                <button 
                  onClick={() => {
                    setActiveDay(activeDay + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-12 w-full p-6 rounded-2xl border border-gray-200 flex items-center justify-between group hover:border-ink transition-all"
                >
                  <div className="text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Next Day</span>
                    <h4 className="text-lg font-bold serif">{ITINERARY_DATA.find(d => d.day === activeDay + 1)?.title}</h4>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        );
      case 'map':
        const allLocations = ITINERARY_DATA.flatMap(d => d.locations);
        const filteredLocations = allLocations.filter(l => filter === 'all' || l.type === filter);

        const handleLocationSelect = (loc: Location) => {
          setSelectedLocation(loc);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const scrollToDay = (day: number) => {
          const element = document.getElementById(`day-section-${day}`);
          if (element) {
            const offset = 100; // Offset for sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        };

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold serif">景點地圖清單</h2>
              <button 
                onClick={handleResetMap}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-ink text-xs font-bold hover:bg-gray-200 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                重置地圖
              </button>
            </div>
            
            {/* Map at the top */}
            <div className="sticky top-[72px] z-40 bg-paper/80 backdrop-blur-sm pb-4">
              <MapComponent 
                key={resetMapKey}
                locations={filteredLocations} 
                selectedLocation={selectedLocation} 
                onSelectLocation={handleLocationSelect}
              />
              
              {/* Category Filters */}
              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
                <button 
                  onClick={() => setFilter('all')}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                    filter === 'all' ? "bg-ink text-white" : "bg-white border border-gray-200 text-accent"
                  )}
                >
                  全部
                </button>
                <button 
                  onClick={() => setFilter('sight')}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                    filter === 'sight' ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-accent"
                  )}
                >
                  景點
                </button>
                <button 
                  onClick={() => setFilter('restaurant')}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                    filter === 'restaurant' ? "bg-orange-500 text-white" : "bg-white border border-gray-200 text-accent"
                  )}
                >
                  餐廳
                </button>
                <button 
                  onClick={() => setFilter('hotel')}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                    filter === 'hotel' ? "bg-green-500 text-white" : "bg-white border border-gray-200 text-accent"
                  )}
                >
                  住宿
                </button>
              </div>

              {/* Day Navigation Directory */}
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-3">
                {ITINERARY_DATA.map(day => (
                  <button
                    key={day.day}
                    onClick={() => scrollToDay(day.day)}
                    className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-sm font-bold hover:border-ink hover:bg-gray-50 transition-all shadow-sm bg-white"
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 mt-8">
              {ITINERARY_DATA.map(day => {
                const dayLocations = day.locations.filter(l => (filter === 'all' || l.type === filter) && (l.type === 'sight' || l.type === 'restaurant' || l.type === 'hotel'));
                if (dayLocations.length === 0) return null;

                return (
                  <div key={day.day} id={`day-section-${day.day}`} className="scroll-mt-40">
                    <div className="flex items-baseline gap-3 mb-4 border-b border-gray-100 pb-2">
                      <h3 className="text-2xl font-bold serif">Day {day.day}</h3>
                      <span className="text-sm text-accent font-medium">{day.date}</span>
                    </div>
                    <div className="space-y-4">
                      {dayLocations.map(loc => (
                        <button 
                          key={loc.id} 
                          onClick={() => handleLocationSelect(loc)}
                          className={cn(
                            "w-full p-5 rounded-2xl border flex items-center justify-between text-left transition-all",
                            selectedLocation?.id === loc.id ? "border-ink bg-gray-50 shadow-md scale-[1.02]" : "border-gray-100 hover:border-gray-200"
                          )}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs font-bold text-accent uppercase tracking-wider">{loc.time}</span>
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                                loc.type === 'sight' ? "bg-blue-50 text-blue-600" : 
                                loc.type === 'restaurant' ? "bg-orange-50 text-orange-600" : 
                                "bg-green-50 text-green-600"
                              )}>
                                {loc.type === 'sight' ? '景點' : loc.type === 'restaurant' ? '餐廳' : '住宿'}
                              </span>
                            </div>
                            <h4 className="font-bold text-lg mb-0.5">{loc.name}</h4>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">{loc.nameEn}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{loc.description}</p>
                          </div>
                          <div className="p-3 bg-white rounded-full shadow-sm ml-4">
                            <Map className="w-5 h-5 text-ink" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      case 'calendar':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8"
          >
            <h2 className="text-2xl font-bold serif mb-6">行程日曆</h2>
            <div className="space-y-4">
              {ITINERARY_DATA.map(day => (
                <button 
                  key={day.day}
                  onClick={() => {
                    setActiveDay(day.day);
                    setActiveTab('itinerary');
                  }}
                  className="w-full p-4 rounded-xl border border-gray-100 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-bold serif">
                    {day.day}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{day.date}</p>
                    <h4 className="font-bold">{day.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'info':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8"
          >
            <h2 className="text-2xl font-bold serif mb-6">旅行資訊</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gray-50">
                <h3 className="font-bold mb-2">關於行程</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  這是一份為期 11 天的冰島自駕探險計畫。涵蓋了雷克雅維克、金圈、斯奈山半島、北部阿庫雷里、米湖以及壯麗的南岸。
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  旅遊安全小貼士
                </h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                  <li>每日出發前必看 <span className="font-bold text-ink">road.is</span> (路況) 與 <span className="font-bold text-ink">vedur.is</span> (天氣)。</li>
                  <li>切勿在公路中間停車拍照，冰島路窄且風大，非常危險。</li>
                  <li>在黑沙灘 (Reynisfjara) 嚴防「瘋狗浪」(Sneaker Waves)，切勿背對大海。</li>
                  <li>地熱區與瀑布請務必待在標記步道內，保護生態也保護自己。</li>
                  <li>冰島天氣多變，請採用「洋蔥式穿法」，防風防水層是必備。</li>
                  <li>尊重自然：不要踐踏脆弱的青苔 (Moss)，它們需要數十年才能恢復。</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-500" />
                  匯率計算機 (Currency Calculator)
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">輸入金額 (ISK)</label>
                    <input 
                      type="number" 
                      value={inputAmount}
                      onChange={(e) => setInputAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-lg font-serif"
                      placeholder="例如: 1000"
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">兌換貨幣</label>
                    <select 
                      value={targetCurrency}
                      onChange={(e) => setTargetCurrency(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all bg-white text-sm font-bold"
                    >
                      <option value="HKD">港幣 (HKD)</option>
                      <option value="CAD">加幣 (CAD)</option>
                      <option value="USD">美金 (USD)</option>
                    </select>
                  </div>
                  <div className="flex-1 bg-ink text-white p-4 rounded-xl flex flex-col items-center justify-center min-h-[80px]">
                    <span className="text-[10px] uppercase tracking-widest opacity-50 mb-1">計算結果 (Result)</span>
                    <div className="text-2xl font-bold serif">
                      {exchangeRates ? (
                        `${targetCurrency === 'HKD' ? 'HK$' : targetCurrency === 'CAD' ? 'C$' : 'US$'} ${(parseFloat(inputAmount || '0') * exchangeRates[targetCurrency]).toFixed(2)}`
                      ) : '載入中...'}
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 mt-4 italic text-center">
                  * 匯率由 API 即時提供，僅供參考。建議在冰島多使用信用卡，幾乎全境通用。
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50">
                <h3 className="font-bold mb-2">聯絡資訊</h3>
                <p className="text-sm text-gray-600">
                  緊急電話：112<br />
                  路況查詢：www.road.is<br />
                  天氣查詢：en.vedur.is
                </p>
              </div>
              <div className="mt-8 text-center">
                <p className="text-[10px] text-accent uppercase tracking-widest">Odyssey 2026</p>
                <p className="text-[10px] text-gray-400 mt-2">Designed for Iceland Adventure</p>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-paper shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold serif tracking-tight">ICELAND</h1>
          <p className="text-[10px] tracking-[0.2em] text-accent uppercase font-medium">Odyssey 2026</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-ink" />
          </button>
        </div>
      </header>

      {/* Day Selector (Horizontal Scroll) - Only show in itinerary tab */}
      {activeTab === 'itinerary' && (
        <div className="px-6 py-6 overflow-x-auto flex gap-4 no-scrollbar bg-paper">
          {ITINERARY_DATA.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={cn(
                "flex flex-col items-center min-w-[64px] transition-all duration-300",
                activeDay === day.day ? "scale-110" : "opacity-40"
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest mb-1">Day</span>
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold serif border",
                activeDay === day.day ? "bg-ink text-white border-ink" : "bg-transparent text-ink border-gray-200"
              )}>
                {day.day}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 px-6 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Nav (Floating) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] h-16 glass-card rounded-full flex items-center justify-around px-4 shadow-xl z-50">
        <button 
          onClick={() => setActiveTab('itinerary')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            activeTab === 'itinerary' ? "text-ink scale-110" : "text-accent opacity-50"
          )}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase">行程</span>
        </button>
        <button 
          onClick={() => setActiveTab('map')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            activeTab === 'map' ? "text-ink scale-110" : "text-accent opacity-50"
          )}
        >
          <Map className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase">地圖</span>
        </button>
        <button 
          onClick={() => setActiveTab('calendar')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            activeTab === 'calendar' ? "text-ink scale-110" : "text-accent opacity-50"
          )}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase">日曆</span>
        </button>
        <button 
          onClick={() => setActiveTab('info')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            activeTab === 'info' ? "text-ink scale-110" : "text-accent opacity-50"
          )}
        >
          <Info className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase">資訊</span>
        </button>
      </nav>
    </div>
  );
}
