import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// --- Framer Motion & Intersection Observer ---
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
import type { Product, Feature } from "./data";
import { Star } from "lucide-react";
import { reviewsData } from "./data";
// ============================================================
// === Local Data Definitions (อัปเดต Developer Info) ===
// ============================================================
// *** ข้อมูล Values (เหมือนเดิม) ***

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

const GalleryRow = ({
  images,
  reverse = false,
}: {
  images: string[];
  reverse?: boolean;
}) => {
  const { scrollYProgress } = useScroll();

  // ปรับระยะเลื่อน: ลดค่าไม่ให้เกินจอ (เช่น -150 ถึง 150)
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [80, -150] : [-150, 80],
  );

  // ปรับองศาหมุน: ไม่ให้เวียนหัวเกิน
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-10, 0] : [0, -10],
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
        // ใช้ h-screen เพื่อให้สูงเต็มจอ, min-h กันเนื้อหาล้นจอเล็ก
        // flex flex-col เพื่อจัดเรียงแนวตั้ง, relative สำหรับ absolute children
        className="relative flex flex-col justify-center items-center h-screen min-h-[600px] text-center overflow-hidden px-4"
      >
        {/* --- Video Background (z-0) --- */}
        <video
          // !!!!! สำคัญมาก: แก้ Path ให้ถูกต้อง !!!!!
          src="/LDCVIDEO.webm" // <<== ใส่ Path จริง! เช่น /videos/ldc-bg.mp4
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
          // Style ให้เต็มพื้นที่ + อยู่หลังสุด + cover
          className="absolute inset-0 w-full h-full object-cover z-0"
          // เพิ่ม type เพื่อความชัดเจน (Optional)
          type="video/webm"
        >
          {/* Fallback Text */}
          เบราว์เซอร์ของคุณไม่รองรับวิดีโอ.
        </video>
        {/* --- ลบ Gradient Overlay สีขาวออกไปก่อน --- */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent z-10"></div> */}
        {/* --- เพิ่ม Overlay สีดำจางๆ แทน (ถ้าต้องการให้อ่านง่าย) --- */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>{" "}
        {/* << Overlay ดำ โปร่งแสง 20% */}
        {/* Container เนื้อหา (z-20) */}
        {/* เอา pb ออก ใช้ justify-center + items-center ของ Section แทน */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-20 max-w-4xl mx-auto" // << Content อยู่บน Overlay ดำ
        >
          {/* Logo (ถ้ามี) */}
          <motion.div variants={fadeInUp} className="mb-4 md:mb-6">
            <img
              src="/logo.svg"
              alt="Afterdent Logo"
              className="h-12 md:h-16 w-auto mx-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Heading (ใช้ Font DB, สีขาว) */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg lg:text-2xl text-white/90 mb-2 md:mb-3"
          >
            สูตรเฉพาะที่ทันตแพทย์ไว้วางใจ000 หอมนานไม่เสียวฟัน
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tight" // << สีขาว
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }} // << เงาเข้มขึ้น
          >
            หอมนาน
            <br /> ไม่เสียวฟัน
          </motion.h1>

          {/* Button (ถ้ามี) */}
          <motion.div variants={fadeInUp}>
            <motion.a
              href="#products"
              className="inline-block bg-white text-teal-600 px-8 py-3 rounded-full ..."
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ดูผลิตภัณฑ์
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
      {/* === จบ Hero Section === */}
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
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="text-base lg:text-lg text-gray-500 mb-2 md:mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 50 }}
            >
              ประสบการณ์ยาวนานกว่า 30 ปี
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
            >
              เราพร้อมส่งมอบรอยยิ้ม
              <br />
              ด้วย <span className="text-teal-600">ทันตกรรมพรีเมียม</span>
            </motion.h2>
          </motion.div>

          {/* Images Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {/* Left Image */}
            <motion.div
              className="md:col-span-3 rounded-2xl shadow-xl overflow-hidden bg-gray-100"
              style={{ originY: 1 }}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              <img
                src="/dentist.jpg"
                alt="Smiling Dentist"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="md:col-span-2 rounded-2xl shadow-xl overflow-hidden bg-gray-100"
              style={{ originY: 1 }}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.2,
              }}
            >
              <img
                src="/img3.JPG"
                alt="Dental Detail"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section
        id="introduction"
        className="py-16 md:py-32 bg-gradient-to-b from-white to-gray-100 scroll-mt-16 md:scroll-mt-20 font-['IBM Plex Sans']"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <motion.div
              className="relative w-full h-72 md:h-[600px] overflow-hidden"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <motion.video
                className="absolute inset-0 w-full h-full object-cover"
                src="/afterdent4k.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="p-8 md:p-20 flex flex-col justify-center text-center md:text-left space-y-8"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-3xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
              >
                เปลี่ยนประสบการณ์ดูแลช่องปาก
              </motion.h2>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-base md:text-lg text-pink-600 leading-relaxed"
              >
                <span className="block md:hidden">
                  Afterdent พร้อมดูแลสุขภาพช่องปากของคุณอย่างมืออาชีพ
                  ด้วยสูตรเฉพาะที่ผ่านการทดสอบโดยทันตแพทย์
                  มั่นใจในทุกครั้งที่คุณบ้วนปาก — ลดการระคายเคือง
                  เพิ่มความชุ่มชื้น และช่วยลดความเสี่ยงในการติดเชื้อ.
                </span>
                <span className="hidden md:block">
                  สุขภาพช่องปากที่ดี เริ่มต้นได้ตั้งแต่วันนี้ ด้วย Afterdent
                  ผลิตภัณฑ์บ้วนปากที่ออกแบบร่วมกับทันตแพทย์
                  เพื่อช่วยลดความเสี่ยงของการติดเชื้อ ดูแลเหงือกให้นุ่มชุ่มชื้น
                  ด้วย Coenzyme Q10 & Xylitol ให้ความหวานอย่างปลอดภัย
                  พร้อมกลิ่นหอมสดชื่น เปลี่ยนความน่าเบื่อของการดูแลช่องปาก
                  ให้กลายเป็นกิจวัตรที่คุณรอคอย.
                </span>
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex justify-center md:justify-start"
              >
                <a
                  href="#products"
                  className="inline-block bg-pink-600 text-white text-sm md:text-base font-medium py-3 px-6 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300"
                >
                  สั่งซื้อเลย
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
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
                  src="/AFTERDENTToothpasteCranberry .png"
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
                  Afterdent — รอยยิ้มที่ดี...{" "}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                  {" "}
                  เผยรอยยิ้มที่ดูดี...{" "}
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
              {/* ส่วน Comments (ใช้รูปภาพ 4 รูป) */}
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5 border border-gray-100 flex flex-col flex-grow">
                {" "}
                {/* << ลด Padding + เพิ่ม flex-grow */}
                <h4 className="text-lg font-semibold text-gray-900 mb-3 font-sans flex-shrink-0">
                  {" "}
                  Comment{" "}
                </h4>{" "}
                {/* << ลด Text Size/mb */}
                {/* Container รูปคอมเมนต์ (ไม่จำกัดความสูง) */}
                <motion.div
                  className="space-y-2 flex-grow"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {" "}
                  {/* << ลด space-y + เพิ่ม flex-grow */}
                  {/* แสดงรูปภาพคอมเมนต์ 4 รูป */}
                  <motion.img
                    variants={fadeInUp}
                    src="/comment1.avif"
                    alt="Comment 1"
                    className="w-full h-auto rounded-lg shadow-sm block"
                    loading="lazy"
                  />{" "}
                  {/* << แก้ Path */}
                  <motion.img
                    variants={fadeInUp}
                    src="/comment2.avif"
                    alt="Comment 2"
                    className="w-full h-auto rounded-lg shadow-sm block"
                    loading="lazy"
                  />{" "}
                  {/* << แก้ Path */}
                  <motion.img
                    variants={fadeInUp}
                    src="/comment3.avif"
                    alt="Comment 3"
                    className="w-full h-auto rounded-lg shadow-sm block"
                    loading="lazy"
                  />{" "}
                  {/* << แก้ Path */}
                  <motion.img
                    variants={fadeInUp}
                    src="/comment4.avif"
                    alt="Comment 4"
                    className="w-full h-auto rounded-lg shadow-sm block"
                    loading="lazy"
                  />{" "}
                  {/* << แก้ Path */}
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
      {/* === Gallery Section (Responsive - แสดงเฉพาะ Desktop) === */}
      <section
        id="gallery"
        className="py-10 md:py-14 overflow-hidden bg-gradient-to-b from-white to-gray-50 scroll-mt-16 md:scroll-mt-20"
      >
        <div className="container mx-auto px-4 md:px-6">
          {" "}
          {/* << ใช้ px-4 เสมอ */}
          {/* Heading (Gradient) */}
          <motion.h2
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-800 leading-tight"
          >
            <span className="block text-gray-900">ออกแบบรอยยิ้ม</span>
            <span className="block text-5xl md:text-6xl bg-clip-text text-transparent my-1 md:my-2 leading-tight md:leading-none bg-[linear-gradient(90deg,rgba(131,58,180,1)_0%,rgba(253,29,29,1)_50%,rgba(252,176,69,1)_100%)]">
              Afterdent สูตรที่หมอใช้ในห้องฟัน
            </span>
            <span className="block text-lg md:text-xl font-medium text-gray-600 mt-1">
              "หอมนาน ไม่เสียวฟัน"{" "}
              {/* << แก้ไขข้อความบรรทัด 3 ตามที่คุณใส่มา */}
            </span>
          </motion.h2>
          {/* --- Desktop View (ใช้ GalleryRow ที่แก้ไข - จำกัดระยะเลื่อน) --- */}
          {/* ส่วนนี้จะแสดงเฉพาะ md ขึ้นไป */}
          <div className="hidden md:block space-y-6 lg:space-y-8">
            {/* *** สำคัญ: ต้องแน่ใจว่า GalleryRow ที่เรียกใช้ คือเวอร์ชันที่แก้ useTransform แล้ว *** */}
            {/* *** และต้อง Import GalleryRow เข้ามาในไฟล์นี้ด้วย *** */}
            <GalleryRow images={galleryImagesTop} />
            <GalleryRow images={galleryImagesBottom} reverse />
          </div>
          {/* --- Mobile View (ถูกลบออกไปแล้ว) --- */}
        </div>
      </section>
      {/* === Products Section (แก้ไข Heading ให้มี Gradient + Animation) === */}
      {/* ใส่ id และ scroll-mt สำหรับ Navbar link */}
      <section id="products" className="py-12 md:py-16 bg-gray-50 scroll-mt-16">
        {/* << ปรับ Padding ให้เท่า Gallery Section */}
        <div className="container mx-auto px-4 md:px-6">
          {/* --- ส่วน Heading ที่ปรับปรุง --- */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }} // << ใช้ Easing แบบนุ่มนวล
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 md:mb-16" // << mb เหมือนเดิม หรือปรับลดได้
          >
            {/* Heading h2: เปลี่ยนเป็น Gradient สี Cyan-Teal */}
            <h2
              className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent" // << Gradient Cyan-Teal
            >
              {/* คุณอาจจะเปลี่ยน Text ตรงนี้ด้วย */}
              ผลิตภัณฑ์ที่ดีที่สุดของเรา
            </h2>
            {/* Subtitle p: ใช้ font-sans */}
            <p className="text-md md:text-lg text-gray-500 max-w-2xl mx-auto font-sans">
              Effective solutions for your daily oral hygiene routine.
            </p>
          </motion.div>

          {/* --- ส่วน Grid แสดง Product Cards (เรียกใช้ ProductCard ที่แก้แล้ว) --- */}
          <motion.div
            variants={staggerContainer} // ใช้ Variant ที่ลด Delay แล้ว
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {/* products และ ProductCard ถูกนิยามไว้ใน App.tsx */}
            {/* ส่วนนี้จะเรียก ProductCard ที่เราแก้ไขให้มีปุ่มสั่งซื้อ และลด Animation แล้ว */}
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
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
      {/* === Section (Style ตาม Screenshot - ใช้รูปภาพเกือบทั้งหมด) === */}
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
            {/* --- คอลัมน์ซ้าย (วางรูปภาพซ้อนกัน) --- */}
            <motion.div
              // Container หลัก ใช้ relative เพื่อให้ absolute ข้างในอ้างอิงได้
              className="relative w-full max-w-sm mx-auto md:max-w-md" // << ปรับ max-w ให้เหมาะสม
              variants={fadeInLeft}
            >
              {/* 1. รูปภาพ Sidebar (อยู่หลังสุด แต่โผล่มาด้านข้าง) */}
              <motion.img
                src="/img9.webp" // <<== แก้ Path รูป Sidebar
                alt="Sidebar"
                className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[40%] sm:-translate-x-[50%] w-16 sm:w-20 z-10" // << ปรับตำแหน่ง/ขนาด
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />

              {/* 2. รูปภาพหลัก + กรอบ (เป็น Layer กลาง) */}
              <motion.img
                src="/img12.webp" // <<== แก้ Path รูปหลัก+กรอบ
                alt="Main content"
                // กำหนดขนาดด้วย max-w หรือ width เต็ม container และ aspect ratio จากรูปเอง
                className="relative block w-full h-auto rounded-[36px] shadow-xl z-20" // << ใช้ relative, block และ z-20
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* 3. รูปภาพหัวใจ (อยู่บนสุด) */}
              <motion.img
                src="./Like.png" // <<== แก้ Path รูปหัวใจ
                alt="Like"
                className="absolute top-3 sm:top-4 right-[-10px] sm:right-[-15px] w-14 h-auto sm:w-16 z-30" // << ใช้ h-auto, ปรับตำแหน่ง/ขนาด
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 180 }}
              />

              {/* 4. รูปภาพ Visualizer (อยู่บนสุด) */}
              <motion.img
                src="/3d3.webp" // <<== แก้ Path รูป Visualizer
                alt="Visualizer"
                className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 w-20 sm:w-24 h-auto z-30" // << ใช้ h-auto
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />

              {/* 5. รูปภาพ Timestamp (อยู่บนสุด) */}
              <motion.img
                src="/3d4.webp" // <<== แก้ Path รูป Timestamp
                alt="Timestamp"
                className="absolute bottom-5 sm:bottom-6 right-5 sm:right-6 w-16 sm:w-20 h-auto z-30" // << ใช้ h-auto
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
            </motion.div>

            {/* --- คอลัมน์ขวา (Heading เป็น Text, กราฟิกเป็น รูปภาพ) --- */}
            <motion.div
              className="flex flex-col text-center md:text-left"
              variants={fadeInRight}
            >
              {/* Heading (Text ใหม่ + Gradient + Animation) */}
              <motion.h2
                variants={fadeInUp} // << ใช้ Animation เปิดตัวสำหรับ H2 ทั้งก้อน
                initial="hidden" // << เพิ่ม initial/whileInView ให้ H2 โดยตรง
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                // Gradient Text Classes + ขนาด + Font
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8 font-sans
                           bg-clip-text text-transparent
                           bg-[linear-gradient(90deg,rgba(131,58,180,1)_0%,rgba(253,29,29,1)_50%,rgba(252,176,69,1)_100%)]" // << ใส่ Gradient
              >
                {/* ใส่ข้อความใหม่ */}
                มั่นใจเมื่อไหร่...ต้อง Afterdent!
              </motion.h2>

              {/* Graphics Row (ใช้รูปภาพ) */}
              <motion.div
                className="grid grid-cols-3 gap-3 sm:gap-4"
                variants={staggerContainer}
              >
                {/* Graphic 1: จึ้ง (รูปภาพ) */}
                <motion.img
                  variants={fadeInUp}
                  src="/img3.JPG" // <<== แก้ Path
                  alt="จึ้ง Graphic"
                  className="w-full h-auto rounded-2xl shadow-md" // ขนาดจะปรับตาม Grid และรูปภาพ
                />
                {/* Graphic 2: ดึง (รูปภาพ) */}
                <motion.img
                  variants={fadeInUp}
                  src="/img9.webp" // <<== แก้ Path
                  alt="ดึง Graphic"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
                {/* Graphic 3: ดม (รูปภาพ) */}
                <motion.img
                  variants={fadeInUp}
                  src="/img13.webp" // <<== แก้ Path
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
        className="w-screen py-16 md:py-24 bg-white scroll-mt-16 md:scroll-mt-20"
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              LDC Dental & Afterdent
            </h2>
            <p className="text-md md:text-lg text-gray-500 max-w-2xl mx-auto">
              การผสานความเชี่ยวชาญด้านทันตกรรมกับผลิตภัณฑ์ดูแลช่องปากธรรมชาติ
              เพื่อรอยยิ้มที่มั่นใจและสุขภาพดี
            </p>
          </motion.div>

          {/* Mission & Vision Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-20">
            {/* LDC Dental Box */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                วิสัยทัศน์ของ LDC Dental
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                มุ่งมั่นเป็นผู้นำด้านบริการสุขภาพช่องปาก
                ด้วยทีมทันตแพทย์ผู้เชี่ยวชาญและเทคโนโลยีทันสมัย
              </p>
              <p className="text-gray-600 leading-relaxed">
                ยกระดับมาตรฐานการบริการให้เทียบเท่าระดับสากล
                เพื่อความพึงพอใจสูงสุดของผู้รับบริการ
              </p>
            </motion.div>

            {/* Afterdent Box */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                พันธกิจของ Afterdent
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                เสริมสร้างสุขภาพช่องปากด้วยผลิตภัณฑ์ธรรมชาติ ปราศจากสารเคมี
                เพื่อความมั่นใจในทุกยิ้ม
              </p>
              <p className="text-gray-600 leading-relaxed">
                มุ่งเน้นความยั่งยืนและความปลอดภัยของผู้บริโภคเป็นสำคัญ
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              เรื่องราวของเรา
            </h3>
            <div className="prose lg:prose-lg max-w-none text-gray-600 text-left md:text-center">
              <p>
                LDC Dental ก่อตั้งขึ้นในปี 1992
                โดยมีเป้าหมายในการให้บริการทันตกรรมที่มีคุณภาพสูงสุดแก่คนไทยทั่วประเทศ
              </p>
              <p>
                Afterdent
                เกิดจากความตั้งใจในการสร้างผลิตภัณฑ์ดูแลช่องปากที่ปลอดภัยและเป็นธรรมชาติ
                เพื่อสุขภาพช่องปากที่ยั่งยืน
              </p>
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
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
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100 transition-shadow hover:shadow-md"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center mb-4 border border-white">
                  <value.icon className="w-7 h-7 text-cyan-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* --- Footer --- */}
      <Footer />
    </div>
  );
}

export default App;
