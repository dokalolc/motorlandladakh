import himalayan from "../assets/bikes/himalayan.jpg";
import classic350 from "../assets/bikes/classic350.jpg";
import Ktm390 from "../assets/bikes/Ktm390.jpg";
import scooter from "../assets/bikes/scooter.jpg";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── Page-scoped CSS injected once ──────────────────────────────────────────
const PRICES_CSS = `
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

  body {
    background: var(--dark);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 3px; }

  /* ── Noise overlay ── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025;
    pointer-events: none;
    z-index: 9999;
  }

  /* ── Navbar ── */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    height: 72px;
    background: rgba(12,12,14,0.85);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
  }
  .navbar .logo img { height: 250px; margin-left: -110px; object-fit: contain; }
  .navbar ul { display: flex; gap: 36px; list-style: none; }
  .navbar ul li a {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
    position: relative;
  }
  .navbar ul li a::after {
    content: '';
    position: absolute;
    left: 0; bottom: -4px;
    width: 0; height: 2px;
    background: var(--red);
    transition: width 0.25s;
  }
  .navbar ul li a:hover { color: #fff; }
  .navbar ul li a:hover::after { width: 100%; }
  .navbar ul li a.active { color: #fff; }
  .navbar ul li a.active::after { width: 100%; }
  .navbar-cta {
    background: var(--red);
    color: #fff !important;
    padding: 8px 20px;
    border-radius: 6px;
    font-family: 'Rajdhani', sans-serif !important;
    font-weight: 700 !important;
    font-size: 13px !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase !important;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s !important;
  }
  .navbar-cta::after { display: none !important; }
  .navbar-cta:hover { background: #c62620 !important; transform: translateY(-1px) !important; }

  /* ── Prices Hero Banner ── */
  .prices-hero {
    padding-top: 72px;
    position: relative;
    overflow: hidden;
    min-height: 320px;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #130606 0%, #0c0c0e 55%, #0e0c0a 100%);
    border-bottom: 1px solid var(--border);
  }
  .prices-hero::before {
    content: '';
    position: absolute;
    left: -100px;
    top: -100px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(230,51,41,0.12) 0%, transparent 65%);
    pointer-events: none;
  }
  .prices-hero::after {
    content: '';
    position: absolute;
    right: 80px;
    bottom: -60px;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245,130,42,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .prices-hero-inner {
    position: relative;
    z-index: 1;
    padding: 60px 80px;
    max-width: 700px;
  }
  .prices-eyebrow {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .prices-eyebrow::before {
    content: '';
    display: inline-block;
    width: 24px; height: 2px;
    background: var(--orange);
  }
  .prices-hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 7vw, 96px);
    line-height: 0.93;
    letter-spacing: 1px;
    color: #f5f0e8;
    margin-bottom: 20px;
  }
  .prices-hero h1 span { color: var(--red); }
  .prices-hero p {
    font-size: 16px;
    color: rgba(232,228,220,0.55);
    font-weight: 300;
    line-height: 1.6;
    max-width: 440px;
  }

  /* ── Decorative side text ── */
  .prices-hero-side {
    position: absolute;
    right: 80px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 120px;
    color: rgba(230,51,41,0.04);
    letter-spacing: 8px;
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
  }

  /* ── Included banner ── */
  .included-strip {
    display: flex;
    align-items: center;
    gap: 0;
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .included-strip::-webkit-scrollbar { display: none; }
  .included-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 18px 32px;
    border-right: 1px solid var(--border);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .included-item:last-child { border-right: none; }
  .included-icon { font-size: 18px; }
  .included-text {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .included-text strong { color: #f5f0e8; font-weight: 700; }

  /* ── Grid ── */
  .prices-section {
    padding: 80px;
  }
  .prices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 28px;
  }

  /* ── Price Card ── */
  .price-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.35s cubic-bezier(.23,1,.32,1),
                box-shadow 0.35s,
                border-color 0.35s;
    opacity: 0;
    animation: cardIn 0.6s cubic-bezier(.23,1,.32,1) forwards;
  }
  .price-card:nth-child(1) { animation-delay: 0.05s; }
  .price-card:nth-child(2) { animation-delay: 0.15s; }
  .price-card:nth-child(3) { animation-delay: 0.25s; }
  .price-card:nth-child(4) { animation-delay: 0.35s; }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .price-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 28px 64px rgba(230,51,41,0.22);
    border-color: rgba(230,51,41,0.5);
  }
  .price-card.popular {
    border-color: rgba(230,51,41,0.35);
    box-shadow: 0 0 40px rgba(230,51,41,0.1);
  }

  /* ── Image wrapper ── */
  .price-img-wrap {
    position: relative;
    overflow: hidden;
  }
  .price-img-wrap img {
    width: 100%;
    aspect-ratio: 16/10;
    object-fit: cover;
    display: block;
    transition: transform 0.55s cubic-bezier(.23,1,.32,1);
  }
  .price-card:hover .price-img-wrap img { transform: scale(1.06); }

  /* ── Tag badge ── */
  .price-tag {
    position: absolute;
    top: 14px;
    left: 14px;
    background: var(--red);
    color: #fff;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(230,51,41,0.5);
  }
  .price-tag.alt {
    background: var(--orange);
    box-shadow: 0 2px 12px rgba(245,130,42,0.4);
  }
  .price-tag.gold {
    background: var(--gold);
    color: #1a1200;
    box-shadow: 0 2px 12px rgba(240,192,64,0.4);
  }

  /* ── Card body ── */
  .price-card-body {
    padding: 24px 26px 28px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .price-bike-category {
    font-family: 'Rajdhani', sans-serif;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 6px;
  }
  .price-bike-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px;
    color: #f5f0e8;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    line-height: 1;
  }

  /* ── Specs row ── */
  .price-specs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .price-spec-chip {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 12px;
    color: var(--muted);
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .price-divider {
    height: 1px;
    background: var(--border);
    margin-bottom: 20px;
  }

  /* ── Price display ── */
  .price-amount-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 20px;
  }
  .price-amount {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    color: var(--red);
    line-height: 1;
    letter-spacing: 1px;
  }
  .price-per {
    font-family: 'Rajdhani', sans-serif;
    font-size: 14px;
    color: var(--muted);
    font-weight: 500;
    padding-bottom: 8px;
    letter-spacing: 1px;
  }

  /* ── Includes list ── */
  .price-includes {
    list-style: none;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  .price-includes li {
    font-size: 13px;
    color: rgba(232,228,220,0.6);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .price-includes li::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--orange);
    flex-shrink: 0;
  }

  /* ── Book button ── */
  .price-book-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: var(--red);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 15px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(230,51,41,0.3);
  }
  .price-book-btn:hover {
    background: #c62620;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(230,51,41,0.5);
  }
  .price-book-btn .btn-arrow {
    font-size: 18px;
    transition: transform 0.2s;
  }
  .price-book-btn:hover .btn-arrow { transform: translateX(3px); }

  /* ── Note strip ── */
  .prices-note {
    margin: 0 80px 80px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 36px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  .prices-note-icon {
    font-size: 24px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .prices-note-text {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
  }
  .prices-note-text strong { color: #f5f0e8; font-weight: 600; }

  /* ── Footer ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 40px 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  .footer-brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
    color: #fff;
  }
  .footer-brand span { color: var(--red); }
  .footer-copy { font-size: 13px; color: var(--muted); }
  .footer-links { display: flex; gap: 24px; }
  .footer-links a {
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--red); }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .prices-section { padding: 60px 40px; }
    .prices-note { margin: 0 40px 60px; }
    .footer { padding: 40px; }
    .prices-hero-inner { padding: 60px 40px; }
    .prices-hero-side { display: none; }
  }
  @media (max-width: 768px) {
    .navbar { padding: 0 24px; }
    .navbar ul { display: none; }
    .prices-hero-inner { padding: 40px 24px; }
    .prices-section { padding: 40px 24px; }
    .prices-note { margin: 0 24px 40px; flex-direction: column; }
    .footer { padding: 30px 24px; flex-direction: column; align-items: flex-start; }
    .included-strip { padding: 0 24px; }
  }
`;

