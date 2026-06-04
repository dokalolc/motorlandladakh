import heroImg from "../assets/hero.jpg";
import himalayan from "../assets/bikes/himalayan.jpg";
import classic350 from "../assets/bikes/classic350.jpg";
import Ktm390 from "../assets/bikes/Ktm390.jpg";
import scooter from "../assets/bikes/scooter.jpg";
import logo from "../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ─── Inline styles & keyframes injected once ────────────────────────────────
const GLOBAL_CSS = `
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

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 3px; }

  /* ── Noise texture overlay ── */
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
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    height: 72px;
    background: rgba(12,12,14,0.85);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
    transition: background 0.3s;
  }
  .navbar .logo img { height: 275px; margin-left: -110px; object-fit: contain; }
  .navbar ul { display: flex; gap: 36px; list-style: none; position: absolute; left: 50%; transform: translateX(-50%); }
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
  .navbar ul li a.nav-packages {
    color: var(--orange);
    position: relative;
  }
  .navbar ul li a.nav-packages::before {
    content: '★';
    font-size: 8px;
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--gold);
    letter-spacing: 0;
  }
  .navbar ul li a.nav-packages:hover { color: var(--gold); }
  .navbar ul li a.nav-packages::after { background: var(--gold); }
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
  .navbar-cta:hover { background: #c62620 !important; transform: translateY(-1px) !important; color: #fff !important; }

  /* ── Hero ── */
  .hero {
    position: relative;
    height: 100vh;
    min-height: 640px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center 30%;
    transform: scale(1.06);
    transition: transform 8s ease-out;
  }
  .hero-bg.loaded { transform: scale(1); }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(12,12,14,0.25) 0%,
      rgba(12,12,14,0.15) 40%,
      rgba(12,12,14,0.92) 80%,
      var(--dark) 100%
    );
  }
  .hero-content {
    position: relative;
    z-index: 2;
    padding: 0 80px 80px;
    max-width: 860px;
  }
  .hero-eyebrow {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .hero-eyebrow::before {
    content: '';
    display: inline-block;
    width: 28px; height: 2px;
    background: var(--orange);
  }
  .hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(56px, 9vw, 120px);
    line-height: 0.93;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 20px;
  }
  .hero h1 span { color: var(--red); }

  .hero-sub {
    font-size: 17px;
    color: rgba(232,228,220,0.65);
    font-weight: 300;
    margin-bottom: 40px;
    max-width: 480px;
    line-height: 1.6;
    margin-left : 100px;
  }
  .hero-buttons {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--red);
    color: #fff;
    padding: 15px 32px;
    border-radius: 8px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(230,51,41,0.4);
  }
  .btn-primary:hover {
    background: #c62620;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(230,51,41,0.55);
  }
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: #fff;
    padding: 14px 32px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    backdrop-filter: blur(8px);
  }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.4);
    transform: translateY(-2px);
  }
  .btn-gold {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, var(--gold) 0%, var(--orange) 100%);
    color: #0c0c0e;
    padding: 15px 32px;
    border-radius: 8px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-decoration: none;
    transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(240,192,64,0.35);
  }
  .btn-gold:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(240,192,64,0.5);
  }

  /* ── Stats strip ── */
  .stats-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .stat-item {
    padding: 32px 0;
    text-align: center;
    border-right: 1px solid var(--border);
    transition: background 0.25s;
  }
  .stat-item:last-child { border-right: none; }
  .stat-item:hover { background: rgba(255,255,255,0.02); }
  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    color: var(--red);
    line-height: 1;
    display: block;
  }
  .stat-label {
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 4px;
  }

  /* ── Section common ── */
  .section { padding: 100px 80px; }
  .section-eyebrow {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-eyebrow::before {
    content: '';
    display: inline-block;
    width: 20px; height: 2px;
    background: var(--orange);
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(36px, 5vw, 64px);
    letter-spacing: 1px;
    color: #f5f0e8;
    margin-bottom: 56px;
    line-height: 1;
  }

  /* ── Bikes grid ── */
  .bikes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
  }
  .bike-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(.23,1,.32,1),
                box-shadow 0.35s,
                border-color 0.35s;
    position: relative;
  }
  .bike-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 24px 60px rgba(230,51,41,0.25);
    border-color: var(--red);
  }
  .bike-card img {
    width: 100%;
    aspect-ratio: 16/10;
    object-fit: cover;
    display: block;
    transition: transform 0.5s;
  }
  .bike-card:hover img { transform: scale(1.04); }
  .bike-card-body { padding: 20px 22px 24px; }
  .bike-tag {
    font-family: 'Rajdhani', sans-serif;
    font-size: 11px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 6px;
  }
  .bike-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    color: #fff;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }
  .bike-price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bike-price {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 22px;
    color: var(--red);
    transition: opacity 0.3s, transform 0.3s;
  }
  .bike-price.hidden { opacity: 0; transform: translateY(6px); }
  .bike-price.visible { opacity: 1; transform: translateY(0); }
  .bike-cta-icon {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: rgba(230,51,41,0.12);
    border: 1px solid rgba(230,51,41,0.3);
    display: flex; align-items: center; justify-content: center;
    color: var(--red);
    font-size: 15px;
    transition: background 0.2s, border-color 0.2s;
  }
  .bike-card:hover .bike-cta-icon {
    background: var(--red);
    border-color: var(--red);
    color: #fff;
  }
  .bike-divider {
    height: 1px;
    background: var(--border);
    margin: 14px 0;
  }
  .bike-specs {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }
  .bike-spec {
    font-size: 12px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ── Why us ── */
  .why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }
  .why-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px 26px;
    transition: border-color 0.25s, transform 0.25s;
  }
  .why-card:hover {
    border-color: rgba(230,51,41,0.4);
    transform: translateY(-4px);
  }
  .why-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: rgba(230,51,41,0.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin-bottom: 20px;
  }
  .why-title {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #f5f0e8;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }
  .why-desc {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.6;
  }

  /* ── Steps ── */
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
  }
  .steps-grid::before {
    content: '';
    position: absolute;
    top: 28px;
    left: 12%;
    right: 12%;
    height: 2px;
    background: linear-gradient(to right, var(--red), var(--orange));
    opacity: 0.3;
    z-index: 0;
  }
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    position: relative;
    z-index: 1;
  }
  .step-num {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--card);
    border: 2px solid var(--red);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    color: var(--red);
    margin-bottom: 20px;
    box-shadow: 0 0 24px rgba(230,51,41,0.25);
  }
  .step-title {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #f5f0e8;
    margin-bottom: 8px;
  }
  .step-desc { font-size: 13px; color: var(--muted); line-height: 1.5; }

  /* ── Packages Teaser Section ── */
  .packages-teaser {
    padding: 100px 80px;
    position: relative;
    overflow: hidden;
  }
  .packages-teaser::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(240,192,64,0.4), transparent);
  }
  .packages-teaser::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(240,192,64,0.4), transparent);
  }
  .pkg-teaser-bg-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 400px;
    background: radial-gradient(ellipse at center, rgba(240,192,64,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .pkg-teaser-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 48px;
    gap: 24px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }
  .pkg-teaser-title-block { flex: 1; }
  .pkg-teaser-eyebrow {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pkg-teaser-eyebrow::before {
    content: '';
    display: inline-block;
    width: 20px; height: 2px;
    background: var(--gold);
  }
  .pkg-teaser-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 5.5vw, 72px);
    letter-spacing: 1px;
    color: #f5f0e8;
    line-height: 0.95;
    margin-bottom: 14px;
  }
  .pkg-teaser-title span { color: var(--gold); }
  .pkg-teaser-subtitle {
    font-size: 15px;
    color: var(--muted);
    max-width: 380px;
    line-height: 1.6;
  }
  .pkg-scroll-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
  }
  .pkg-mini-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 22px 24px;
    cursor: pointer;
    text-decoration: none;
    display: block;
    transition: transform 0.3s cubic-bezier(.23,1,.32,1),
                box-shadow 0.3s,
                border-color 0.3s;
    position: relative;
    overflow: hidden;
  }
  .pkg-mini-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, var(--gold), var(--orange));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
  }
  .pkg-mini-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(240,192,64,0.12);
    border-color: rgba(240,192,64,0.25);
  }
  .pkg-mini-card:hover::before { transform: scaleX(1); }
  .pkg-mini-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    line-height: 1;
    color: rgba(240,192,64,0.12);
    position: absolute;
    top: 12px;
    right: 20px;
    letter-spacing: 1px;
  }
  .pkg-mini-icon {
    font-size: 24px;
    margin-bottom: 14px;
    display: block;
  }
  .pkg-mini-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    color: #f5f0e8;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
    line-height: 1.1;
  }
  .pkg-mini-route {
    font-family: 'Rajdhani', sans-serif;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
    line-height: 1.4;
  }
  .pkg-mini-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;
    border-top: 1px solid var(--border);
  }
  .pkg-mini-days {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 13px;
    color: var(--gold);
    letter-spacing: 0.5px;
  }
  .pkg-mini-arrow {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(240,192,64,0.08);
    border: 1px solid rgba(240,192,64,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    color: var(--gold);
    transition: background 0.2s, border-color 0.2s;
  }
  .pkg-mini-card:hover .pkg-mini-arrow {
    background: var(--gold);
    border-color: var(--gold);
    color: #0c0c0e;
  }
  .pkg-teaser-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    position: relative;
    z-index: 1;
  }
  .pkg-more-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .pkg-more-badge::before, .pkg-more-badge::after {
    content: '';
    display: inline-block;
    width: 40px; height: 1px;
    background: var(--border);
  }

  /* ── Landscape CTA banner ── */
  .cta-banner {
    margin: 0 80px 100px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 60px 70px;
    gap: 40px;
    background: linear-gradient(135deg, #1a0a0a 0%, #0c0c0e 60%);
    border: 1px solid rgba(230,51,41,0.2);
  }
  .cta-banner::before {
    content: '';
    position: absolute;
    right: -60px;
    top: -60px;
    width: 340px; height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(230,51,41,0.2) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-banner-text { position: relative; z-index: 1; max-width: 520px; }
  .cta-banner-text h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(32px, 4vw, 52px);
    color: #f5f0e8;
    letter-spacing: 1px;
    margin-bottom: 12px;
    line-height: 1;
  }
  .cta-banner-text p { font-size: 15px; color: var(--muted); line-height: 1.6; }
  .cta-banner-actions { display: flex; gap: 14px; flex-wrap: wrap; position: relative; z-index: 1; flex-shrink: 0; }

  /* ── Reviews ── */
  .reviews-layout {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 60px;
    align-items: start;
  }
  .review-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px 26px;
    margin-bottom: 16px;
    transition: border-color 0.25s;
    position: relative;
  }
  .review-card:hover { border-color: rgba(255,255,255,0.12); }
  .review-stars { font-size: 15px; margin-bottom: 10px; letter-spacing: 1px; }
  .review-text { font-size: 15px; color: rgba(232,228,220,0.8); line-height: 1.65; font-style: italic; margin-bottom: 14px; }
  .review-author { font-family: 'Rajdhani', sans-serif; font-weight: 600; font-size: 14px; letter-spacing: 1px; color: var(--orange); }
  .review-date { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* ── Delete button ── */
  .review-delete-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(230,51,41,0.08);
    border: 1px solid rgba(230,51,41,0.2);
    border-radius: 6px;
    color: var(--muted);
    font-size: 13px;
    padding: 4px 10px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 4px;
    opacity: 0;
    pointer-events: none;
  }
  .review-card:hover .review-delete-btn {
    opacity: 1;
    pointer-events: all;
  }
  .review-delete-btn:hover {
    background: rgba(230,51,41,0.18);
    border-color: var(--red);
    color: #ff6b6b;
    transform: scale(1.04);
  }
  .review-delete-btn.deleting {
    opacity: 0.5;
    pointer-events: none;
  }

  /* ── Form ── */
  .review-form {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px 32px;
    position: sticky;
    top: 92px;
  }
  .form-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 1px;
    color: #f5f0e8;
    margin-bottom: 4px;
  }
  .form-sub { font-size: 13px; color: var(--muted); margin-bottom: 28px; }
  .form-label {
    display: block;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .form-field {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    margin-bottom: 18px;
  }
  .form-field:focus { border-color: rgba(230,51,41,0.5); background: rgba(255,255,255,0.06); }
  .form-field::placeholder { color: rgba(122,118,112,0.7); }
  .form-field option { background: var(--card); color: var(--text); }
  .form-submit {
    width: 100%;
    background: var(--red);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(230,51,41,0.35);
  }
  .form-submit:hover {
    background: #c62620;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(230,51,41,0.5);
  }
  .form-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* ── Footer ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 40px 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: gap;
    gap: 20px;
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
    .section { padding: 80px 40px; }
    .packages-teaser { padding: 80px 40px; }
    .pkg-scroll-row { grid-template-columns: repeat(2, 1fr); }
    .cta-banner { margin: 0 40px 80px; padding: 40px; }
    .reviews-layout { grid-template-columns: 1fr; }
    .review-form { position: static; }
    .footer { padding: 40px; }
  }
  @media (max-width: 768px) {
    .navbar { padding: 0 24px; }
    .navbar ul { display: none; }
    .hero-content { padding: 0 28px 60px; }
    .stats-strip { grid-template-columns: repeat(2,1fr); }
    .section { padding: 60px 24px; }
    .packages-teaser { padding: 60px 24px; }
    .pkg-scroll-row { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: 1fr 1fr; gap: 30px; }
    .steps-grid::before { display: none; }
    .cta-banner { flex-direction: column; margin: 0 24px 60px; padding: 40px 28px; }
    .footer { padding: 30px 24px; flex-direction: column; align-items: flex-start; }
    .review-delete-btn { opacity: 1; pointer-events: all; }
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { opacity: 0; animation: fadeUp 0.7s cubic-bezier(.23,1,.32,1) forwards; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.22s; }
  .delay-3 { animation-delay: 0.38s; }
  .delay-4 { animation-delay: 0.52s; }

  @keyframes fadeOut {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(0.95); }
  }
  .review-card.removing {
    animation: fadeOut 0.3s ease forwards;
    pointer-events: none;
  }
`;

