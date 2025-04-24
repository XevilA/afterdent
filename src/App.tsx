import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LDCSection from "./components/ldc";
import Present from "./components/present";
import ShowPresentSection from "./components/ShowPresentSection";
// --- Framer Motion & I./components/GalleryRoxdw-
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark /*, เพิ่ม icon อื่นๆ ที่จำเป็น */,
} from "lucide-react";
// --- Icons ---
import {
  Check,
  Menu, // Navbar & Recommendation
  Leaf,
  ShieldCheck,
  HeartHandshake,
  Recycle, // Developer & About Values
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Home, BarChart2, Wifi, Headphones, Camera, User } from "lucide-react";
import ProductCard from "./components/ProductCard"; // <<< เพิ่ม Import นี้
// --- Import Data from data.ts ---
// *** ตรวจสอบ Path ให้ถูกต้อง ***
import { galleryImagesTop, galleryImagesBottom, products } from "./data";
// --- Import Types (Optional แต่แนะนำ) ---
import { Product, Feature, ProductPreview } from "./data";
import { Star } from "lucide-react";
import { reviewsData } from "./data";
// ============================================================
// === Local Data Definitions (อัปเดต Developer Info) ===
// ============================================================
// *** ข้อมูล Values (เหมือนเดิม) ***
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // ช้าละมุนขึ้น
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 30,
      damping: 15,
    },
  },
};
const fadeInPopup = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 40,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Easing แบบ Apple
    },
  },
};

const companyValues = [
  {
    icon: Leaf,
    title: "Natural Purity",
    description:
      "Harnessing the power of nature for safe and effective oral care.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Safety",
    description:
      "Rigorous testing and high standards ensure product excellence.",
  },
  {
    icon: Recycle,
    title: "Sustainability",
    description: "Committed to eco-friendly practices and packaging.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Wellness",
    description: "Prioritizing your health and confidence above all.",
  },
];
export const fadeInBlur = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerComments = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};
const introLdcData = {
  image: "/images/ldc-dentist-image.jpg", // <<== *** แก้ Path รูปภาพ LDC ***
  subtitle: "ประสบการณ์ยาวนานกว่า 30 ปี",
  titleLine1: "เราพร้อมส่งมอบรอยยิ้ม",
  titleLine2: "ด้วย",
  titleHighlight: "ทันตกรรมพรีเมียม",
};
const appleStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // หน่วงเวลาระหว่าง item ลูกน้อยลง
      delayChildren: 0.1,
    },
  },
};

const appleFadeInUp = {
  hidden: { opacity: 0, y: 15 }, // เลื่อนขึ้นน้อยลง
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }, // Custom ease (คล้าย easeInOut)
  },
};

const subtleHover = {
  scale: 1.03, // ขยายเล็กน้อย
  // y: -2, // หรือเลื่อนขึ้นนิดเดียว
  transition: { duration: 0.25, ease: "easeOut" },
};
const subtleTap = {
  scale: 0.97,
  transition: { duration: 0.15, ease: "easeOut" },
};

// ============================================================
// === Component Definitions (Navbar, GalleryRow, ProductCard, Feature, Footer) ===
// ============================================================
// (ส่วนของ Components ทั้งหมดเหมือนเดิมจากครั้งก่อน - Navbar, GalleryRow, ProductCard, Feature, Footer)

