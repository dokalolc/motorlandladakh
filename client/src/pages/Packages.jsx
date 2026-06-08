import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── All CSS self-contained — page works even on direct /packages load ───────
const ALL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red:    #e63329;
    --orange: #f5822a;
    --gold:   #f0c040;
    --dark:   #0c0c0e;
    --card:   #131317;
    --border: rgba(255,255,255,0.07);
    --text:   #e8e4dc;
    --muted:  #7a7670;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--dark); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 3px; }

  body::before {
    content: ''; position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 9999;
  }

  /* ── Navbar ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 60px; height: 72px;
    background: rgba(12,12,14,0.85); backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border); transition: background 0.3s;
  }
  .navbar .logo img { height: 275px; margin-left: -110px; object-fit: contain; }
  .navbar ul { display: flex; gap: 36px; list-style: none; position: absolute; left: 50%; transform: translateX(-50%); }
  .navbar ul li a {
    font-family: 'Rajdhani', sans-serif; font-weight: 600; font-size: 15px;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--muted); text-decoration: none; transition: color 0.2s; position: relative;
  }
  .navbar ul li a::after {
    content: ''; position: absolute; left: 0; bottom: -4px;
    width: 0; height: 2px; background: var(--red); transition: width 0.25s;
  }
  .navbar ul li a:hover { color: #fff; }
  .navbar ul li a:hover::after { width: 100%; }
  .navbar ul li a.nav-packages { color: var(--orange); position: relative; }
  .navbar ul li a.nav-packages::before {
    content: '★'; font-size: 8px; position: absolute;
    top: -8px; left: 50%; transform: translateX(-50%); color: var(--gold);
  }
  .navbar ul li a.nav-packages:hover { color: var(--gold); }
  .navbar ul li a.nav-packages::after { background: var(--gold); }
  .navbar-cta {
    background: var(--red); color: #fff !important; padding: 8px 20px; border-radius: 6px;
    font-family: 'Rajdhani', sans-serif !important; font-weight: 700 !important;
    font-size: 13px !important; letter-spacing: 1.5px !important; text-transform: uppercase !important;
    text-decoration: none; transition: background 0.2s, transform 0.2s !important;
  }
  .navbar-cta::after { display: none !important; }
  .navbar-cta:hover { background: #c62620 !important; transform: translateY(-1px) !important; }

  /* ── Footer ── */
  .footer {
    border-top: 1px solid var(--border); padding: 40px 80px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;
  }
  .footer-brand { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: #fff; }
  .footer-brand span { color: var(--red); }
  .footer-copy { font-size: 13px; color: var(--muted); }
  .footer-links { display: flex; gap: 24px; }
  .footer-links a {
    font-family: 'Rajdhani', sans-serif; font-size: 13px; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--red); }

  /* ══════════════════════════════
     PACKAGES PAGE
  ══════════════════════════════ */
  .pkg-page { background: #0c0c0e; min-height: 100vh; }

  .pkg-hero { position: relative; padding: 160px 80px 80px; overflow: hidden; }
  .pkg-hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(240,192,64,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,192,64,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%);
  }
  .pkg-hero-glow {
    position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse at center, rgba(240,192,64,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .pkg-hero-inner { position: relative; z-index: 1; text-align: center; max-width: 760px; margin: 0 auto; }
  .pkg-hero-eyebrow {
    font-family: 'Rajdhani', sans-serif; font-weight: 600; font-size: 12px;
    letter-spacing: 5px; text-transform: uppercase; color: var(--gold);
    margin-bottom: 16px; display: flex; align-items: center; justify-content: center; gap: 12px;
  }
  .pkg-hero-eyebrow::before { content: ''; display: inline-block; width: 32px; height: 1px; background: linear-gradient(to right, transparent, var(--gold)); }
  .pkg-hero-eyebrow::after  { content: ''; display: inline-block; width: 32px; height: 1px; background: linear-gradient(to left, transparent, var(--gold)); }
  .pkg-hero h1 {
    font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px, 9vw, 110px);
    line-height: 0.9; letter-spacing: 2px; color: #f5f0e8; margin-bottom: 20px;
  }
  .pkg-hero h1 span { color: var(--gold); }
  .pkg-hero-sub { font-size: 17px; color: var(--muted); line-height: 1.7; margin-bottom: 40px; font-weight: 300; }
  .pkg-hero-stats {
    display: inline-flex; align-items: center;
    background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
  }
  .pkg-hero-stat { padding: 14px 28px; border-right: 1px solid var(--border); text-align: center; }
  .pkg-hero-stat:last-child { border-right: none; }
  .pkg-hero-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--gold); line-height: 1; display: block; }
  .pkg-hero-stat-lbl { font-family: 'Rajdhani', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-top: 3px; display: block; }

  .pkg-filters { padding: 0 80px 48px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .pkg-filter-label { font-family: 'Rajdhani', sans-serif; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--muted); margin-right: 6px; }
  .pkg-filter-btn {
    background: var(--card); border: 1px solid var(--border); border-radius: 20px;
    padding: 8px 18px; font-family: 'Rajdhani', sans-serif; font-weight: 600;
    font-size: 13px; letter-spacing: 1px; color: var(--muted); cursor: pointer;
    transition: all 0.2s; text-transform: uppercase;
  }
  .pkg-filter-btn:hover { border-color: rgba(240,192,64,0.3); color: var(--gold); }
  .pkg-filter-btn.active {
    background: linear-gradient(135deg, rgba(240,192,64,0.15), rgba(245,130,42,0.15));
    border-color: rgba(240,192,64,0.4); color: var(--gold);
  }

  .pkg-grid {
    padding: 0 80px 120px;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(560px, 1fr)); gap: 28px;
  }

  .pkg-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 20px;
    overflow: hidden; position: relative;
    transition: transform 0.35s cubic-bezier(.23,1,.32,1), box-shadow 0.35s, border-color 0.35s;
  }
  .pkg-card:hover { transform: translateY(-6px); box-shadow: 0 28px 64px rgba(240,192,64,0.10); border-color: rgba(240,192,64,0.2); }
  .pkg-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(to right, var(--gold), var(--orange));
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s cubic-bezier(.23,1,.32,1);
  }
  .pkg-card:hover::before { transform: scaleX(1); }
  .pkg-card.featured { grid-column: 1 / -1; }

  .pkg-num-badge {
    font-family: 'Bebas Neue', sans-serif; font-size: 64px; line-height: 1;
    color: rgba(240,192,64,0.08); position: absolute; top: 16px; right: 24px;
    letter-spacing: 2px; pointer-events: none; transition: color 0.3s;
  }
  .pkg-card:hover .pkg-num-badge { color: rgba(240,192,64,0.13); }

  .pkg-card-header { padding: 28px 32px 0; display: flex; align-items: flex-start; gap: 16px; }
  .pkg-icon-wrap {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(240,192,64,0.08); border: 1px solid rgba(240,192,64,0.15);
    display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0;
    transition: background 0.2s, border-color 0.2s;
  }
  .pkg-card:hover .pkg-icon-wrap { background: rgba(240,192,64,0.14); border-color: rgba(240,192,64,0.3); }
  .pkg-card-title-block { flex: 1; }
  .pkg-difficulty {
    font-family: 'Rajdhani', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; padding: 3px 10px;
    border-radius: 20px; display: inline-block; margin-bottom: 6px;
  }
  .diff-easy   { background: rgba(16,185,129,0.12); color: #34d399; border: 1px solid rgba(16,185,129,0.2); }
  .diff-medium { background: rgba(245,130,42,0.12);  color: var(--orange); border: 1px solid rgba(245,130,42,0.2); }
  .diff-hard   { background: rgba(230,51,41,0.12);   color: #f87171; border: 1px solid rgba(230,51,41,0.2); }
  .diff-epic   { background: linear-gradient(135deg,rgba(240,192,64,0.15),rgba(230,51,41,0.15)); color: var(--gold); border: 1px solid rgba(240,192,64,0.3); }
  .pkg-name { font-family: 'Bebas Neue', sans-serif; font-size: 30px; color: #f5f0e8; letter-spacing: 0.5px; line-height: 1; margin-bottom: 4px; }
  .pkg-card.featured .pkg-name { font-size: 42px; }
  .pkg-tagline { font-size: 13px; color: var(--muted); font-weight: 300; font-style: italic; }

  .pkg-route-visual { padding: 20px 32px 0; display: flex; align-items: center; flex-wrap: wrap; row-gap: 6px; }
  .pkg-route-stop { font-family: 'Rajdhani', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px; color: rgba(232,228,220,0.7); text-transform: uppercase; white-space: nowrap; }
  .pkg-route-stop.highlight { color: var(--gold); }
  .pkg-route-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(240,192,64,0.4); margin: 0 8px; flex-shrink: 0; }
  .pkg-route-line { height: 1px; flex: 1; min-width: 12px; background: linear-gradient(to right, rgba(240,192,64,0.3), rgba(240,192,64,0.1)); margin: 0 4px; }

  .pkg-divider { height: 1px; background: var(--border); margin: 20px 32px 0; }

  .pkg-stats-row { padding: 18px 32px; display: flex; align-items: center; flex-wrap: wrap; }
  .pkg-stat { display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 80px; padding: 8px 0; border-right: 1px solid var(--border); }
  .pkg-stat:last-child { border-right: none; }
  .pkg-stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #f5f0e8; line-height: 1; letter-spacing: 0.5px; }
  .pkg-stat-lbl { font-family: 'Rajdhani', sans-serif; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-top: 3px; }

  .pkg-highlights { padding: 0 32px 20px; display: flex; flex-wrap: wrap; gap: 8px; }
  .pkg-highlight-chip {
    font-family: 'Rajdhani', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 6px;
    padding: 4px 10px; color: rgba(232,228,220,0.6); display: flex; align-items: center; gap: 4px;
  }

  .pkg-toggle-itin {
    background: none; border: none; cursor: pointer; width: 100%;
    font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; color: var(--muted); text-align: left;
    display: flex; align-items: center; gap: 6px; padding: 0 32px 20px; transition: color 0.2s;
  }
  .pkg-toggle-itin:hover { color: var(--gold); }
  .pkg-toggle-arrow { display: inline-block; transition: transform 0.3s; font-size: 10px; }
  .pkg-toggle-arrow.open { transform: rotate(180deg); }

  .pkg-itinerary { overflow: hidden; max-height: 0; transition: max-height 0.5s cubic-bezier(.23,1,.32,1); }
  .pkg-itinerary.open { max-height: 1400px; }
  .pkg-itinerary-inner { padding: 0 32px 24px; border-top: 1px solid var(--border); }
  .pkg-itin-title { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); padding: 18px 0 14px; }
  .pkg-itin-day { display: flex; gap: 14px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); align-items: flex-start; }
  .pkg-itin-day:last-child { border-bottom: none; }
  .pkg-itin-num { font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: var(--gold); min-width: 32px; padding-top: 1px; opacity: 0.6; }
  .pkg-itin-leg { font-size: 13px; color: rgba(232,228,220,0.75); line-height: 1.5; }
  .pkg-itin-leg strong { color: #f5f0e8; font-weight: 500; }

  .pkg-card-footer { padding: 0 32px 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .pkg-price-from { font-family: 'Rajdhani', sans-serif; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
  .pkg-price { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--gold); letter-spacing: 1px; line-height: 1; }
  .pkg-price span { font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 400; color: var(--muted); letter-spacing: 0; }

  .pkg-book-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--gold) 0%, var(--orange) 100%);
    color: #0c0c0e; padding: 12px 24px; border-radius: 10px;
    font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 13px;
    letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none;
    transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(240,192,64,0.25); white-space: nowrap;
  }
  .pkg-book-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(240,192,64,0.4); }
  .pkg-enquire-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: rgba(232,228,220,0.6);
    padding: 11px 20px; border-radius: 10px; border: 1px solid var(--border);
    font-family: 'Rajdhani', sans-serif; font-weight: 600; font-size: 13px;
    letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none;
    transition: border-color 0.2s, color 0.2s, background 0.2s; white-space: nowrap;
  }
  .pkg-enquire-btn:hover { border-color: rgba(240,192,64,0.3); color: var(--gold); background: rgba(240,192,64,0.04); }

  .pkg-bottom-cta { padding: 80px; text-align: center; border-top: 1px solid var(--border); }
  .pkg-bottom-cta h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 5vw, 64px); letter-spacing: 1px; color: #f5f0e8; margin-bottom: 12px; line-height: 1; }
  .pkg-bottom-cta h2 span { color: var(--gold); }
  .pkg-bottom-cta p { font-size: 15px; color: var(--muted); margin-bottom: 36px; line-height: 1.7; max-width: 480px; margin-left: auto; margin-right: auto; }
  .pkg-bottom-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

  /* ── Hamburger ── */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
    z-index: 1001;
  }
  .hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: white;
    border-radius: 2px;
  }

  @media (max-width: 1100px) {
    .pkg-grid { grid-template-columns: 1fr; padding: 0 40px 80px; }
    .pkg-hero { padding: 140px 40px 60px; }
    .pkg-filters { padding: 0 40px 40px; }
    .pkg-bottom-cta { padding: 60px 40px; }
  }
  @media (max-width: 768px) {
    .navbar { padding: 0 16px; height: 70px; }
    .navbar .logo img { height: 100px; margin-left: -20px; }
    .navbar ul { display: none; }
    .navbar ul.open { display: flex; flex-direction: column; position: fixed; top: 70px; right: 0; left: auto; width: 260px; background: rgba(12,12,14,0.98); padding: 20px 16px; gap: 16px; z-index: 999; border-left: 1px solid rgba(255,255,255,0.07); box-shadow: -8px 0 24px rgba(0,0,0,0.4); }
    .hamburger { display: flex; }
    .pkg-hero { padding: 120px 24px 48px; }
    .pkg-filters { padding: 0 24px 32px; }
    .pkg-grid { padding: 0 24px 60px; }
    .pkg-card-header { padding: 22px 22px 0; }
    .pkg-route-visual { padding: 14px 22px 0; }
    .pkg-divider { margin: 14px 22px 0; }
    .pkg-stats-row { padding: 14px 22px; }
    .pkg-highlights { padding: 0 22px 14px; }
    .pkg-card-footer { padding: 0 22px 22px; flex-direction: column; align-items: flex-start; }
    .pkg-toggle-itin { padding: 0 22px 16px; }
    .pkg-itinerary-inner { padding: 0 22px 20px; }
    .pkg-hero-stats { flex-direction: column; width: 100%; }
    .pkg-hero-stat { border-right: none; border-bottom: 1px solid var(--border); width: 100%; }
    .pkg-hero-stat:last-child { border-bottom: none; }
    .pkg-bottom-cta { padding: 48px 24px; }
    .footer { padding: 30px 24px; flex-direction: column; align-items: flex-start; }
  }