const bikes = [
  { name: "Himalayan 450", tag: "Adventure Tourer", img: himalayan, price: "₹3,500", specs: ["450cc", "40 HP", "ABS"] },
  { name: "Himalayan 411", tag: "Classic Explorer", img: classic350, price: "₹2,800", specs: ["411cc", "24.3 HP", "Disc Brake"] },
  { name: "KTM Adventure 390", tag: "Performance ADV", img: Ktm390, price: "₹3,200", specs: ["373cc", "43 HP", "ABS"] },
  { name: "Royal Enfield 350", tag: "Classic Cruiser", img: scooter, price: "₹2,200", specs: ["349cc", "20.2 HP", "Drum/Disc"] },
];

const whyItems = [
  { icon: "🏔️", title: "Ladakh Registered", desc: "All bikes carry valid Ladakh registration — no checkpost hassles on your ride." },
  { icon: "🪖", title: "Helmets & Gear", desc: "Full-face helmets, gloves, and rain gear included with every rental." },
  { icon: "⚡", title: "Instant WhatsApp Booking", desc: "No long forms. Chat with us directly and confirm your ride in minutes." },
  { icon: "🛠️", title: "24/7 Roadside Support", desc: "Our local mechanics and support staff cover the entire Ladakh circuit." },
  { icon: "📍", title: "Drop at Any Location", desc: "We deliver and pick up at Leh airport, hotels, or any point you choose." },
];

