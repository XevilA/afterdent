// src/components/BenefitItem.tsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Benefit } from "../data"; // << Import Benefit type

// Animation Variant (ต้องมีนิยาม หรือ Import มา)
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] },
  },
};

const BenefitItem: React.FC<Benefit> = ({
  title,
  description /*, icon: Icon */,
}) => {
  // << รับ Props ตาม Interface Benefit
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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
      // Style การ์ดสำหรับ Benefit (อาจจะต่างจาก FeatureItem)
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300"
    >
      {/* ถ้า Benefit มี Icon ก็แสดงตรงนี้ */}
      {/* {Icon && <div className="mb-4 inline-block text-teal-500"><Icon size={32} /></div>} */}

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default BenefitItem;
