import heroImg from "./assets/hero.jpg";
import himalayan from "./assets/bikes/himalayan.jpg";
import classic350 from "./assets/bikes/classic350.jpg";
import ktm390 from "./assets/bikes/ktm390.jpg";
import scooter from "./assets/bikes/scooter.jpg";
import logo from "./assets/logo.png";
import { useState } from "react";




import "./index.css";

export default function App() {
  const [openBike, setOpenBike] = useState(null);
  return (
    <>
      {/* NAVBAR */}
    <nav className="navbar">
  <div className="logo">
    <img src={logo} alt="Motor Land Ladakh" />
  </div>

  <ul>
    <li>Home</li>
    <li>Bikes</li>
    <li>Prices</li>
    <li>About</li>
    <li>Contact</li>
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

    <button className="secondary">Check Bike Prices</button>
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
        price: "₹2,500 / day",
      },
      {
        name: "Classic 350",
        img: classic350,
        price: "₹1,800 / day",
      },
      {
        name: "KTM Adventure 390",
        img: ktm390,
        price: "₹3,200 / day",
      },
      {
        name: "Scooter",
        img: scooter,
        price: "₹800 / day",
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
      <div className="review-box">
          <h3>Share Your Experience</h3>
          <textarea placeholder="Write your review here..." rows="5">
          </textarea>
          <input type="text" placeholder="Your Name"/>
          <input type="email" placeholder="Your Email"/>
          <button type="submit">Post Review</button>
      </div>

        <div className="contact-box">
          <h3>Motor Land Ladakh</h3>
          <p>Changspa Road, Leh, Ladakh</p>
          <a href="https://wa.me/917051829813">📞 Call / WhatsApp</a>
        </div>
      </section>
    </>
  );
}
