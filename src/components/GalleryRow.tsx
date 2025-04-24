// --- Component: GalleryRow (จำกัดระยะ + รูปใหญ่ + Fade) ---
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface GalleryRowProps {
  images: string[];
  reverse?: boolean;
}

const GalleryRow: React.FC<GalleryRowProps> = ({ images, reverse = false }) => {
  const { scrollYProgress } = useScroll();
  // จำกัดระยะเลื่อน X
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [50, -150] : [-150, 50],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-2, 0] : [0, -2],
  ); // ลดการหมุนลงอีก

  return (
    // เพิ่ม initial, whileInView ให้ทั้งแถว เพื่อทำ Fade In
    <motion.div
      style={{ x, rotate }} // ยังคงเลื่อนและหมุน
      className="flex gap-6 lg:gap-8 py-4 justify-center" // << เพิ่ม Gap, py
      initial={{ opacity: 0 }} // << เริ่มต้นจางๆ
      whileInView={{ opacity: 1 }} // << ค่อยๆ ชัดขึ้นเมื่อเห็น
      viewport={{ amount: 0.2, once: true }} // << กำหนดการแสดงผล (amount น้อยๆ จะ fade เร็ว)
      transition={{ duration: 0.5 }} // << ความเร็วในการ Fade
    >
      {images.map((image, index) => (
        <motion.div
          key={`gallery-${reverse ? "b" : "t"}-${index}`}
          // *** เพิ่มขนาดรูป w-... h-... หรือ aspect-... ***
          className="flex-none w-[300px] lg:w-[360px] aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl bg-gray-100" // << เพิ่มขนาด + Style
          whileHover={{ scale: 1.03, y: -5 }} // << Hover effect
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
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
// export default GalleryRow; // ถ้าแยกไฟล์
