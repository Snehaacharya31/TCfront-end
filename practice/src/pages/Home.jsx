import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <div className="hero">
        <div className="overlay">

          <h1 className="title">
            📸 Capture your beautiful moments with us
          </h1>

          <p className="subtitle">
            We turn moments into beautiful memories , Capturing life's magical moments ✨
          </p>
          <p className="subtitle">

  Every smile, every glance, every emotion preserved forever.<br />
  Memories that tell your story, beautifully framed.<br />
  Where moments become art, and memories last a lifetime.
</p>

          <Link to="/events">
            <button className="hero-btn">View Events</button>
          </Link>

        </div>
      </div>

      <div className="services-section">

        <h2>✨ Our Services</h2>

        <div className="services-grid">
          <div className="service-card">💍 Wedding Photography</div>
          <div className="service-card">📷 Post Wedding</div>
          <div className="service-card">🎂 Birthday Events</div>
          <div className="service-card">📷 Pre Wedding</div>
          <div className="service-card">👶 Baby Shoot</div>
          <div className="service-card">📷 Baby shower</div>
          <div className="service-card">🏢 Corporate Events</div>
          <div className="service-card">💑 Engagement</div>
          <div className="service-card">📷 others</div>
        </div>

      </div>

      
      <div className="home-footer">
        <p>© 2026 Trinity'S Captures</p>
        <p>📞 Contact: +91 9606490457,
                +91 9606532254,
                +91 7975378024. </p>
        <p>📍 Aripady complex, college road Ujire, Belthangady, DK-574 240</p>
      </div>

    </div>
  );
}

export default Home;