import himalayan from "../assets/bikes/himalayan.jpg";
import classic350 from "../assets/bikes/classic350.jpg";
import ktm390 from "../assets/bikes/ktm390.jpg";
import scooter from "../assets/bikes/scooter.jpg";


export default function Prices() {

  const bikes = [
    { name: "Himalayan 450", img: himalayan, price: "₹3,500", tag: "Most Popular" },
    { name: "Himalayan 411", img: classic350, price: "₹2,800", tag: "Best Comfort" },
    { name: "KTM Adventure 390", img: ktm390, price: "₹3,500", tag: "For High Passes" },
    { name: "Royal Enfield", img: scooter, price: "₹2200", tag: "City Ride" },
  ];

  return (
    <div className="prices-page">

      {/* Banner */}
      <div className="price-hero">
        <h1>Bike Rental Prices</h1>
        <p>Transparent pricing. No hidden charges. Ride across Ladakh freely.</p>
      </div>

      {/* Cards */}
      <div className="price-grid">
        {bikes.map((bike) => (
          <div className="price-card" key={bike.name}>

            <div className="img-wrapper">
              <img src={bike.img} alt={bike.name} />
              <span className="tag">{bike.tag}</span>
            </div>

            <div className="card-body">
              <h2>{bike.name}</h2>

              <div className="price">
                <span className="amount">{bike.price}</span>
                <span className="day">/ day</span>
              </div>

              <button
                className="book-btn"
                onClick={() => {
                    const phone = "917051829813"; // replace with your WhatsApp number including country code
                    const message = `I want to rent the ${bike.name}`;
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                    window.open(url, "_blank");
                }}
                >
                Book Now
                </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
