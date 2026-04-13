import { Link } from "react-router-dom";
import wedding from "../assets/wedding.jpg";
import birthday from "../assets/birthday.jpg";
import other from "../assets/other.jpg";
import baby from "../assets/baby.jpg";
import pre from "../assets/pre.jpg";
import post from "../assets/post.jpg";
import engagement from "../assets/engagement.jpg";
import show from "../assets/show.jpg";
import IT from "../assets/IT.jpg";
import "./Events.css";

function Events() {
const events = [
  {
    id: 1,
    name: "Wedding",
    slug: "Wedding",
    description: "Complete wedding photography with cinematic style.",
    image: wedding,
  },
  {
    id: 2,
    name: "Birthday",
    slug: "Birthday",
    description: "Colorful birthday photography coverage.",
    image: birthday,
  },
  {
    id: 3,
    name: "Baby Photoshoot",
    slug: "Babyphotoshoot",
    description: "Cute and creative baby photoshoot sessions.",
    image: baby,
  },
  {
    id: 4,
    name: "Pre Wedding",
    slug: "Prewedding",
    description: "Romantic pre-wedding outdoor photography.",
    image: pre,
  },
  {
    id: 5,
    name: "Post Wedding",
    slug: "Postwedding",
    description: "Traditional and modern post-wedding shoot.",
    image: post,
  },
  {
    id: 6,
    name: "Engagement",
    slug: "Engagement",
    description: "Memorable engagement photography.",
    image: engagement,
  },
  {
    id: 7,
    name: "Baby Shower",
    slug: "Babyshower",
    description: "Baby shower event photography coverage.",
    image: show,
  },
  {
    id: 8,
    name: "Corporate Events",
    slug: "Corporate",
    description:
      "Professional photography for corporate events capturing key business moments.",
    image: IT,
  },
  {
    id: 9,
    name: "Other",
    slug: "Other",
    description: "Custom event photography packages.",
    image: other,
  },
];

  return (
    <div className="events-container">
      <h2 className="events-title">  📸 Events</h2>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.image} alt={event.name} />
            <h3>{event.name}</h3>
            <p>{event.description}</p>

          
           <Link to={`/event/${event.slug}`}>
           <button className="view-btn">View Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;