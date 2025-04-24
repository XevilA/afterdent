// src/components/ShowPresentSection.tsx
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons สำหรับปุ่ม
// --- Import ข้อมูล Slides และ Type ---
import { presentationSlides } from "../data"; // << ตรวจสอบ Path
import type { SlideItem } from "../data"; // << ตรวจสอบ Path

// --- Animation Variants (ถ้าต้องการ) ---
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
// ------------------------------------

const ShowPresentSection: React.FC = () => {
  const options: EmblaOptionsType = { loop: true, align: "center" }; // ตั้งค่า Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
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
      className="py-16 md:py-20 bg-gray-50 font-sans overflow-hidden"
    >
      {" "}
      {/* พื้นหลังเทาอ่อน */}
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header (จัดกลาง) */}
        <motion.div
          className="text-center mb-10 md:mb-14 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {" "}
            {/* สีเข้ม */}
            บริการทันตกรรมของเรา
          </h2>
        </motion.div>
        {/* Carousel */}
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden rounded-2xl shadow-lg" ref={emblaRef}>
            {/* Embla Container */}
            <div className="flex">
              {presentationSlides.map((slide) => (
                // Embla Slide
                <div
                  className="flex-grow-0 flex-shrink-0 w-full"
                  key={slide.id}
                >
                  {/* Slide Content */}
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/7] bg-gray-200">
                    {/* Background Image */}
                    <img
                      src={slide.backgroundImage}
                      alt={`${slide.title} Background`}
                      className="absolute inset-0 w-full h-full object-cover opacity-40" // << ปรับ Opacity
                      loading="lazy"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/10">
                      {" "}
                      {/* << Overlay ดำจางๆ */}
                      <motion.h3
                        // Title Gradient (Blue-Purple)
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-2 sm:mb-3
                                   bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent"
                        style={{
                          WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                        }} // << เพิ่ม Stroke ขาวบางๆ
                      >
                        {slide.title}
                      </motion.h3>
                      <motion.p
                        className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-900 mb-2 sm:mb-4"
                        style={{
                          textShadow: "0 1px 2px rgba(255,255,255,0.5)",
                        }}
                      >
                        {" "}
                        {/* << สีเข้ม + เงา */}
                        {slide.subtitle}
                      </motion.p>
                      <motion.p className="text-xs sm:text-sm text-gray-700 max-w-xs sm:max-w-sm md:max-w-md">
                        {slide.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md disabled:opacity-50 transition"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          <button
            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md disabled:opacity-50 transition"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === selectedIndex
                    ? "bg-teal-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* View All Button (Optional) */}
          <div className="text-center mt-8">
            <a
              href="/services" // << ลิงก์ไปหน้า Services รวม (ถ้ามี)
              className="inline-block bg-blue-900 text-white text-sm font-medium py-2.5 px-6 rounded-md shadow hover:bg-blue-800 transition-colors"
            >
              ดูทั้งหมด
            </a>
          </div>
        </div>{" "}
        {/* End of Relative Container for Carousel */}
      </div>{" "}
      {/* End of Main Container */}
    </section>
  );
};

export default ShowPresentSection; // <<< Export Component
