'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Compass,
  ExternalLink,
  Landmark,
  MapPin,
  Navigation,
  Plane,
  ShoppingBag,
  Sparkles,
  Store,
  TrainFront,
  Utensils,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Filter = 'All' | 'Food' | 'Shopping' | 'Culture';
type StopCategory =
  | 'Flight/Transit'
  | 'Hotel'
  | 'Food'
  | 'Shopping'
  | 'Sightseeing'
  | 'Supermarket';

type Stop = {
  time: string;
  title: string;
  note: string;
  place: string;
  category: StopCategory;
  tag: string;
  xhsQuery?: string;
  choice?: string;
};

type Day = {
  date: string;
  weekday: string;
  dayNumber: number;
  title: string;
  subtitle: string;
  area: string;
  metro: string;
  stops: Stop[];
};

const filters: Filter[] = ['All', 'Food', 'Shopping', 'Culture'];

const days: Day[] = [
  {
    date: '17',
    weekday: 'Thu',
    dayNumber: 1,
    title: 'Arrival & Beijing Road culture walk',
    subtitle:
      'Settle in at Gongyuanqian, then keep the first day compact with coffee, character stores, old-town streets, and Dafo Temple after dark.',
    area: 'Gongyuanqian · Beijing Road',
    metro: 'Lines 1 & 2 · mostly walkable',
    stops: [
      {
        time: '08:55',
        title: 'CX982 arrival & Metro Line 2',
        note: 'Land at Guangzhou Baiyun Airport, clear immigration, collect baggage, and ride Line 2 directly to Gongyuanqian.',
        place: '广州白云国际机场',
        category: 'Flight/Transit',
        tag: 'Landing · CAN',
      },
      {
        time: '10:30',
        title: '禧粤 YUE HOTEL luggage drop',
        note: 'Leave your bags at reception before the official 14:00 room check-in.',
        place: '禧粤YUE HOTEL 广州北京路步行街公园前地铁站店',
        category: 'Hotel',
        tag: 'Front desk',
      },
      {
        time: '10:45',
        title: '垌底咖啡 · Dongdi Coffee',
        note: 'Ease into the day with an opening coffee at the Fuqian Building branch.',
        place: '垌底咖啡 府前大楼店 广州',
        category: 'Food',
        tag: 'Opening coffee',
      },
      {
        time: '11:30',
        title: '卡游 · 广州动漫星城店',
        note: 'Browse cards and character collectibles inside the Gongyuanqian metro concourse.',
        place: '卡游 广州动漫星城店',
        category: 'Shopping',
        tag: 'ACG & anime',
      },
      {
        time: '12:30',
        title: '蟹小棋·蟹黄面 · 北京路店',
        note: 'Have rich crab roe noodles close to the Beijing Road shopping strip.',
        place: '蟹小棋·蟹黄面 北京路店',
        category: 'Food',
        tag: 'Lunch',
      },
      {
        time: '14:00',
        title: '禧粤 YUE HOTEL room check-in',
        note: 'Return to the hotel, check into the room, unpack, and freshen up before the afternoon retail circuit.',
        place: '禧粤YUE HOTEL 广州北京路步行街公园前地铁站店',
        category: 'Hotel',
        tag: 'Room check-in',
      },
      {
        time: '15:30',
        title: '北京路天河城 · Teemall',
        note: 'Shop TOP TOY, POP MART 泡泡玛特, and Uniqlo together inside the Beijing Road mall.',
        place: '北京路天河城',
        category: 'Shopping',
        tag: 'TOP TOY · POP MART · Uniqlo',
      },
      {
        time: '17:00',
        title: 'M豆旗舰店 · M&M’S 广州北京路店',
        note: 'Browse the flagship for character merchandise and colourful packaged treats.',
        place: 'M豆旗舰店 广州北京路店',
        category: 'Shopping',
        tag: 'Street retail',
      },
      {
        time: '17:45',
        title: '名创优品 · 广州北京路店',
        note: 'Pick up practical gifts, character collaborations, and travel-size extras.',
        place: '名创优品 广州北京路店',
        category: 'Shopping',
        tag: 'Gifts',
      },
      {
        time: '18:15',
        title: '三生有信 · 北京路店',
        note: 'Choose postcards, custom keepsakes, and Guangzhou-themed souvenirs.',
        place: '三生有信 北京路店',
        category: 'Shopping',
        tag: 'Keepsakes',
      },
      {
        time: '18:30',
        title: 'Nasi77亚洲餐室',
        note: 'Sit down for Southeast Asian comfort food near Beijing Road before the night walk.',
        place: 'Nasi77亚洲餐室 广州',
        category: 'Food',
        tag: 'Dinner',
      },
      {
        time: '19:30',
        title: '大佛寺 · Dafo Temple lights',
        note: 'Photograph the illuminated temple façade from Beijing Road once the evening lights are on.',
        place: '大佛寺 广州',
        category: 'Sightseeing',
        tag: 'Night landmark',
      },
      {
        time: '20:30',
        title: '名创优品 · 广州星寰店',
        note: 'Stroll south toward Haizhu Square and finish at the Miniso inside 星寰 by the riverfront.',
        place: '名创优品 广州星寰店',
        category: 'Shopping',
        tag: 'Haizhu Square',
      },
    ],
  },
  {
    date: '18',
    weekday: 'Fri',
    dayNumber: 2,
    title: 'Historic Liwan, cafés & Yongqing Fang',
    subtitle:
      'A west-side day of Xihua Road coffee, wholesale fashion, Xiguan lanes, small design shops, warm egg tarts, and crawfish.',
    area: 'Xihua Road · Liwan · Xiguan',
    metro: 'Lines 1, 5 & 8 · short taxi hops help',
    stops: [
      {
        time: '09:30',
        title: 'Simple 闪咖啡 · Xihua Road',
        note: 'Start with a specialty coffee on one of Guangzhou’s best-known food streets.',
        place: 'Simple闪咖啡 西华路店',
        category: 'Food',
        tag: 'Morning coffee',
      },
      {
        time: '10:15',
        title: '骁聚希集·聚聚士多',
        note: 'Browse the small lifestyle-goods shop on Shitong Street before heading north.',
        place: '骁聚希集·聚聚士多 世通街店',
        category: 'Shopping',
        tag: 'Lifestyle',
      },
      {
        time: '11:00',
        title: 'apM时代国际',
        note: 'Explore the Railway Station fashion wholesale hub; allow extra time if you plan to compare several floors.',
        place: 'apM时代国际服装城 广州',
        category: 'Shopping',
        tag: 'Wholesale fashion',
      },
      {
        time: '12:00',
        title: '此刻热麦 · HotBakeMo',
        note: 'Pick up pastries and the signature bear buns from the bakery restaurant.',
        place: '此刻热麦·面包餐厅 广州',
        category: 'Food',
        tag: 'Bear buns',
      },
      {
        time: '13:30',
        title: '永庆坊 · Yongqing Fang',
        note: 'Walk the restored Xiguan alleys, canal paths, and Lingnan heritage streets.',
        place: '永庆坊',
        category: 'Sightseeing',
        tag: 'Heritage quarter',
      },
      {
        time: '14:00',
        title: 'DIMOND 玩意制造',
        note: 'Browse the design-toy and creative-goods shop inside Yongqing Fang.',
        place: 'DIMOND玩意制造 永庆坊',
        category: 'Shopping',
        tag: 'Design goods',
      },
      {
        time: '14:45',
        title: 'PICOCICI 皮克嘻嘻 · 永庆坊店',
        note: 'Continue the boutique circuit with colourful lifestyle and character pieces.',
        place: 'PICOCICI皮克嘻嘻 永庆坊店',
        category: 'Shopping',
        tag: 'Boutique',
      },
      {
        time: '15:30',
        title: '一桌广州·记忆商店 · 永庆坊店',
        note: 'Look for Guangzhou-themed keepsakes and locally inspired gifts.',
        place: '一桌广州·记忆商店 永庆坊店',
        category: 'Shopping',
        tag: 'Local gifts',
      },
      {
        time: '16:15',
        title: 'POP MART 泡泡玛特 · 永庆坊店',
        note: 'Check the Yongqing Fang branch for blind boxes and current character series.',
        place: 'POP MART泡泡玛特 永庆坊店',
        category: 'Shopping',
        tag: 'Collectibles',
      },
      {
        time: '16:45',
        title: '上下九商业步行街',
        note: 'Continue through the historic arcade street and its classic Xiguan façades.',
        place: '上下九商业步行街 广州',
        category: 'Sightseeing',
        tag: 'Historic arcade',
      },
      {
        time: '17:15',
        title: '功夫蛋挞',
        note: 'Pick up warm Portuguese egg tarts before dinner.',
        place: '功夫蛋挞 广州',
        category: 'Food',
        tag: 'Egg tart',
      },
      {
        time: '18:00',
        title: '熊记虾王·小龙虾',
        note: 'Finish the Liwan day with a generous crawfish dinner at the 动感小西关 branch.',
        place: '熊记虾王·小龙虾 动感小西关店',
        category: 'Food',
        tag: 'Dinner',
      },
    ],
  },
  {
    date: '19',
    weekday: 'Sat',
    dayNumber: 3,
    title: 'Dongshankou & the Tianhe skyline',
    subtitle:
      'Move east from red-brick villas and indie storefronts to Guangzhou’s polished retail core, then end among the CBD lights.',
    area: 'Dongshankou · Tianhe · Zhujiang New Town',
    metro: 'Line 1 east, then Line 3 south',
    stops: [
      {
        time: '10:00',
        title: 'shego icecream · 东山口店',
        note: 'Start the morning with artisanal gelato in Dongshankou before moving into Tianhe.',
        place: 'shego icecream 东山口店',
        category: 'Food',
        tag: 'Morning sweet treat',
      },
      {
        time: '12:30',
        title: '中天购物城 · Citic Plaza',
        note: 'Begin the Tianhe shopping circuit at the central retail complex.',
        place: '中天购物城 广州',
        category: 'Shopping',
        tag: 'Tianhe circuit',
      },
      {
        time: '13:15',
        title: '沃尔玛 · 天河店',
        note: 'Make the major grocery stop here for packaged snacks, drinks, and practical souvenirs.',
        place: '沃尔玛 天河店 广州',
        category: 'Supermarket',
        tag: 'Major grocery stop',
      },
      {
        time: '14:30',
        title: '阿迪达斯足球旗舰店 · 天河城店',
        note: 'Browse the multi-storey football flagship inside Teemall for kits, boots, and accessories.',
        place: '阿迪达斯足球旗舰店 天河城店',
        category: 'Shopping',
        tag: 'Sports flagship',
      },
      {
        time: '15:30',
        title: '天环 Parc Central · AKAK',
        note: 'Cross into the open-air mall and visit AKAK at the west tower branch.',
        place: 'AKAK 天环广场西塔店',
        category: 'Shopping',
        tag: 'Open-air mall',
        xhsQuery: '天环Parc Central AKAK 天环广场西塔店',
      },
      {
        time: '16:30',
        title: '太古汇 · Taikoo Hui',
        note: 'Explore the luxury and international flagship stores in the Tianhe retail core.',
        place: '太古汇 广州',
        category: 'Shopping',
        tag: 'Luxury retail',
      },
      {
        time: '17:30',
        title: '1200bookshop · 体育东路店',
        note: 'Browse books, vinyl, and gifts before heading into Zhujiang New Town.',
        place: '1200bookshop 体育东路店',
        category: 'Shopping',
        tag: 'Books & vinyl',
      },
      {
        time: '19:00',
        title: 'K11 购物艺术中心',
        note: 'Explore the art-led retail spaces in Zhujiang New Town as the city lights come on.',
        place: '广州K11购物艺术中心',
        category: 'Sightseeing',
        tag: 'Art mall',
      },
      {
        time: '20:30',
        title: '广州塔 · Canton Tower night view',
        note: 'Take photographs of the illuminated tower from Haixinsha or Zhujiang New Town.',
        place: '广州塔',
        category: 'Sightseeing',
        tag: 'Skyline',
      },
    ],
  },
  {
    date: '20',
    weekday: 'Sun',
    dayNumber: 4,
    title: 'Outlets & south commercial hubs',
    subtitle:
      'Move south from Haizhu outlet deals to Wanbo clearance shopping, then finish in air-conditioned comfort at Pazhou.',
    area: 'Haizhu · Panyu/Wanbo · Pazhou',
    metro: 'Metro southbound · Lines 7, 8 & 18',
    stops: [
      {
        time: '10:00',
        title: '万国奥特莱斯 · Wanguo Outlets',
        note: 'Browse discounted sports footwear, casual apparel, and outlet deals until lunchtime.',
        place: '万国奥特莱斯 广州',
        category: 'Shopping',
        tag: 'Haizhu outlet',
      },
      {
        time: '13:00',
        title: 'Nike · 万博天河城 OUTLETS',
        note: 'Ride south to the Wanbo district for Nike clearance shopping and outlet finds.',
        place: '耐克Nike 万博天河城OUTLETS店',
        category: 'Shopping',
        tag: 'Outlet clearance',
      },
      {
        time: '15:00',
        title: '月亮物业',
        note: 'Visit this verified stop in the Wanbo commercial sector before continuing toward Pazhou.',
        place: '月亮物业 广州番禺万博',
        category: 'Shopping',
        tag: 'Wanbo precinct',
      },
      {
        time: '17:00',
        title: '保利广场 · Poly Plaza',
        note: 'Finish the south-side day with air-conditioned leisure, dining, and shopping in Pazhou.',
        place: '保利广场 广州琶洲',
        category: 'Shopping',
        tag: 'Pazhou hub',
      },
    ],
  },
  {
    date: '21',
    weekday: 'Mon',
    dayNumber: 5,
    title: 'North mall, souvenirs & late flight',
    subtitle:
      'Store your bags after check-out, make the final north-side mall visit, return for Beijing Road gifts, and leave on CX989.',
    area: 'Baiyun Lake · Beijing Road · Baiyun Airport',
    metro: 'Cross-city day · allow a generous airport buffer',
    stops: [
      {
        time: '10:00',
        title: 'YUE HOTEL check-out & bag storage',
        note: 'Check out before noon and leave luggage with the hotel concierge for the day.',
        place: '禧粤YUE HOTEL 广州北京路步行街公园前地铁站店',
        category: 'Hotel',
        tag: 'Concierge storage',
      },
      {
        time: '11:00',
        title: '白云湖金铂天地',
        note: 'Make the mid-day north-side excursion for lunch and casual mall shopping.',
        place: '白云湖金铂天地 广州',
        category: 'Shopping',
        tag: 'North lake mall',
      },
      {
        time: '15:30',
        title: '三生有信 · 北京路店',
        note: 'Return to the hotel area for custom souvenirs and Guangzhou keepsakes.',
        place: '三生有信 北京路店',
        category: 'Shopping',
        tag: 'Final sweep',
      },
      {
        time: '16:15',
        title: 'M豆旗舰店 · M&M’S',
        note: 'Pick up last-minute character gifts and packaged treats on Beijing Road.',
        place: 'M豆旗舰店 广州北京路店',
        category: 'Shopping',
        tag: 'Final sweep',
      },
      {
        time: '17:00',
        title: '名创优品 · 广州北京路店',
        note: 'Make the last gift stop before returning for luggage.',
        place: '名创优品 广州北京路店',
        category: 'Shopping',
        tag: 'Final sweep',
      },
      {
        time: '18:45',
        title: 'Collect luggage at YUE HOTEL',
        note: 'Return to the lobby, collect every stored bag, and be ready to leave by 19:00.',
        place: '禧粤YUE HOTEL 广州北京路步行街公园前地铁站店',
        category: 'Hotel',
        tag: 'Luggage pickup',
      },
      {
        time: '19:00',
        title: 'Transfer to Baiyun Airport T2',
        note: 'Take the metro or a direct taxi/Didi. Aim to reach Terminal 2 around 20:00 for check-in and security.',
        place: '广州白云国际机场',
        category: 'Flight/Transit',
        tag: 'Airport transfer',
      },
      {
        time: '22:20',
        title: 'CX989 departure via Hong Kong',
        note: 'Depart Guangzhou for Hong Kong, then connect overnight to CX659 for Singapore.',
        place: '广州白云国际机场',
        category: 'Flight/Transit',
        tag: 'Flight CX989',
      },
    ],
  },
];

