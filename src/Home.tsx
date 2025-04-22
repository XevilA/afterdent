import React from 'react';
// --- Imports ที่จำเป็นสำหรับเนื้อหา Home ---
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { galleryImagesTop, galleryImagesBottom, products, features } from './data'; // *** แก้ Path ถ้า data.ts อยู่ที่อื่น ***
import type { Product, Feature } from './data'; // *** แก้ Path ถ้า data.ts อยู่ที่อื่น ***

// --- Components ที่ใช้ใน Home (GalleryRow, ProductCard, Feature) ---
// --- ควรย้าย Components เหล่านี้ไปไฟล์แยกต่างหากในโฟลเดอร์ components ---

// Component: GalleryRow (จากโค้ดเดิมของคุณ)
const GalleryRow = ({ images, reverse = false }: { images: string[]; reverse?: boolean }) => {
    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], reverse ? [100, -600] : [-600, 100]);
    const rotate = useTransform(scrollYProgress, [0, 1], reverse ? [-15, 0] : [0, -15]);
    return ( <motion.div style={{ x }} className="flex gap-4 py-4" > {images.map((image, index) => ( <motion.div key={index} style={{ rotate }} className="flex-none w-[280px] h-[320px] rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-lg" > <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" /> </motion.div> ))} </motion.div> );
};
// Animation Variants (เหมือนเดิม)
const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }, };
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }, };
const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } };
const fadeInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1, }, }, };
const cardHover = { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 123, 138, 0.1), 0 10px 10px -5px rgba(0, 123, 138, 0.08)", transition: { duration: 0.3 } };
// Component: ProductCard (ใช้ object-cover)
const ProductCard: React.FC<Product> = ({ id, image, title, description }) => {
    const controls = useAnimation(); const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 }); React.useEffect(() => { if (inView) { controls.start('visible'); } }, [controls, inView]);
    return ( <motion.div ref={ref} variants={fadeInUp} initial="hidden" animate={controls} whileHover={cardHover} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full" > <div className="w-full aspect-video bg-gray-50 overflow-hidden"> <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" /> </div> <div className="p-5 md:p-6 flex flex-col flex-grow"> <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3> <p className="text-gray-600 text-sm flex-grow mb-4">{description}</p> <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-800 self-start group transition-colors duration-300"> Details <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span> </a> </div> </motion.div> );
};
// Component: Feature (เหมือนเดิม)
const Feature: React.FC<Feature> = ({ id, icon: Icon, title, description }) => {
    const controls = useAnimation(); const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 }); React.useEffect(() => { if (inView) { controls.start('visible'); } }, [controls, inView]);
    return ( <motion.div ref={ref} variants={fadeIn} initial="hidden" animate={controls} className="flex flex-col items-center text-center p-4" > <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-full flex items-center justify-center mb-5 shadow-sm border border-white"> <Icon className="w-8 h-8 text-teal-600" /> </div> <h3 className="text-lg font-medium text-gray-800 mb-1">{title}</h3> <p className="text-gray-500 text-sm leading-relaxed">{description}</p> </motion.div> );
};

