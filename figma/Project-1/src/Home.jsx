import { useState } from "react";

import maskGroup from "./mask-group.png";
import img1 from "./pexels-jabzee-30754176-1.png";
import img2 from "./pexels-mert-celik-1876960105-29154047-1.png";
import img3 from "./pexels-tkmanikuttan-30115817-1.png";
import img4 from "./pexels-jabzee-30754128-1.png";
import img5 from "./pexels-miguel-rivera-2150485053-34275917-1.png";
import img6 from "./pexels-erdem-akil-2158614863-35554079-1.png";

export default function Desktop() {
  const [activeNav, setActiveNav] = useState("Home");

  const navLinks = ["Home", "About Us", "Explore", "Contact Us"];

  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full  backdrop-blur bg-black/40 flex items-center px-6 z-50">
        <h1 className="text-2xl font-bold">TRAVEL</h1>

        <div className="ml-auto flex gap-6">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveNav(link)}
              className={`${
                activeNav === link ? "font-bold" : ""
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="">
        <img
          src={maskGroup}
          alt="hero"
          className="w-full h-screen object-cover"
        />
      </section>

      {/* ABOUT */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl mb-4">About Us</h2>
        <p>
          We are a passionate team of travelers dedicated to exploring the world
          and sharing meaningful experiences. Travel is more than visiting places —
          it's about discovering cultures and stories.
        </p>
      </section>

      {/* EXPLORE */}
      <section className="py-16 px-6">
        <h2 className="text-4xl text-center mb-8">Explore More</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="explore"
              className="w-full  object-cover rounded-lg"
            />
          ))}
        </div>
      </section>
    </div>
  );
}