`;

// ── Package data ─────────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: 1, icon: "🔄", name: "Ladakh Way Round",
    tagline: "The classic Ladakh loop — everything iconic, nothing missed",
    difficulty: "medium", days: "6", km: "650", altitude: "18,380 ft", season: "Jun–Sep",
    route: [{ label: "Leh", highlight: true }, { label: "Khardung La" }, { label: "Nubra" }, { label: "Turtuk" }, { label: "Pangong", highlight: true }, { label: "Leh" }],
    itinerary: [
      { day: "Day 1", leg: "Welcome to Ladakh — Land at Kushok Bakula Rinpochay Airport (3,000m). Airport pickup, hotel check-in in Leh city center. Rest & acclimatisation day. Evening team briefing and safety orientation for the tour." },
      { day: "Day 2", leg: "Leh → Nubra — Ride over Khardung La Pass, Diskit Monastery, and Hunder sand dunes. Departure time adjusted by season to manage traffic. Arrive Hunder ~5:00 PM. Overnight at camp." },
      { day: "Day 3", leg: "Hunder → Turtuk → Hunder — Scenic ride via the Indo-Pak route to Turtuk, one of India's last villages before the Line of Control. Explore Balti culture, apricot orchards, and dramatic landscapes. Photography stops en route." },
      { day: "Day 4", leg: "Nubra → Pangong — Ride to famous Pangong Lake via the Shyok Valley. Possible river crossings if temperatures rise above 20°C. The lake shifts shades through the day — a bucket-list destination for every rider." },
      { day: "Day 5", leg: "Pangong → Leh — Ride back via Chang La Pass with magnificent Himalayan views. Arrive Leh early afternoon. Explore Leh market — Kashmiri antiques, local crafts, and the best cafes in the bazaar." },
      { day: "Day 6", leg: "Departure — Transfer to airport. Safe flight home. We hope to ride with you again on one of our next adventures." },
    ],
    highlights: ["Khardung La", "Nubra Valley", "Turtuk Village", "Pangong Lake", "Chang La"],
    price: "₹18,000", featured: false,
  },
  {
    id: 2, icon: "🏘️", name: "Leh – Turtuk – Leh",
    tagline: "Ride to the last Indian village before Pakistan",
    difficulty: "medium", days: "7", km: "650", altitude: "18,380 ft", season: "Jun–Sep",
    route: [{ label: "Leh", highlight: true }, { label: "Khardung La" }, { label: "Nubra" }, { label: "Turtuk", highlight: true }, { label: "Pangong" }, { label: "Leh" }],
    itinerary: [
      { day: "Day 1", leg: "Welcome to Leh Ladakh (3,500m) — Land at Kushok Bakula Rinpochay Airport (3,000m). Airport pickup, hotel check-in in Leh city center. Full rest & acclimatisation day. Evening team briefing and safety orientation." },
      { day: "Day 2", leg: "Leh Local Sightseeing — Ride the Srinagar Highway corridor: Sangam Point (Indus–Zanskar confluence), Magnetic Hill, Gurudwara Pathar Sahib, Hall of Fame, and Shanti Stupa." },
      { day: "Day 3", leg: "Leh → Nubra Valley (3,100m · 160 km) — Cross Khardung La Pass, ride through Diskit Monastery and Hunder sand dunes. Departure time adjusted by season to manage traffic. Arrive Hunder ~5:00 PM. Overnight at camp." },
      { day: "Day 4", leg: "Nubra → Turtuk → Thang → Return (3,000m · 160 km) — Scenic ride via the Indo-Pak route to Turtuk, one of India's last villages before the Line of Control. Explore Thang village, Balti culture, and apricot orchards. Photography stops en route. Return to Nubra camp." },
      { day: "Day 5", leg: "Nubra → Pangong Lake (4,250m · 170 km) — Ride to Pangong via the Shyok Valley. Possible river crossings if temperatures exceed 20°C — rare but adventurous. The lake changes breathtaking shades through the day." },
      { day: "Day 6", leg: "Pangong → Leh (3,500m · 160 km) — Return via Chang La Pass with magnificent Himalayan panoramas. Arrive Leh early afternoon. Explore Leh market — Kashmiri antiques, cashmere, and the best cafes in the bazaar." },
      { day: "Day 7", leg: "Departure — Transfer to airport. Sweet memories from Ladakh. Have a safe flight home — we hope to welcome you again on a future trip." },
    ],
    highlights: ["Leh Market", "Magnetic Hill", "Sangam Point", "Hall of Fame", "Nubra Valley", "Turtuk", "Pangong Lake"],
    price: "₹14,000", featured: false,
  },
  {
    id: 3, icon: "🏁", name: "Leh – Umling La – Leh",
    tagline: "Conquer the world's highest motorable road at 19,300 ft",
    difficulty: "hard", days: "8", km: "700", altitude: "19,300 ft", season: "Jun–Sep",
    route: [{ label: "Leh", highlight: true }, { label: "Nubra" }, { label: "Pangong" }, { label: "Hanle" }, { label: "Umling La", highlight: true }, { label: "Leh" }],
    itinerary: [
      { day: "Day 1", leg: "Welcome to Ladakh — Land at Kushok Bakula Rinpochay Airport (3,000m). Airport pickup, hotel check-in in Leh city centre. Full rest & acclimatisation day. Evening safety briefing with our team." },
      { day: "Day 2", leg: "Leh Local — Srinagar Highway sightseeing: Sangam (Indus–Zanskar confluence), Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib, and Shanti Stupa." },
      { day: "Day 3", leg: "Leh → Nubra (160 km) — Cross Khardung La Pass, visit Diskit Monastery and Hunder sand dunes. Departure time adjusted by season. Arrive Hunder camp ~5:00 PM." },
      { day: "Day 4", leg: "Nubra → Pangong Lake — Ride via Shyok Valley to the legendary Pangong Tso. Possible river crossings if temperature exceeds 20°C. The lake shifts breathtaking shades through the day." },
      { day: "Day 5", leg: "Pangong → Hanle — Ride along the India–China border trail between two majestic mountain ranges. Route significantly improved since 2024 — smooth cruise with spectacular landscapes. Stop at Chumathang Hot Spring en route. Arrive Hanle." },
      { day: "Day 6", leg: "Hanle → Umling La (19,300 ft) → Hanle — Summit day. Ride through an extremely barren, uninhabited landscape to the world's highest motorable road. Chinese territory visible to the east. Expect wind — return to Hanle after the summit." },
      { day: "Day 7", leg: "Hanle → Leh — Final riding day. Return via the Indus Valley — a smooth, spectacular road through small villages where the mountains change colours every hour. Reach Leh by 4:00 PM. Shopping, celebration, last night together." },
      { day: "Day 8", leg: "Airport Drop — Hotel pickup and transfer to airport. See you on the next adventure." },
    ],
    highlights: ["Shanti Stupa", "Leh Market", "Khardung La", "Diskit Monastery", "Hunder Sand Dunes", "Pangong Lake", "Chumathang Hot Spring", "Hanle Astrophysics", "Umling La 19,300ft", "Rigzang La War Memorial"],
    price: "₹20,000", featured: false,
  },
  {
    id: 4, icon: "🛣️", name: "Delhi – Manali – Leh",
    tagline: "The legendary Manali–Leh highway — the classic Indian road trip",
    difficulty: "medium", days: "9", km: "1,400", altitude: "18,380 ft", season: "Jun–Sep",
    route: [{ label: "Delhi", highlight: true }, { label: "Manali" }, { label: "Sarchu" }, { label: "Leh" }, { label: "Nubra" }, { label: "Pangong", highlight: true }],
    itinerary: [
      { day: "Day 1", leg: "Delhi → Manali — Depart Delhi by Volvo bus in the evening. Overnight journey to Manali." },
      { day: "Day 2", leg: "Welcome to Manali (2,050m) — Arrive and check in to hotel. Meet our team in the evening for an introduction session, tour details, and formalities. Overnight in Manali." },
      { day: "Day 3", leg: "Manali → Sarchu (4,290m · 230 km · ~8 hrs) — First ride of the tour. Pass through the 9 km Atal Tunnel, ride past Keylong, Jispa, Darcha, and Sisu. Cross Baralacha La Pass (4,850m). Overnight at Sarchu camp." },
      { day: "Day 4", leg: "Sarchu → Leh (3,500m · 251 km · ~8–9 hrs) — Early start after breakfast. Cross the 22 Gata Loops, Lachung La, Namik La, and Tanglang La (5,328m) — one of the world's highest motorable passes. Overnight in Leh." },
      { day: "Day 5", leg: "Leh → Nubra Valley (3,048m · 160 km · ~5–6 hrs) — Ride over Khardung La (18,380 ft), the world's highest motorable pass. Explore Diskit Monastery with its 33m Maitreya Buddha statue, and the famous Hunder sand dunes with Bactrian camels. Optional: ATV, zipline, go-karting, and camel ride. Overnight at Hunder." },
      { day: "Day 6", leg: "Hunder → Turtuk → Hunder — Ride the scenic Indo-Pak route to Turtuk, one of India's last villages before the Line of Control. Explore Thang village, Balti culture, and apricot orchards. Return to Hunder for overnight stay." },
      { day: "Day 7", leg: "Nubra → Pangong Lake (4,250m · 170 km · ~6–7 hrs) — Ride via the Shyok River route into the Changthang Valley. Pangong is a high-altitude salt lake where 70% lies in China and 30% in India — famous for its ever-changing shades of blue surrounded by Trans-Himalayan mountains. Overnight at Pangong." },
      { day: "Day 8", leg: "Pangong → Leh (3,500m · 160 km) — Return ride via Chang La Pass. Arrive Leh. Final evening to explore the market and celebrate the journey." },
      { day: "Day 9", leg: "Departure — Airport transfer. Safe flight home. We hope to ride with you again." },
    ],
    highlights: ["Atal Tunnel", "Baralacha La", "Gata Loops", "Tanglang La", "Khardung La", "Diskit Monastery", "Hunder Sand Dunes", "Turtuk", "Pangong Lake", "Chang La"],
    price: "₹28,000", featured: false,
  },
  {
    id: 5, icon: "🏔️", name: "Delhi – Manali – Umling La – Leh",
    tagline: "The ultimate combo — Manali highway meets world's highest pass",
    difficulty: "hard", days: "10", km: "1,900", altitude: "19,300 ft", season: "Jun–Sep",
    route: [{ label: "Delhi", highlight: true }, { label: "Manali" }, { label: "Sarchu" }, { label: "Leh" }, { label: "Nubra" }, { label: "Pangong" }, { label: "Hanle" }, { label: "Umling La", highlight: true }],
    itinerary: [
      { day: "Day 1", leg: "Delhi → Manali — Depart Delhi by Volvo bus in the evening. Overnight journey to Manali." },
      { day: "Day 2", leg: "Welcome to Manali (2,050m) — Arrive and check in to hotel. Meet our team in the evening for an introduction session covering tour details and formalities. Overnight in Manali." },
      { day: "Day 3", leg: "Manali → Sarchu (4,290m · 180 km · ~8 hrs) — First ride of the tour. Pass through the 9 km Atal Tunnel, ride past Keylong, Jispa, Darcha, and Sisu. Cross Baralacha La Pass (4,850m). Overnight at Sarchu camp." },
      { day: "Day 4", leg: "Sarchu → Leh (3,500m · 240 km · ~8–9 hrs) — Early start after breakfast. Cross the 22 Gata Loops, Lachung La, Namik La, and Tanglang La (5,328m). Pass through Pang and the vast Morey Plains. Overnight in Leh." },
      { day: "Day 5", leg: "Leh → Nubra Valley (3,048m · 140 km · ~5–6 hrs) — Ride over Khardung La (18,380 ft). Explore Diskit Monastery with its 33m Maitreya Buddha statue and Hunder sand dunes with Bactrian camels. Optional: ATV, zipline, go-karting, and camel ride. Overnight at Hunder." },
      { day: "Day 6", leg: "Nubra → Pangong Lake (4,250m · 180 km · ~6–7 hrs) — Ride via the Shyok River route into the Changthang Valley. Pangong is a high-altitude salt lake — 70% in China, 30% in India — famous for its ever-changing shades of blue surrounded by Trans-Himalayan mountains. Overnight at Pangong." },
      { day: "Day 7", leg: "Pangong → Hanle (4,500m · 200 km · ~6–7 hrs) — Ride via Chushul village with a stop at Rezang La War Memorial. Arrive Hanle, home to the world's highest observatory operated by the Indian Institute of Astrophysics. En route watch for kiangs, fox, wolf, and yaks. Overnight at Hanle." },
      { day: "Day 8", leg: "Hanle → Umling La (5,799m) → Hanle (180 km · ~5–6 hrs) — Summit day. Ride across a barren, uninhabited landscape to the world's highest motorable pass at 19,300 ft. An extraordinary achievement. Return to Hanle for overnight stay." },
      { day: "Day 9", leg: "Hanle → Leh (3,524m · 250 km · ~8 hrs) — Ride through Chumathang Hot Spring and small Indus Valley villages with the mountains changing colours at every turn. Overnight in Leh." },
      { day: "Day 10", leg: "Fly Back Home — Wake up, post-breakfast check-out. Transfer to airport. Fly home with incredible memories. See you on the next adventure." },
    ],
    highlights: ["Atal Tunnel", "Baralacha La", "Gata Loops", "Tanglang La", "Khardung La", "Diskit Monastery", "Hunder Sand Dunes", "Pangong Lake", "Rezang La Memorial", "Hanle Observatory", "Umling La 19,300ft", "Chumathang Hot Spring"],
    price: "₹38,000", featured: false,
  },
  {
    id: 6, icon: "🌅", name: "Delhi – Manali – Leh – Srinagar",
    tagline: "Cross the Himalayas end-to-end — two valleys, infinite memories",
    difficulty: "hard", days: "14", km: "2,100", altitude: "17,582 ft", season: "Jun–Sep",
    route: [{ label: "Delhi", highlight: true }, { label: "Manali" }, { label: "Leh" }, { label: "Zoji La" }, { label: "Srinagar", highlight: true }],
    itinerary: [
      { day: "Day 1–2",  leg: "Delhi → Chandigarh → Manali" },
      { day: "Day 3",    leg: "Manali rest · permits · bike handover" },
      { day: "Day 4–6",  leg: "Manali → Keylong → Sarchu → Tanglang La → Leh" },
      { day: "Day 7–8",  leg: "Leh exploration · optional day rides" },
      { day: "Day 9",    leg: "Leh → Lamayuru Monastery → Mulbekh" },
      { day: "Day 10",   leg: "Mulbekh → Kargil · War memorial visit" },
      { day: "Day 11",   leg: "Kargil → Drass → Zoji La → Sonamarg" },
      { day: "Day 12",   leg: "Sonamarg → Srinagar via Sindh Valley" },
      { day: "Day 13",   leg: "Srinagar — Dal Lake shikara, Old City, markets" },
      { day: "Day 14",   leg: "Bike return Srinagar · Departure" },
    ],
    highlights: ["Zoji La", "Lamayuru", "Kargil", "Drass", "Dal Lake Srinagar"],
    price: "₹36,000", featured: false,
  },
  {
    id: 7, icon: "🔁", name: "Srinagar – Leh – Manali – Delhi",
    tagline: "The full trans-Himalayan traverse — west to east",
    difficulty: "hard", days: "12", km: "2,100", altitude: "19,300 ft", season: "Jun–Sep",
    route: [{ label: "Srinagar", highlight: true }, { label: "Kargil" }, { label: "Leh" }, { label: "Nubra" }, { label: "Pangong" }, { label: "Hanle" }, { label: "Umling La", highlight: true }, { label: "Sarchu" }, { label: "Manali" }, { label: "Delhi", highlight: true }],
    itinerary: [
      { day: "Day 1",  leg: "Welcome to Srinagar (1,585m) — Arrive and check in to hotel. Known for its Mughal gardens, lakes, and houseboats. After lunch, meet our team for an introduction session covering tour details and formalities. Overnight in Srinagar." },
      { day: "Day 2",  leg: "Srinagar → Kargil (2,676m · 220 km · ~8–9 hrs) — First ride via Zoji La Pass (3,528m). Pass through Sonamarg — the gateway to Ladakh — and visit Drass, known for the 1999 Kargil War. Overnight in Kargil." },
      { day: "Day 3",  leg: "Kargil → Leh (3,524m · 215 km · ~6–8 hrs) — Cross Fotu La and Namik La passes. Visit Sangam and Magnetic Hill en route. Overnight in Leh." },
      { day: "Day 4",  leg: "Leh → Nubra Valley (3,048m · 140 km · ~5–6 hrs) — Ride over Khardung La (18,380 ft). Explore Diskit Monastery with its 33m Maitreya Buddha statue and Hunder sand dunes with Bactrian camels. Optional: ATV, zipline, go-karting, and camel ride. Overnight at Hunder." },
      { day: "Day 5",  leg: "Nubra → Pangong Lake (4,250m · 180 km · ~6–7 hrs) — Ride via the Shyok River route into the Changthang Valley. Pangong is a high-altitude salt lake — 70% in China, 30% in India — famous for its ever-changing shades of blue. Overnight at Pangong." },
      { day: "Day 6",  leg: "Pangong → Hanle (4,500m · 200 km · ~6–7 hrs) — Ride via Chushul with a stop at Rezang La War Memorial. Arrive Hanle, home to the world's highest observatory run by the Indian Institute of Astrophysics. Watch for kiangs, fox, wolf, and yaks en route. Overnight at Hanle." },
      { day: "Day 7",  leg: "Hanle → Umling La (5,799m) → Hanle (175 km · ~5–6 hrs) — Summit day. Ride across a barren, uninhabited landscape to the world's highest motorable pass — higher than Everest Base Camp. Overnight at Hanle." },
      { day: "Day 8",  leg: "Hanle → Leh (3,524m · 280 km · ~8 hrs) — Ride through Chumathang Hot Spring and small Indus Valley villages with mountains changing colours at every turn. Overnight in Leh." },
      { day: "Day 9",  leg: "Leh → Sarchu (4,290m · 240 km · ~8–9 hrs) — Cross Tanglang La (5,328m), pass through the 22 Gata Loops, Lachung La, and Namik La. Overnight at Sarchu camp." },
      { day: "Day 10", leg: "Sarchu → Manali (2,050m · 180 km · ~8 hrs) — Final ride. Pass through Baralacha La (4,850m), ride through the 9 km Atal Tunnel, and the beautiful Lahaul villages of Keylong, Jispa, Darcha, and Sisu. Check in and celebrate the big ride together." },
      { day: "Day 11", leg: "Manali → Delhi — After breakfast, check out and store luggage. Explore Manali Mall Road and enjoy shopping. Board the Volvo bus to Delhi in the evening." },
      { day: "Day 12", leg: "Goodbye Day — Arrive Delhi by morning. Say goodbye to your new friends and head home with sweet memories. See you on the next adventure." },
    ],
    highlights: ["Zoji La", "Sonamarg", "Drass War Memorial", "Kargil", "Sangam", "Magnetic Hill", "Khardung La", "Diskit Monastery", "Hunder Sand Dunes", "Pangong Lake", "Rezang La Memorial", "Hanle Observatory", "Umling La 19,300ft", "Chumathang Hot Spring", "Tanglang La", "Baralacha La"],
    price: "₹36,000", featured: false,
  },
  {
    id: 8, icon: "🏞️", name: "Cross Pass Zanskar",
    tagline: "The hidden valley — untouched, raw, unforgettable",
    difficulty: "hard", days: "7", km: "700", altitude: "14,000 ft", season: "Jul–Sep",
    route: [{ label: "Leh", highlight: true }, { label: "Kargil" }, { label: "Padum" }, { label: "Gombo Rangjon", highlight: true }, { label: "Lamayuru" }, { label: "Leh" }],
    itinerary: [
      { day: "Day 1", leg: "Arrive Leh (3,000m) — Airport pickup and hotel check-in in Leh city centre. Full acclimatisation day — rest is essential. Evening safety briefing with our team." },
      { day: "Day 2", leg: "Leh → Kargil — Morning briefing on high-altitude motorcycling. Ride west through Sham Valley, a scenic stretch of small connecting villages along the highway. An easy day with visits to monasteries en route. Overnight in Kargil." },
      { day: "Day 3", leg: "Kargil → Padum — Post-breakfast departure through the Suru Valley. Twin peaks of Nun (7,135m) and Kun (7,087m) dominate the skyline. Cross Pensi La (14,000 ft) — the highest point of the day — and descend into a world of glaciers and small lakes. Stunning scenery at every turn. Overnight in Padum." },
      { day: "Day 4", leg: "Padum → Gombo Rangjon → Padum — A short ride along the Tserab River through colourful villages and stunning monastery architecture. The highlight: Gombo Rangjon, Zanskar's most sacred and Instagram-famous sacred mountain peak. Return to Padum. Overnight in Padum." },
      { day: "Day 5", leg: "Padum → Lamayuru — Early departure for a long off-road day over two spectacular mountain passes — Singay La and Sirsir La. A newly opened road with minimal traffic — ride at your own pace and enjoy the raw Zanskar landscape. Overnight in Lamayuru." },
      { day: "Day 6", leg: "Lamayuru → Leh — Final leg of the Zanskar adventure on well-paved roads. Visit Basgo Castle and Monastery en route. At Sangam, park the bikes and try white-water rafting if you're keen. A short 30-minute ride from Sangam brings you back to Leh. Overnight in Leh." },
      { day: "Day 7", leg: "Return Flight Home — Airport transfer. Have a safe flight — we hope to see you on another adventure soon." },
    ],
    highlights: ["Sham Valley", "Suru Valley", "Nun & Kun Peaks", "Pensi La", "Padum", "Gombo Rangjon", "Singay La", "Sirsir La", "Lamayuru", "Basgo Castle", "Sangam Rafting"],
    price: "₹32,000", featured: false,
  },
  {
    id: 9, icon: "👑", name: "Epic Himalayas",
    tagline: "Leh → Dah → Kashmir → Pangi Valley → Umling La → Pangong — the ultimate odyssey",
    difficulty: "epic", days: "13", km: "2,600", altitude: "19,300 ft", season: "Jun–Sep",
    route: [{ label: "Leh", highlight: true }, { label: "Dah" }, { label: "Sonamarg" }, { label: "Dal Lake" }, { label: "Sinthan Top" }, { label: "Pangi Valley" }, { label: "Tsokar" }, { label: "Hanle" }, { label: "Umling La", highlight: true }, { label: "Pangong" }, { label: "Leh" }],
    itinerary: [
      { day: "Day 1",  leg: "Arrive Leh (3,500m) — Float over the Himalayas and land at Kushok Bakula Rinpochee Airport. Our team will receive you and transfer you to your hotel. Full acclimatisation day — rest is essential for a healthy, altitude-sickness-free trip." },
      { day: "Day 2",  leg: "Leh → Dah (170 km) — Team intro and high-altitude riding briefing before kick-off. Ride south-west into the heartland of the pure Indo-Aryan people via NH1. Visit Pathar Sahib and the river confluence at Nimmo. A cultural ride through beautiful villages, monasteries, and Himalayan viewpoints." },
      { day: "Day 3",  leg: "Dah → Sonamarg (190 km) — Enter Kashmir. Pass through Drass, the second coldest inhabited place on earth after Siberia, and visit the Army War Memorial. Cross Zoji La Pass (11,575 ft) and descend into Sonamarg, nestled in the flower-filled Sindh Valley — the gateway to Kashmir." },
      { day: "Day 4",  leg: "Sonamarg → Dal Lake, Srinagar (90 km) — A short, easy ride leaving more time to enjoy iconic Dal Lake. Board a shikara and glide through the calm waters, taking in the houseboats and panoramic mountain views. Overnight on the lake." },
      { day: "Day 5",  leg: "Dal Lake → Kishtwar (220 km) — Early departure recommended. Leave the city behind and ride through Daksum, a trekker's world of thick forests, splashing streams, and grassy meadows along the Bringi River. Climb to Sinthan Top — 360-degree views and year-round snow — before descending to Kishtwar." },
      { day: "Day 6",  leg: "Kishtwar → Sural Bathori (120 km) — An adventurous off-road day through the famous Pangi Valley of Himachal Pradesh. Interesting routes with scenic cliff roads and check posts. Camp life overnight." },
      { day: "Day 7",  leg: "Sural Bathori → Keylong (150 km) — Ride narrow Pangi Valley roads where 25–30 km/h is the pace — waterfalls, river crossings, and small villages on both sides. Visit the ancient Marikula Mata Temple at Udaipur, sacred to both Hindu and Buddhist pilgrims. Arrive Keylong by evening." },
      { day: "Day 8",  leg: "Keylong → Tsokar (247 km) — Back on the legendary Leh–Manali Highway. Cross Lachung La (16,616 ft) and Nakee La (15,547 ft), loop through the 22 Gata Loops, and ride the vast Morey Plains. Arrive at Tsokar — a dissolved salt lake famous for migratory birds." },
      { day: "Day 9",  leg: "Tsokar → Hanle (145 km) — Easy, smooth ride east into the most remote part of Ladakh. No passes to cross. Hanle is one of Ladakh's best dark-sky destinations — perfect for stargazing. Home to the world's highest observatory run by the Indian Institute of Astrophysics." },
      { day: "Day 10", leg: "Hanle → Umling La (19,300 ft) → Hanle (180 km) — The most awaited day. Ride across an extremely barren, uninhabited landscape to the world's highest motorable road. Chinese territory is visible to the east. Expect wind — and expect to be overwhelmed. Return to Hanle." },
      { day: "Day 11", leg: "Hanle → Pangong Lake (160 km) — Ride the newly opened road running alongside the India–China Line of Actual Control. Raw, remote, and breathtaking — wild asses roam freely along this barely-explored route. End the day beside the turquoise waters of Pangong Tso." },
      { day: "Day 12", leg: "Pangong → Leh (150 km) — Morning light on the lake, then ride back to Leh via Chang La (17,590 ft — third highest motorable road). Off-road sections, stream crossings, rock-strewn climbs, and sweeping descents. A fitting final ride." },
      { day: "Day 13", leg: "Airport Drop — Chapter ends. Exchange contacts, share memories, and say goodbye to your new family. See you on the next adventure." },
    ],
    highlights: ["Dah Indo-Aryan Village", "Zoji La", "Drass War Memorial", "Sonamarg", "Dal Lake Shikara", "Sinthan Top", "Pangi Valley", "Marikula Mata Temple", "Lachung La", "Gata Loops", "Tsokar Lake", "Hanle Observatory", "Umling La 19,300ft", "Pangong Lake", "Chang La"],
    price: "₹55,000", featured: true,
  },
];

const DIFF_LABEL = { easy: "Easy", medium: "Moderate", hard: "Challenging", epic: "Epic" };
const DIFF_CLASS  = { easy: "diff-easy", medium: "diff-medium", hard: "diff-hard", epic: "diff-epic" };
const FILTERS     = ["All", "Leh Based", "Delhi Start", "Srinagar", "Zanskar", "Record Passes"];

function matchFilter(pkg, f) {
  if (f === "All")           return true;
  if (f === "Leh Based")     return [1, 2, 3].includes(pkg.id);
  if (f === "Delhi Start")   return [4, 5, 6, 7, 9].includes(pkg.id);
  if (f === "Srinagar")      return [6, 7, 9].includes(pkg.id);
  if (f === "Zanskar")       return pkg.id === 8;
  if (f === "Record Passes") return [3, 5, 9].includes(pkg.id);
  return true;
}

// ────────────────────────────────────────────────────────────────────────────
export default function Packages() {
  const [openItinerary, setOpenItinerary] = useState(null);
  const [activeFilter, setActiveFilter]   = useState("All");
  const [menuOpen, setMenuOpen]           = useState(false);

  useEffect(() => {
    if (!document.getElementById("mll-pkg-css")) {
      const style = document.createElement("style");
      style.id = "mll-pkg-css";
      style.textContent = ALL_CSS;
      document.head.appendChild(style);
    }
    window.scrollTo(0, 0);
  }, []);

  const visible = PACKAGES.filter(p => matchFilter(p, activeFilter));
  const waBase  = "https://wa.me/919797545493?text=Hi,%20I%20want%20to%20enquire%20about%20the%20";

  return (
    <div className="pkg-page">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Motor Land Ladakh" />
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/prices" onClick={() => setMenuOpen(false)}>Bikes</Link></li>
          <li><Link to="/packages" className="nav-packages" onClick={() => setMenuOpen(false)}>Packages</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
        <a
          href="https://wa.me/919797545493?text=Hi,%20I%20want%20to%20book%20a%20bike%20in%20Ladakh"
          target="_blank" rel="noopener noreferrer"
          className="navbar-cta"
        >
          📲 Book Now
        </a>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* ── HERO ── */}
      <div className="pkg-hero">
        <div className="pkg-hero-grid" />
        <div className="pkg-hero-glow" />
        <div className="pkg-hero-inner">
          <p className="pkg-hero-eyebrow">Motor Land Ladakh</p>
          <h1>Tour<br /><span>Packages</span></h1>
          <p className="pkg-hero-sub">
            9 legendary routes hand-crafted for every rider — from the Ladakh loop to the full
            Himalayan odyssey. Your machine, your pace, your legend.
          </p>
          <div className="pkg-hero-stats">
            {[
              { num: "9",    lbl: "Packages" },
              { num: "19K",  lbl: "Max Altitude" },
              { num: "5–18", lbl: "Days Range" },
              { num: "4",    lbl: "Bikes Available" },
            ].map(s => (
              <div className="pkg-hero-stat" key={s.lbl}>
                <span className="pkg-hero-stat-num">{s.num}</span>
                <span className="pkg-hero-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="pkg-filters">
        <span className="pkg-filter-label">Filter</span>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`pkg-filter-btn ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── GRID ── */}
      <div className="pkg-grid">
        {visible.map(pkg => (
          <div key={pkg.id} className={`pkg-card ${pkg.featured ? "featured" : ""}`}>

            <span className="pkg-num-badge">0{pkg.id}</span>

            <div className="pkg-card-header">
              <div className="pkg-icon-wrap">{pkg.icon}</div>
              <div className="pkg-card-title-block">
                <span className={`pkg-difficulty ${DIFF_CLASS[pkg.difficulty]}`}>
                  {DIFF_LABEL[pkg.difficulty]}
                </span>
                <p className="pkg-name">{pkg.name}</p>
                <p className="pkg-tagline">{pkg.tagline}</p>
              </div>
            </div>

            <div className="pkg-route-visual">
              {pkg.route.map((stop, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center" }}>
                  <span className={`pkg-route-stop ${stop.highlight ? "highlight" : ""}`}>
                    {stop.label}
                  </span>
                  {i < pkg.route.length - 1 && (
                    <>
                      <span className="pkg-route-line" />
                      <span className="pkg-route-dot" />
                    </>
                  )}
                </span>
              ))}
            </div>

            <div className="pkg-divider" />

            <div className="pkg-stats-row">
              {[
                { val: pkg.days,     lbl: "Days" },
                { val: pkg.km,       lbl: "km approx" },
                { val: pkg.altitude, lbl: "Max Alt." },
                { val: pkg.season,   lbl: "Best Season" },
              ].map(s => (
                <div className="pkg-stat" key={s.lbl}>
                  <span className="pkg-stat-val">{s.val}</span>
                  <span className="pkg-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>

            <div className="pkg-highlights">
              {pkg.highlights.map(h => (
                <span className="pkg-highlight-chip" key={h}>📍 {h}</span>
              ))}
            </div>

            <button
              className="pkg-toggle-itin"
              onClick={() => setOpenItinerary(openItinerary === pkg.id ? null : pkg.id)}
            >
              {openItinerary === pkg.id ? "Hide Itinerary" : "View Day-by-Day"}
              <span className={`pkg-toggle-arrow ${openItinerary === pkg.id ? "open" : ""}`}>▼</span>
            </button>

            <div className={`pkg-itinerary ${openItinerary === pkg.id ? "open" : ""}`}>
              <div className="pkg-itinerary-inner">
                <p className="pkg-itin-title">Day-by-Day Itinerary</p>
                {pkg.itinerary.map((d, i) => (
                  <div className="pkg-itin-day" key={i}>
                    <span className="pkg-itin-num">{d.day.replace("Day ", "")}</span>
                    <span className="pkg-itin-leg"><strong>{d.day}</strong> — {d.leg}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pkg-card-footer">
              <div>
                <p className="pkg-price-from">Starting from</p>
                <p className="pkg-price">{pkg.price}<span> / person</span></p>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href={`${waBase}${encodeURIComponent(pkg.name + " package")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="pkg-enquire-btn"
                >
                  💬 Enquire
                </a>
                <a
                  href={`${waBase}${encodeURIComponent(pkg.name + " package — I want to book this tour")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="pkg-book-btn"
                >
                  📲 Book This Tour
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="pkg-bottom-cta">
        <h2>Can't Decide?<br /><span>We'll Plan It For You</span></h2>
        <p>Tell us your dates, budget, and riding experience — our crew will hand-craft the perfect Ladakh journey for you.</p>
        <div className="pkg-bottom-btns">
          <a
            href="https://wa.me/919797545493?text=Hi,%20I%20need%20help%20choosing%20a%20Ladakh%20tour%20package"
            target="_blank" rel="noopener noreferrer"
            className="pkg-book-btn"
            style={{ fontSize: "15px", padding: "15px 32px" }}
          >
            📲 Chat with Our Team
          </a>
          <Link to="/contact" className="pkg-enquire-btn" style={{ fontSize: "14px", padding: "14px 28px" }}>
            Send Enquiry →
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div>
          <p className="footer-brand">Motor Land <span>Ladakh</span></p>
          <p className="footer-copy" style={{ marginTop: "6px" }}>© DrukTechnologies 2026. All rights reserved.</p>
        </div>
        <nav className="footer-links">
          <Link to="/prices">Bikes</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="https://wa.me/919797545493" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </footer>

    </div>
  );
}