const flights = [
  {
    date: '17 Sep',
    flight: 'CX714',
    route: 'Singapore → Hong Kong',
    depart: '01:45',
    arrive: '05:50',
    detail: 'Outbound · first leg',
  },
  {
    date: '17 Sep',
    flight: 'CX982',
    route: 'Hong Kong → Guangzhou',
    depart: '07:50',
    arrive: '08:55',
    detail: '2-hour connection in Hong Kong',
  },
  {
    date: '21 Sep',
    flight: 'CX989',
    route: 'Guangzhou → Hong Kong',
    depart: '22:20',
    arrive: '23:40',
    detail: 'Return · first leg',
  },
  {
    date: '22 Sep',
    flight: 'CX659',
    route: 'Hong Kong → Singapore',
    depart: '01:45',
    arrive: '05:30',
    detail: '2-hour 5-minute connection in Hong Kong',
  },
];

const hotel = {
  name: '禧粤 YUE HOTEL',
  descriptor: 'Beijing Road · Gongyuanqian Station',
  chinese: '禧粤YUE HOTEL（广州北京路步行街公园前地铁站店）',
  address: 'No. 410 Jiefang Middle Road, Yuexiu District, Guangzhou',
  chineseAddress: '广东广州越秀区解放中路410号',
  googleUrl:
    'https://www.google.com/maps/search/410+Jiefang+Middle+Road,+Yuexiu+District,+Guangzhou,+Guangdong,+China',
};