const steps = [
  { num: "01", title: "Choose Your Bike", desc: "Browse our fleet and pick the machine that matches your spirit." },
  { num: "02", title: "Confirm Your Dates", desc: "Tell us your travel window — we hold bikes against a small advance." },
  { num: "03", title: "WhatsApp Us", desc: "Send us a message and our team confirms within minutes." },
  { num: "04", title: "Ride & Explore", desc: "We deliver to your door. You just ride into the mountains." },
];

// Featured 3 packages for homepage teaser
const FEATURED_PACKAGES = [
  {
    num: "01",
    icon: "🏔️",
    name: "Ladakh Round",
    route: "Leh · Khardung La · Nubra · Pangong · Leh",
    days: "7 Days",
    slug: "ladakh-round",
  },
  {
    num: "04",
    icon: "🛣️",
    name: "Delhi – Manali – Leh",
    route: "Delhi · Chandigarh · Manali · Sarchu · Leh",
    days: "10 Days",
    slug: "delhi-manali-leh",
  },
  {
    num: "09",
    icon: "👑",
    name: "Epic Himalayas",
    route: "Delhi · Manali · Leh · Srinagar · Kashmir · Delhi",
    days: "18 Days",
    slug: "epic-himalayas",
  },
];

// ────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [openBike, setOpenBike] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, message: "" });
  const [reviews, setReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [removingIds, setRemovingIds] = useState(new Set());

  useEffect(() => {
    if (!document.getElementById("mll-global-css")) {
      const style = document.createElement("style");
      style.id = "mll-global-css";
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
    const img = new Image();
    img.src = heroImg;
    img.onload = () => setHeroLoaded(true);
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch { setReviews([]); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "rating" ? Number(value) : value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) { alert("Please fill all fields"); return; }
    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, form);
      setForm({ name: "", rating: 5, message: "" });
      fetchReviews();
    } catch (err) {
      alert(`Error: ${err.response?.data?.msg || err.message}`);
    } finally { setSubmitting(false); }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } catch (err) {
        alert("Could not delete review.");
        setRemovingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      } finally {
        setRemovingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      }
    }, 300);
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
          <li><Link to="/prices">Bikes</Link></li>
          <li><Link to="/packages" className="nav-packages">Packages</Link></li>
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

      {/* ── HERO ── */}
      <section className="hero">
        <div className={`hero-bg ${heroLoaded ? "loaded" : ""}`} style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="fade-up delay-2">
            Ride The<br />
            <span>Roof of</span><br />
            The World
          </h1>
          <p className="hero-sub fade-up delay-3">
            Premium motorcycles for the world's highest roads.
            Khardung La, Mig La, Pangong Lake — your legend starts here.
          </p>
          <div className="hero-buttons fade-up delay-4">
            <a
              href="https://wa.me/919797545493?text=Hi,%20I%20want%20to%20book%20a%20bike%20in%20Ladakh"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
            >
              📲 Book via WhatsApp
            </a>
            <Link to="/packages" className="btn-gold">🗺️ View Tour Packages</Link>
            <Link to="/prices" className="btn-secondary">View All Bikes →</Link>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        {[
          { num: "500+", label: "Happy Riders" },
          { num: "9", label: "Tour Packages" },
          { num: "18,380 ft", label: "Max Altitude Ridden" },
          { num: "24/7", label: "Roadside Support" },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── OUR BIKES ── */}
      <section className="section">
        <p className="section-eyebrow">Fleet</p>
        <h2 className="section-title">Our Bikes</h2>
        <div className="bikes-grid">
          {bikes.map((bike) => {
            const isOpen = openBike === bike.name;
            return (
              <div key={bike.name} className="bike-card" onClick={() => setOpenBike(isOpen ? null : bike.name)}>
                <div style={{ overflow: "hidden" }}>
                  <img src={bike.img} alt={bike.name} />
                </div>
                <div className="bike-card-body">
                  <p className="bike-tag">{bike.tag}</p>
                  <h3 className="bike-name">{bike.name}</h3>
                  <div className="bike-divider" />
                  <div className="bike-specs">
                    {bike.specs.map((s) => <span className="bike-spec" key={s}>• {s}</span>)}
                  </div>
                  <div className="bike-price-row" style={{ marginTop: "16px" }}>
                    <span className={`bike-price ${isOpen ? "visible" : "hidden"}`}>
                      {bike.price}<span style={{ fontSize: "13px", fontWeight: 400, color: "var(--muted)" }}> / day</span>
                    </span>
                    {!isOpen && <span style={{ fontSize: "13px", color: "var(--muted)" }}>Tap for price</span>}
                    <div className="bike-cta-icon">→</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PACKAGES TEASER ── */}
      <section className="packages-teaser">
        <div className="pkg-teaser-bg-glow" />
        <div className="pkg-teaser-header">
          <div className="pkg-teaser-title-block">
            <p className="pkg-teaser-eyebrow">Curated Journeys</p>
            <h2 className="pkg-teaser-title">Tour<br /><span>Packages</span></h2>
            <p className="pkg-teaser-subtitle">
              9 legendary routes across the Himalayas — from weekend escapes to 18-day epics. Every road a story.
            </p>
          </div>
          <Link to="/packages" className="btn-gold" style={{ flexShrink: 0, alignSelf: "flex-start", marginTop: "44px" }}>
            All 9 Packages →
          </Link>
        </div>

        <div className="pkg-scroll-row">
          {FEATURED_PACKAGES.map((pkg) => (
            <Link to="/packages" className="pkg-mini-card" key={pkg.slug}>
              <span className="pkg-mini-num">{pkg.num}</span>
              <span className="pkg-mini-icon">{pkg.icon}</span>
              <p className="pkg-mini-name">{pkg.name}</p>
              <p className="pkg-mini-route">{pkg.route}</p>
              <div className="pkg-mini-footer">
                <span className="pkg-mini-days">⏱ {pkg.days}</span>
                <div className="pkg-mini-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pkg-teaser-cta">
          <span className="pkg-more-badge">+6 more legendary routes</span>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">Why Motor Land Ladakh</p>
        <h2 className="section-title">Everything You Need</h2>
        <div className="why-grid">
          {whyItems.map((w) => (
            <div className="why-card" key={w.title}>
              <div className="why-icon">{w.icon}</div>
              <p className="why-title">{w.title}</p>
              <p className="why-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">Process</p>
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          {steps.map((s) => (
            <div className="step-item" key={s.num}>
              <div className="step-num">{s.num}</div>
              <p className="step-title">{s.title}</p>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className="cta-banner">
        <div className="cta-banner-text">
          <h2>Ready to Conquer Khardung La?</h2>
          <p>The world's highest motorable road awaits. Drop us a WhatsApp message and we'll have your bike ready within hours.</p>
        </div>
        <div className="cta-banner-actions">
          <a
            href="https://wa.me/919797545493?text=Hi,%20I%20want%20to%20book%20a%20bike%20in%20Ladakh"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            📲 WhatsApp Us Now
          </a>
          <Link to="/packages" className="btn-gold">🗺️ Browse Packages</Link>
          <Link to="/contact" className="btn-secondary">Get a Quote →</Link>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">Testimonials</p>
        <h2 className="section-title">Riders' Stories</h2>
        <div className="reviews-layout">
          <div>
            {[
              { text: "Best decision of my life. The Himalayan 450 handled Khardung La like a dream. Pickup was smooth and the team was incredibly helpful.", author: "Rahul S.", location: "Delhi", rating: 5 },
              { text: "Rented the KTM 390 for the Manali–Leh route. Zero issues, perfectly serviced, and the gear they provided was a lifesaver!", author: "Priya M.", location: "Mumbai", rating: 5 },
              { text: "Honest pricing, no hidden charges. The local support team is fantastic. Will definitely rent from Motor Land again.", author: "Arjun K.", location: "Bangalore", rating: 5 },
            ].map((r, i) => (
              <div className="review-card" key={i}>
                <p className="review-stars">{"⭐".repeat(r.rating)}</p>
                <p className="review-text">"{r.text}"</p>
                <p className="review-author">{r.author} <span style={{ color: "var(--muted)", fontWeight: 400 }}>— {r.location}</span></p>
              </div>
            ))}
            {reviews.length > 0 && (
              <div style={{ marginTop: "16px" }}>
                {reviews.map((r) => (
                  <div className={`review-card ${removingIds.has(r._id) ? "removing" : ""}`} key={r._id}>
                    <button
                      className={`review-delete-btn ${removingIds.has(r._id) ? "deleting" : ""}`}
                      onClick={() => deleteReview(r._id)}
                      title="Delete review"
                    >
                      🗑 Delete
                    </button>
                    <p className="review-stars">{"⭐".repeat(r.rating)}</p>
                    <p className="review-text">"{r.message}"</p>
                    <p className="review-author">{r.name}</p>
                    <p className="review-date">
                      {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {reviews.length === 0 && (
              <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "16px" }}>
                No community reviews yet — be the first!
              </p>
            )}
          </div>
          <form className="review-form" onSubmit={submitReview}>
            <h3 className="form-title">Share Your Ride</h3>
            <p className="form-sub">Helped by our crew? Tell the next rider.</p>
            <label className="form-label">Your Experience</label>
            <textarea name="message" rows={4} className="form-field" placeholder="How was the bike, the service, the road?" value={form.message} onChange={handleChange} style={{ resize: "none" }} />
            <label className="form-label">Your Name</label>
            <input type="text" name="name" className="form-field" placeholder="e.g. Rahul S." value={form.name} onChange={handleChange} />
            <label className="form-label">Rating</label>
            <select name="rating" value={form.rating} onChange={handleChange} className="form-field">
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Good</option>
              <option value="3">⭐⭐⭐ Average</option>
              <option value="2">⭐⭐ Poor</option>
              <option value="1">⭐ Bad</option>
            </select>
            <button type="submit" className="form-submit" disabled={submitting}>
              {submitting ? "Posting..." : "Post Review"}
            </button>
          </form>
        </div>
      </section>

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