const bikes = [
  {
    name: "Himalayan 450",
    category: "Adventure Tourer",
    img: himalayan,
    price: "₹3,500",
    tag: "Most Popular",
    tagStyle: "",
    specs: ["450cc", "40 HP", "ABS", "Long Travel Susp."],
    includes: ["Helmet & gloves", "Rain gear", "Ladakh registration", "24/7 roadside support"],
  },
  {
    name: "Himalayan 411",
    category: "Classic Explorer",
    img: classic350,
    price: "₹2,800",
    tag: "Best Comfort",
    tagStyle: "alt",
    specs: ["411cc", "24.3 HP", "Disc Brake", "Fuel Injected"],
    includes: ["Helmet & gloves", "Rain gear", "Ladakh registration", "24/7 roadside support"],
  },
  {
    name: "KTM Adventure 390",
    category: "Performance ADV",
    img: Ktm390,
    price: "₹3,500",
    tag: "High Passes",
    tagStyle: "gold",
    specs: ["373cc", "43 HP", "ABS", "Traction Control"],
    includes: ["Helmet & gloves", "Rain gear", "Ladakh registration", "24/7 roadside support"],
  },
  {
    name: "Royal Enfield 350",
    category: "Classic Cruiser",
    img: scooter,
    price: "₹2,200",
    tag: "City Ride",
    tagStyle: "alt",
    specs: ["349cc", "20.2 HP", "Drum/Disc", "Classic Style"],
    includes: ["Helmet & gloves", "Rain gear", "Ladakh registration", "24/7 roadside support"],
  },
];

