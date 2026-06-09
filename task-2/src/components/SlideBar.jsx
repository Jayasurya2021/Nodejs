import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "Future Built Beautifully",
    subtitle: "Architecture Beyond Expectations",
    desc:
      "Timeless spaces engineered with premium design language and modern elegance.",
    button: "Explore Projects",
    img:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2"
  },

  {
    id: 2,
    title: "Living With Intelligence",
    subtitle: "Connected Smart Experiences",
    desc:
      "Technology blends seamlessly into premium lifestyle ecosystems.",
    button: "View Innovation",
    img:
      "https://images.unsplash.com/photo-1494526585095-c41746248156"
  },

  {
    id: 3,
    title: "Luxury Meets Sustainability",
    subtitle: "Designed For Tomorrow",
    desc:
      "Environment-first spaces crafted with cinematic architecture.",
    button: "See Vision",
    img:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
  },
];

const slideAnimation = {
  0: {
    content: {
      hidden: {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)"
      },
      visible: {
        opacity: 1,
        clipPath: "inset(0)"
      }
    },

    image: {
      scale: [1.15, 1]
    }
  },

  1: {
    content: {
      hidden: {
        opacity: 0,
        x: -120
      },
      visible: {
        opacity: 1,
        x: 0
      }
    },

    image: {
      clipPath: [
        "inset(0 50% 0 50%)",
        "inset(0)"
      ]
    }
  },

  2: {
    content: {
      hidden: {
        opacity: 0,
        scale: .9
      },

      visible: {
        opacity: 1,
        scale: 1
      }
    },

    image: {
      scale: [1.2, 1],
      filter: [
        "brightness(.7)",
        "brightness(1.1)"
      ]
    }
  }
};

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-screen">

      <Swiper
        loop
        speed={1800}
        effect="fade"

        navigation

        modules={[
          Navigation,
          EffectFade,
          Pagination,
          Autoplay
        ]}

        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}

        pagination={{
          clickable: true
        }}

        onSlideChange={(e) =>
          setActive(e.realIndex)
        }

      >

        {slides.map((slide, index) => (

          <SwiperSlide key={slide.id}>

            <motion.div
              className="absolute inset-0"

              animate={{
                ...slideAnimation[index].image
              }}

              transition={{
                duration: 2.4
              }}
            >

              <motion.img
                src={slide.img}
                className="
                w-full
                h-full
                object-cover
                will-change-transform
                "
              />

              <div
                className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black/70
              via-black/20
              to-transparent
              "
              />

            </motion.div>

            <div
              className="
            h-screen
            flex
            items-center
            px-8
            md:px-24
            "
            >

              <AnimatePresence mode="wait">

                {active === index && (

                  <motion.div
                    key={slide.id}
                    variants={slideAnimation[index].content}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 60 }}
                    transition={{ staggerChildren: .18, duration: 1 }}
                    className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[32px] text-white flex flex-col justify-center items-start"
                    style={{
                      padding: '38px 34px',
                      gap: '14px'
                    }}
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-[700px] mt-[16px] leading-[1.7]"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.h1
                      className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-[900px] leading-[1.05] mb-[20px]"
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      className="text-white/80 max-w-[700px] leading-[1.7] text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {slide.desc}
                    </motion.p>

                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: .95 }}
                      initial={{ scale: .8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-[36px] px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide"
                    >
                      {slide.button}
                    </motion.button>
                  </motion.div>

                )}

              </AnimatePresence>

            </div>

            {/* Progress Line */}

            {active === index && (

              <motion.div

                className="
              absolute
              bottom-0
              left-0
              h-[3px]
              bg-white
              "

                initial={{
                  width: "0%"
                }}

                animate={{
                  width: "100%"
                }}

                transition={{
                  duration: 5,
                  ease: "linear"
                }}

              />

            )}

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  );
}