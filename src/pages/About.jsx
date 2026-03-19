import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Motor Land Ladakh" />
        </div>
        <ul>
          <li><Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link></li>
          <li><Link to="/prices" style={{ color: "#fff", textDecoration: "none" }}>Bikes</Link></li>
          <li><Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link></li>
          <li><Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link></li>
        </ul>
      </nav>

      {/* HERO BANNER */}
      <div style={{
        textAlign: "center",
        padding: "80px 20px 40px",
        borderBottom: "2px solid #c0392b",
        background: "linear-gradient(135deg, #1a0000, #0a0a0a)"
      }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "800",
          color: "#fff",
          marginBottom: "12px"
        }}>
          About <span style={{ color: "#e74c3c", fontFamily: "'Rubik Dirt', cursive" }}>
          #MotorLand Ladakh
        </span>
        </h1>
        <p style={{ color: "#888", fontSize: "18px" }}>
          Your trusted ride partner in the Himalayas
        </p>
      </div>

      {/* CONTENT */}
      <div style={{
        maxWidth: "800px",
        margin: "60px auto",
        padding: "0 24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        {[
          {
            icon: "🏍️",
            text: "MotorLand Ladakh is a local bike rental service based in Leh, Ladakh. Our goal is to make your Ladakh journey smooth, safe, and unforgettable."
          },
          {
            icon: "✅",
            text: "We provide well-maintained bikes, transparent pricing, and easy booking through our online system and WhatsApp support."
          },
          {
            icon: "🏔️",
            text: "Whether you want to explore Nubra Valley, Pangong Lake, or Khardung La, we are here to help you ride with confidence."
          }
        ].map((item, i) => (
          <div key={i} style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "18px",
            padding: "32px 28px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
            transition: "0.3s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#c0392b";
              e.currentTarget.style.boxShadow = "0 14px 35px rgba(192,57,43,0.3)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "14px" }}>{item.icon}</div>
            <p style={{ color: "#ccc", fontSize: "17px", lineHeight: "1.8" }}>{item.text}</p>
          </div>
        ))}

        {/* CTA */}
        <a
          href="https://wa.me/919797545493?text=Hi,%20I%20want%20to%20book%20a%20bike%20in%20Ladakh"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "20px",
            display: "inline-block",
            background: "#c0392b",
            color: "#fff",
            padding: "14px 36px",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "16px",
            textDecoration: "none",
            transition: "0.3s",
            alignSelf: "center"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#a93226";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "#c0392b";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Book a Ride on WhatsApp
        </a>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© DrukTechnologies@2026. All rights reserved.</p>
      </footer>
    </div>
  );
}