const categoryStyles: Record<StopCategory, string> = {
  'Flight/Transit': 'border-indigo-200 bg-indigo-50 text-indigo-800',
  Hotel: 'border-stone-300 bg-stone-100 text-stone-800',
  Food: 'border-orange-200 bg-orange-50 text-orange-800',
  Shopping: 'border-pink-200 bg-pink-50 text-pink-800',
  Sightseeing: 'border-sky-200 bg-sky-50 text-sky-800',
  Supermarket: 'border-emerald-300 bg-emerald-100 text-emerald-900',
};

function matchesFilter(stop: Stop, filter: Filter) {
  if (filter === 'All') return true;
  if (filter === 'Culture') return stop.category === 'Sightseeing';
  if (filter === 'Food') return stop.category === 'Food';
  if (filter === 'Shopping')
    return stop.category === 'Shopping' || stop.category === 'Supermarket';
  return false;
}

function amapUrl(place: string) {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(place)}&view=map&callnative=0`;
}

function xhsUrl(stop: Stop) {
  return `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(stop.xhsQuery ?? stop.place)}`;
}

function RouteButton({
  place,
  large = false,
}: {
  place: string;
  large?: boolean;
}) {
  return (
    <a
      href={amapUrl(place)}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${place} in Amap`}
      className={
        large
          ? 'inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--jade)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jade)]'
          : 'inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3 py-2 text-xs font-bold text-[var(--ink)] transition hover:border-[var(--jade)] hover:text-[var(--jade)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jade)]'
      }
    >
      <Navigation
        className={large ? 'size-4' : 'size-3.5'}
        aria-hidden="true"
      />
      Amap
      {large && <ArrowRight className="size-4" aria-hidden="true" />}
    </a>
  );
}