const GalleryRow: React.FC<GalleryRowProps> = ({ images, reverse = false }) => {
  const { scrollYProgress } = useScroll();

  // ✅ เพิ่มระยะเลื่อนให้มากขึ้น
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [200, -400] : [-400, 200],
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-5, 0] : [0, -5],
  );
  return (
    <motion.div
      style={{ x }}
      className="flex gap-4 py-4 overflow-hidden" // ✅ กันไม่ให้เกินจอ
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          style={{ rotate }}
          className="flex-none w-[280px] h-[320px] rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          <img
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// ============================================================
// === Main App Component (รวมทุกอย่าง) ===
// ============================================================
function App() {
  const featuredProduct = products.length > 0 ? products[0] : null;
  // --- Logic สำหรับ Animation Scale on Scroll ---
  const scaleSectionRef = React.useRef(null); // 1. สร้าง Ref (ต้อง Import useRef จาก React)
  const { scrollYProgress } = useScroll({
    target: scaleSectionRef, // 2. Track Ref นี้
    offset: ["start end", "end start"], // 3. กำหนดช่วงการ Track
  });
  // 4. สร้างค่า scale จาก scrollYProgress (0.85 -> 1 -> 0.85)
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.85, 1, 0.85],
  );
  // --- (ต้อง Import useScroll, useTransform จาก framer-motion) ---

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-teal-50 font-sans text-gray-700">
      <Navbar />
      {/* --- เนื้อหาหน้าเว็บทั้งหมด --- */}
      {/* === Hero Section (Video BG - แก้ไขใหม่) === */}
      <section
        id="hero"
        className="relative flex flex-col justify-center items-center h-screen min-h-[600px] text-center overflow-hidden px-4"
      >
        {/* Video Background */}
        <video
          src="/LDCVIDEO.webm"
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover z-0"
          type="video/webm"
        >
          เบราว์เซอร์ของคุณไม่รองรับวิดีโอ.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="relative z-20 max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div variants={fadeInUp} className="mb-4 md:mb-6">
            <img
              src="/logo.svg"
              alt="Afterdent Logo"
              className="h-20 md:h-24 w-auto mx-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg lg:text-2xl text-white/90 mb-2 md:mb-3"
          >
            หอมนานไม่เสียวฟัน
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tight"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
          >
            สูตรเฉพาะที่ทันตแพทย์
            <br />
            ไว้วางใจ
          </motion.h1>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <motion.a
              href="#products"
              className="inline-block bg-white text-teal-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ดูผลิตภัณฑ์
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
      <ShowPresentSection />
      {/* === จบ Hero Section === */}
      <section id="ldc-style">
        <LDCSection />
      </section>
      <Present />
      {/* === Section (ปรับขนาดเล็กลง + Equal Height + Comment ใช้รูป 4 รูป) === */}
      {/* 1. ลด Padding Section: py-10 md:py-14 */}
      <section
        id="reviews" // <<< ID สำหรับ Navbar Link
        className="py-10 md:py-14 bg-gray-50 scroll-mt-16 md:scroll-mt-20"
      >
        {/* 2. ลดความกว้าง Container: max-w-6xl */}
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            // 3. ลด Gap: gap-6 / ใช้ items-stretch (default) เพื่อให้สูงเท่ากัน
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* --- คอลัมน์ซ้าย (h-full + ลดขนาดภายใน + Responsive) --- */}
            <motion.div
              // ใส่ h-full
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 h-full"
              variants={fadeInLeft}
            >
              {/* รูปภาพด้านบน (Responsive Aspect Ratio) */}
              <div className="w-full aspect-video md:aspect-[16/10] bg-gray-100 overflow-hidden relative">
                <motion.img
                  src="/afterdentpresent.png"
                  alt="Product Ad"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />{" "}
                {/* << แก้ Path */}
              </div>
              {/* เนื้อหาการ์ด (ลด Padding / Text / Icon Size) */}
              <div className="p-4 md:p-5 flex-grow flex flex-col font-sans">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                  {" "}
                  AFTERDENT สูตรที่หมอใช้ในห้องฟัน!{" "}
                </h3>
                <p className="text-md text-gray-600 leading-relaxed mb-4  flex-grow">
                  ลิตภัณฑ์ของเราได้รับการออกแบบมาเพื่อใช้ในคลินิก LDC Dental
                  โดยทันตแพทย์จะแนะนำให้ผู้ป่วยใช้ก่อนการรักษาเพื่อเตรียมความพร้อม
                  และลดความเสี่ยงของการติดเชื้อ
                  <br />
                  รสชาติแครนเบอร์รี่หอมหวานทำให้การบ้วนปากเป็นเรื่องง่ายและน่าสนุก
                  เหมาะสำหรับทุกเพศทุกวัย ให้คุณดูแลสุขภาพช่องปากได้อย่างมั่นใจ
                  <br />
                  เพราะนี่คือสูตรที่หมอเลือกใช้.
                </p>
                {/* Interaction Buttons (ใช้รูปภาพ + Responsive Size) */}
                <div className="flex items-center justify-between text-gray-700 border-t border-gray-100 pt-3 mt-auto">
                  <div className="flex items-center space-x-3">
                    {/* Like */}{" "}
                    <div className="flex items-center space-x-1 text-red-500">
                      {" "}
                      <img
                        src="./Like.png"
                        alt="Like"
                        className="w-8 h-8"
                      />{" "}
                      <span className="text-xs font-semibold">748k</span>{" "}
                    </div>
                    {/* Comment */}{" "}
                    <div className="flex items-center space-x-1 text-yellow-500">
                      {" "}
                      <img
                        src="./Comment.png"
                        alt="Comment"
                        className="w-8 h-8"
                      />{" "}
                      <span className="text-xs font-semibold">8.9k</span>{" "}
                    </div>
                    {/* Share */}{" "}
                    <div className="flex items-center space-x-1 text-teal-500">
                      {" "}
                      <img
                        src="./Share.png"
                        alt="Share"
                        className="w-8 h-8"
                      />{" "}
                      <span className="text-xs font-semibold">26k</span>{" "}
                    </div>
                  </div>
                  {/* Bookmark */}{" "}
                  <div className="flex items-center space-x-1 text-blue-500">
                    {" "}
                    <img
                      src="./Bookmark.png"
                      alt="Bookmark"
                      className="w-8 h-8"
                    />{" "}
                    <span className="text-xs font-semibold">1.4k</span>{" "}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* --- คอลัมน์ขวา (h-full + Comment ใช้รูป 4 รูป + ลดขนาดภายใน) --- */}
            <motion.div
              // ใส่ h-full
              className="lg:col-span-1 flex flex-col gap-4 h-full" // << ลด Gap
              variants={fadeInRight}
            >
              {/* Comments Section */}
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5 border border-gray-100 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 font-sans flex-shrink-0">
                  Comment
                </h4>

                <motion.div
                  className="space-y-3 flex-grow"
                  variants={staggerComments}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }} // << แสดง animation ทุกครั้งที่ scroll ผ่าน
                >
                  {/* Image 1 */}
                  <motion.img
                    variants={fadeInBlur}
                    src="/1.png"
                    alt="Comment 1"
                    className="w-full h-auto rounded-lg shadow-sm block"
                    loading="lazy"
                  />
                  {/* Image 2 */}
                  <motion.img
                    variants={fadeInBlur}
                    src="/2.png"
                    alt="Comment 2"
                    className="w-full h-auto rounded-lg shadow-sm block"
                    loading="lazy"
                  />
                  {/* Image 3 */}
                  <motion.img
                    variants={fadeInBlur}
                    src="/3.png"
                    alt="Comment 3"
                    className="w-full h-auto rounded-lg shadow-sm block"
                    loading="lazy"
                  />
                  {/* Image 4 */}
                  <motion.img
                    variants={fadeInBlur}
                    src="/4.png"
                    alt="Comment 4"
                    className="w-full h-auto rounded-lg shadow-sm block"
                    loading="lazy"
                  />
                </motion.div>
              </div>
              {/* ส่วน Join Group (ลด Padding/Text/Avatar Size) */}
              <div className="bg-yellow-400 rounded-2xl shadow-lg p-5 text-black flex-shrink-0">
                {" "}
                {/* << ลด Padding */}
                <h4 className="text-lg font-bold mb-1">
                  เข้าร่วมแก๊งเงินคูล
                </h4>{" "}
                {/* << ลด Text Size */}
                <p className="text-xs font-medium mb-2">Your Friends</p>{" "}
                {/* << ลด Text Size/mb */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center -space-x-1.5">
                    {" "}
                    {/* << ลด space */}
                    <img
                      src="/Screenshot 2568-03-06 at 15.39.48.png"
                      alt="Friend 1"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />{" "}
                    {/* << ขนาด avatar */}
                    <img
                      src="/Screenshot 2568-03-06 at 15.16.07.png"
                      alt="Friend 2"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <img
                      src="/Screenshot 2568-04-07 at 12.31.02.png"
                      alt="Friend 3"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white">
                      {" "}
                      +10{" "}
                    </div>{" "}
                    {/* << ขนาด avatar */}
                  </div>
                  <button className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-800 transition-colors shadow-md">
                    {" "}
                    join group{" "}
                  </button>{" "}
                  {/* << ลด Padding/Text Size */}
                </div>
              </div>
            </motion.div>
          </motion.div>{" "}
          {/* ปิด Grid */}
        </div>{" "}
        {/* ปิด Container */}
      </section>{" "}
      {/* ปิด Section */}
      {/* === Gallery Section (PC Scroll จำกัดระยะ, รูปใหญ่+Fade, No Mobile View) === */}
      <section
        id="gallery"
        className="py-3 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 scroll-mt-16 md:scroll-mt-20" // << ปรับ Padding
      >
        <div className="container mx-auto px-4 md:px-6">
          {" "}
          {/* << ใช้ px-4 เสมอ */}
          {/* Heading (Gradient) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }} // ใช้ fadeInUp ธรรมดา หรือ Variant ที่กำหนด
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-14 text-gray-800 leading-tight" // << ปรับ mb
          >
            <span className="block text-gray-900 text-3xl md:text-4xl">
              ออกแบบรอยยิ้ม
            </span>{" "}
            {/* << ปรับขนาดบรรทัด 1 */}
            <span className="block text-5xl md:text-6xl bg-clip-text text-transparent my-1 md:my-2 leading-tight md:leading-none bg-[linear-gradient(90deg,rgba(131,58,180,1)_0%,rgba(253,29,29,1)_50%,rgba(252,176,69,1)_100%)]">
              Afterdent สูตรที่หมอใช้ในห้องฟัน
            </span>
            <span className="block text-lg md:text-2xl font-medium text-gray-600 mt-2">
              {" "}
              {/* << ปรับ mt */}
              "หอมนาน ไม่เสียวฟัน"
            </span>
          </motion.h2>
          {/* --- Desktop View (ใช้ GalleryRow ที่แก้แล้ว) --- */}
          {/* ส่วนนี้จะแสดงเฉพาะ md ขึ้นไป */}
          {/* เพิ่ม space-y-10 หรือ 12 */}
          <div className="hidden md:block space-y-10 lg:space-y-12">
            {/* *** ต้องแน่ใจว่า GalleryRow ที่เรียกใช้ คือเวอร์ชันที่แก้แล้ว *** */}
            <GalleryRow images={galleryImagesTop} />
            <GalleryRow images={galleryImagesBottom} reverse />
          </div>
          {/* --- Mobile View (ถูกลบออก) --- */}
        </div>
      </section>
      {/* === จบ Gallery Section === */}
      <section id="products" className="py-12 md:py-16 bg-gray-50 scroll-mt-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Heading Animation + Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent"
            >
              ผลิตภัณฑ์ที่ดีที่สุดของเรา
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-lg text-gray-500 max-w-2xl mx-auto font-sans"
            >
              ผลิตภัณฑ์แนะนำจากทันตแพทย์ รสชาติแครนเบอร์รี่หอมหวาน
              เหมาะสำหรับทุกเพศทุกวัย ช่วยลดความเสี่ยงการติดเชื้อและดูแลช่องปาก.
            </motion.p>
          </motion.div>

          {/* Product Cards with Stagger Animation */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {ProductPreview.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* === Product Recommendation Section (ปรับปรุง Mobile View) === */}
      {products.length >= 1 && (
        <section className="py-16 md:py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                // ลด Margin Bottom บน Mobile: mb-12, คง Desktop: md:mb-24
                className={` ${index < products.slice(0, 3).length - 1 ? "mb-12 md:mb-24" : ""}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
              >
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* --- คอลัมน์รูปภาพ (ไม่มีการเปลี่ยนแปลง) --- */}
                  <motion.div
                    variants={index % 2 === 0 ? fadeInLeft : fadeInRight} // สลับ Animation เหมือนเดิม (ถ้าใช้อยู่)
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    // สลับ Order เหมือนเดิม (ถ้าใช้อยู่)
                    className={`relative ${index % 2 !== 0 ? "md:order-last" : ""}`}
                  >
                    <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={`รูปภาพ ${product.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className={`absolute -top-4 w-20 h-20 bg-teal-200 rounded-full opacity-30 -z-10 ${index % 2 !== 0 ? "right-[-1rem]" : "left-[-1rem]"}`}
                    ></div>
                    <div
                      className={`absolute -bottom-4 w-28 h-28 border-4 border-cyan-200 rounded-2xl opacity-40 -z-10 transform rotate-12 ${index % 2 !== 0 ? "left-[-1rem]" : "right-[-1rem]"}`}
                    ></div>
                  </motion.div>

                  {/* --- คอลัมน์ข้อความ (ปรับ Text Alignment และ List Alignment) --- */}
                  <motion.div
                    variants={index % 2 === 0 ? fadeInRight : fadeInLeft} // สลับ Animation
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    // เพิ่ม: text-center เริ่มต้น, md:text-left สำหรับ Desktop
                    className="text-center md:text-left"
                  >
                    <h3 className="text-sm font-semibold uppercase text-teal-600 tracking-wider mb-2">
                      แนะนำสำหรับคุณ
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                      <span className="text-cyan-700">{product.title}</span>
                    </h2>
                    <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                      {product.description}
                    </p>

                    {/* รายการจุดเด่น: จัดให้อยู่กึ่งกลางบน Mobile */}
                    {/* ใช้ inline-flex และ justify-center บน Mobile */}
                    {/* รายการจุดเด่น: จัดกลางบน Mobile */}
                    {/* ul: จัดเรียง li กึ่งกลางแนวนอน (Mobile) / ชิดซ้าย (Desktop) */}
                    <ul className="space-y-3 mb-8 flex flex-col items-center md:items-start">
                      {/* li: จัดเรียง Icon กับ Text กึ่งกลางแนวนอน (Mobile) / ชิดซ้าย (Desktop) */}
                      <li className="flex items-start justify-center md:justify-start">
                        {" "}
                        {/* << เพิ่ม justify-center md:justify-start, ลบ w-full */}
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">
                          ส่วนผสมจากธรรมชาติ
                        </span>
                      </li>
                      <li className="flex items-start justify-center md:justify-start">
                        {" "}
                        {/* << เพิ่ม justify-center md:justify-start, ลบ w-full */}
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">อ่อนโยน ไม่แสบปาก</span>
                      </li>
                      <li className="flex items-start justify-center md:justify-start">
                        {" "}
                        {/* << เพิ่ม justify-center md:justify-start, ลบ w-full */}
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">ลดกลิ่นปากได้ดี</span>
                      </li>
                    </ul>

                    {/* ปุ่ม CTA (อยู่กลางบน Mobile อยู่แล้วเพราะ text-center ของ Parent) */}
                    {product.purchaseUrl ? (
                      <motion.a
                        href={product.purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-7 py-3 rounded-full text-base font-semibold shadow-md hover:shadow-lg ..."
                      >
                        {" "}
                        สั่งซื้อ{" "}
                      </motion.a>
                    ) : (
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-7 py-3 rounded-full text-base font-semibold shadow-md hover:shadow-lg ..."
                      >
                        {" "}
                        ดูรายละเอียด{" "}
                      </motion.a>
                    )}
                  </motion.div>
                </div>{" "}
                {/* ปิด Grid ของ Product แต่ละชิ้น */}
              </motion.div> // ปิด Container ของ Product แต่ละชิ้น
            ))}{" "}
            {/* ปิด Loop .map */}
          </div>
        </section>
      )}
      <section
        id="review"
        className="py-16 md:py-20 bg-white overflow-hidden scroll-mt-16 md:scroll-mt-20"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* คอลัมน์ซ้าย */}
            <motion.div
              className="relative w-full max-w-sm mx-auto md:max-w-md"
              variants={fadeInLeft}
            >
              <motion.img
                src="/LDCIMG39.jpg"
                alt="Sidebar"
                className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[40%] sm:-translate-x-[50%] w-16 sm:w-20 z-10"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
              <motion.img
                src="/LDCIMG39.jpg"
                alt="Main content"
                className="relative block w-full h-auto rounded-[36px] shadow-xl z-20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.img
                src="/Like.png"
                alt="Like"
                className="absolute top-3 sm:top-4 right-[-10px] sm:right-[-15px] w-32 sm:w-24 h-auto z-30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 180 }}
              />
              <motion.img
                src="/LDCIMG36.png"
                alt="Visualizer"
                className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 w-32 sm:w-40 h-auto z-30"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
              <motion.img
                src="/LDCIMG39.png"
                alt="Timestamp"
                className="absolute bottom-5 sm:bottom-6 right-5 sm:right-6 w-24 sm:w-32 h-auto z-30"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
            </motion.div>

            {/* คอลัมน์ขวา */}
            <motion.div
              className="flex flex-col text-center md:text-left"
              variants={fadeInRight}
            >
              <motion.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8 font-sans
                              bg-clip-text text-transparent
                              bg-[linear-gradient(90deg,rgba(131,58,180,1)_0%,rgba(253,29,29,1)_50%,rgba(252,176,69,1)_100%)]"
              >
                มั่นใจเมื่อไหร่...ต้อง Afterdent!
              </motion.h2>

              <motion.div
                className="grid grid-cols-3 gap-3 sm:gap-4"
                variants={staggerContainer}
              >
                <motion.img
                  variants={fadeInUp}
                  src="/img3.JPG"
                  alt="จึ้ง Graphic"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
                <motion.img
                  variants={fadeInUp}
                  src="/LDCIMG33.jpg"
                  alt="ดึง Graphic"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
                <motion.img
                  variants={fadeInUp}
                  src="/LDCIMG39.jpg"
                  alt="ดม Graphic"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* === About Section: LDC Dental & Afterdent === */}
      {/* === About Section: LDC Dental & Afterdent === */}
      <section
        id="about"
        className="w-full py-16 md:py-24 bg-[#243184] scroll-mt-16 md:scroll-mt-20"
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              LDC Dental & Afterdent
            </h2>
            <p className="text-md md:text-lg text-gray-200 max-w-2xl mx-auto">
              การผสานความเชี่ยวชาญด้านทันตกรรมกับผลิตภัณฑ์ดูแลช่องปากธรรมชาติ
              เพื่อรอยยิ้มที่มั่นใจและสุขภาพดี
            </p>
          </motion.div>

          {/* Mission & Vision Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-[#243184] mb-4">
                วิสัยทัศน์ของ LDC Dental
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                มุ่งมั่นเป็นผู้นำด้านบริการสุขภาพช่องปาก...
              </p>
              <p className="text-gray-700 leading-relaxed">
                ยกระดับมาตรฐานการบริการให้เทียบเท่าระดับสากล...
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-[#243184] mb-4">
                พันธกิจของ Afterdent
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                เสริมสร้างสุขภาพช่องปากด้วยผลิตภัณฑ์ธรรมชาติ...
              </p>
              <p className="text-gray-700 leading-relaxed">
                มุ่งเน้นความยั่งยืนและความปลอดภัยของผู้บริโภค...
              </p>
            </motion.div>
          </div>

          {/* Our Story */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              เรื่องราวของเรา
            </h3>
            <div className=" prose max-w-full px-4 text-gray-200 text-left md:text-center">
              <p>LDC Dental ก่อตั้งขึ้นในปี 1992...</p>
              <p>Afterdent เกิดจากความตั้งใจในการสร้างผลิตภัณฑ์...</p>
            </div>
          </motion.div>

          {/* Our Core Values */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h3 className="text-2xl font-semibold text-white mb-3">
              ค่านิยมหลักของเรา
            </h3>
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
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-100 transition-shadow hover:shadow-md"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center mb-4 border border-white">
                  <value.icon className="w-7 h-7 text-[#243184]" />
                </div>
                <h4 className="text-lg font-semibold text-[#243184] mb-1">
                  {value.title}
                </h4>
                <p className="text-gray-700 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* --- Footer ---  s */}
      <Footer />
    </div>
  );
}

export default App;
