// src/components/ValueCard.tsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Import Type จาก data.ts (ตรวจสอบ Path!)
import type { AfterdentValue } from "../data";

// Animation Variant (ต้องมีนิยาม หรือ Import มา)
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0.0, 0.2, 1] },
  },
};

// Component รับ Props เป็น AfterdentValue
const ValueCard: React.FC<AfterdentValue> = ({
  icon: Icon,
  title,
  description,
}) => {
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
      className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100 transition-shadow hover:shadow-lg duration-300" // << ปรับ Style/Hover
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center mb-4 border border-white shadow-sm">
        {Icon && <Icon className="w-7 h-7 text-cyan-700" />}
      </div>
      {/* Title */}
      <h4 className="text-lg font-semibold text-gray-800 mb-1">{title}</h4>
      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ValueCard;