function XhsButton({ stop }: { stop: Stop }) {
  return (
    <a
      href={xhsUrl(stop)}
      target="_blank"
      rel="noreferrer"
      aria-label={`Search Xiaohongshu for ${stop.title}`}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-[var(--xhs)] transition hover:border-[var(--xhs)] hover:bg-[var(--xhs)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--xhs)]"
    >
      <span className="text-[10px] font-black tracking-wide">小红书</span>
      XHS
      <ExternalLink className="size-3" aria-hidden="true" />
    </a>
  );
}

function CategoryBadge({ stop }: { stop: Stop }) {
  const icon =
    stop.category === 'Flight/Transit' ? (
      <Plane className="size-3" aria-hidden="true" />
    ) : stop.category === 'Hotel' ? (
      <Building2 className="size-3" aria-hidden="true" />
    ) : stop.category === 'Food' ? (
      <Utensils className="size-3" aria-hidden="true" />
    ) : stop.category === 'Shopping' ? (
      <ShoppingBag className="size-3" aria-hidden="true" />
    ) : stop.category === 'Sightseeing' ? (
      <Landmark className="size-3" aria-hidden="true" />
    ) : (
      <Store className="size-3" aria-hidden="true" />
    );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant="outline"
        className={`gap-1 border px-2.5 py-1 text-[11px] font-bold ${categoryStyles[stop.category]}`}
      >
        {icon}
        {stop.category}
      </Badge>
      <span className="text-xs font-semibold text-[var(--muted-ink)]">
        {stop.tag}
      </span>
    </div>
  );
}