// --- Home Component ---
const Home = () => {
  // เลือกสินค้าที่จะแนะนำ (เหมือนเดิม)
  const featuredProduct = products.length > 0 ? products[0] : null;

  return (
     // ไม่ต้องมี div ครอบนอกสุด หรือ background ที่นี่ เพราะ App.tsx จะจัดการ
    <>
      {/* === Hero Section === */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden px-4 md:px-6 pt-16 md:pt-20"> {/* เพิ่ม Padding top เล็กน้อยเผื่อ Navbar */}
         {/* ... โค้ด Hero เหมือนเดิม ... */}
         <div className="absolute inset-0 z-0 opacity-60" style={{ backgroundImage: `url('https://via.placeholder.com/1920x1080/E0F8FF/0891B2?text=Your+Hero+Image+Here')`, backgroundSize: 'cover', backgroundPosition: 'center', }}></div>
         <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
         <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-20 max-w-3xl mx-auto" >
           <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight" style={{ textShadow: '0 2px 4px rgba(255,255,255,0.3)' }} > <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600"> Afterdent Care </span> </motion.h1>
           <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto" > Discover the confidence of a healthy, radiant smile. Naturally effective oral care designed for you. </motion.p>
           <motion.div variants={fadeInUp}> <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"> View Collection </button> </motion.div>
         </motion.div>
      </section>

      {/* === Gallery Section === */}
      <section className="py-12 overflow-hidden bg-gradient-to-b from-white to-gray-50">
         {/* ... โค้ด Gallery เหมือนเดิม ... */}
         <div className="container mx-auto">
           <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl font-bold text-center mb-12" > Product Gallery </motion.h2>
           <div className="space-y-8">
             <GalleryRow images={galleryImagesTop} />
             <GalleryRow images={galleryImagesBottom} reverse />
           </div>
         </div>
      </section>

      {/* === Products Section === */}
      <section className="py-16 md:py-24 bg-gray-50">
         {/* ... โค้ด Products เหมือนเดิม ... */}
         <div className="container mx-auto px-4 md:px-6">
           <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-12 md:mb-16" > <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Core Products</h2> <p className="text-md md:text-lg text-gray-500 max-w-2xl mx-auto"> Effective solutions for your daily oral hygiene routine. </p> </motion.div>
           <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" > {products.map((product) => ( <ProductCard key={product.id} {...product} /> ))} </motion.div>
         </div>
      </section>

      {/* === Product Recommendation Section === */}
      {featuredProduct && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 overflow-hidden">
          {/* ... โค้ด Recommendation เหมือนเดิม ... */}
           <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative" >
                <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex items-center justify-center"> <img src={featuredProduct.image} alt={`Recommended Product: ${featuredProduct.title}`} className="w-full h-full object-cover" loading="lazy" /> </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal-200 rounded-full opacity-30 -z-10"></div> <div className="absolute -bottom-4 -right-4 w-28 h-28 border-4 border-cyan-200 rounded-2xl opacity-40 -z-10 transform rotate-12"></div>
              </motion.div>
              <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} >
                <h3 className="text-sm font-semibold uppercase text-teal-600 tracking-wider mb-2">Why Afterdent Stands Out</h3> <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight"> Experience the Best with <span className="text-cyan-700">{featuredProduct.title}</span> </h2> <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed"> Our commitment to quality and natural ingredients means you get effective oral care that's gentle on your mouth and the environment. Here's why {featuredProduct.title} is a great choice: </p>
                <ul className="space-y-3 mb-8"> <li className="flex items-start"> <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /> <span className="text-gray-700">Formulated with scientifically proven natural extracts.</span> </li> <li className="flex items-start"> <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /> <span className="text-gray-700">Provides long-lasting freshness and effective cleaning power.</span> </li> <li className="flex items-start"> <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /> <span className="text-gray-700">Free from harsh chemicals, SLS, and artificial colors.</span> </li> <li className="flex items-start"> <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /> <span className="text-gray-700">Eco-conscious packaging and cruelty-free production.</span> </li> </ul>
                <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-7 py-3 rounded-full text-base font-semibold shadow-md hover:shadow-lg transform transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400" > Learn More about {featuredProduct.title} </motion.a>
              </motion.div>
            </div>
           </div>
        </section>
      )}

      {/* === Features Section === */}
      <section className="py-16 md:py-24 bg-white">
        {/* ... โค้ด Features เหมือนเดิม ... */}
         <div className="container mx-auto px-4 md:px-6">
           <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-12 md:mb-16" > <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">The Afterdent Difference</h2> <p className="text-md md:text-lg text-gray-500 max-w-2xl mx-auto"> Why our approach to oral care stands out. </p> </motion.div>
           <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10" > {features.map((feature) => ( <Feature key={feature.id} {...feature} /> ))} </motion.div>
         </div>
      </section>
    </>
  );
};

export default Home;