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
      setReviews(res.data);
    } catch (err) {
      console.log(err);
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
    <>
      <>
      {/* NAVBAR */}
 <nav className="navbar">
  <div className="logo">
    <img src={logo} alt="Motor Land Ladakh" />
  </div>

  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/prices">Bikes</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/contact">Contact</Link></li>
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
  {/* BIKES */}
<section className="section">
  <h2>Our Bikes</h2>

  <div className="bikes">
    {[
      {
        name: "Himalayan 450",
        img: himalayan,
        price: "₹3500 / day",
      },
      {
        name: "Himalayan 411",
        img: classic350,
        price: "₹2,800 / day",
      },
      {
        name: "KTM Adventure 390",
        img: ktm390,
        price: "₹3,200 / day",
      },
      {
        name: "Royal Enfield 350",
        img: scooter,
        price: "₹2200 / day",
      },
    ].map((bike) => (
      <div
        className="bike-card"
        key={bike.name}
        onClick={() =>
          setOpenBike(openBike === bike.name ? null : bike.name)
        }
      >
        <img
          src={bike.img}
          alt={bike.name}
          className="bike-img"
        />
        <h3>{bike.name}</h3>

        {openBike === bike.name && (
          <div className="bike-price">
            {bike.price}
          </div>
        )}
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
       <section className="section">
              <h2>How It Works</h2>
              <div className="steps">
                <div>1️⃣ Choose Your Bike </div>
                <div>2️⃣ Confirm Dates </div>
                <div>3️⃣ Direct WhatsApp</div>
                <div>3️⃣ Drop at your desired location</div>
             </div>
        </section>


      {/* TESTIMONIAL + MAP */}
      <section className="testimonial">
  <div className="existing-reviews">
    <h2>What Our Riders Say</h2>
    <p>
      “Great experience! Well-maintained bikes and amazing service.”
      <br />— Rahul S., Delhi
    </p>
    <p>
      “Best way to explore Ladakh. Highly recommended!”
      <br />— Priya M., Mumbai
    </p>
  </div>

  {/* Review Form */}
<form className="review-box" onSubmit={submitReview}>
  <h3>Share Your Experience</h3>

  <textarea
  name="message"
  rows="5"
  placeholder="Tell others about your ride experience..."
  value={form.message}
  onChange={handleChange}
/>


  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={form.name}
    onChange={handleChange}
  />

  <select
  name="rating"
  value={form.rating}
  onChange={handleChange}
>
  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
  <option value="4">⭐⭐⭐⭐ Good</option>
  <option value="3">⭐⭐⭐ Average</option>
  <option value="2">⭐⭐ Poor</option>
  <option value="1">⭐ Bad</option>
</select>


  <button type="submit">Post Review</button>
</form>

{/* Display Reviews */}
<div className="reviews-display">
  <h2>Customer Reviews</h2>

  {reviews.length === 0 ? (
    <p>No reviews yet. Be the first rider!</p>
  ) : (
    reviews.map((r) => (
      <div className="review-card" key={r._id}>
        <h4>{r.name}</h4>
        <p className="date">
  {new Date(r.createdAt).toLocaleDateString()}
</p>

<p className="stars">
  {"⭐".repeat(r.rating)}
</p>

<p>{r.message}</p>

      </div>
    ))
  )}
</div>

      </section>
    </>
  {/* FOOTER */}
  <footer className="footer">
    <p>© JullayTech@2026. All rights reserved.</p>
  </footer>
    </>
  );
}
