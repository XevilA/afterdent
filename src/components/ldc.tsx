import { motion } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
    },
  },
};

export default function LDCStyleSection() {
  const scaleSectionRef = useRef(null);

  return (
    <section
      ref={scaleSectionRef}
      id="ldc-style-section"
      className="py-16 md:py-24 bg-white scroll-mt-16 md:scroll-mt-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Text Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.p
            className="text-base lg:text-lg text-gray-500 mb-4 md:mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 40 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            ประสบการณ์ยาวนานกว่า 30 ปี
          </motion.p>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {[
              "LDC dental เราพร้อมส่งมอบรอยยิ้ม",
              "ด้วย",
              "ผลิตภัณฑ์พรีเมียม",
            ].map((line, index) => (
              <div key={index} className="inline-block">
                {line.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    className={
                      word === "ผลิตภัณฑ์พรีเมียม"
                        ? "text-teal-600 inline-block"
                        : "inline-block"
                    }
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
                <br />
              </div>
            ))}
          </motion.h2>
        </motion.div>

        {/* Images Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            className="md:col-span-3 rounded-2xl shadow-xl overflow-hidden bg-gray-100 hover:scale-105 transition-transform duration-500"
            style={{ originY: 1 }}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src="/dentist.jpg"
              alt="Smiling Dentist"
              className="w-full h-auto object-cover aspect-[4/3]"
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.div
            className="md:col-span-2 rounded-2xl shadow-xl overflow-hidden bg-gray-100 hover:scale-105 transition-transform duration-500"
            style={{ originY: 1 }}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src="/img3.JPG"
              alt="Dental Detail"
              className="w-full h-auto object-cover aspect-[4/3]"
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