const included = [
  { icon: "🪖", label: "Full-face Helmet" },
  { icon: "🧤", label: "Riding Gloves" },
  { icon: "🌧️", label: "Rain Gear" },
  { icon: "📋", label: "Ladakh Registration" },
  { icon: "🛠️", label: "24/7 Roadside Support" },
  { icon: "✅", label: "No Hidden Charges" },
];

// ────────────────────────────────────────────────────────────────────────────
export default function Prices() {
  useEffect(() => {
    if (!document.getElementById("mll-prices-css")) {
      const style = document.createElement("style");
      style.id = "mll-prices-css";
      style.textContent = PRICES_CSS;
      document.head.appendChild(style);
    }
  }, []);

  const bookBike = (bikeName) => {
    const phone = "919797545493";
    const message = `Hi, I want to rent the ${bikeName} in Ladakh.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div style={{ background: "#0c0c0e", minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Motor Land Ladakh" />
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/prices" className="active">Bikes</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <a
          href="https://wa.me/919797545493?text=Hi,%20I%20want%20to%20book%20a%20bike%20in%20Ladakh"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-cta"
        >
          📲 Book Now
        </a>
      </nav>

      {/* ── HERO BANNER ── */}
      <section className="prices-hero">
        <div className="prices-hero-inner">
          
          <h1>
            Choose Your<br />
            <span>Bike</span>
          </h1>
          <p>
            Transparent pricing. No hidden charges. Every bike comes fully equipped — helmets, gear, and Ladakh registration included.
          </p>
        </div>
        <div className="prices-hero-side">LADAKH</div>
      </section>

      {/* ── INCLUDED STRIP ── */}
      <div className="included-strip">
        {included.map((item) => (
          <div className="included-item" key={item.label}>
            <span className="included-icon">{item.icon}</span>
            <span className="included-text"><strong>{item.label}</strong> included</span>
          </div>
        ))}
      </div>

      {/* ── BIKE CARDS ── */}
      <section className="prices-section">
        <div className="prices-grid">
          {bikes.map((bike) => (
            <div
              className={`price-card ${bike.tag === "Most Popular" ? "popular" : ""}`}
              key={bike.name}
            >
              {/* Image */}
              <div className="price-img-wrap">
                <img src={bike.img} alt={bike.name} />
                <span className={`price-tag ${bike.tagStyle}`}>{bike.tag}</span>
              </div>

              {/* Body */}
              <div className="price-card-body">
                <p className="price-bike-category">{bike.category}</p>
                <h2 className="price-bike-name">{bike.name}</h2>

                {/* Spec chips */}
                <div className="price-specs">
                  {bike.specs.map((s) => (
                    <span className="price-spec-chip" key={s}>{s}</span>
                  ))}
                </div>

                <div className="price-divider" />

                {/* Price */}
                <div className="price-amount-row">
                  <span className="price-amount">{bike.price}</span>
                  <span className="price-per">/ day</span>
                </div>

                {/* Includes */}
                <ul className="price-includes">
                  {bike.includes.map((inc) => (
                    <li key={inc}>{inc}</li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="price-book-btn" onClick={() => bookBike(bike.name)}>
                  📲 Book via WhatsApp
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTE ── */}
      <div className="prices-note">
        <span className="prices-note-icon">💡</span>
        <p className="prices-note-text">
          <strong>Multi-day & group discounts available.</strong> Renting for 5+ days or bringing a group?
          Message us on WhatsApp and we'll put together a custom package for you.
          Prices are per bike per day. A refundable security deposit is collected at pickup.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div>
          <p className="footer-brand">Motor Land <span>Ladakh</span></p>
          <p className="footer-copy" style={{ marginTop: "6px" }}>© DrukTechnologies 2026. All rights reserved.</p>
        </div>
        <nav className="footer-links">
          <Link to="/prices">Bikes</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="https://wa.me/919797545493" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </footer>

    </div>
  );
}