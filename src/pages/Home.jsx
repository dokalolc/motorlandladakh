import heroImg from "../assets/hero.jpg";
import himalayan from "../assets/bikes/himalayan.jpg";
import classic350 from "../assets/bikes/classic350.jpg";
import ktm390 from "../assets/bikes/ktm390.jpg";
import scooter from "../assets/bikes/scooter.jpg";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {

  const [openBike, setOpenBike] = useState(null);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    message: ""
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setReviews([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "rating" ? Number(value) : value
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, form);
      setForm({ name: "", rating: 5, message: "" });
      fetchReviews();
    } catch (err) {
      alert("Server not running");
    }
  };

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

      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-content">
          <h1>Explore Ladakh on Two Wheels</h1>
          <p>Reliable Bike Rentals | Easy Booking | Best Prices</p>
          <div className="hero-buttons">
            <a
              href="https://wa.me/917051829813?text=Hi,%20I%20want%20to%20book%20a%20bike%20in%20Ladakh"
              target="_blank"
              rel="noopener noreferrer"
              className="primary"
            >
              Book Your Bike Now
            </a>
            <Link to="/prices" className="secondary">
              Check Bike Prices
            </Link>
          </div>
        </div>
      </section>

      {/* BIKES */}
      <section style={{ padding: "80px 90px", textAlign: "center" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "800", marginBottom: "50px", color: "#fff" }}>
          Our Bikes
        </h2>
        <div className="bikes">
          {[
            { name: "Himalayan 450", img: himalayan, price: "₹3500 / day" },
            { name: "Himalayan 411", img: classic350, price: "₹2,800 / day" },
            { name: "KTM Adventure 390", img: ktm390, price: "₹3,200 / day" },
            { name: "Royal Enfield 350", img: scooter, price: "₹2200 / day" },
          ].map((bike) => (
            <div
              key={bike.name}
              onClick={() => setOpenBike(openBike === bike.name ? null : bike.name)}
              style={{
                background: "#1a1a1a",
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid #2a2a2a",
                boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
                transition: "0.35s",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 45px rgba(192,57,43,0.35)";
                e.currentTarget.style.borderColor = "#c0392b";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.5)";
                e.currentTarget.style.borderColor = "#2a2a2a";
              }}
            >
              <img src={bike.img} alt={bike.name} className="bike-img" style={{ borderRadius: 0 }} />
              <div style={{ padding: "16px" }}>
                <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>{bike.name}</h3>
                {openBike === bike.name && (
                  <div style={{ marginTop: "10px", color: "#e74c3c", fontWeight: "700", fontSize: "19px" }}>
                    {bike.price}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="why">
        <h2>Why Ride with Us?</h2>
        <div>✔ Ladakh Registered Bikes</div>
        <div>✔ Free Helmets & Gear</div>
        <div>✔ Reserve via WhatsApp</div>
        <div>✔ Local Expert Support</div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 90px", textAlign: "center" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "800", marginBottom: "50px", color: "#fff" }}>
          How It Works
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}>
          {[
            "1️⃣ Choose Your Bike",
            "2️⃣ Confirm Dates",
            "3️⃣ Direct WhatsApp",
            "4️⃣ Drop at your desired location"
          ].map((step) => (
            <div key={step} style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              padding: "22px",
              borderRadius: "14px",
              fontWeight: "500",
              color: "#fff",
              boxShadow: "0 5px 14px rgba(0,0,0,0.4)"
            }}>
              {step}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{
        padding: "80px 90px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px"
      }}>

        {/* Existing + Dynamic Reviews */}
        <div>
          <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "30px", color: "#e74c3c" }}>
            What Our Riders Say
          </h2>
          {[
            { text: "Great experience! Well-maintained bikes and amazing service.", author: "Rahul S., Delhi" },
            { text: "Best way to explore Ladakh. Highly recommended!", author: "Priya M., Mumbai" },
          ].map((r, i) => (
            <div key={i} style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              padding: "20px",
              borderRadius: "14px",
              marginBottom: "16px",
              color: "#ddd",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
            }}>
              <p>"{r.text}"</p>
              <p style={{ color: "#e74c3c", fontWeight: "600", marginTop: "10px" }}>— {r.author}</p>
            </div>
          ))}

          <div style={{ marginTop: "30px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px", color: "#fff" }}>
              Customer Reviews
            </h3>
            {reviews.length === 0 ? (
              <p style={{ color: "#888" }}>No reviews yet. Be the first rider!</p>
            ) : (
              reviews.map((r) => (
                <div key={r._id} style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  padding: "20px",
                  borderRadius: "14px",
                  marginBottom: "14px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
                }}>
                  <h4 style={{ color: "#fff", fontWeight: "700" }}>{r.name}</h4>
                  <p style={{ fontSize: "12px", color: "#666" }}>{new Date(r.createdAt).toLocaleDateString()}</p>
                  <p style={{ color: "#f59e0b", margin: "6px 0", fontSize: "18px" }}>{"⭐".repeat(r.rating)}</p>
                  <p style={{ color: "#ccc" }}>{r.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={submitReview} style={{
          background: "#1a1a1a",
          padding: "30px",
          borderRadius: "18px",
          border: "1px solid #2a2a2a",
          boxShadow: "0 14px 35px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignSelf: "start"
        }}>
          <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#fff", textAlign: "center" }}>
            Share Your Experience
          </h3>

          <textarea
            name="message"
            rows="5"
            placeholder="Tell others about your ride experience..."
            value={form.message}
            onChange={handleChange}
            style={{
              padding: "14px", borderRadius: "10px",
              border: "1px solid #333", background: "#111",
              color: "#fff", fontSize: "14px", outline: "none", resize: "none"
            }}
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={{
              padding: "14px", borderRadius: "10px",
              border: "1px solid #333", background: "#111",
              color: "#fff", fontSize: "14px", outline: "none"
            }}
          />
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            style={{
              padding: "14px", borderRadius: "10px",
              border: "1px solid #333", background: "#111",
              color: "#fff", fontSize: "14px", outline: "none"
            }}
          >
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Bad</option>
          </select>

          <button
            type="submit"
            style={{
              background: "#c0392b",
              color: "#fff",
              padding: "13px",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.25s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#a93226"}
            onMouseLeave={e => e.currentTarget.style.background = "#c0392b"}
          >
            Post Review
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© DrukTechnologies@2026. All rights reserved.</p>
      </footer>

    </div>
  );
}