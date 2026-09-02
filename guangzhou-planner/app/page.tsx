'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Coffee,
  Compass,
  ExternalLink,
  Landmark,
  Layers,
  MapPin,
  Navigation,
  Plane,
  ShoppingBag,
  Store,
  Utensils,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type StopCategory =
  | 'Flight'
  | 'Hotel'
  | 'Shopping'
  | 'Dining'
  | 'Cafe'
  | 'Bakery'
  | 'Culture'
  | 'Landmark'
  | 'Excursion'
  | 'Transfer';

type Stop = {
  time: string;
  title: string;
  note: string;
  place: string;
  tone: 'jade' | 'red' | 'gold';
  tag: string;
  category: StopCategory;
  xhsUrl: string;
};

type Day = {
  date: string;
  weekday: string;
  dayNumber: number;
  title: string;
  subtitle: string;
  area: string;
  pace: string;
  stops: Stop[];
};

const days: Day[] = [
  {
    date: '17',
    weekday: 'Thu',
    dayNumber: 1,
    title: 'Arrival & Haizhu',
    subtitle:
      'Flight arrival, hotel check-in, Beijing Road shopping, Wanguo Outlets, and famous shoe waffles in Haizhu.',
    area: 'Haizhu & Yuexiu',
    pace: 'Arrival & Haizhu · 5 stops',
    stops: [
      {
        time: '08:55',
        title: 'Flight CX982 Arrival',
        note: 'Land at Guangzhou Baiyun International Airport (CAN) on flight CX982 from Hong Kong. Clear immigration and collect bags before heading into the city.',
        place: '广州白云国际机场',
        tone: 'jade',
        tag: 'Airport',
        category: 'Flight',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E7%99%BD%E4%BA%91%E6%9C%BA%E5%9C%BA%E5%85%A5%E5%A2%83',
      },
      {
        time: '11:00',
        title: 'Xi Yue Hotel Check-in / Bag Drop',
        note: 'Check in or leave bags at Xi Yue Hotel near Gongyuanqian Metro Station and Beijing Road to stay hands-free.',
        place: '禧粤YUE HOTEL 广州北京路步行街公园前地铁站店',
        tone: 'gold',
        tag: 'Base',
        category: 'Hotel',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E7%A6%A7%E7%B2%A4YUE+HOTEL%E5%85%AC%E5%9B%AD%E5%89%8D',
      },
      {
        time: '13:00',
        title: 'Joy&Season (Beijing Road Tianhecheng)',
        note: 'Browse cute lifestyle accessories, stationery, and creative goods at Joy&Season inside Beijing Road Tianhecheng (Teemall).',
        place: '北京路天河城',
        tone: 'red',
        tag: 'Shopping',
        category: 'Shopping',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=Joy%26Season+%E5%8C%97%E4%BA%AC%E8%B7%AF%E5%A4%A9%E6%B2%B3%E5%9F%8E',
      },
      {
        time: '15:30',
        title: 'Wanguo Outlets (万国奥特莱斯)',
        note: 'Cross the Pearl River into Haizhu District for major sports brands and discounted shopping across multiple outlet floors.',
        place: '万国奥特莱斯',
        tone: 'gold',
        tag: 'Outlets',
        category: 'Shopping',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E4%B8%87%E5%9B%BD%E5%A5%A5%E7%89%B9%E8%8E%B1%E6%96%AF+%E6%B5%B7%E7%8F%A0',
      },
      {
        time: '18:00',
        title: '富贵食饭公司 · Shoe Waffle (R&F Haizhu City)',
        note: 'Dine at 富贵食饭公司 in R&F Haizhu City (富力海珠城). Must-order: their viral signature shoe waffle (鞋底华夫饼) and classic cha chaan teng dishes.',
        place: '富贵食饭公司(富力海珠城店)',
        tone: 'red',
        tag: 'Viral Food',
        category: 'Dining',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E5%AF%8C%E8%B4%B5%E9%A3%9F%E9%A5%AD%E5%85%AC%E5%8F%B8+%E9%9E%8B%E5%BA%95%E5%8D%8E%E5%A4%AB%E9%A5%BC',
      },
    ],
  },
  {
    date: '18',
    weekday: 'Fri',
    dayNumber: 2,
    title: 'Liwan & Xihua',
    subtitle:
      'Historic Lingnan alleys, creative boutique hopping in Yongqing Fang, specialty brew at Simple 闪咖啡, and fresh bear buns.',
    area: 'Liwan & Yuexiu',
    pace: 'Heritage & Cafe · 3 stops',
    stops: [
      {
        time: '10:00',
        title: 'Yongqing Fang (DIMOND玩意制造, picocici, 一桌广州·记忆商店)',
        note: 'Stroll through historic Xiguan architecture and explore trending creative shops: DIMOND玩意制造 (toys & design), picocici (cute lifestyle), and 一桌广州·记忆商店 (Guangzhou memory souvenirs).',
        place: '永庆坊',
        tone: 'jade',
        tag: 'Heritage & Design',
        category: 'Culture',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E6%B0%B8%E5%BA%86%E5%9D%8A+DIMOND+picocici+%E4%B8%80%E6%A1%8C%E5%B9%BF%E5%B7%9E',
      },
      {
        time: '14:00',
        title: 'Simple 闪咖啡 (Xihua Road)',
        note: 'Specialty coffee break with signature roasted brews at Simple 闪咖啡 along iconic foodie haven Xihua Road (西华路).',
        place: 'Simple闪咖啡(西华路店)',
        tone: 'gold',
        tag: 'Specialty Coffee',
        category: 'Cafe',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=Simple%E9%97%AA%E5%92%96%E5%95%A1+%E8%A5%BF%E5%8D%8E%E8%B7%AF',
      },
      {
        time: '16:30',
        title: 'Bear Bun Bakery (Guangzhou Railway Station)',
        note: 'Pick up freshly baked artisanal breads, adorable signature bear buns, and sweet pastries near Guangzhou Railway Station.',
        place: 'Bear Bun Bakery',
        tone: 'red',
        tag: 'Bakery Treats',
        category: 'Bakery',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=Bear+Bun+Bakery+%E5%B9%BF%E5%B7%9E',
      },
    ],
  },
  {
    date: '19',
    weekday: 'Sat',
    dayNumber: 3,
    title: 'Dongshankou & Tianhe',
    subtitle:
      'Trendy Republican-era red-brick villas in Dongshankou, premier luxury retail at TaiKoo Hui, and illuminated evening views of Canton Tower.',
    area: 'Yuexiu & Tianhe',
    pace: 'City Walk & Skyline · 3 stops',
    stops: [
      {
        time: '10:30',
        title: 'Dongshankou (VITAL - 邦邦的日常, Five Mate)',
        note: 'Wander tree-lined historical mansion lanes, visiting curated lifestyle haven VITAL - 邦邦的日常 and street fashion boutique Five Mate.',
        place: '东山口',
        tone: 'jade',
        tag: 'Indie Fashion & Cafe',
        category: 'Culture',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E4%B8%9C%E5%B1%B1%E5%8F%A3+VITAL%E9%82%A6%E9%82%A6%E7%9A%84%E6%97%A5%E5%B8%B8+Five+Mate',
      },
      {
        time: '14:30',
        title: 'TaiKoo Hui (太古汇)',
        note: 'Premier luxury shopping mall experience in Tianhe CBD featuring top international fashion houses, Fang Suo Commune bookstore, and rooftop cafes.',
        place: '太古汇',
        tone: 'gold',
        tag: 'Luxury Retail',
        category: 'Shopping',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E5%B9%BF%E5%B7%9E%E5%A4%AA%E5%8F%A4%E6%B1%87',
      },
      {
        time: '18:30',
        title: 'Canton Tower (广州塔)',
        note: 'Sunset and nighttime illumination across the Pearl River, Canton Tower, and Huacheng Square skyline.',
        place: '广州塔',
        tone: 'red',
        tag: 'Iconic Landmark',
        category: 'Landmark',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E5%B9%BF%E5%B7%9E%E5%A1%94%E5%A4%9C%E6%99%AF%E6%9C%BA%E4%BD%8D',
      },
    ],
  },
  {
    date: '20',
    weekday: 'Sun',
    dayNumber: 4,
    title: 'Baiyun & Conghua',
    subtitle:
      'Suburban excursion to 8号仓 outlet village in Conghua via Metro Line 14, followed by a lakeside LBXX hotpot feast.',
    area: 'Conghua & Baiyun',
    pace: 'Outlets & Hotpot · 2 stops',
    stops: [
      {
        time: '10:00',
        title: 'PO · 8号仓流溪河奥莱小镇 (Metro Line 14 Shengang Exit B)',
        note: 'European-style open-air outlet park in Conghua with the famous pink waterfall and massive brand discounts. Direct access right outside Metro Line 14 Shengang Station Exit B (神岗站B口).',
        place: '8号仓流溪河奥莱小镇',
        tone: 'jade',
        tag: 'Outlet Village',
        category: 'Excursion',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=8%E5%8F%B7%E4%BB%93%E6%B5%81%E6%BA%AA%E6%B2%B3%E5%A5%A5%E8%8E%B1%E5%B0%8F%E9%95%87',
      },
      {
        time: '17:30',
        title: 'LBXX Hotpot (Baiyun Lake Jinbo Tiandi 5th Floor)',
        note: 'Hearty dinner feast at LBXX hotpot on the 5th floor of Baiyun Lake Jinbo Tiandi (白云湖金铂天地5楼) after returning from Conghua.',
        place: '白云湖金铂天地',
        tone: 'red',
        tag: 'Hotpot Feast',
        category: 'Dining',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=LBXX%E7%81%AB%E9%94%85+%E7%99%BD%E4%BA%91%E6%B9%96%E9%87%91%E9%93%82%E5%A4%A9%E5%9C%B0',
      },
    ],
  },
  {
    date: '21',
    weekday: 'Mon',
    dayNumber: 5,
    title: 'Departure',
    subtitle:
      'Relaxed morning waffles and coffee at M&M / Waffles Daily, luggage collection, and evening departure on CX989.',
    area: 'Yuexiu & Airport',
    pace: 'Departure · Flight CX989',
    stops: [
      {
        time: '10:30',
        title: 'Free Time for M&M / Waffles Daily',
        note: 'Unhurried morning enjoying fresh waffles and specialty drinks at Waffles Daily / M&M, plus final souvenir shopping near Beijing Road.',
        place: 'Waffles Daily',
        tone: 'gold',
        tag: 'Brunch & Waffles',
        category: 'Cafe',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=Waffles+Daily+%E5%B9%BF%E5%B7%9E',
      },
      {
        time: '18:00',
        title: 'Collect Luggage at Xi Yue Hotel & Airport Transfer',
        note: 'Retrieve bags from Xi Yue Hotel and take Metro Line 2 or taxi to Guangzhou Baiyun International Airport with comfortable time buffer.',
        place: '禧粤YUE HOTEL 广州北京路步行街公园前地铁站店',
        tone: 'jade',
        tag: 'Luggage & Transit',
        category: 'Transfer',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E7%A6%A7%E7%B2%A4YUE+HOTEL%E5%85%AC%E5%9B%AD%E5%89%8D',
      },
      {
        time: '22:20',
        title: 'Flight CX989 Departure',
        note: 'Board Cathay Pacific flight CX989 departing CAN (22:20) for Hong Kong (23:40) with onward overnight connection CX659 to Singapore.',
        place: '广州白云国际机场',
        tone: 'red',
        tag: 'Return Flight',
        category: 'Flight',
        xhsUrl:
          'https://www.xiaohongshu.com/search_result?keyword=%E7%99%BD%E4%BA%91%E6%9C%BA%E5%9C%BA%E5%87%BA%E5%A2%83',
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
    detail: '2 hour connection in Hong Kong',
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
    detail: '2 hour 5 minute connection in Hong Kong',
  },
];

const hotel = {
  name: 'Xi Yue Hotel',
  descriptor: 'Beijing Road Pedestrian Street · Gongyuanqian Station',
  chinese: '禧粤YUE HOTEL（广州北京路步行街公园前地铁站店）',
  address: 'No. 410 Jiefang Middle Road, Yuexiu District, Guangzhou',
  chineseAddress: '广东广州越秀区解放中路410号',
  googleUrl:
    'https://www.google.com/maps/search/410+Jiefang+Middle+Road,+Yuexiu+District,+Guangzhou,+Guangdong,+China',
};

function getCategoryIcon(category: StopCategory) {
  switch (category) {
    case 'Flight':
      return Plane;
    case 'Hotel':
    case 'Transfer':
      return Building2;
    case 'Shopping':
      return ShoppingBag;
    case 'Dining':
      return Utensils;
    case 'Cafe':
      return Coffee;
    case 'Bakery':
      return Store;
    case 'Culture':
      return Compass;
    case 'Landmark':
      return Landmark;
    case 'Excursion':
      return MapPin;
    default:
      return MapPin;
  }
}

function amapUrl(place: string) {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(place)}&view=map&callnative=0`;
}

function isSafeLink(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function RouteButton({
  place,
  compact = false,
}: {
  place: string;
  compact?: boolean;
}) {
  return (
    <a
      href={amapUrl(place)}
      target="_blank"
      rel="noreferrer"
      className={
        compact
          ? 'inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/85 px-3 py-1.5 text-xs font-semibold text-[var(--ink)] shadow-2xs transition hover:border-[var(--jade)] hover:bg-white hover:text-[var(--jade)]'
          : 'inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--jade)]'
      }
    >
      <Navigation className={compact ? 'size-3.5' : 'size-4'} />
      Amap
      {!compact && <ArrowRight className="size-4" />}
    </a>
  );
}

function XhsButton({
  url,
  compact = false,
}: {
  url: string;
  compact?: boolean;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={
        compact
          ? 'inline-flex items-center gap-1.5 rounded-full border border-red-200/80 bg-red-50/90 px-3 py-1.5 text-xs font-bold text-[var(--xhs)] shadow-2xs transition hover:border-[var(--xhs)] hover:bg-[var(--xhs)] hover:text-white'
          : 'inline-flex items-center gap-2 rounded-full bg-[var(--xhs)] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-110'
      }
      aria-label="Open Xiaohongshu notes for this stop"
    >
      <span className="text-[10px] font-black tracking-wide">小红书</span>
      <span>XHS</span>
      <ExternalLink className={compact ? 'size-3' : 'size-3.5'} />
    </a>
  );
}

export default function Home() {
  const [activeDay, setActiveDay] = useState(0);
  const [viewMode, setViewMode] = useState<'timeline' | 'accordion'>('timeline');

  const currentDay = days[activeDay] ?? days[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
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
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--muted-ink)]">
                17—21 Sep · 2026
              </span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-8 text-sm font-semibold md:flex"
            aria-label="Main navigation"
          >
            <a href="#plan" className="transition hover:text-[var(--vermilion)]">
              Itinerary
            </a>
            <a
              href="#trip-details"
              className="transition hover:text-[var(--vermilion)]"
            >
              Trip details
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#plan"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--ink)] px-4 text-xs font-bold text-white transition hover:bg-[var(--jade)]"
            >
              <CalendarDays className="size-3.5 text-[var(--butter)]" />
              <span>5-Day Plan</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero & Main Itinerary Section */}
      <section id="plan" className="scroll-mt-24 border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[720px] lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left Hero Column */}
          <div className="relative min-h-[480px] overflow-hidden border-b border-[var(--line)] lg:min-h-0 lg:border-b-0 lg:border-r">
            <img
              src="/canton-tower-night.jpg"
              alt="Canton Tower illuminated beside the Pearl River at night"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/85" />
            <div className="relative flex h-full min-h-[480px] flex-col justify-between p-6 text-white sm:p-10 lg:min-h-[720px] lg:p-12">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/35 bg-black/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] backdrop-blur-md">
                  The Canton Edit
                </span>
                <span className="font-serif text-4xl">广州</span>
              </div>
              <div className="max-w-xl">
                <p className="mb-4 flex items-center gap-2 text-sm font-bold text-white/90">
                  <CalendarDays className="size-4 text-[var(--butter)]" /> 5 days
                  · 4 nights in Guangzhou
                </p>
                <h1 className="font-serif text-[clamp(3.2rem,7.5vw,6.5rem)] font-bold leading-[0.82] tracking-[-0.04em]">
                  Eat well.
                  <br />
                  Walk slow.
                </h1>
                <p className="mt-6 max-w-md text-sm leading-6 text-white/85 sm:text-base">
                  A finalized 5-day neighbourhood plan spanning historic Liwan,
                  vibrant Dongshankou, Tianhe CBD, and Conghua outlet excursions.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                    Sept 17–21, 2026
                  </span>
                  <span className="rounded-full bg-[var(--butter)]/90 px-3 py-1 text-xs font-bold text-[var(--ink)]">
                    5 Curated Days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Itinerary Column */}
          <div className="flex flex-col bg-[var(--paper)] px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">5-Day Finalized Schedule</p>
                <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                  September, sorted.
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-full border border-[var(--line)] bg-white/70 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('timeline')}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition ${
                      viewMode === 'timeline'
                        ? 'bg-[var(--ink)] text-white'
                        : 'text-[var(--muted-ink)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <Layers className="size-3.5" /> Day View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('accordion')}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition ${
                      viewMode === 'accordion'
                        ? 'bg-[var(--ink)] text-white'
                        : 'text-[var(--muted-ink)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <Compass className="size-3.5" /> All Days
                  </button>
                </div>
                <span className="hidden rounded-full bg-[var(--butter)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] sm:inline-block">
                  CST (UTC+8)
                </span>
              </div>
            </div>

            {/* 5-Day Navigation Tabs */}
            <div
              className="mt-8 grid grid-cols-5 border-y border-[var(--line)]"
              role="tablist"
              aria-label="Choose itinerary day"
            >
              {days.map((item, index) => {
                const isSelected = activeDay === index;
                return (
                  <button
                    key={item.date}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveDay(index);
                      if (viewMode === 'accordion') setViewMode('timeline');
                    }}
                    className={`group relative py-4 text-center transition sm:py-5 ${
                      isSelected
                        ? 'bg-[var(--ink)] text-white shadow-sm'
                        : 'hover:bg-white/70'
                    }`}
                  >
                    <span
                      className={`block text-[9px] font-black uppercase tracking-[0.18em] ${
                        isSelected ? 'text-[var(--butter)]' : 'text-[var(--muted-ink)]'
                      }`}
                    >
                      Day {item.dayNumber} · {item.weekday}
                    </span>
                    <span className="mt-1 block font-serif text-2xl font-bold sm:text-3xl">
                      {item.date}
                    </span>
                    <span
                      className={`mt-1 hidden truncate px-1 text-[11px] font-medium md:block ${
                        isSelected ? 'text-white/80' : 'text-[var(--muted-ink)]'
                      }`}
                    >
                      {item.area}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panel Content: Timeline Mode vs Accordion Mode */}
            {viewMode === 'timeline' ? (
              <div className="mt-8 flex-1" role="tabpanel">
                {/* Active Day Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[var(--vermilion)]/10 px-2 py-0.5 text-xs font-black text-[var(--vermilion)]">
                        Day {currentDay.dayNumber} · Sept {currentDay.date}
                      </span>
                      <span className="text-xs font-bold text-[var(--muted-ink)]">
                        {currentDay.area}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
                      {currentDay.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted-ink)] sm:text-base">
                      {currentDay.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/60 px-3 py-1.5 text-xs font-bold text-[var(--muted-ink)]">
                      <Clock3 className="size-3.5" /> {currentDay.pace}
                    </span>
                  </div>
                </div>

                {/* Timeline Cards */}
                <div className="mt-7 space-y-4">
                  {currentDay.stops.map((stop, idx) => {
                    const CategoryIcon = getCategoryIcon(stop.category);
                    return (
                      <Card
                        key={`${currentDay.date}-${stop.time}-${idx}`}
                        className="border-none bg-white/85 shadow-xs ring-1 ring-black/5 transition hover:bg-white hover:shadow-md"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="flex items-center gap-1 rounded-full bg-[var(--paper)] px-2.5 py-1 text-xs font-black text-[var(--ink)] ring-1 ring-[var(--line)]">
                                <Clock3 className="size-3 text-[var(--vermilion)]" />
                                {stop.time}
                              </span>
                              <Badge
                                variant="outline"
                                className="border-[var(--line)] bg-[var(--paper)]/50 text-[11px] font-bold text-[var(--ink)]"
                              >
                                <CategoryIcon className="mr-1 size-3 text-[var(--muted-ink)]" />
                                {stop.tag}
                              </Badge>
                            </div>
                            <span
                              className="size-2.5 rounded-full"
                              style={{ backgroundColor: `var(--${stop.tone})` }}
                              title={`Status priority: ${stop.tone}`}
                            />
                          </div>
                          <CardTitle className="mt-2 text-lg font-bold sm:text-xl">
                            {stop.title}
                          </CardTitle>
                          <CardDescription className="text-xs font-semibold text-[var(--jade)]">
                            {stop.place}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm leading-6 text-[var(--muted-ink)]">
                            {stop.note}
                          </p>
                          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)]/50 pt-2.5">
                            <span className="text-[11px] font-medium text-[var(--muted-ink)]">
                              Stop {idx + 1} of {currentDay.stops.length}
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                              <XhsButton url={stop.xhsUrl} compact />
                              <RouteButton place={stop.place} compact />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* 5-Day Accordion Overview Mode */
              <div className="mt-8 flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold sm:text-3xl">
                      Full 5-Day Overview
                    </h3>
                    <p className="text-sm text-[var(--muted-ink)]">
                      Expand any day to inspect full itinerary details, XHS research notes, and Amap routes.
                    </p>
                  </div>
                </div>
                <Accordion
                  className="w-full space-y-3"
                  defaultValue={['day-17']}
                >
                  {days.map((d) => (
                    <AccordionItem
                      key={d.date}
                      value={`day-${d.date}`}
                      className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-1 transition data-[state=open]:bg-white data-[state=open]:shadow-sm"
                    >
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex items-center gap-3 text-left">
                          <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--ink)] text-xs font-black text-white">
                            {d.date}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black uppercase tracking-wider text-[var(--vermilion)]">
                                Day {d.dayNumber} · {d.weekday}
                              </span>
                              <span className="rounded-full bg-[var(--paper)] px-2 py-0.5 text-[10px] font-bold text-[var(--muted-ink)]">
                                {d.stops.length} stops
                              </span>
                            </div>
                            <h4 className="font-serif text-lg font-bold text-[var(--ink)]">
                              {d.title}
                            </h4>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4">
                        <p className="mb-4 text-xs leading-5 text-[var(--muted-ink)]">
                          {d.subtitle}
                        </p>
                        <div className="space-y-3">
                          {d.stops.map((st, i) => (
                            <div
                              key={`${d.date}-${st.time}-${i}`}
                              className="grid grid-cols-[64px_1fr_auto] items-start gap-3 rounded-xl bg-[var(--paper)]/60 p-3"
                            >
                              <span className="pt-0.5 text-xs font-black text-[var(--muted-ink)]">
                                {st.time}
                              </span>
                              <div>
                                <h5 className="text-sm font-bold text-[var(--ink)]">
                                  {st.title}
                                </h5>
                                <p className="mt-0.5 text-xs text-[var(--muted-ink)]">
                                  {st.note}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <XhsButton url={st.xhsUrl} compact />
                                <RouteButton place={st.place} compact />
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Bottom Itinerary Action Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
              <div className="flex items-center gap-2 text-xs text-[var(--muted-ink)]">
                <CheckCircle2 className="size-4 text-[var(--jade)]" />
                <span>
                  Tap <b>XHS</b> for Xiaohongshu photos/reviews or <b>Amap</b> for 高德地图 transit navigation.
                </span>
              </div>
              <RouteButton
                place={currentDay.stops.map((stop) => stop.place).join(' ')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trip Details Section (Hotel & Flights) */}
      <section
        id="trip-details"
        className="scroll-mt-20 bg-[var(--butter)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[var(--ink)]/60">Fixed Trip Anchors</p>
              <h2 className="mt-3 font-serif text-5xl font-bold tracking-tight sm:text-6xl">
                Stay & flights.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--ink)]/75">
              Flight times shown in local time. The Yuexiu hotel base anchors the
              first and final days with easy access to Gongyuanqian Metro.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
            {/* Hotel Card */}
            <article className="flex flex-col justify-between rounded-[30px] bg-[var(--ink)] p-6 text-white sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-white/10">
                    <MapPin className="size-5 text-[var(--butter)]" />
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
                    4 nights · Yuexiu District
                  </span>
                </div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--butter)]">
                  Your Guangzhou Base
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

              <div className="mt-8 flex flex-wrap gap-2">
                <a
                  href={amapUrl(hotel.chinese)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--butter)] px-4 py-2.5 text-xs font-bold text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <Navigation className="size-3.5" /> Open in Amap
                </a>
                <a
                  href={`https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(hotel.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--xhs)] px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  <span className="font-black text-[10px]">小红书</span> XHS <ExternalLink className="size-3.5" />
                </a>
                <a
                  href={hotel.googleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition hover:border-white hover:bg-white/10"
                >
                  Google Maps <ExternalLink className="size-3.5" />
                </a>
              </div>

              <div className="mt-8 rounded-2xl bg-white/[0.08] p-4 text-sm leading-6 text-white/75">
                <span className="font-bold text-white">5-Day Planning Logic:</span>{' '}
                Base in Yuexiu (Gongyuanqian). Day 1 covers Haizhu & shoe waffles;
                Day 2 explores Liwan & Xihua cafes; Day 3 takes on Dongshankou &
                Tianhe CBD; Day 4 heads to Conghua 8号仓 outlets & Baiyun hotpot;
                Day 5 enjoys waffles before CX989 departure.
              </div>
            </article>

            {/* Flight Cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {flights.map((flight) => (
                <article
                  key={flight.flight}
                  className="flex min-h-56 flex-col justify-between rounded-[26px] bg-[var(--paper)] p-5 sm:p-6 shadow-xs"
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
                    <p className="font-serif text-lg font-bold">{flight.route}</p>
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
                        <Plane className="size-4 rotate-45" />
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

      {/* Footer */}
      <footer className="border-t border-[var(--line)] bg-[var(--paper)] py-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 text-xs text-[var(--muted-ink)] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="font-bold text-[var(--ink)]">
            Guangzhou · 广州 · 17—21.09.2026 · 5-Day Finalized Itinerary
          </p>
          <p className="text-xs text-[var(--muted-ink)]">
            Have a wonderful and delicious trip to Guangzhou!
          </p>
        </div>
      </footer>
    </main>
  );
}
