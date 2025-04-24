import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { presentationSlides } from "../data"; // ตรวจสอบ path ให้ถูก
import type { SlideItem } from "../data";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] },
  },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
// ---------------------------

const ShowPresentSection: React.FC = () => {
  const options: EmblaOptionsType = { loop: true, align: "center" };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section
      id="show-present"
      className="py-20 bg-white font-sans overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2A6C]">
            บริการทันตกรรมของเรา
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div ref={emblaRef} className="overflow-hidden">
            <motion.div
              className="flex"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {presentationSlides.map((slide) => (
                <div
                  className="flex-grow-0 flex-shrink-0 w-full"
                  key={slide.id}
                >
                  <motion.div
                    className="relative aspect-[3/2] bg-white overflow-hidden rounded-2xl shadow-lg"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Background Image with Blur */}
                    <div className="absolute inset-0">
                      <img
                        src={slide.backgroundImage}
                        alt={slide.title}
                        className="w-full h-full object-cover scale-105 blur-sm opacity-70"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/90" />
                    </div>

                    {/* Slide Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
                      <motion.h3
                        className="text-5xl sm:text-6xl font-extrabold text-[#1D2A6C] mb-2"
                        variants={fadeInUp}
                      >
                        {slide.title}
                      </motion.h3>
                      <motion.p
                        className="text-2xl sm:text-3xl font-semibold text-[#1D2A6C] mb-3"
                        variants={fadeInUp}
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.p
                        className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto"
                        variants={fadeInUp}
                      >
                        {slide.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Arrows */}
          <button
            className="absolute top-1/2 left-[-1.5rem] sm:left-[-2rem] -translate-y-1/2 bg-[#1D2A6C] text-white p-3 rounded-full shadow-md hover:bg-blue-900 transition"
            onClick={scrollPrev}
            aria-label="Prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute top-1/2 right-[-1.5rem] sm:right-[-2rem] -translate-y-1/2 bg-[#1D2A6C] text-white p-3 rounded-full shadow-md hover:bg-blue-900 transition"
            onClick={scrollNext}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-3 h-3 rounded-full ${
                  i === selectedIndex ? "bg-[#1D2A6C]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowPresentSection;
