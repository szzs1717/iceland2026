import { GoogleGenAI } from "@google/genai";

export interface Location {
  id: string;
  time: string;
  name: string;
  nameEn: string;
  description: string;
  type: 'sight' | 'restaurant' | 'transport' | 'hotel';
  coordinates: { lat: number; lng: number };
  imageUrl?: string;
  tips?: string[];
  mustEat?: string[];
  mustBuy?: string[];
  bookingCode?: string;
  story?: string;
  driveInfo?: { time: string; distance: string };
}

export interface DayPlan {
  day: number;
  date: string;
  title: string;
  locationName: string; // For weather lookup
  locations: Location[];
}

export const ITINERARY_DATA: DayPlan[] = [
  {
    day: 1,
    date: '2026-05-22',
    title: '抵達冰島：冒險的起點',
    locationName: 'Keflavik',
    locations: [
      {
        id: 'flight-sfo',
        time: '06:15',
        name: 'SFO 航班抵達 (FI662)',
        nameEn: 'SFO Flight Arrival (FI662)',
        description: '從舊金山飛來的夥伴們，恭喜你們最早抵達！冰島的冷空氣會瞬間治好你們的時差。',
        type: 'transport',
        coordinates: { lat: 63.985, lng: -22.6056 },
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'flight-hkg',
        time: '07:50',
        name: 'HKG 航班抵達 (AY157)',
        nameEn: 'HKG Flight Arrival (AY157)',
        description: '香港的朋友們，辛苦了！這趟長途飛行值得，因為接下來的風景會讓你們忘記什麼叫「加班」。',
        type: 'transport',
        coordinates: { lat: 63.985, lng: -22.6056 },
        imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'flight-yyz',
        time: '08:55',
        name: 'YYZ 航班抵達 (FI602)',
        nameEn: 'YYZ Flight Arrival (FI602)',
        description: '多倫多的夥伴們，歡迎來到比加拿大更冷（但更美）的地方！大家在行李轉盤集合吧。',
        type: 'transport',
        coordinates: { lat: 63.985, lng: -22.6056 },
        imageUrl: 'https://images.unsplash.com/photo-1506012733827-e916555623f2?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    day: 2,
    date: '2026-05-23',
    title: '雷克雅維克城市探索',
    locationName: 'Reykjavik',
    locations: [
      {
        id: 'car-pickup',
        time: '10:30',
        name: '機場取車 (Blue Car Rental)',
        nameEn: 'Car Pickup (Blue Car Rental)',
        description: '各位團員，這台車就是我們接下來 11 天的移動城堡！請檢查保險，冰島的風大到可以把車門吹飛，這不是開玩笑的。',
        type: 'transport',
        coordinates: { lat: 63.985, lng: -22.6056 },
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
        tips: ['檢查是否有沙塵險與碎石險', '開門時請務必抓緊車門！'],
        driveInfo: { time: '45 min', distance: '45 km' }
      },
      {
        id: 'costco',
        time: '11:40',
        name: 'Costco 戰略補給',
        nameEn: 'Costco Strategic Supply',
        description: '在冰島，Costco 是我們最好的朋友。這裡的熱狗是全島最便宜的救贖，記得多買幾箱水和零食，因為接下來的路段可能幾小時都見不到人煙。',
        type: 'restaurant',
        coordinates: { lat: 64.089, lng: -21.933 },
        imageUrl: 'https://images.unsplash.com/photo-1604719312563-8912e9223c6a?q=80&w=800&auto=format&fit=crop',
        mustEat: ['Costco 熱狗 (全冰島最划算！)'],
        driveInfo: { time: '20 min', distance: '10 km' }
      },
      {
        id: 'hallgrimskirkja',
        time: '13:00',
        name: '哈爾格林姆教堂',
        nameEn: 'Hallgrímskirkja',
        description: '這座教堂長得像太空梭，也像玄武岩。它是雷克雅維克的守護神，站在前面拍照，保證你的 IG 讚數會像噴泉一樣爆發。',
        type: 'sight',
        coordinates: { lat: 64.1417, lng: -21.9266 },
        imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop',
        story: '設計靈感來自冰島隨處可見的玄武岩柱，花了 41 年才蓋好，冰島人做事就是這麼有耐心。',
        driveInfo: { time: '15 min', distance: '5 km' }
      },
      {
        id: 'messinn',
        time: '17:00',
        name: 'Messinn 海鮮盛宴',
        nameEn: 'Messinn Seafood Feast',
        description: '各位，這家店的海鮮拼盤會讓你們感動落淚。魚肉鮮嫩到像是剛從海裡跳進鍋子裡，搭配焦糖奶油馬鈴薯，簡直是犯罪級的美味。',
        type: 'restaurant',
        coordinates: { lat: 64.147, lng: -21.938 },
        imageUrl: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=800&auto=format&fit=crop',
        mustEat: ['海鮮拼盤 (Seafood Pan)', '北極紅點鮭 (Arctic Charr)'],
        bookingCode: 'ID: 8527984',
        driveInfo: { time: '10 min', distance: '2 km' }
      },
      {
        id: 'sky-lagoon',
        time: '19:00',
        name: 'Sky Lagoon 儀式感溫泉',
        nameEn: 'Sky Lagoon Ritual Spa',
        description: '在無邊際溫泉看著北大西洋，這才是人生！記得體驗「七步療癒法」，冷熱交替會讓你的皮膚滑嫩得像冰島小羊。',
        type: 'sight',
        coordinates: { lat: 64.118, lng: -21.933 },
        imageUrl: 'https://images.unsplash.com/photo-1644144573177-38662999718f?q=80&w=800&auto=format&fit=crop',
        tips: ['包含 Sky Ritual 體驗', '記得在吧台領取你的迎賓飲料'],
        driveInfo: { time: '20 min', distance: '10 km' }
      },
      {
        id: 'hotel-laugavegur',
        time: '21:00',
        name: '入住 Center Hotels Laugavegur',
        nameEn: 'Stay at Center Hotels Laugavegur',
        description: '今晚就在這條最熱鬧的街上休息。飯店很現代，但別逛街逛到忘記睡覺，明天我們要開始真正的環島長征了！',
        type: 'hotel',
        coordinates: { lat: 64.144, lng: -21.914 },
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    day: 3,
    date: '2026-05-24',
    title: '金圈與冰洞探險',
    locationName: 'Selfoss',
    locations: [
      {
        id: 'braud-co',
        time: '08:15',
        name: 'Braud & Co 早餐',
        nameEn: 'Braud & Co Breakfast',
        description: '這家的肉桂捲是雷克雅維克的傳奇。聞到那香味了嗎？那是幸福的味道，也是卡路里的味道，但在冰島，卡路里就是你的燃料！',
        type: 'restaurant',
        coordinates: { lat: 64.142, lng: -21.927 },
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
        mustEat: ['肉桂捲 (Cinnamon Roll)'],
        driveInfo: { time: '1 hr', distance: '50 km' }
      },
      {
        id: 'kerid',
        time: '10:00',
        name: '凱瑞斯火山口',
        nameEn: 'Kerið Crater',
        description: '這個火山口湖看起來像是一隻巨大的藍眼睛。你可以沿著邊緣走一圈，想像自己是魔戒裡的遠征隊。',
        type: 'sight',
        coordinates: { lat: 64.041, lng: -20.885 },
        imageUrl: 'https://images.unsplash.com/photo-1547432431-153381648a73?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '45 min', distance: '40 km' }
      },
      {
        id: 'geysir-area',
        time: '11:25',
        name: '蓋錫爾間歇泉',
        nameEn: 'Geysir Geothermal Area',
        description: 'Strokkur 間歇泉每幾分鐘就會噴發一次。大家手機準備好，它噴發的那一刻，如果你沒拍到，那就只能再等五分鐘，或者假裝你有拍到。',
        type: 'sight',
        coordinates: { lat: 64.310, lng: -20.302 },
        imageUrl: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '10 min', distance: '5 km' }
      },
      {
        id: 'geysir-glima',
        time: '12:30',
        name: 'Geysir Glima 午餐',
        nameEn: 'Geysir Glima Lunch',
        description: '在間歇泉旁邊吃飯，隨時準備好迎接大自然的「驚喜」。這裡的食物跟風景一樣讓人印象深刻。',
        type: 'restaurant',
        coordinates: { lat: 64.310, lng: -20.302 },
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
        mustEat: ['三明治與沙拉 (Sandwich w/Salad)'],
        driveInfo: { time: '1 hr', distance: '60 km' }
      },
      {
        id: 'ice-caving',
        time: '14:00',
        name: '冰洞與雪上摩托車之旅',
        nameEn: 'Ice Caving & Snowmobile Tour',
        description: '各位，穿上你們最厚的衣服！我們要去冰川裡面探險了。雪上摩托車的速度感會讓你覺得自己是 007，只是穿得比較臃腫。',
        type: 'sight',
        coordinates: { lat: 64.5, lng: -20.2 },
        imageUrl: 'https://images.unsplash.com/photo-1530652101053-8c0db4fbb5de?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '1.5 hr', distance: '80 km' }
      },
      {
        id: 'hotel-gullfoss',
        time: '19:00',
        name: '入住 Hótel Gullfoss',
        nameEn: 'Stay at Hótel Gullfoss',
        description: '今晚就住在瀑布旁邊。聽著水聲入睡，希望夢裡也有彩虹。',
        type: 'hotel',
        coordinates: { lat: 64.325, lng: -20.129 },
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
        mustEat: ['傳統冰島晚餐 (Traditional Icelandic Food)']
      }
    ]
  },
  {
    day: 4,
    date: '2026-05-25',
    title: '斯奈山半島秘境',
    locationName: 'Grundarfjordur',
    locations: [
      {
        id: 'gullfoss-water',
        time: '08:00',
        name: '黃金瀑布',
        nameEn: 'Gullfoss Waterfall',
        description: '這水量大到可以洗掉你所有的煩惱（和你的手機，如果你拿太近的話）。它是冰島最壯觀的瀑布之一，彩虹常客。',
        type: 'sight',
        coordinates: { lat: 64.327, lng: -20.120 },
        imageUrl: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '1.5 hr', distance: '120 km' }
      },
      {
        id: 'thingvellir-park',
        time: '10:15',
        name: '辛格韋德利國家公園',
        nameEn: 'Thingvellir National Park',
        description: '在這裡，你可以左腳踩在美洲，右腳踩在歐洲。這兩大板塊每年都在分開，就像某些情侶一樣，但它們分開得比較慢，每年只有兩公分。',
        type: 'sight',
        coordinates: { lat: 64.256, lng: -21.130 },
        imageUrl: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '1 hr', distance: '60 km' }
      },
      {
        id: 'dirty-burger',
        time: '13:00',
        name: 'Dirty Burger And Ribs 午餐',
        nameEn: 'Dirty Burger And Ribs Lunch',
        description: '名字叫「骯髒漢堡」，但吃起來絕對乾淨又銷魂。這肋排會讓你忘記什麼叫儀態，直接用手抓著啃吧！',
        type: 'restaurant',
        coordinates: { lat: 64.45, lng: -21.92 },
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6e9460272?q=80&w=800&auto=format&fit=crop',
        mustEat: ['漢堡與肋排 (Burger & Ribs)'],
        driveInfo: { time: '2 hr', distance: '150 km' }
      },
      {
        id: 'budir-church',
        time: '15:30',
        name: '布迪爾黑教堂',
        nameEn: 'Búðakirkja Black Church',
        description: '這座教堂長得像從提姆波頓電影裡走出來的。它是冰島最孤獨也最上鏡的教堂，黑色木造牆面在荒野中簡直酷斃了。',
        type: 'sight',
        coordinates: { lat: 64.821, lng: -23.384 },
        imageUrl: 'https://images.unsplash.com/photo-1518413900360-f305b78d1735?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '15 min', distance: '20 km' }
      },
      {
        id: 'arnarstapi',
        time: '16:05',
        name: '阿爾納斯塔皮',
        nameEn: 'Arnarstapi',
        description: '這裡有壯觀的海蝕洞和懸崖。如果你看到有人在懸崖邊擺拍，請提醒他們冰島的風是不長眼的。',
        type: 'sight',
        coordinates: { lat: 64.766, lng: -23.621 },
        imageUrl: 'https://images.unsplash.com/photo-1601618600109-77573031267b?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '45 min', distance: '50 km' }
      },
      {
        id: 'freezer-hostel',
        time: '18:45',
        name: '入住 The Freezer Hostel',
        nameEn: 'Check-in The Freezer Hostel',
        description: '這不只是一家旅舍，還是一個藝術中心。今晚我們就在充滿文青氣息的氛圍中入睡。',
        type: 'hotel',
        coordinates: { lat: 64.91, lng: -23.81 },
        imageUrl: 'https://images.unsplash.com/photo-1555854816-802f188095e4?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'matarlist',
        time: '19:15',
        name: 'Matarlist 晚餐',
        nameEn: 'Matarlist Dinner',
        description: '在地食材的極致表現。這頓晚餐會讓你覺得，冰島人不只會捕魚，還很會煮魚。',
        type: 'restaurant',
        coordinates: { lat: 64.89, lng: -23.71 },
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        mustEat: ['三道式在地晚餐 (3 Course Menu)']
      }
    ]
  },
  {
    day: 5,
    date: '2026-05-26',
    title: '教堂山與北極之門',
    locationName: 'Akureyri',
    locations: [
      {
        id: 'kirkjufell',
        time: '08:50',
        name: '教堂山',
        nameEn: 'Kirkjufell Mountain',
        description: '這就是那座傳說中的「草帽山」。它是冰島被拍過最多次的山，如果你沒跟它合照，別說你來過冰島。',
        type: 'sight',
        coordinates: { lat: 64.941, lng: -23.306 },
        imageUrl: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop',
        story: '《冰與火之歌》中的箭頭山取景地。',
        driveInfo: { time: '1.5 hr', distance: '100 km' }
      },
      {
        id: 'hafnarvagninn',
        time: '10:50',
        name: 'Hafnarvagninn 午餐',
        nameEn: 'Hafnarvagninn Lunch',
        description: '港口旁的炸魚薯條餐車。魚肉鮮嫩到像是剛從海裡跳進鍋子裡，搭配酥脆的外皮，簡直是絕配。',
        type: 'restaurant',
        coordinates: { lat: 65.07, lng: -22.72 },
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6e9460272?q=80&w=800&auto=format&fit=crop',
        mustEat: ['炸魚薯條 (Fish\'n Chips)'],
        driveInfo: { time: '2 hr', distance: '160 km' }
      },
      {
        id: 'grabrok',
        time: '13:00',
        name: 'Grabrok 火山口',
        nameEn: 'Grábrók Crater',
        description: '可以輕鬆攀登的火山口。站在上面俯瞰熔岩地貌，你會覺得自己像是站在另一個星球上。',
        type: 'sight',
        coordinates: { lat: 64.77, lng: -21.53 },
        imageUrl: 'https://images.unsplash.com/photo-1500043356145-5e14bc30f28e?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '3 hr', distance: '240 km' }
      },
      {
        id: 'k16-apartments',
        time: '17:30',
        name: '入住 K16 apartments',
        nameEn: 'Check-in K16 apartments',
        description: '阿庫雷里的現代化公寓。今晚我們就在這個北方之都好好休息。',
        type: 'hotel',
        coordinates: { lat: 65.68, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'idunn-matholl',
        time: '18:20',
        name: 'Iðunn Mathöll 晚餐',
        nameEn: 'Iðunn Mathöll Dinner',
        description: '阿庫雷里的美食廣場。這裡有各種選擇，適合大家各取所需，不用再為了吃什麼而吵架了。',
        type: 'restaurant',
        coordinates: { lat: 65.68, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        mustEat: ['各類美食 (Food Court)']
      },
      {
        id: 'brynja',
        time: '20:00',
        name: 'Brynja 冰淇淋',
        nameEn: 'Brynja Ice Cream',
        description: '冰島最有名的冰淇淋店之一。就算外面在下雪，冰島人還是要吃冰淇淋，這就是態度！',
        type: 'restaurant',
        coordinates: { lat: 65.67, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop',
        mustEat: ['招牌冰淇淋 (ice-cream)']
      }
    ]
  },
  {
    day: 6,
    date: '2026-05-27',
    title: '阿庫雷里與米湖奇觀',
    locationName: 'Myvatn',
    locations: [
      {
        id: 'whale-watching',
        time: '09:00',
        name: '阿庫雷里賞鯨之旅',
        nameEn: 'Akureyri Whale Watching',
        description: '出海尋找座頭鯨與海豚。如果鯨魚沒出現，至少我們還有海風可以吹，和彼此的陪伴（這聽起來很感人吧？）。',
        type: 'sight',
        coordinates: { lat: 65.68, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '45 min', distance: '50 km' }
      },
      {
        id: 'godafoss',
        time: '13:15',
        name: '眾神瀑布',
        nameEn: 'Goðafoss Waterfall',
        description: '西元 1000 年，冰島人把北歐神像丟進這裡，決定改信基督教。現在我們把煩惱丟進這裡，決定好好享受假期。',
        type: 'sight',
        coordinates: { lat: 65.68, lng: -17.55 },
        imageUrl: 'https://images.unsplash.com/photo-1547432431-153381648a73?q=80&w=800&auto=format&fit=crop',
        story: '西元1000年，冰島法律演講人將北歐神像丟入瀑布，象徵改信基督教。',
        driveInfo: { time: '1 hr', distance: '80 km' }
      },
      {
        id: 'grjotagja',
        time: '16:50',
        name: '溫泉洞穴',
        nameEn: 'Grjótagjá Cave',
        description: '這就是那個《冰與火之歌》裡瓊恩雪諾跟耶哥蕊特「定情」的地方。雖然現在不能泡湯了，但你還是可以進去感受一下那種神祕的氛圍（和硫磺味）。',
        type: 'sight',
        coordinates: { lat: 65.62, lng: -16.88 },
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
        story: '《冰與火之歌》中瓊恩雪諾與耶哥蕊特的定情地。',
        driveInfo: { time: '10 min', distance: '5 km' }
      },
      {
        id: 'namafjall',
        time: '17:20',
        name: '地熱區',
        nameEn: 'Námafjall Geothermal Area',
        description: '歡迎來到火星！這裡到處都是冒煙的泥漿池 and 濃郁的硫磺味。聞起來像壞掉的蛋，但看起來像另一個世界。',
        type: 'sight',
        coordinates: { lat: 65.64, lng: -16.81 },
        imageUrl: 'https://images.unsplash.com/photo-1500043356145-5e14bc30f28e?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '1.5 hr', distance: '100 km' }
      },
      {
        id: 'india-curry',
        time: '19:15',
        name: 'India Curry House 晚餐',
        nameEn: 'India Curry House Dinner',
        description: '在北極圈附近吃印度咖哩？沒錯，這就是冰島的魅力。熱騰騰的咖哩會讓你忘記外面的寒冷。',
        type: 'restaurant',
        coordinates: { lat: 65.68, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
        mustEat: ['印度咖哩 (Indian Cuisine)']
      }
    ]
  },
  {
    day: 7,
    date: '2026-05-28',
    title: '震撼瀑布與小龍蝦之鄉',
    locationName: 'Hofn',
    locations: [
      {
        id: 'dettifoss',
        time: '11:00',
        name: '黛提瀑布',
        nameEn: 'Dettifoss Waterfall',
        description: '這是歐洲水量最大的瀑布。站在它旁邊，你會感覺到大地的震動。這就是大自然的力量，讓你覺得自己渺小得像隻螞蟻。',
        type: 'sight',
        coordinates: { lat: 65.81, lng: -16.38 },
        imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop',
        story: '電影《普羅米修斯》開場的取景地。',
        driveInfo: { time: '1.5 hr', distance: '100 km' }
      },
      {
        id: 'studlafoss',
        time: '15:00',
        name: '玄武岩瀑布',
        nameEn: 'Stuðlagil Canyon',
        description: '隱藏在峽谷中的玄武岩柱瀑布。這些柱子長得太整齊了，讓人懷疑是不是外星人蓋的。',
        type: 'sight',
        coordinates: { lat: 65.16, lng: -15.31 },
        imageUrl: 'https://images.unsplash.com/photo-1552525860-47029679639e?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '2.5 hr', distance: '180 km' }
      },
      {
        id: 'milk-factory',
        time: '19:30',
        name: '入住 Milk Factory',
        nameEn: 'Check-in Milk Factory',
        description: '這以前真的是一家牛奶工廠！現在變成了時尚旅店。希望今晚的夢裡有喝不完的牛奶（或者啤酒）。',
        type: 'hotel',
        coordinates: { lat: 64.25, lng: -15.21 },
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'pakkhus-dinner',
        time: '20:15',
        name: 'Pakkhús 晚餐',
        nameEn: 'Pakkhús Dinner',
        description: '赫本鎮的小龍蝦是必吃的！這家餐廳很有名，排隊是正常的。等一下吧，美食是值得等待的。',
        type: 'restaurant',
        coordinates: { lat: 64.25, lng: -15.21 },
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        mustEat: ['冰島小龍蝦 (Langoustine)'],
        tips: ['不接受預約，建議提早排隊']
      }
    ]
  },
  {
    day: 8,
    date: '2026-05-29',
    title: '冰河湖與羽毛峽谷',
    locationName: 'Vik',
    locations: [
      {
        id: 'jokulsarlon-boat',
        time: '09:30',
        name: '傑古沙龍冰河湖船旅',
        nameEn: 'Jökulsárlón Glacier Lagoon Boat Tour',
        description: '搭船穿梭在浮冰之間。如果你看到海豹在冰上曬太陽，記得跟牠們打個招呼，但別指望牠們會理你。',
        type: 'sight',
        coordinates: { lat: 64.04, lng: -16.17 },
        imageUrl: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '15 min', distance: '1 km' }
      },
      {
        id: 'diamond-beach-real',
        time: '11:00',
        name: '鑽石沙灘',
        nameEn: 'Diamond Beach',
        description: '這些冰塊被沖上黑沙灘，看起來就像巨大的鑽石。你可以抱著它們拍照，但別試圖帶回家，它們會融化的。',
        type: 'sight',
        coordinates: { lat: 64.04, lng: -16.17 },
        imageUrl: 'https://images.unsplash.com/photo-1541819660-316279f06121?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '1 hr', distance: '80 km' }
      },
      {
        id: 'fancy-sheep',
        time: '12:00',
        name: 'Fancy Sheep 午餐',
        nameEn: 'Fancy Sheep Lunch',
        description: '這家餐車的羊肉漢堡很有名。在冰河湖旁邊吃漢堡，這就是冰島式的浪漫。',
        type: 'restaurant',
        coordinates: { lat: 64.04, lng: -16.17 },
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6e9460272?q=80&w=800&auto=format&fit=crop',
        mustEat: ['羊肉漢堡 (Fancy Lamb Burger)'],
        driveInfo: { time: '1.5 hr', distance: '120 km' }
      },
      {
        id: 'fjadrargljufur',
        time: '14:15',
        name: '羽毛峽谷',
        nameEn: 'Fjaðrárgljúfur Canyon',
        description: '這峽谷美到讓人窒息。它是冰島最上鏡的地方之一，請沿著步道走，保護好這裡脆弱的植被。',
        type: 'sight',
        coordinates: { lat: 63.77, lng: -18.17 },
        imageUrl: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=800&auto=format&fit=crop',
        tips: ['請務必留在標記步道內', '嚴禁踐踏青苔'],
        driveInfo: { time: '1 hr', distance: '70 km' }
      },
      {
        id: 'yoda-cave',
        time: '16:10',
        name: '尤達洞穴',
        nameEn: 'Yoda Cave (Hjörleifshöfði)',
        description: '願原力與你同在！這個洞穴的開口長得超像尤達大師。快進去拍張照，發給你的星戰迷朋友炫耀一下。',
        type: 'sight',
        coordinates: { lat: 63.43, lng: -18.76 },
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '30 min', distance: '30 km' }
      },
      {
        id: 'hotel-burfell',
        time: '17:15',
        name: '入住 Hótel Búrfell',
        nameEn: 'Check-in Hótel Búrfell',
        description: '今晚住在南岸。飯店周圍都是壯麗的風景，適合放空。',
        type: 'hotel',
        coordinates: { lat: 63.46, lng: -19.14 },
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'dyrholaey-dinner',
        time: '18:00',
        name: 'Hotel Dyrhólaey 晚餐',
        nameEn: 'Hotel Dyrhólaey Dinner',
        description: '享用豐盛的自助晚餐。多吃點，明天我們還有更多瀑布要看！',
        type: 'restaurant',
        coordinates: { lat: 63.46, lng: -19.14 },
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        mustEat: ['自助餐 (Buffet)']
      }
    ]
  },
  {
    day: 9,
    date: '2026-05-30',
    title: '南岸瀑布與黑沙灘',
    locationName: 'Reykjavik',
    locations: [
      {
        id: 'reynisfjara-real',
        time: '08:15',
        name: '雷尼斯黑沙灘',
        nameEn: 'Reynisfjara Black Sand Beach',
        description: '壯觀的玄武岩柱與黑沙灘。請遠離海水，這裡的「瘋狗浪」很有名，它們不只會咬人，還會把你拖進大西洋。',
        type: 'sight',
        coordinates: { lat: 63.40, lng: -19.04 },
        imageUrl: 'https://images.unsplash.com/photo-1504893524553-f8591ce2b0dd?q=80&w=800&auto=format&fit=crop',
        tips: ['小心瘋狗浪，切勿背對海洋'],
        driveInfo: { time: '45 min', distance: '50 km' }
      },
      {
        id: 'plane-wreck',
        time: '09:40',
        name: '飛機殘骸',
        nameEn: 'Sólheimasandur Plane Wreck',
        description: '這架 1973 年迫降的美國海軍飛機，現在是冰島最酷的拍照背景。雖然它看起來像科幻電影場景，但請別試圖爬上去，保護古蹟人人有責。',
        type: 'sight',
        coordinates: { lat: 63.45, lng: -19.36 },
        imageUrl: 'https://images.unsplash.com/photo-1498354136128-58f790194fa7?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '30 min', distance: '15 km' }
      },
      {
        id: 'mia-van',
        time: '11:40',
        name: 'Mia\'s Country Van 午餐',
        nameEn: 'Mia\'s Country Van Lunch',
        description: '南岸最有名的炸魚薯條餐車。這魚肉鮮嫩到你會懷疑以前吃的都是假魚。',
        type: 'restaurant',
        coordinates: { lat: 63.52, lng: -19.51 },
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6e9460272?q=80&w=800&auto=format&fit=crop',
        mustEat: ['炸魚薯條 (Fish\'n Chips)'],
        driveInfo: { time: '10 min', distance: '5 km' }
      },
      {
        id: 'skogafoss-real',
        time: '12:15',
        name: '斯科加爾瀑布',
        nameEn: 'Skógafoss Waterfall',
        description: '寬闊壯麗的瀑布。如果你運氣好，還能看到雙彩虹。',
        type: 'sight',
        coordinates: { lat: 63.53, lng: -19.51 },
        imageUrl: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '30 min', distance: '30 km' }
      },
      {
        id: 'seljalandsfoss-real',
        time: '13:45',
        name: '塞里雅蘭瀑布',
        nameEn: 'Seljalandsfoss Waterfall',
        description: '可以走到後方的水簾洞瀑布。準備好變濕吧！',
        type: 'sight',
        coordinates: { lat: 63.61, lng: -19.98 },
        imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=800&auto=format&fit=crop',
        tips: ['步道濕滑，請穿著防滑鞋', '建議穿著防水外套'],
        driveInfo: { time: '10 min', distance: '2 km' }
      },
      {
        id: 'gljufrabui-real',
        time: '15:20',
        name: '秘密瀑布',
        nameEn: 'Gljúfrabúi Waterfall',
        description: '隱藏在岩縫中的神祕瀑布。這是一個真正的秘境，進去的時候小心別滑倒。',
        type: 'sight',
        coordinates: { lat: 63.62, lng: -19.98 },
        imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop',
        tips: ['進入岩縫需涉水，請穿著防水鞋', '相機請做好防護'],
        driveInfo: { time: '2 hr', distance: '130 km' }
      },
      {
        id: 'himalayan-spice',
        time: '19:15',
        name: 'Himalayan Spice 晚餐',
        nameEn: 'Himalayan Spice Dinner',
        description: '雷克雅維克的尼泊爾料理。香料的味道會溫暖你的靈魂。',
        type: 'restaurant',
        coordinates: { lat: 64.14, lng: -21.93 },
        imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
        mustEat: ['尼泊爾咖哩 (Nepalese Cuisine)']
      }
    ]
  },
  {
    day: 10,
    date: '2026-05-31',
    title: '城市巡禮與藍湖告別',
    locationName: 'Reykjavik',
    locations: [
      {
        id: 'sun-voyager',
        time: '08:00',
        name: '太陽之舟',
        nameEn: 'Sun Voyager',
        description: '這座雕塑象徵著對未知領土的探索。站在這裡看著海，想像自己是維京海盜，準備去征服世界（或者只是去買個熱狗）。',
        type: 'sight',
        coordinates: { lat: 64.147, lng: -21.922 },
        imageUrl: 'https://images.unsplash.com/photo-1552525860-47029679639e?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '10 min', distance: '2 km' }
      },
      {
        id: 'pylsur',
        time: '09:00',
        name: 'Bæjarins Beztu Pylsur 早餐',
        nameEn: 'Bæjarins Beztu Pylsur Breakfast',
        description: '這家熱狗攤連柯林頓都來吃過！點一份「Eina með öllu」（全加），體驗冰島國民美食的魅力。',
        type: 'restaurant',
        coordinates: { lat: 64.148, lng: -21.937 },
        imageUrl: 'https://images.unsplash.com/photo-1541232399669-e3476639e77d?q=80&w=800&auto=format&fit=crop',
        mustEat: ['熱狗 (Hot Dog)'],
        driveInfo: { time: '15 min', distance: '1 km' }
      },
      {
        id: 'street-food',
        time: '12:00',
        name: 'Icelandic Street Food 午餐',
        nameEn: 'Icelandic Street Food Lunch',
        description: '傳統的冰島羊肉湯。喝完可以免費續碗，這在物價高昂的冰島簡直是奇蹟！',
        type: 'restaurant',
        coordinates: { lat: 64.147, lng: -21.938 },
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        mustEat: ['傳統羊肉湯 (Lamb or Shellfish Soup)'],
        driveInfo: { time: '45 min', distance: '50 km' }
      },
      {
        id: 'blue-lagoon-real',
        time: '14:00',
        name: '藍湖溫泉',
        nameEn: 'Blue Lagoon',
        description: '在夢幻的乳藍色溫泉中放鬆。這是我們旅程的完美句點。敷上白矽泥面膜，讓你的臉滑嫩得像嬰兒。',
        type: 'sight',
        coordinates: { lat: 63.88, lng: -22.44 },
        imageUrl: 'https://images.unsplash.com/photo-1501133512628-f190c4405468?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '45 min', distance: '50 km' }
      },
      {
        id: 'cafe-loki',
        time: '18:00',
        name: 'Café Loki 晚餐',
        nameEn: 'Café Loki Dinner',
        description: '位於教堂對面，提供道地冰島家常菜。如果你夠勇敢，可以挑戰一下發酵鯊魚肉（記得配一口黑死酒）。',
        type: 'restaurant',
        coordinates: { lat: 64.142, lng: -21.927 },
        imageUrl: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=800&auto=format&fit=crop',
        mustEat: ['傳統冰島料理 (Traditional Icelandic Food)'],
        driveInfo: { time: '45 min', distance: '50 km' }
      },
      {
        id: 'aurora-hotel',
        time: '20:45',
        name: '入住 Aurora Hotel',
        nameEn: 'Check-in Aurora Hotel',
        description: '最後一晚住在機場旁邊。收拾好行李，也收拾好心情。冰島，我們一定會再回來的！',
        type: 'hotel',
        coordinates: { lat: 63.99, lng: -22.62 },
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    day: 11,
    date: '2026-06-01',
    title: '踏上歸途',
    locationName: 'Keflavik',
    locations: [
      {
        id: 'departure',
        time: '08:00',
        name: '前往機場搭機',
        nameEn: 'Departure to Airport',
        description: '帶著滿滿的回憶和空空的錢包，我們準備回家了。冰島的風會一直吹在你的心裡。',
        type: 'transport',
        coordinates: { lat: 63.985, lng: -22.6056 },
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '1 km' }
      }
    ]
  }
];
