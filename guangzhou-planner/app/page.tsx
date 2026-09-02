'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CirclePlus,
  Clock3,
  ExternalLink,
  Heart,
  MapPin,
  Navigation,
  Plane,
  Plus,
  Sparkles,
  Ticket,
  Trash2,
  Utensils,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Stop = {
  time: string;
  title: string;
  note: string;
  place: string;
  tone: 'jade' | 'red' | 'gold';
};

type Day = {
  date: string;
  weekday: string;
  title: string;
  subtitle: string;
  pace: string;
  stops: Stop[];
};

type Inspiration = {
  id: string;
  title: string;
  note: string;
  category: string;
  image: string;
  xhsUrl: string;
  amapPlace: string;
  custom?: boolean;
};

const days: Day[] = [
  {
    date: '17',
    weekday: 'Thu',
    title: 'Land, reset & stay nearby',
    subtitle: 'A low-pressure arrival day based around your Beijing Road hotel.',
    pace: 'Gentle · overnight flight',
    stops: [
      {
        time: '08:55',
        title: 'Land at Guangzhou Baiyun Airport',
        note: 'CX982 arrives from Hong Kong. Clear arrival formalities, then head towards Gongyuanqian.',
        place: '广州白云国际机场',
        tone: 'jade',
      },
      {
        time: '10:45',
        title: 'Bag drop at Xi Yue Hotel',
        note: 'Ask about early check-in; otherwise leave the bags and keep the morning flexible after the overnight flights.',
        place: '禧粤YUE HOTEL 广州北京路步行街公园前地铁站店',
        tone: 'gold',
      },
      {
        time: '15:30',
        title: 'Beijing Road & Dafo Temple',
        note: 'An easy first wander close to the hotel, with plenty of food choices and no long cross-city journey.',
        place: '北京路步行街',
        tone: 'red',
      },
    ],
  },
  {
    date: '18',
    weekday: 'Fri',
    title: 'Old Guangzhou, slowly',
    subtitle: 'Carved halls, arcades and leafy riverfront lanes.',
    pace: 'Full · 3 stops',
    stops: [
      {
        time: '09:30',
        title: 'Chen Clan Ancestral Hall',
        note: 'Go early for quieter courtyards and the roofline details.',
        place: '陈家祠',
        tone: 'gold',
      },
      {
        time: '12:30',
        title: 'Yong Qing Fang & Enning Road',
        note: 'Lunch, heritage lanes and a slow browse through small local shops.',
        place: '永庆坊',
        tone: 'red',
      },
      {
        time: '17:00',
        title: 'Shamian Island',
        note: 'Tree-lined evening walk before dinner in Liwan.',
        place: '沙面岛',
        tone: 'jade',
      },
    ],
  },
  {
    date: '19',
    weekday: 'Sat',
    title: 'Parks, temples & Beijing Road',
    subtitle: 'History in the morning, bright city energy after dark.',
    pace: 'Balanced · 3 stops',
    stops: [
      {
        time: '09:00',
        title: 'Yuexiu Park',
        note: 'Start cool and unhurried around the Five Rams sculpture.',
        place: '越秀公园',
        tone: 'jade',
      },
      {
        time: '12:00',
        title: 'Guangxiao Temple',
        note: 'A calm historic stop with lunch nearby.',
        place: '光孝寺',
        tone: 'gold',
      },
      {
        time: '17:30',
        title: 'Beijing Road',
        note: 'See the preserved road layers, snack and browse after sunset.',
        place: '北京路步行街',
        tone: 'red',
      },
    ],
  },
  {
    date: '20',
    weekday: 'Sun',
    title: 'Choose-your-own adventure',
    subtitle: 'A big day for wildlife or a restorative mountain reset.',
    pace: 'Flexible · 2 options',
    stops: [
      {
        time: '08:30',
        title: 'Option A · Chimelong Safari Park',
        note: 'Allow the full day, wear good shoes and pre-book tickets.',
        place: '长隆野生动物世界',
        tone: 'red',
      },
      {
        time: '09:00',
        title: 'Option B · Baiyun Mountain',
        note: 'A greener, lower-cost day with city views and an early finish.',
        place: '白云山风景名胜区',
        tone: 'jade',
      },
    ],
  },
  {
    date: '21',
    weekday: 'Mon',
    title: 'Nearby favourites & late flight',
    subtitle: 'Keep the final day close to the hotel before CX989.',
    pace: 'Light · flight at 22:20',
    stops: [
      {
        time: '09:30',
        title: 'Check out & leave bags',
        note: 'Keep luggage with the hotel so the last day stays hands-free.',
        place: '禧粤YUE HOTEL 广州北京路步行街公园前地铁站店',
        tone: 'gold',
      },
      {
        time: '11:00',
        title: 'Final central-city slot',
        note: 'Reserve this for nearby XHS food or shopping pins around Beijing Road, Gongyuanqian or Yuexiu.',
        place: '公园前地铁站',
        tone: 'jade',
      },
      {
        time: '17:30',
        title: 'Collect bags & early dinner',
        note: 'Eat near the hotel, collect luggage and check live traffic before leaving.',
        place: '北京路步行街',
        tone: 'red',
      },
      {
        time: '18:30',
        title: 'Leave for Baiyun Airport',
        note: 'Planning target for the 22:20 CX989 flight. Reconfirm airline check-in guidance and live Amap travel time that day.',
        place: '广州白云国际机场',
        tone: 'red',
      },
    ],
  },
  {
    date: '22',
    weekday: 'Tue',
    title: 'Hong Kong connection → home',
    subtitle: 'The Guangzhou stay is complete; continue to Singapore overnight.',
    pace: 'Travel · CX659',
    stops: [
      {
        time: '23:40',
        title: 'Arrive Hong Kong',
        note: 'CX989 lands on 21 September with a 2 hour 5 minute connection.',
        place: '香港国际机场',
        tone: 'gold',
      },
      {
        time: '01:45',
        title: 'CX659 to Singapore',
        note: 'Overnight departure from Hong Kong to Singapore.',
        place: '香港国际机场',
        tone: 'red',
      },
      {
        time: '05:30',
        title: 'Arrive Singapore',
        note: 'Home after six calendar days of travel.',
        place: '新加坡樟宜机场',
        tone: 'jade',
      },
    ],
  },
];