function StopCard({
  stop,
  index,
  total,
}: {
  stop: Stop;
  index: number;
  total: number;
}) {
  return (
    <Card
      className={
        stop.category === 'Supermarket'
          ? 'h-full border-none bg-emerald-50 shadow-sm ring-2 ring-emerald-300 transition hover:bg-emerald-50 hover:shadow-md'
          : 'h-full border-none bg-white/85 shadow-xs ring-1 ring-black/5 transition hover:bg-white hover:shadow-md'
      }
    >
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[var(--paper)] px-2.5 py-1 text-xs font-black text-[var(--ink)] ring-1 ring-[var(--line)]">
              <Clock3
                className="size-3 text-[var(--vermilion)]"
                aria-hidden="true"
              />{' '}
              {stop.time}
            </span>
            {stop.choice && (
              <span className="rounded-full bg-[var(--butter)] px-2.5 py-1 text-[11px] font-black text-[var(--ink)]">
                {stop.choice}
              </span>
            )}
          </div>
          <CategoryBadge stop={stop} />
        </div>
        <CardTitle className="mt-2 text-lg font-bold sm:text-xl">
          {stop.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs font-semibold text-[var(--jade)]">
          <MapPin className="size-3" aria-hidden="true" /> {stop.place}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm leading-6 text-[var(--muted-ink)]">{stop.note}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)]/60 pt-3">
          <span className="text-xs font-medium text-[var(--muted-ink)]">
            Stop {index + 1} of {total}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <XhsButton stop={stop} />
            <RouteButton place={stop.place} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--ink)] text-white shadow-lg shadow-black/5">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#plan"
            className="group flex items-center gap-3"
            aria-label="Guangzhou trip plan home"
          >
            <span className="grid size-10 place-items-center rounded-full bg-[var(--vermilion)] text-[11px] font-black tracking-tight text-white transition group-hover:rotate-6">
              GZ
            </span>
            <span>
              <span className="block font-serif text-lg font-bold leading-none">
                Guangzhou
              </span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-white/55">
                17—21 Sep · 2026
              </span>
            </span>
          </a>
          <nav
            className="hidden items-center gap-7 text-sm font-semibold md:flex"
            aria-label="Main navigation"
          >
            <a href="#plan" className="transition hover:text-[var(--butter)]">
              Itinerary
            </a>
            <a
              href="#trip-details"
              className="transition hover:text-[var(--butter)]"
            >
              Stay & flights
            </a>
          </nav>
          <a
            href={amapUrl(hotel.chinese)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3 text-xs font-bold transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--butter)] sm:px-4"
            aria-label="Open YUE HOTEL at Gongyuanqian in Amap"
          >
            <Building2
              className="size-3.5 text-[var(--butter)]"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Base · YUE HOTEL</span>
            <span className="sm:hidden">Hotel</span>
          </a>
        </div>
        <div className="border-t border-white/10 bg-white/[0.06]">
          <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-5 py-2 text-center text-xs font-semibold text-white/80 sm:px-8 lg:px-12">
            <TrainFront
              className="size-3.5 shrink-0 text-[var(--butter)]"
              aria-hidden="true"
            />
            公园前 Gongyuanqian · Metro Lines 1 & 2 · quick walk to Beijing Road
          </div>
        </div>
      </header>

      <section id="plan" className="scroll-mt-28 border-b border-[var(--line)]">
        <div className="relative min-h-[330px] overflow-hidden border-b border-[var(--line)] sm:min-h-[380px]">
          <Image
            src="/canton-tower-night.jpg"
            alt="Canton Tower illuminated beside the Pearl River at night"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
          <div className="relative mx-auto flex min-h-[330px] max-w-[1440px] items-end px-5 py-8 text-white sm:min-h-[380px] sm:items-center sm:px-8 sm:py-12 lg:px-12">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/35 bg-black/20 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                  The Canton Edit
                </span>
                <span className="font-serif text-3xl">广州</span>
              </div>
              <h1 className="mt-5 font-serif text-[clamp(3.2rem,8vw,5.6rem)] font-bold leading-[0.88] tracking-[-0.04em]">
                Eat well. Walk slow.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                Five neighbourhood days with every stop, flight milestone, and
                route link in one tidy plan.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-sm">
                  Sept 17–21 · 4 nights
                </span>
                <span className="rounded-full bg-[var(--butter)] px-3 py-1.5 text-sm font-bold text-[var(--ink)]">
                  YUE HOTEL · Gongyuanqian
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="grid gap-5 border-b border-[var(--line)] pb-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow">Your complete schedule</p>
              <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                Five days, sorted.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted-ink)]">
                Open any day for its chronological stops. All days start
                collapsed so you can scan the whole trip first.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2.5 text-sm font-bold text-[var(--ink)]">
              <Compass
                className="size-4 text-[var(--jade)]"
                aria-hidden="true"
              />
              All days
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-[var(--line)] bg-white/55 p-4 shadow-xs sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">
                Show me
              </p>
              <p className="mt-1 text-sm text-[var(--muted-ink)]">
                Filter stops across all five days.
              </p>
            </div>
            <div
              className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:justify-end"
              aria-label="Filter itinerary stops"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`min-h-10 rounded-full border px-4 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jade)] ${
                    activeFilter === filter
                      ? 'border-[var(--jade)] bg-[var(--jade)] text-white shadow-sm'
                      : 'border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--jade)] hover:bg-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <Accordion className="mt-8 w-full space-y-4">
            {days.map((day) => {
              const visibleStops = day.stops.filter((stop) =>
                matchesFilter(stop, activeFilter),
              );

              return (
                <AccordionItem
                  key={day.date}
                  value={`day-${day.date}`}
                  className="overflow-hidden rounded-[24px] border border-[var(--line)] bg-white/78 px-4 shadow-xs transition data-open:bg-white data-open:shadow-md sm:px-6"
                >
                  <AccordionTrigger className="w-full py-5 hover:no-underline sm:py-6">
                    <div className="flex min-w-0 flex-1 items-center gap-3 pr-3 sm:gap-5">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--ink)] text-white sm:size-14">
                        <span className="text-center">
                          <span className="block text-[9px] font-black uppercase tracking-[0.14em] text-[var(--butter)]">
                            Sep
                          </span>
                          <span className="block font-serif text-xl font-bold leading-none">
                            {day.date}
                          </span>
                        </span>
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block text-xs font-black uppercase tracking-[0.13em] text-[var(--vermilion)]">
                          Day {day.dayNumber} · {day.weekday}
                        </span>
                        <span className="mt-1 block font-serif text-lg font-bold leading-snug text-[var(--ink)] sm:text-2xl">
                          {day.title}
                        </span>
                        <span className="mt-1 block text-sm font-semibold leading-5 text-[var(--muted-ink)]">
                          {day.area}
                        </span>
                      </span>
                      <span className="hidden shrink-0 text-right sm:block">
                        <span className="block text-sm font-black text-[var(--ink)]">
                          {visibleStops.length}
                        </span>
                        <span className="block text-xs font-semibold text-[var(--muted-ink)]">
                          {activeFilter === 'All' ? 'stops' : 'shown'}
                        </span>
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="border-t border-[var(--line)] pt-5 pb-6 sm:pt-6">
                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                      <p className="max-w-3xl text-base leading-7 text-[var(--muted-ink)]">
                        {day.subtitle}
                      </p>
                      <span className="flex w-fit items-center gap-2 rounded-full bg-[var(--paper)] px-3 py-2 text-xs font-bold text-[var(--muted-ink)] ring-1 ring-[var(--line)]">
                        <TrainFront
                          className="size-3.5 text-[var(--jade)]"
                          aria-hidden="true"
                        />
                        {day.metro}
                      </span>
                    </div>

                    {visibleStops.length > 0 ? (
                      <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-2">
                        {visibleStops.map((stop, index) => (
                          <StopCard
                            key={`${day.date}-${stop.time}-${stop.title}`}
                            stop={stop}
                            index={index}
                            total={visibleStops.length}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="mt-6 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--paper)]/55 px-5 py-9 text-center">
                        <Sparkles
                          className="mx-auto size-6 text-[var(--gold)]"
                          aria-hidden="true"
                        />
                        <p className="mt-3 font-serif text-xl font-bold">
                          No {activeFilter.toLowerCase()} stops this day.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveFilter('All')}
                          className="mt-3 min-h-10 text-sm font-bold text-[var(--jade)] underline underline-offset-4"
                        >
                          Show the full itinerary
                        </button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="mt-7 flex items-start gap-2 rounded-2xl bg-[var(--jade)]/8 px-4 py-4 text-sm leading-6 text-[var(--muted-ink)] sm:px-5">
            <CheckCircle2
              className="mt-1 size-4 shrink-0 text-[var(--jade)]"
              aria-hidden="true"
            />
            <span>
              Tap <b>XHS</b> for photo references or <b>Amap</b> for live
              高德地图 navigation. Flight, hotel, and luggage milestones are
              included in the full view.
            </span>
          </div>
        </div>
      </section>

      <section
        id="trip-details"
        className="scroll-mt-28 bg-[var(--butter)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[var(--ink)]/60">Fixed trip anchors</p>
              <h2 className="mt-3 font-serif text-5xl font-bold tracking-tight sm:text-6xl">
                Stay & flights.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--ink)]/75">
              Flight times are local. Gongyuanqian keeps Beijing Road walkable
              and gives you direct access to Metro Lines 1 and 2.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
            <article className="flex flex-col justify-between rounded-[30px] bg-[var(--ink)] p-6 text-white sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-white/10">
                    <MapPin
                      className="size-5 text-[var(--butter)]"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
                    4 nights · Yuexiu
                  </span>
                </div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--butter)]">
                  Your Guangzhou base
                </p>
                <h3 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
                  {hotel.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-white/80">
                  {hotel.descriptor}
                </p>
                <p className="mt-5 text-base font-bold leading-7 text-[var(--butter)]">
                  {hotel.chinese}
                </p>
                <div className="mt-4 border-l border-white/20 pl-4 text-sm leading-6 text-white/70">
                  <p>{hotel.address}</p>
                  <p>{hotel.chineseAddress}</p>
                </div>
              </div>
              <div>
                <div className="mt-8 flex flex-wrap gap-2">
                  <a
                    href={amapUrl(hotel.chinese)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--butter)] px-4 py-2.5 text-xs font-bold text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <Navigation className="size-3.5" aria-hidden="true" /> Open
                    in Amap
                  </a>
                  <a
                    href={hotel.googleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition hover:border-white hover:bg-white/10"
                  >
                    Google Maps{' '}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
                <div className="mt-8 rounded-2xl bg-white/[0.08] p-4 text-sm leading-6 text-white/75">
                  <span className="font-bold text-white">
                    Why this base works:
                  </span>{' '}
                  Beijing Road is walkable, Liwan is a short ride west,
                  Dongshankou and Tianhe sit directly east on Line 1, and Line 2
                  runs toward the airport.
                </div>
              </div>
            </article>
            <div className="grid gap-3 sm:grid-cols-2">
              {flights.map((flight) => (
                <article
                  key={flight.flight}
                  className="flex min-h-56 flex-col justify-between rounded-[26px] bg-[var(--paper)] p-5 shadow-xs sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">
                      {flight.date}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black shadow-xs">
                      {flight.flight}
                    </span>
                  </div>
                  <div className="my-6">
                    <p className="font-serif text-lg font-bold">
                      {flight.route}
                    </p>
                    <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <div>
                        <p className="font-serif text-3xl font-bold">
                          {flight.depart}
                        </p>
                        <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">
                          Depart
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--vermilion)]">
                        <span className="h-px w-4 bg-current" />
                        <Plane
                          className="size-4 rotate-45"
                          aria-hidden="true"
                        />
                        <span className="h-px w-4 bg-current" />
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-3xl font-bold">
                          {flight.arrive}
                        </p>
                        <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">
                          Arrive
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="border-t border-[var(--line)] pt-3 text-xs font-semibold text-[var(--muted-ink)]">
                    {flight.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-[var(--paper)] py-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 text-xs text-[var(--muted-ink)] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="font-bold text-[var(--ink)]">
            Guangzhou · 广州 · 17—21.09.2026
          </p>
          <p>Five days, grouped by neighbourhood and metro direction.</p>
        </div>
      </footer>
    </main>
  );
}
