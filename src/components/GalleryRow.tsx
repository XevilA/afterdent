// src/components/GalleryRow.tsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
interface GalleryRowProps {
  images: string[];
  reverse?: boolean;
}
const GalleryRow: React.FC<GalleryRowProps> = ({ images, reverse = false }) => {
  const { scrollYProgress } = useScroll();
  // *** ลดระยะเลื่อน ***
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [50, -150] : [-150, 50],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-3, 0] : [0, -3],
  );
  return (
    <motion.div
      style={{ x, rotate }}
      className="flex gap-4 lg:gap-6 py-2 justify-center"
    >
      {images.map((image, index) => (
        <motion.div
          key={`gallery-<span class="math-inline">\{reverse ? 'b' \: 't'\}\-</span>{index}`}
          className="flex-none w-[240px] lg:w-[280px] aspect-[4/5] rounded-xl ..."
        >
          <img
            src={image}
            alt={`Gallery ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default GalleryRow;
