import "./Gallery.css";
import wed3 from "../assets/wed3.jpg";
import wed2 from "../assets/wed2.jpg";
import baby from "../assets/baby.jpg";
import wed4 from "../assets/wed4.jpg";
import pre from "../assets/pre.jpg";
import post from "../assets/post.jpg";
import show from "../assets/show.jpg";
import birthday from "../assets/birthday.jpg";
import mehandi from "../assets/mehandi.jpg";
import wed5 from "../assets/wed5.jpg";
import wedding from "../assets/wedding.jpg";

import wed7 from "../assets/wed7.jpg";
import rec1 from "../assets/rec1.jpg";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";
import p8 from "../assets/p8.jpg";
import p9 from "../assets/p9.jpg";
import p11 from "../assets/p11.jpg";
import p12 from "../assets/p12.jpg";
import p13 from "../assets/p13.jpg";
import p14 from "../assets/p14.jpg";

function Gallery() {

  const galleryItems = [
    { type: "image", src: p2 },
    { type: "image", src: wed2 },
      { type: "image", src: p1},
    { type: "image", src: wed3 },
    { type: "image", src: p3 },
    { type: "image", src: p4 },
    { type: "image", src: wed4 },
    { type: "image", src: p5 },
    { type: "image", src: wed5 },
    { type: "image", src: p6 },
    { type: "image", src: wed7 },
    { type: "image", src: p7 },
    { type: "image", src: rec1 },
    { type: "image", src: p8 },
    { type: "image", src: pre },
    { type: "image", src: p9 },
    { type: "image", src: post },
    { type: "image", src: p13 },
    { type: "image", src: wedding },
    { type: "image", src: p11 },
    { type: "image", src: show },
    { type: "image", src: p14 },
    { type: "image", src: birthday },
    { type: "image", src: p12 },
    { type: "image", src: mehandi },
   
    { type: "video", src: video1 },
    { type: "image", src: baby },
    { type: "video", src: video2 },
       
       

   
  ];

  return (
    <div className="gallery">
      <h1>Our Work Gallery</h1>

      <div className="gallery-container">
        {galleryItems.map((item, index) => (
          <div className="gallery-item" key={index}>

            {item.type === "image" ? (
              <img src={item.src} alt="gallery" />
            ) : (
              <video controls>
                <source src={item.src} type="video/mp4" />
                Your browser does not support video.
              </video>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;