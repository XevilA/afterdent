import React from 'react';
import { motion } from 'framer-motion';
// --- Icons สำหรับ Values Section ---
import { Leaf, ShieldCheck, HeartHandshake, Zap, Droplets, Recycle } from 'lucide-react';

// --- Animation Variants (ใช้ซ้ำจาก App.tsx หรือกำหนดใหม่ตามต้องการ) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// --- Placeholder Data (ควรย้ายไป data.ts หรือ CMS) ---
const companyValues = [
  { icon: Leaf, title: 'Natural Purity', description: 'Harnessing the power of nature for safe and effective oral care.' },
  { icon: ShieldCheck, title: 'Quality & Safety', description: 'Rigorous testing and high standards ensure product excellence.' },
  { icon: Recycle, title: 'Sustainability', description: 'Committed to eco-friendly practices and packaging.' },
  { icon: HeartHandshake, title: 'Customer Wellness', description: 'Prioritizing your health and confidence above all.' },
];

// --- About Component ---
const About = () => {
  return (
    // --- ใช้ Font และ Background ที่สอดคล้องกับ App.tsx ---
    <div className="font-sans text-gray-700">

      {/* === Hero Section === */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-cyan-100 via-white to-white text-center overflow-hidden">
         {/* Optional: Decorative background elements */}
         <div className="absolute top-0 left-0 w-full h-full opacity-30 -z-10" style={{ backgroundImage: `radial-gradient(${'#A5F3FC'} 1px, transparent 1px)`, backgroundSize: `20px 20px` }}></div>

         <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container mx-auto px-4 md:px-6 relative z-10"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-cyan-800 leading-tight"
            >
              Our Story: Caring for Your Smile
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover the passion and principles behind Afterdent Care's commitment to naturally effective oral wellness.
            </motion.p>
          </motion.div>
      </section>

      {/* === Our Mission & Vision Section === */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* --- Text Content --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft} // Animate from left
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                {/* *** แทนที่ด้วย Mission จริงของคุณ *** */}
                To empower individuals to achieve optimal oral health and confidence through innovative, natural, and accessible dental care products. We strive to blend science and nature for solutions that are both effective and gentle.
              </p>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {/* *** แทนที่ด้วย Vision จริงของคุณ *** */}
                To be the leading trusted brand in natural oral care, recognized for our commitment to quality, sustainability, and the well-being of our customers and the planet.
              </p>
            </motion.div>
            {/* --- Image --- */}
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }}
               variants={fadeInRight} // Animate from right
               className="relative"
            >
               {/* *** แทนที่ด้วยรูปภาพที่สื่อถึง Mission/Vision *** */}
              <img
                src="https://via.placeholder.com/600x400/B2F5EA/047857?text=Mission+Vision+Image" // Placeholder
                alt="Illustration representing company mission and vision"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
                loading="lazy"
              />
               {/* Optional decorative element */}
               <div className="absolute -bottom-3 -left-3 w-24 h-24 border-4 border-teal-200 rounded-full -z-10 opacity-50"></div>
            </motion.div>
          </div>
        </div>
      </section>

       {/* === Our Story Section === */}
       <section className="py-16 md:py-24 bg-teal-50"> {/* ใช้พื้นหลังสีอ่อน */}
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">The Journey of Afterdent</h2>
            <div className="prose lg:prose-lg max-w-none text-gray-600 text-left md:text-center"> {/* ใช้ Tailwind Typography Prose */}
              {/* *** แทนที่ด้วยเรื่องราวของคุณ *** */}
              <p>
                Afterdent Care began with a simple idea: oral care could be both highly effective and surprisingly gentle, using the best that nature and science have to offer. Frustrated by harsh chemicals and artificial ingredients in conventional products, our founders set out to create a line of toothpaste, brushes, and mouthwashes that people could trust.
              </p>
              <p>
                Driven by a passion for health and sustainability, we spent years researching botanical extracts, safe minerals, and innovative formulations. Our journey involved collaborating with dental professionals and listening closely to customer needs. Today, Afterdent Care represents the culmination of that dedication – products that nurture your smile and respect the planet.
              </p>
              {/* สามารถเพิ่ม paragraph ได้อีก */}
            </div>
          </motion.div>
        </div>
      </section>


      {/* === Our Values Section === */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Core Values</h2>
            <p className="text-md md:text-lg text-gray-500 max-w-2xl mx-auto">
              The principles that guide every decision we make at Afterdent Care.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {companyValues.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100 transition-shadow hover:shadow-md"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center mb-4 border border-white">
                  <value.icon className="w-7 h-7 text-cyan-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === Commitment Section (Optional) === */}
      <section className="py-16 md:py-24 bg-cyan-700 text-white">
         <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="max-w-3xl mx-auto"
            >
               <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to You</h2>
               <p className="text-lg md:text-xl text-cyan-100 leading-relaxed mb-8">
                  {/* *** แทนที่ด้วย Commitment ของคุณ *** */}
                  We are dedicated to transparency, continuous improvement, and creating products that genuinely contribute to your well-being. Your healthy smile is our greatest reward.
               </p>
                {/* Optional Call to Action */}
               {/* <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="bg-white text-cyan-700 px-8 py-3 rounded-full text-base font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300"
                >
                  Explore Our Products
               </motion.button> */}
            </motion.div>
         </div>
      </section>

    </div> // End of main div
  );
};

export default About;