import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Contact() {
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
        <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#fff", marginBottom: "12px" }}>
          Contact <span style={{ color: "#e74c3c" }}>Us</span>
        </h1>
        <p style={{ color: "#888", fontSize: "18px" }}>
          We're here to help you plan your perfect Ladakh ride
        </p>
      </div>

      {/* CONTACT CARDS */}
      <div style={{
        maxWidth: "800px",
        margin: "60px auto",
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        {[
          { icon: "📍", label: "Location", value: "Leh, Ladakh" },
          { icon: "📞", label: "Phone / WhatsApp", value: "+91 70518 29813" },
          { icon: "✉️", label: "Email", value: "motorlandladakh@gmail.com" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "18px",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
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
            <span style={{ fontSize: "36px" }}>{item.icon}</span>
            <div>
              <p style={{ color: "#e74c3c", fontWeight: "600", fontSize: "14px", marginBottom: "4px" }}>
                {item.label}
              </p>
              <p style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>{item.value}</p>
            </div>
          </div>
        ))}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/917051829813?text=Hi%20I%20want%20to%20book%20a%20bike"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "10px",
            display: "block",
            textAlign: "center",
            background: "#25d366",
            color: "#fff",
            padding: "16px",
            borderRadius: "14px",
            fontWeight: "700",
            fontSize: "18px",
            textDecoration: "none",
            boxShadow: "0 8px 20px rgba(37,211,102,0.3)",
            transition: "0.3s"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#1ebe5d";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "#25d366";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          💬 Message on WhatsApp
        </a>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© JullayTech@2026. All rights reserved.</p>
      </footer>
    </div>
  );
}
