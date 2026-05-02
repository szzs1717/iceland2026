
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
  story?: string;
  breakfastIncluded?: boolean;
  stayDuration?: number;
  precautions?: string[];
  bookingNotes?: string[];
  waterproofRequired?: boolean;
  selfCatering?: boolean;
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
    day: 0,
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
    day: 1,
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
        precautions: ['冰島強風可能吹損車門，開啟時請雙手緊握', '停車時盡量逆風停放'],
        driveInfo: { time: '45 min', distance: '45 km' }
      },
      {
        id: 'costco',
        time: '11:00',
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
        time: '12:40',
        name: '哈爾格林姆教堂',
        nameEn: 'Hallgrímskirkja',
        description: '這座教堂長得像太空梭，也像玄武岩。它是雷克雅維克的守護神，站在前面拍照，保證你的 IG 讚數會像噴泉一樣爆發。',
        type: 'sight',
        coordinates: { lat: 64.1417, lng: -21.9266 },
        imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop',
        story: '設計靈感來自冰島隨處可見的玄武岩柱，花了 41 年才蓋好，冰島人做事就是這麼有耐心。',
        driveInfo: { time: '5 min', distance: '1 km' }
      },
      {
        id: 'rainbow-street',
        time: '14:00',
        name: '彩虹街與雷克雅維克漫步',
        nameEn: 'Rainbow Street & Reykjavik City Walk',
        description: '雷克雅維克最有名的網紅大街！彩虹的盡頭就是教堂。在這裡隨意逛逛小店，感受冰島首都的文青氣息。',
        type: 'sight',
        coordinates: { lat: 64.145, lng: -21.929 },
        imageUrl: 'https://images.unsplash.com/photo-1531737212413-967f9a70b5fd?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '1 km' }
      },
      {
        id: 'hotel-laugavegur',
        time: '15:15',
        name: '入住 Center Hotels Laugavegur',
        nameEn: 'Check-in Center Hotels Laugavegur',
        description: '今晚就在這條最熱鬧的街上休息。飯店很現代，放好行李後我們可以繼續在市區探索。',
        type: 'hotel',
        coordinates: { lat: 64.144, lng: -21.914 },
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'laugavegur-shopping',
        time: '15:45',
        name: 'Laugavegur 購物街漫步',
        nameEn: 'Laugavegur Shopping Street Walk',
        description: '雷克雅維克最熱鬧的購物大街！這裡聚集了各式冰島設計品牌、戶外用品店 (如 66° North) 以及特色咖啡廳，是補足裝備與挑選紀念品的好地方。',
        type: 'sight',
        coordinates: { lat: 64.145, lng: -21.920 },
        imageUrl: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '1 km' }
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
        tips: [
          '包含 Sky Ritual 體驗', 
          '記得在吧台領取你的迎賓飲料', 
          '地址: Vesturvör 44-48, Kópavogur',
          '電話: +354 527 6800'
        ],
        bookingNotes: ['攜帶泳衣及防水手機袋 (Swimwear & waterproof cellphone case)'],
        precautions: ['泡溫泉前請先徹底淋浴', '長頭髮建議塗抹護髮乳或紮起，避免矽粉造成頭髮乾澀'],
        driveInfo: { time: '20 min', distance: '10 km' }
      }
    ]
  },
  {
    day: 2,
    date: '2026-05-24',
    title: '金圈與冰川巨獸',
    locationName: 'Gullfoss',
    locations: [
      {
        id: 'braud-co',
        time: '07:25',
        name: 'Braud & Co 早餐',
        nameEn: 'Braud & Co Breakfast',
        description: '這家的肉桂捲是雷克雅維克的傳奇。在開啟長途冒險前，先用這份甜蜜的能量填飽肚子。',
        type: 'restaurant',
        coordinates: { lat: 64.142, lng: -21.927 },
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
        mustEat: ['肉桂捲 (Cinnamon Roll)', '手工咖啡 (Coffee)'],
        driveInfo: { time: '46 min', distance: '46.8 km' }
      },
      {
        id: 'thingvellir-park',
        time: '08:45',
        name: '辛格韋德利國家公園',
        nameEn: 'Thingvellir National Park',
        description: '冰島最神聖的地方，也是美洲與歐亞板塊的分界。在這裡，你可以見證大地的分裂與歷史的沉澱。',
        type: 'sight',
        coordinates: { lat: 64.256, lng: -21.130 },
        imageUrl: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=800&auto=format&fit=crop',
        tips: ['國家公園遊客中心', '板塊裂縫步行步道'],
        driveInfo: { time: '62 min', distance: '70.1 km' }
      },
      {
        id: 'gullfoss-lunch',
        time: '11:45',
        name: 'Gullfoss 全景餐廳午餐',
        nameEn: 'Gullfoss Panorama Restaurant Lunch',
        description: '就在瀑布旁的休息站，提供溫暖的湯品與漢堡，為接下來的冰川冒險蓄勢。',
        type: 'restaurant',
        coordinates: { lat: 64.325, lng: -20.129 }
      },
      {
        id: 'monster-truck-tour',
        time: '13:30',
        name: '冰川巨獸卡車之旅',
        nameEn: 'Into the Glacier Monster Truck Tour',
        description: '搭乘改裝的巨龍卡車登上朗格冰原 (Langjökull)，進入人造冰宮探索萬年冰川深處的神祕藍光。這是冰島最震撼的極地體驗之一。',
        type: 'sight',
        coordinates: { lat: 64.60, lng: -20.60 },
        imageUrl: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc91?q=80&w=800&auto=format&fit=crop',
        tips: ['請務必提前 20 分鐘報到', '冰川內部終年零度，請做好防護'],
        bookingNotes: ['位置有限，建議提前預訂', '需穿著結實的防水登山鞋'],
        driveInfo: { time: '60 min', distance: '40 km' }
      },
      {
        id: 'hotel-gullfoss-dinner',
        time: '18:30',
        name: 'Hótel Gullfoss 晚餐',
        nameEn: 'Hótel Gullfoss Dinner',
        description: '享用精緻的傳統冰島晚餐。在地食材與大廚的巧手，為寒冷的冰島夜晚注入一股暖流。',
        type: 'restaurant',
        coordinates: { lat: 64.325, lng: -20.129 },
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '1 km' }
      }
    ]
  },
  {
    day: 3,
    date: '2026-05-25',
    title: '火山口湖與斯奈山半島',
    locationName: 'Selfoss',
    locations: [
      {
        id: 'breakfast-d3',
        time: '08:00',
        name: '飯店早餐 (已包)',
        nameEn: 'Hotel Breakfast (Included)',
        description: '在 Hótel Gullfoss 享用豐盛的早餐，準備前往金圈與斯奈山半島。',
        type: 'restaurant',
        coordinates: { lat: 64.325, lng: -20.129 }
      },
      {
        id: 'kerid-crater',
        time: '09:00 - 09:45',
        name: '凱瑞斯火山口',
        nameEn: 'Kerið Volcanic Crater',
        description: '這座擁有三千年歷史的火山口，湖水呈現醉人的深藍色，周圍則是鮮紅的岩壁，色彩對比極其震撼。它是金圈附近最迷人的火山口湖。',
        type: 'sight',
        coordinates: { lat: 64.041, lng: -20.885 },
        imageUrl: 'https://images.unsplash.com/photo-1547432431-153381648a73?q=80&w=800&auto=format&fit=crop',
        stayDuration: 45,
        tips: ['可以沿著火山口邊緣走一圈', '也可以走下樓梯到湖邊'],
        driveInfo: { time: '15 min', distance: '15 km' }
      },
      {
        id: 'dirty-burger-brunch',
        time: '10:30',
        name: 'Dirty Burger And Ribs 早午餐',
        nameEn: 'Dirty Burger And Ribs Brunch',
        description: '位於 Selfoss 的人氣漢堡店。建議在這裡先吃飽或外帶，因為接下來前往斯奈山半島的車程較長。',
        type: 'restaurant',
        coordinates: { lat: 63.936, lng: -20.992 },
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6e9460272?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '160 min', distance: '195 km' }
      },
      {
        id: 'budir-black-church',
        time: '14:30',
        name: '布迪爾黑教堂',
        nameEn: 'Búðakirkja Black Church',
        description: '孤獨地矗立在荒原中的黑色小教堂。它是冰島最上鏡的景點之一，背後就是無盡的大海與雪山。',
        type: 'sight',
        coordinates: { lat: 64.821, lng: -23.384 },
        imageUrl: 'https://images.unsplash.com/photo-1518413900360-f305b78d1735?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '20 min', distance: '20 km' }
      },
      {
        id: 'arnarstapi-view',
        time: '15:15',
        name: '阿爾納斯塔皮懸崖觀景',
        nameEn: 'Arnarstapi Cliff Viewpoint',
        description: '壯麗的海蝕洞與奇形怪狀的岩石。這裡有許多鬼斧神工的自然景觀，如石柱群與橫垮海上的天然拱橋。',
        type: 'sight',
        coordinates: { lat: 64.766, lng: -23.621 },
        imageUrl: 'https://images.unsplash.com/photo-1601618600109-77573031267b?q=80&w=800&auto=format&fit=crop',
        tips: ['Gatklettur 石拱門', 'Arnarstapi 港口散步道'],
        driveInfo: { time: '15 min', distance: '10 km' }
      },
      {
        id: 'londrangar-cliffs',
        time: '16:15',
        name: '怪物海岸',
        nameEn: 'Londrangar Basalt Cliffs',
        description: '高耸的海中玄武岩柱，遠看像是被遺棄的城堡，當地傳說這是巨魔留下的遺跡。',
        type: 'sight',
        coordinates: { lat: 64.737, lng: -23.774 },
        imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '15 min', distance: '20 km' }
      },
      {
        id: 'saxholl-crater',
        time: '17:00',
        name: 'Saxholl 火山口',
        nameEn: 'Saxholl Crater',
        description: '一座造型完美的火山口。你可以順著階梯輕鬆登頂，俯視斯奈山半島的廣袤荒野與遠方的海洋。',
        type: 'sight',
        coordinates: { lat: 64.851, lng: -23.926 },
        imageUrl: 'https://images.unsplash.com/photo-1500043356145-5e14bc30f28e?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '20 min', distance: '20 km' }
      },
      {
        id: 'kassinn-shop',
        time: '18:00',
        name: 'Kassinn 補給站',
        nameEn: 'Kassinn Shopping',
        description: '這是在斯奈山半島尖端難得的補給點，可以買些零食 or 必需品。',
        type: 'transport',
        coordinates: { lat: 64.894, lng: -23.708 },
        imageUrl: 'https://images.unsplash.com/photo-1604719312563-8912e9223c6a?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '10 min', distance: '5 km' }
      },
      {
        id: 'freezer-hostel-stay',
        time: '18:40',
        name: '入住 The Freezer Hostel',
        nameEn: 'Check-in The Freezer Hostel',
        description: '這是一家充滿生命力的藝術青年旅館，經常有戲劇演出與 Live 表演，氛圍極其放鬆且富有創意。',
        type: 'hotel',
        coordinates: { lat: 64.91, lng: -23.81 },
        imageUrl: 'https://images.unsplash.com/photo-1555854816-802f188095e4?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '10 min', distance: '5 km' }
      },
      {
        id: 'matarlist-dinner',
        time: '19:30',
        name: 'Matarlist 晚宴',
        nameEn: 'Matarlist Dinner',
        description: '位於附近小鎮的道地餐廳。這裡使用最新鮮的冰島食材，製作出的每一道料理都充滿了廚師的心意。',
        type: 'restaurant',
        coordinates: { lat: 64.894, lng: -23.708 },
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        mustEat: ['是日鮮魚 (Catch of the Day)', '羊肉湯'],
        driveInfo: { time: '5 min', distance: '1 km' }
      },
      {
        id: 'kissing-bench',
        time: '21:00',
        name: '親吻長椅',
        nameEn: 'Kissing Bench',
        description: '小鎮上一個浪漫的角落。在冰島的夏日長晝下，坐在長椅上靜靜欣賞小鎮海港的夜色。',
        type: 'sight',
        coordinates: { lat: 64.894, lng: -23.712 },
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '7 min', distance: '1 km' }
      }
    ]
  },





  {
    day: 4,
    date: '2026-05-26',
    title: '教堂山與北極之門',
    locationName: 'Akureyri',
    locations: [
      {
        id: 'breakfast-d4',
        time: '08:00',
        name: '自理早餐 (自炊)',
        nameEn: 'Self-catering Breakfast',
        description: '在青年旅館煮份簡單的早餐，為今天的教堂山之行補給能量。',
        type: 'restaurant',
        selfCatering: true,
        coordinates: { lat: 64.91, lng: -23.81 }
      },
      {
        id: 'kirkjufellsfoss',
        time: '08:30',
        name: '教堂山瀑布',
        nameEn: 'Kirkjufellsfossar',
        description: '與教堂山對望的瀑布。這裡是攝影師的最愛，拍出的經典角度讓這座山看起來更加優雅。',
        type: 'sight',
        coordinates: { lat: 64.926, lng: -23.311 },
        imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '1 km' }
      },
      {
        id: 'kirkjufell-view',
        time: '08:50',
        name: '教堂山觀景點',
        nameEn: 'Kirkjufell Viewpoint',
        description: '這就是那座傳說中的「草帽山」。它是冰島被拍過最多次的山，如果你沒跟它合照，別說你來過冰島。',
        type: 'sight',
        coordinates: { lat: 64.941, lng: -23.306 },
        imageUrl: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop',
        story: '《冰與火之歌》中的箭頭山取景地。',
        precautions: ['請勿在非法區域放無人機 (Drone)', '步道可能濕滑，注意腳下安全'],
        driveInfo: { time: '10 min', distance: '12 km' }
      },
      {
        id: 'kolgrafarfjordur',
        time: '09:30',
        name: '劍之橋觀景點',
        nameEn: 'Kolgrafarfjordur Viewpoint',
        description: '橫跨峽谷的大橋，風景優美。這裡經常可以看到成群的鳥類，甚至有機會看到鯨魚在峽灣中出沒。',
        type: 'sight',
        coordinates: { lat: 64.95, lng: -23.05 },
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '30 min', distance: '35 km' }
      },
      {
        id: 'sugandisey',
        time: '10:30',
        name: '蘇根迪塞島燈塔',
        nameEn: 'Sugandisey Island Lighthouse',
        description: '俯瞰斯蒂基斯霍爾米港口的小山丘。這座紅色的燈塔在蔚藍的峽灣中格外搶眼。',
        type: 'sight',
        coordinates: { lat: 65.078, lng: -22.727 },
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '1 km' }
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
        driveInfo: { time: '90 min', distance: '120 km' }
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
        driveInfo: { time: '3.5 hr', distance: '300 km' }
      },
      {
        id: 'k16-apartments',
        time: '17:30',
        name: '入住 K16 apartments',
        nameEn: 'Check-in K16 apartments',
        description: '阿庫雷里的現代化公寓。今晚我們就在這個北方之都好好休息。',
        type: 'hotel',
        coordinates: { lat: 65.68, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
        stayDuration: 2
      },
      {
        id: 'idunn-matholl',
        time: '18:20',
        name: 'Iðunn Mathöll 晚餐',
        nameEn: 'Iðunn Mathöll Dinner',
        description: '阿庫雷里的美食廣場。這裡有各種選擇，適合大家各取所需，不用再為了吃什麼而吵架了。',
        type: 'restaurant',
        coordinates: { lat: 65.684, lng: -18.092 },
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        mustEat: ['各類美食 (Food Court)'],
        driveInfo: { time: '5 min', distance: '1 km' }
      },
      {
        id: 'netto-shop',
        time: '19:20',
        name: 'Netto 超市補給',
        nameEn: 'Netto Shopping',
        description: '在北方之都的大型補給！買些水果、飲料，或者冰島特有的零食，為接下來的路程做準備。',
        type: 'transport',
        coordinates: { lat: 65.685, lng: -18.106 },
        imageUrl: 'https://images.unsplash.com/photo-1604719312563-8912e9223c6a?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '1 km' }
      },
      {
        id: 'akureyri-walk',
        time: '20:00',
        name: '阿庫雷里市區探索',
        nameEn: 'Akureyri City Walk',
        description: '漫步在這個充滿活力的小鎮。參觀阿庫雷里大教堂，或者去 Brynja 吃個冰淇淋，感受北國夏夜的寧靜。',
        type: 'sight',
        coordinates: { lat: 65.68, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop',
        mustEat: ['Brynja 冰淇淋 (ice-cream)']
      }
    ]
  },
  {
    day: 5,
    date: '2026-05-27',
    title: '阿庫雷里與米湖奇觀',
    locationName: 'Myvatn',
    locations: [
      {
        id: 'breakfast-d5',
        time: '08:00',
        name: '公寓自理早餐 (自炊)',
        nameEn: 'Self-catering Breakfast at Apartment',
        description: '利用 C16 Apartments 的廚房設施，煮頓豐盛的早餐再出發賞鯨。',
        type: 'restaurant',
        selfCatering: true,
        coordinates: { lat: 65.68, lng: -18.09 }
      },
      {
        id: 'whale-watching',
        time: '09:00',
        name: '阿庫雷里賞鯨之旅',
        nameEn: 'Akureyri Whale Watching',
        description: '出海尋找座頭鯨與海豚。如果鯨魚沒出現，至少我們還有海風可以吹，和彼此的陪伴（這聽起來很感人吧？）。',
        type: 'sight',
        coordinates: { lat: 65.68, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=800&auto=format&fit=crop',
        tips: [
          '門票辦公室: Oddeyrarbot 2, 600 Akureyri (Elding)',
          '電話: +354 497 1000'
        ],
        bookingNotes: ['攜帶帽子、手套與圍巾 (Hat, gloves & scarf)'],
        waterproofRequired: true,
        precautions: ['建議提前 30 分鐘報到', '船上風大極冷，請穿著防風防水保暖衣物', '若容易暈船，請提前 1 小時服用暈船藥'],
        driveInfo: { time: '45 min', distance: '50 km' }
      },
      {
        id: 'packed-lunch-d5',
        time: '12:45',
        name: '自備簡便午餐',
        nameEn: 'Packed Lunch',
        description: '在移動過程中享用自備的簡便午餐，省下時間多看一點風景。這就是環島公路旅行的浪漫。',
        type: 'restaurant',
        coordinates: { lat: 65.68, lng: -17.55 },
        imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67534?q=80&w=800&auto=format&fit=crop',
        mustEat: ['自備餐點 (Packed Lunch)']
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
        driveInfo: { time: '40 min', distance: '50 km' }
      },
      {
        id: 'myvatn-viewpoint',
        time: '15:40',
        name: '米湖觀景點',
        nameEn: 'Lake Myvatn View Point',
        description: '從高處俯瞰米湖的全景。這裡的地貌非常獨特，偽火山口、熔岩原與湛藍的湖水交織成一幅奇幻的畫卷。',
        type: 'sight',
        coordinates: { lat: 65.61, lng: -16.99 },
        imageUrl: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '10 min', distance: '5 km' }
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
      },
      {
        id: 'k16-apartments-d5',
        time: '20:30',
        name: '續住 K16 apartments',
        nameEn: 'Stay at K16 apartments',
        description: '在阿庫雷里的第二晚。今晚可以去鎮上散散步，或者在公寓裡煮杯咖啡。',
        type: 'hotel',
        coordinates: { lat: 65.68, lng: -18.09 },
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    day: 6,
    date: '2026-05-28',
    title: '震撼瀑布與北方之都',
    locationName: 'Hofn',
    locations: [
      {
        id: 'breakfast-d6',
        time: '08:30',
        name: '自理早餐 (自炊)',
        nameEn: 'Self-catering Breakfast',
        description: '在公寓悠閒地煮個早餐，開始環島後半程的壯麗旅程。',
        type: 'restaurant',
        selfCatering: true,
        coordinates: { lat: 65.68, lng: -18.09 }
      },
      {
        id: 'dettifoss',
        time: '10:30',
        name: '黛提瀑布',
        nameEn: 'Dettifoss Waterfall',
        description: '歐州水量最大的瀑布。站在它旁邊，你會感覺到大地的震動，那是來自大自然最原始的力量。',
        type: 'sight',
        coordinates: { lat: 65.81, lng: -16.38 },
        imageUrl: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=800&auto=format&fit=crop',
        precautions: ['瀑布水量巨大，靠近時會有強烈的水氣與風壓', '相機與手機建議做好防水措施'],
        driveInfo: { time: '1.5 hr', distance: '100 km' }
      },
      {
        id: 'packed-lunch-d6',
        time: '12:30',
        name: '野餐午餐',
        nameEn: 'Packed Lunch',
        description: '在黛提瀑布附近的壯闊自然中享用午餐。簡單的食物配上百萬級的風景，就是冰島最奢華的體驗。',
        type: 'restaurant',
        coordinates: { lat: 65.81, lng: -16.38 },
        imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67534?q=80&w=800&auto=format&fit=crop',
        mustEat: ['自備餐點 (Packed Lunch)']
      },
      {
        id: 'studlagil',
        time: '15:00',
        name: '玄武岩峽谷',
        nameEn: 'Stuðlagil Canyon',
        description: '隱藏在峽谷中的玄武岩柱。這些柱子長得太整齊了，讓人懷疑是不是外星人蓋的。',
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
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        breakfastIncluded: true
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
    day: 7,
    date: '2026-05-29',
    title: '冰河湖與羽毛峽谷',
    locationName: 'Vik',
    locations: [
      {
        id: 'breakfast-d7',
        time: '08:00',
        name: '飯店早餐 (已包)',
        nameEn: 'Hotel Breakfast (Included)',
        description: '在 Milk Factory 享用簡潔而精緻的早餐，開啟冰河湖的一天。',
        type: 'restaurant',
        coordinates: { lat: 64.25, lng: -15.21 }
      },
      {
        id: 'jokulsarlon-boat',
        time: '09:30',
        name: '傑古沙龍冰河湖船旅',
        nameEn: 'Jökulsárlón Glacier Lagoon Boat Tour',
        description: '搭船穿梭在浮冰之間。如果你看到海豹在冰上曬太陽，記得跟牠們打個招呼，但別指望牠們會理你。',
        type: 'sight',
        coordinates: { lat: 64.04, lng: -16.17 },
        imageUrl: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?q=80&w=800&auto=format&fit=crop',
        tips: [
          '地點: Jokulsarlon Glacier Lagoon boat Tours & Café',
          '電話: +354 478 2222'
        ],
        bookingNotes: [
          '穿著保暖衣物 (Warm Clothing)', 
          '準備電子或紙本憑證 (Mobile or printed voucher)'
        ],
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
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
        stayDuration: 2,
        breakfastIncluded: true
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
    day: 8,
    date: '2026-05-30',
    title: '南岸瀑布與黑沙灘',
    locationName: 'Reykjavik',
    locations: [
      {
        id: 'breakfast-d8',
        time: '07:30',
        name: '飯店早餐 (已包)',
        nameEn: 'Hotel Breakfast (Included)',
        description: '在 Hótel Búrfell 享用豐富的飯店早餐，為最後一段南岸旅程儲備體力。',
        type: 'restaurant',
        coordinates: { lat: 63.46, lng: -19.14 }
      },
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
        precautions: ['絕對不可背對海洋拍照', '瘋狗浪隨時可能出現，請保持與水面 30 公尺以上的距離'],
        driveInfo: { time: '45 min', distance: '50 km' }
      },
      {
        id: 'plane-wreck',
        time: '09:40',
        name: 'DC-3 飛機殘骸',
        nameEn: 'DC-3 Sólheimasandur Plane Wreck',
        description: '這架 1973 年迫降的美國海軍 DC-3 飛機，現在是冰島最酷的拍照背景。雖然它看起來像科幻電影場景，但請別試圖爬上去，保護古蹟人人有責。',
        type: 'sight',
        coordinates: { lat: 63.45, lng: -19.36 },
        imageUrl: 'https://images.unsplash.com/photo-1498354136128-58f790194fa7?q=80&w=800&auto=format&fit=crop',
        tips: [
          '集合點: Solheimasandur Parking Lot (Reykjavik Excursions)'
        ],
        bookingNotes: [
          '穿著保暖衣物 (Warm Clothing)', 
          '準備電子或紙本憑證 (接駁車使用)'
        ],
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
        tips: ['可以帶一條備用毛巾'],
        waterproofRequired: true,
        precautions: ['步道極度濕滑，必須穿著防滑效果佳的登山鞋', '建議穿著完整的防水外衣與雨褲', '瀑布後方水煙極大，請保護好電子設備'],
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
        waterproofRequired: true,
        precautions: ['水氣極重，手機與相機需額外防水保護', '進入岩縫的路段濕滑且需踩水石'],
        driveInfo: { time: '2 hr', distance: '130 km' }
      },
      {
        id: 'hotel-laugavegur-d8',
        time: '17:30',
        name: '入住 Center Hotels Laugavegur',
        nameEn: 'Check-in Center Hotels Laugavegur',
        description: '重新回到雷克雅維克，今晚再次住在這條熟悉的熱鬧街道。',
        type: 'hotel',
        coordinates: { lat: 64.144, lng: -21.914 },
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
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
        mustEat: ['尼泊爾咖哩 (Nepalese Cuisine)'],
        driveInfo: { time: '5 min', distance: '1 km' }
      },
      {
        id: 'reykjavik-walk-2',
        time: '20:15',
        name: '雷克雅維克晚間漫步',
        nameEn: 'Reykjavik Night City Walk',
        description: '再次回到首都的街道。今晚可以去 Isbudin litla Valdis 嚐嚐冰島人引以為傲的冰淇淋，感受北方之都的夜之魅力。',
        type: 'sight',
        coordinates: { lat: 64.145, lng: -21.93 },
        imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop',
        mustEat: ['Valdís 冰淇淋 (Isbudin litla Valdis)']
      }
    ]
  },
  {
    day: 9,
    date: '2026-05-31',
    title: '城市巡禮與藍湖告別',
    locationName: 'Reykjavik',
    locations: [
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
        driveInfo: { time: '5 min', distance: '0.5 km' }
      },
      {
        id: 'sun-voyager',
        time: '10:00',
        name: '維京魚骨船 (太陽之舟)',
        nameEn: 'Sun Voyager (Sólfar)',
        description: '這座雕塑象徵著對未知領土的探索，像是一艘將啟程的維京船。站在這裡看著海，想像自己是維京海盜，準備去征服世界（或者只是去買個熱狗）。',
        type: 'sight',
        coordinates: { lat: 64.147, lng: -21.922 },
        imageUrl: 'https://images.unsplash.com/photo-1552525860-47029679639e?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '1 km' }
      },
      {
        id: 'harpa',
        time: '10:30',
        name: 'Harpa 音樂廳',
        nameEn: 'Harpa Concert Hall',
        description: '雷克雅維克的地標建築，玻璃外牆鑲嵌著各種形狀的彩色玻璃，靈感來自冰島的玄武岩柱。無論從內部還是外部看，光影變化都非常迷人。',
        type: 'sight',
        coordinates: { lat: 64.150, lng: -21.932 },
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
        driveInfo: { time: '5 min', distance: '0.5 km' }
      },
      {
        id: 'shopping-walk',
        time: '11:00',
        name: 'Laugavegur 購物與市區漫步',
        nameEn: 'Laugavegur Shopping & City Walk',
        description: '雷克雅維克的主街。這裡有許多冰島設計師品牌、紀念品店 and 特色咖啡廳。去 Kolaportið 週末市集逛逛（如果是週末的話），或者到 Tjörnin 托寧湖畔餵鳥。',
        type: 'sight',
        coordinates: { lat: 64.145, lng: -21.929 },
        imageUrl: 'https://images.unsplash.com/photo-1531737212413-967f9a70b5fd?q=80&w=800&auto=format&fit=crop',
        tips: ['推薦去 Kolaportið 週末跳蚤市集', '托寧湖 (Tjörnin) 就在旁邊'],
        mustBuy: ['冰島毛衣 (Lopapeysa)', '66° North 服飾'],
        driveInfo: { time: '10 min', distance: '1 km' }
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
        tips: [
          '地址: Norðurljósavegur 9, 240 Grindavík',
          '電話: +354 420 8800'
        ],
        bookingNotes: [
          '攜帶泳衣、防水手機袋', 
          '準備電子或紙本憑證 (Mobile or printed voucher)'
        ],
        precautions: ['建議每 15-20 分鐘起身休息並補充水分', '避免佩戴銀飾進入泉水，以免變色'],
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
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        breakfastIncluded: true
      }
    ]
  },
  {
    day: 10,
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
