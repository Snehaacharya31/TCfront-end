import { useParams, useNavigate } from "react-router-dom";
import "./EventDetails.css";

function EventDetails() {

  const { eventName } = useParams();
  const navigate = useNavigate();

 const handleBookNow = () => {
  const loggedUser = localStorage.getItem("loggedInUser");

  if (!loggedUser) {
    
    localStorage.setItem("redirectAfterLogin", `/slots/${eventName}`);
    navigate("/login");
    return;
  }

  navigate(`/slots/${eventName}`);
};
  const eventData = {
    Wedding: {
      price: "₹40,000 - ₹80,000",
      description:
        "Capture your special wedding moments with professional photography and cinematic videography. Our wedding event services provide a complete celebration experience, covering every beautiful moment from  Haldi, Mehendi, and Sangeeth to the Wedding ceremony and Reception. We offer professional planning, elegant decoration, photography, and coordinated event management to ensure each function is memorable and stress-free. Our team focuses on creating a joyful and well-organized celebration, allowing families and guests to enjoy every tradition and special moment with comfort and style.",

      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    },

    Birthday: {
      price: "₹10,000 - ₹30,000",
      description:
        "Make your birthday celebration memorable with creative photography sessions.Make your birthday celebration truly special with our complete event planning services. We provide creative decorations, themed setups, photography, entertainment arrangements, and venue management to ensure a joyful and memorable birthday experience for you and your guests.",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    },

    Babyphotoshoot: {
      price: "₹8,000 - ₹25,000",
      description:
        "Cute and creative baby photoshoots with professional props and studio lighting.Capture the precious moments of your baby’s early life with our professional baby photography services. We offer creative setups, safe and comfortable environments, and high-quality photography to create beautiful memories that families can cherish forever.",
      image:
        "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=1200&q=80",
    },

    Prewedding: {
      price: "₹20,000 - ₹60,000",
      description:
        "Romantic outdoor and cinematic pre-wedding shoots at beautiful locations.Celebrate your love story with our professional pre-wedding and post-wedding event services. We offer beautiful locations, creative photography setups, elegant decorations, and well-planned arrangements to capture and celebrate every precious moment of your journey together.",
      image:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",

    },

    Postwedding: {
      price: "₹25,000 - ₹30,000",
      description:
        "Elegant post-wedding traditional and modern couple photography sessions.Celebrate your love story with our professional pre-wedding and post-wedding event services. We offer beautiful locations, creative photography setups, elegant decorations, and well-planned arrangements to capture and celebrate every precious moment of your journey together.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    },

    Engagement: {
      price: "₹20,000 - ₹40,000",
      description:
        "Memorable engagement photography capturing your special moments beautifully.Celebrate the beginning of a beautiful journey with our professional engagement event services. We provide elegant decorations, photography, and well-coordinated planning to make your engagement ceremony memorable and joyful for you and your loved ones.",
      image:
        "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",

    },

    Babyshower: {
      price: "₹10,000 - ₹20,000",
      description:
        "Professional stage show and live event photography coverage.Welcome the upcoming arrival of your little one with a beautifully organized baby shower celebration. Our team provides creative theme decorations, and complete event coordination to make this special occasion joyful and memorable.",
      image:
        "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80",
    },
    Corporate:{
      price:"₹20,000 - ₹35,000",
      description:"Professional photography for corporate events capturing key business moments.Our corporate event services are designed to deliver professional and well-organized business gatherings. From conferences and meetings to company celebrations, we provide venue arrangements, stage setup, technical support, and complete event coordination to ensure a successful and impressive corporate experience.",
      image:
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1200&q=80",
    },
    

    Other: {
      price: "Custom Pricing",
      description:
        "Customized photography packages tailored to your specific event requirements.",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80",
    },
  };
const event = eventData[eventName];

  if (!event) {
    return <h2 style={{ textAlign: "center" }}>Event Not Found</h2>;
  }

  return (

    <div className="details-container">

      <div className="glass-card">

        <div className="glass-content">

          <h2>{eventName}  </h2>

          <p>{event.description}</p>

          <h3 className="price">
            Starting Price: {event.price}
          </h3>

          <button
            className="book-btn"
            onClick={handleBookNow}
          >
            Book Now
          </button>

        </div>

      </div>

    </div>

  );

}

export default EventDetails;