const starterPins: Inspiration[] = [
  {
    id: 'tower-night',
    title: 'Canton Tower night glow',
    note: 'Save a riverbank photo angle before the first-night walk.',
    category: 'Photo spot',
    image: '/canton-tower-night.jpg',
    xhsUrl:
      'https://www.xiaohongshu.com/search_result?keyword=%E5%B9%BF%E5%B7%9E%E5%A1%94%E5%A4%9C%E6%99%AF%E6%9C%BA%E4%BD%8D',
    amapPlace: '广州塔',
  },
  {
    id: 'city-view',
    title: 'Pearl River city view',
    note: 'A skyline reference for the Huacheng Square and riverside route.',
    category: 'City walk',
    image: '/canton-tower-day.jpg',
    xhsUrl:
      'https://www.xiaohongshu.com/search_result?keyword=%E5%B9%BF%E5%B7%9E%E7%8F%A0%E6%B1%9Fcitywalk',
    amapPlace: '花城广场',
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

const notes = [
  {
    icon: Ticket,
    title: 'Metro first',
    copy: 'Most days are grouped by neighbourhood. Use Amap transit directions in China for the clearest live route.',
  },
  {
    icon: Utensils,
    title: 'Eat between rushes',
    copy: 'Aim for dim sum before 10:00 and dinner before 18:00 when you want shorter queues.',
  },
  {
    icon: Sparkles,
    title: 'Keep one flex day',
    copy: 'Day 20 can switch between Chimelong and Baiyun Mountain depending on energy and weather.',
  },
];

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

function RouteButton({ place, compact = false }: { place: string; compact?: boolean }) {
  return (
    <a
      href={amapUrl(place)}
      target="_blank"
      rel="noreferrer"
      className={
        compact
          ? 'inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/75 px-3 py-1.5 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--jade)] hover:text-[var(--jade)]'
          : 'inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--jade)]'
      }
    >
      <Navigation className={compact ? 'size-3.5' : 'size-4'} />
      Amap
      {!compact && <ArrowRight className="size-4" />}
    </a>
  );
}

export default function Home() {
  const [activeDay, setActiveDay] = useState(0);
  const [pins, setPins] = useState<Inspiration[]>(starterPins);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem('gz-xhs-pins');
    if (!saved) return;
    try {
      const savedPins = JSON.parse(saved) as Inspiration[];
      setPins([...starterPins, ...savedPins]);
    } catch {
      window.localStorage.removeItem('gz-xhs-pins');
    }
  }, []);

  const customPins = useMemo(() => pins.filter((pin) => pin.custom), [pins]);

  function saveCustomPins(nextPins: Inspiration[]) {
    setPins(nextPins);
    window.localStorage.setItem(
      'gz-xhs-pins',
      JSON.stringify(nextPins.filter((pin) => pin.custom)),
    );
  }

  function addInspiration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    const form = new FormData(event.currentTarget);
    const title = String(form.get('title') || '').trim();
    const xhsUrl = String(form.get('xhsUrl') || '').trim();
    const image = String(form.get('image') || '').trim();
    const amapPlace = String(form.get('amapPlace') || '').trim();
    const note = String(form.get('note') || '').trim();

    if (!title || !xhsUrl || !amapPlace) {
      setFormError('Add a title, XHS link and Amap place.');
      return;
    }
    if (!isSafeLink(xhsUrl) || (image && !isSafeLink(image))) {
      setFormError('Please use a full http:// or https:// link.');
      return;
    }

    const nextPin: Inspiration = {
      id: `pin-${Date.now()}`,
      title,
      xhsUrl,
      image: image || '/canton-tower-day.jpg',
      amapPlace,
      note: note || 'Saved from XHS for the Guangzhou plan.',
      category: 'My pin',
      custom: true,
    };
    saveCustomPins([...pins, nextPin]);
    setDialogOpen(false);
    event.currentTarget.reset();
  }

  function removePin(id: string) {
    saveCustomPins(pins.filter((pin) => pin.id !== id));
  }

  const day = days[activeDay];

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#plan" className="group flex items-center gap-3" aria-label="Guangzhou trip plan home">
            <span className="grid size-10 place-items-center rounded-full bg-[var(--vermilion)] text-[11px] font-black tracking-tight text-white transition group-hover:rotate-6">
              GZ
            </span>
            <span>
              <span className="block font-serif text-lg font-bold leading-none">Guangzhou</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--muted-ink)]">17—22 Sep · 2026</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex" aria-label="Main navigation">
            <a href="#plan" className="transition hover:text-[var(--vermilion)]">Itinerary</a>
            <a href="#trip-details" className="transition hover:text-[var(--vermilion)]">Trip details</a>
            <a href="#pins" className="transition hover:text-[var(--vermilion)]">XHS pins</a>
            <a href="#notes" className="transition hover:text-[var(--vermilion)]">Travel notes</a>
          </nav>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger render={<Button className="h-10 rounded-full bg-[var(--ink)] px-4 text-white hover:bg-[var(--jade)]" />}>
              <Plus className="size-4" />
              <span className="hidden sm:inline">Add XHS pin</span>
              <span className="sm:hidden">Add</span>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[28px] bg-[var(--paper)] p-6 sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl font-bold">Save an inspiration</DialogTitle>
                <DialogDescription className="text-[var(--muted-ink)]">
                  Paste the XHS note link, its image URL and the place name you want to open in Amap.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={addInspiration} className="mt-2 space-y-4">
                <label className="block text-sm font-bold">
                  Title
                  <Input name="title" placeholder="Late-night wonton noodles" className="mt-2 h-11 rounded-xl bg-white" />
                </label>
                <label className="block text-sm font-bold">
                  XHS URL
                  <Input name="xhsUrl" type="url" placeholder="https://www.xiaohongshu.com/..." className="mt-2 h-11 rounded-xl bg-white" />
                </label>
                <label className="block text-sm font-bold">
                  Image URL <span className="font-normal text-[var(--muted-ink)]">(optional)</span>
                  <Input name="image" type="url" placeholder="https://...jpg" className="mt-2 h-11 rounded-xl bg-white" />
                </label>
                <label className="block text-sm font-bold">
                  Amap place or keyword
                  <Input name="amapPlace" placeholder="荔湾湖公园" className="mt-2 h-11 rounded-xl bg-white" />
                </label>
                <label className="block text-sm font-bold">
                  Note <span className="font-normal text-[var(--muted-ink)]">(optional)</span>
                  <Textarea name="note" placeholder="What should we remember about this place?" className="mt-2 min-h-24 rounded-xl bg-white" />
                </label>
                {formError && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{formError}</p>}
                <Button type="submit" className="h-12 w-full rounded-full bg-[var(--vermilion)] text-base text-white hover:bg-[var(--ink)]">
                  Save to the board
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section id="plan" className="scroll-mt-24 border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[690px] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[470px] overflow-hidden border-b border-[var(--line)] lg:min-h-0 lg:border-b-0 lg:border-r">
            <img
              src="/canton-tower-night.jpg"
              alt="Canton Tower illuminated beside the Pearl River at night"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/80" />
            <div className="relative flex h-full min-h-[470px] flex-col justify-between p-6 text-white sm:p-10 lg:min-h-[690px] lg:p-12">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/35 bg-black/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] backdrop-blur-md">The Canton Edit</span>
                <span className="font-serif text-4xl">广州</span>
              </div>
              <div className="max-w-xl">
                <p className="mb-4 flex items-center gap-2 text-sm font-bold text-white/80">
                  <CalendarDays className="size-4" /> 6 days · 5 nights
                </p>
                <h1 className="font-serif text-[clamp(3.4rem,8vw,7rem)] font-bold leading-[0.78] tracking-[-0.055em]">
                  Eat well.<br />Walk slow.
                </h1>
                <p className="mt-6 max-w-md text-sm leading-6 text-white/80 sm:text-base">
                  A neighbourhood-first plan for old lanes, late-night river light and plenty of room for dim sum.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-[var(--paper)] px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Your day-by-day plan</p>
                <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">September, sorted.</h2>
              </div>
              <span className="rounded-full bg-[var(--butter)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em]">Guangzhou time</span>
            </div>

            <div className="mt-8 grid grid-cols-6 border-y border-[var(--line)]" role="tablist" aria-label="Choose itinerary day">
              {days.map((item, index) => (
                <button
                  key={item.date}
                  type="button"
                  role="tab"
                  aria-selected={activeDay === index}
                  onClick={() => setActiveDay(index)}
                  className={`group relative py-4 text-center transition sm:py-5 ${activeDay === index ? 'bg-[var(--ink)] text-white' : 'hover:bg-white/70'}`}
                >
                  <span className={`block text-[9px] font-black uppercase tracking-[0.18em] ${activeDay === index ? 'text-white/60' : 'text-[var(--muted-ink)]'}`}>{item.weekday}</span>
                  <span className="mt-1 block font-serif text-2xl font-bold sm:text-3xl">{item.date}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex-1" role="tabpanel">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-3xl font-bold sm:text-4xl">{day.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-ink)] sm:text-base">{day.subtitle}</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold text-[var(--muted-ink)]">
                  <Clock3 className="size-3.5" /> {day.pace}
                </span>
              </div>

              <div className="mt-7 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {day.stops.map((stop) => (
                  <div key={`${day.date}-${stop.time}`} className="grid grid-cols-[66px_1fr_auto] items-start gap-3 py-4 sm:grid-cols-[80px_1fr_auto] sm:gap-5 sm:py-5">
                    <div className="pt-1 text-xs font-black tracking-wide text-[var(--muted-ink)]">{stop.time}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: `var(--${stop.tone})` }}
                        />
                        <h4 className="font-bold leading-tight">{stop.title}</h4>
                      </div>
                      <p className="mt-1.5 max-w-md text-sm leading-5 text-[var(--muted-ink)]">{stop.note}</p>
                    </div>
                    <RouteButton place={stop.place} compact />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs leading-5 text-[var(--muted-ink)]">Tap any Amap link to search the place in 高德地图.</p>
              <RouteButton place={day.stops.map((stop) => stop.place).join(' ')} />
            </div>
          </div>
        </div>
      </section>

      <section id="trip-details" className="scroll-mt-20 bg-[var(--butter)] py-20 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[var(--ink)]/60">Fixed trip anchors</p>
              <h2 className="mt-3 font-serif text-5xl font-bold tracking-tight sm:text-6xl">Stay & flights.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--ink)]/65">
              Flight times below are shown in local time. These anchors now set the pace for the first and final days.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
            <article className="flex flex-col justify-between rounded-[30px] bg-[var(--ink)] p-6 text-white sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-white/10"><MapPin className="size-5 text-[var(--butter)]" /></span>
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/60">4 nights · Yuexiu</span>
                </div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--butter)]">Your Guangzhou base</p>
                <h3 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{hotel.name}</h3>
                <p className="mt-2 text-sm font-semibold text-white/70">{hotel.descriptor}</p>
                <p className="mt-5 text-base font-bold leading-7">{hotel.chinese}</p>
                <div className="mt-5 border-l border-white/20 pl-4 text-sm leading-6 text-white/60">
                  <p>{hotel.address}</p>
                  <p>{hotel.chineseAddress}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <a href={amapUrl(hotel.chinese)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--butter)] px-4 py-2.5 text-xs font-bold text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-white">
                  <Navigation className="size-3.5" /> Open in Amap
                </a>
                <a href={hotel.googleUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition hover:border-white hover:bg-white/10">
                  Google Maps <ExternalLink className="size-3.5" />
                </a>
              </div>

              <div className="mt-8 rounded-2xl bg-white/[0.07] p-4 text-sm leading-6 text-white/65">
                <span className="font-bold text-white">Planning logic:</span> keep the arrival and final day around Gongyuanqian and Beijing Road; group western Liwan stops together; save eastern Guangzhou for its own route.
              </div>
            </article>

            <div className="grid gap-3 sm:grid-cols-2">
              {flights.map((flight, index) => (
                <article key={flight.flight} className="flex min-h-56 flex-col justify-between rounded-[26px] bg-[var(--paper)] p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">{flight.date}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black">{flight.flight}</span>
                  </div>
                  <div className="my-7">
                    <p className="font-serif text-xl font-bold">{flight.route}</p>
                    <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <div>
                        <p className="font-serif text-3xl font-bold">{flight.depart}</p>
                        <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">Depart</p>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--vermilion)]">
                        <span className="h-px w-5 bg-current" />
                        <Plane className="size-4 rotate-45" />
                        <span className="h-px w-5 bg-current" />
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-3xl font-bold">{flight.arrive}</p>
                        <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">Arrive</p>
                      </div>
                    </div>
                  </div>
                  <p className="border-t border-[var(--line)] pt-4 text-xs font-semibold text-[var(--muted-ink)]">{flight.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pins" className="scroll-mt-20 bg-[var(--ink)] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-[var(--butter)]">XHS inspiration board · 小红书</p>
              <h2 className="mt-3 font-serif text-5xl font-bold tracking-tight sm:text-6xl">From saved post<br />to actual place.</h2>
              <p className="mt-5 max-w-xl leading-7 text-white/62">
                Keep the photo reference, original XHS note and Amap destination together—so a saved idea can become a real stop.
              </p>
            </div>
            <Button onClick={() => setDialogOpen(true)} className="h-12 w-fit rounded-full bg-[var(--butter)] px-5 font-bold text-[var(--ink)] hover:bg-white">
              <CirclePlus className="size-4" /> Add inspiration
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pins.map((pin, index) => (
              <article key={pin.id} className="group overflow-hidden rounded-[28px] bg-[var(--paper)] text-[var(--ink)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sand)]">
                  <img
                    src={pin.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    onError={(event) => {
                      event.currentTarget.src = '/canton-tower-day.jpg';
                    }}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--paper)]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] backdrop-blur-md">{pin.category}</span>
                  <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-[var(--xhs)] text-white shadow-lg"><Heart className="size-4 fill-current" /></span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">Pin {String(index + 1).padStart(2, '0')}</p>
                      <h3 className="mt-1 font-serif text-2xl font-bold">{pin.title}</h3>
                    </div>
                    {pin.custom && (
                      <button
                        type="button"
                        aria-label={`Remove ${pin.title}`}
                        onClick={() => removePin(pin.id)}
                        className="grid size-9 shrink-0 place-items-center rounded-full text-[var(--muted-ink)] transition hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                  <p className="mt-3 min-h-10 text-sm leading-5 text-[var(--muted-ink)]">{pin.note}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a href={pin.xhsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--xhs)] px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:brightness-95">
                      Open XHS <ExternalLink className="size-3.5" />
                    </a>
                    <RouteButton place={pin.amapPlace} compact />
                  </div>
                </div>
              </article>
            ))}

            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="group min-h-[420px] rounded-[28px] border border-dashed border-white/25 p-8 text-left transition hover:border-[var(--butter)] hover:bg-white/[0.04]"
            >
              <span className="grid size-14 place-items-center rounded-full bg-white/10 transition group-hover:bg-[var(--butter)] group-hover:text-[var(--ink)]"><Plus className="size-5" /></span>
              <div className="mt-24">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">Your research</p>
                <h3 className="mt-2 font-serif text-3xl font-bold">Save the next<br />good find.</h3>
                <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">Add the XHS post link, paste an image URL and type the Amap location keyword.</p>
              </div>
            </button>
          </div>

          {customPins.length > 0 && (
            <p className="mt-6 text-xs text-white/40">{customPins.length} personal {customPins.length === 1 ? 'pin' : 'pins'} saved on this device.</p>
          )}
        </div>
      </section>

      <section id="notes" className="scroll-mt-20 bg-[var(--paper)] py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="eyebrow">Small things, big difference</p>
              <h2 className="mt-3 font-serif text-5xl font-bold leading-[0.92] tracking-tight sm:text-6xl">Notes for a<br />softer landing.</h2>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_40px_rgba(20,34,34,0.08)]">
                <Plane className="size-5 text-[var(--vermilion)]" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--muted-ink)]">Trip window</p>
                  <p className="text-sm font-bold">17–22 September 2026</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {notes.map((note, index) => {
                const Icon = note.icon;
                return (
                  <div key={note.title} className="grid grid-cols-[48px_1fr_auto] items-start gap-4 py-7 sm:grid-cols-[64px_1fr_auto] sm:gap-6 sm:py-8">
                    <span className="grid size-12 place-items-center rounded-full bg-white text-[var(--vermilion)] shadow-sm sm:size-14"><Icon className="size-5" /></span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted-ink)]">0{index + 1}</p>
                      <h3 className="mt-1 font-serif text-2xl font-bold">{note.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted-ink)]">{note.copy}</p>
                    </div>
                    <ChevronRight className="mt-4 size-4 text-[var(--muted-ink)]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-8 text-xs text-[var(--muted-ink)] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="font-bold text-[var(--ink)]">Guangzhou · 广州 · 17—22.09.2026</p>
          <p>
            Photos: Daniel Lu & Tim Wu via{' '}
            <a href="https://commons.wikimedia.org" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[var(--ink)]">Wikimedia Commons</a>{' '}
            · CC BY-SA 4.0
          </p>
        </div>
      </footer>
    </main>
  );
}
