// src/components/EventCarousel.jsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

const events = [
    {
        title: 'UNIZIK BUILD WITH SUI',
        description: 'Day 1 - Workshop Session ',
        image: 'https://drive.google.com/thumbnail?id=1yt1ldJQhSH_Knqw4icswTGOpDz7ty1lo&sz=w1000',
      },
      {
        title: 'UNIZIK BUILD WITH SUI',
        description: 'Day 2 - Workshop Session and Hacking.',
        image: 'https://drive.google.com/thumbnail?id=1dZA6sQ2CDkdnhNVtTj8jFWR3l-q5cCHq&sz=w1000',
      },
      {
        title: 'UNIZIK BUILD WITH SUI',
        description: 'Day 3 - Meet up.',
        image: 'https://drive.google.com/thumbnail?id=1dZA6sQ2CDkdnhNVtTj8jFWR3l-q5cCHq&sz=w1000',
      },
  {
    title: 'UNIUYO BUILDERTHON',
    description: 'Team Lead Addressing the hackers',
    image: 'https://drive.google.com/thumbnail?id=1s5l0E0yQ8PSLFlN0_wsHYTW-nJUP7X9J&sz=w1000',
  },
  {
    title: 'UNIUYO BUILDERTHON',
    description: 'Dev-Rel providing support to hackers',
    image: 'https://drive.google.com/thumbnail?id=1WzGdArdBIZf78mGlecefbx2Fnb5848iu&sz=w1000',
  },
  {
    title: 'UNIUYO BUILDERTHON',
    description: 'UNIUYO BUIDERTHON Winner Hackers',
    image: 'https://drive.google.com/thumbnail?id=1EpSvirrjPOxiWVU-y9W5BCOvdNEbTUWv&sz=w1000',
  },
  {
    title: 'Hacker-House Abuja',
    description: 'Brain Storming and intense coding section',
    image: 'https://drive.google.com/thumbnail?id=1vcpMozDj-Z4U3KOBzoJ25GponDdPGWsS&sz=w1000',
  },
  {
    title: 'Hacker-House Abuja',
    description: 'Last Day at the Hacker-House Abuja',
    image: 'https://drive.google.com/thumbnail?id=176A9XhWldXkNRKwqWB-DcaUVwmA86ay9&sz=w1000',
  },
];

export default function EventCarousel() {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 mt-4 sm:mt-8 md:mt-10 lg:mt-20 pt-20">
      <h2 className="text-3xl font-bold text-center mb-8">Highlights</h2>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className=" mySwiper bg-transparent"
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex justify-center items-center bg-transparent rounded-xl overflow-hidden h-[500px] w-full">
              {/* Whitesmoke shimmer */}
              {!loadedImages[index] && (
                <div
                  className="absolute inset-0 z-10 bg-shimmer-white bg-[length:200%_100%] animate-shimmer rounded-xl"
                />
              )}

              {/* Image */}
              <img
                src={event.image}
                alt={event.title}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageLoad(index)}
                className={`max-h-full w-auto object-contain rounded-xl transition-opacity duration-500 ${
                  loadedImages[index] ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Overlay Text */}
              {loadedImages[index] && (
                <div className="hidden md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-opacity-50 bg-black px-4 py-2 rounded z-20">
                  <p className="text-xl font-bold">{event.title}</p>
                  <p className="text-sm">{event.description}</p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
