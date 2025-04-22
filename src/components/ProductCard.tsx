// src/components/ProductCard.tsx

import React, { useEffect, useState } from "react"; // <<< เพิ่ม useState ถ้าจะใช้ isMobile check
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingCart } from "lucide-react"; // <<< Import ไอคอนรถเข็น
import type { Product } from "../data"; // <<< Import Product type (ตรวจสอบ Path)

// --- Animation Variants (อาจจะย้ายไปไฟล์รวม variants.ts แล้ว import มา) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const cardHover = {
  // Hover effect ที่ลดลงแล้ว (ถ้าไม่ต้องการ ให้ลบ whileHover ออก)
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeOut" },
};
// -----------------------------------------------------------------------

// --- Component ProductCard ที่เพิ่มปุ่มสั่งซื้อ ---
const ProductCard: React.FC<Product> = ({
  id,
  image,
  title,
  description,
  purchaseUrl,
}) => {
  // << เพิ่ม purchaseUrl
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // --- Optional: โค้ดเช็ค Mobile เพื่อปิด Hover (ถ้าต้องการเก็บไว้) ---
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const hoverEffect = !isMobile ? cardHover : {};
  // ------------------------------------------------------------

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
      whileHover={hoverEffect} // << ใช้ Hover effect (Desktop only ถ้าเปิดใช้ isMobile check)
      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full"
    >
      {/* รูปภาพ */}
      <div className="w-full aspect-video bg-gray-50 overflow-hidden group">
        <img
          src={image} // << ใช้ Path จาก props
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* เนื้อหาการ์ด */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm flex-grow mb-4">{description}</p>

        {/* --- ส่วนท้ายการ์ด: Details + ปุ่มสั่งซื้อ --- */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          {/* Link Details */}
          <a
            href="#" // << อาจจะเปลี่ยนเป็น Link หน้าสินค้าของคุณเอง
            className="text-xs sm:text-sm font-medium text-teal-600 hover:text-teal-800 group transition-colors duration-300 flex-shrink-0"
          >
            Details{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>

          {/* === ปุ่ม "สั่งซื้อ" === */}
          {/* แสดงปุ่มเมื่อมี purchaseUrl เท่านั้น */}
          {purchaseUrl && (
            <a
              href={purchaseUrl} // << ใช้ URL จาก props
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow hover:shadow-md transform hover:scale-105 active:scale-95 transition duration-200 ease-out whitespace-nowrap"
            >
              <ShoppingCart size={14} className="sm:size-4 flex-shrink-0" />
              สั่งซื้อ
            </a>
          )}
          {/* ===================== */}
        </div>
        {/* --- จบส่วนท้ายการ์ด --- */}
      </div>
    </motion.div>
  );
};

export default ProductCard; // <<< สำคัญมาก! ต้องมี Export Default
