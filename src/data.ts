// src/data.ts (อัปเดต: เพิ่ม purchaseUrl ใน Product)

import React from "react";
import { Sparkles, Leaf, ShieldCheck, CheckCircle } from "lucide-react";
// src/data.ts (เพิ่ม Interface นี้)
export interface Benefit {
  id: string;
  title: string;
  description: string;
  // icon?: React.ElementType; // Icon อาจจะมีหรือไม่มีก็ได้
}
// --- Gallery Data ---
export const galleryImagesTop = [
  "/LDCIMG16.jpg",
  "/LDCIMG24.jpg",
  "/LDCIMG27.jpg",
  "/LDCIMG18.jpg",
  "/LDCIMG20.jpg",
  "/LDCIMG19.jpg",
  "/LDCIMG5.jpg",
  "/LDCIMG3.jpg",
];
export const galleryImagesBottom = [
  "/LDCIMG37.jpg",
  "/LDCIMG16.jpg",
  "/LDCIMG24.jpg",
  "/LDCIMG11.jpg",
  "/LDCIMG24.jpg",
  "/LDCIMG25.jpg",
  "/LDCIMG29.jpg",
  "/LDCIMG31.jpg",
];

// --- Types (แก้ไข Product Interface) ---
export interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  purchaseUrl?: string; // <<== เพิ่ม property นี้
}

export interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
}
// --- จบ Types ---

// --- Products Data (เพิ่ม purchaseUrl) ---
export const products: Product[] = [
  // << ใส่ Type Product[]
  {
    id: "p1",
    image: "/asset04.webp",
    title: "ยาสีฟัน AFTERDENT Delight Toothpaste กลิ่นแครนเบอรี่",
    description:
      "เป็นยาสีฟันชนิดเจลสูตรอ่อนโยน ป้องกันฟันผุ ช่วยลดการเสียวฟัน ช่วยลดการสะสมของแบคทีเรียซึ่งเป็นสาเหตุของกลิ่นปากและอาการฟันผุ เหมาะสำหรับคนจัดฟัน ปริมาณ 100 กรัม",
    purchaseUrl:
      "https://shopee.co.th/ยาสีฟัน-AFTERDENT-Cranberry-Delight-ชุ่มชื้น-ช่วยสมานแผลในช่องปาก-i.135011894.12024470629", // <<== *** แก้ไข URL ***
  },
  {
    id: "p2",
    image: "/asset01.webp",
    title: "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ โฉมใหม่",
    description:
      "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ ขนาด 500ml สูตรผสมฟลูออไรด์ ช่วยลดกลิ่นปาก ทำความสะอาดล้ำลึก พร้อมดูแลเหงือกและเคลือบฟันให้แข็งแรง สดชื่นทุกครั้งที่ใช้",
    purchaseUrl:
      "https://shopee.co.th/product/135011894/29975611175?d_id=29559&uls_trackid=52fi3tqd00ve&utm_content=2Mf9cQbpVLMYrG7Pa2tB9bqxNMqR", // <<== *** แก้ไข URL ***
  },
  {
    id: "p3",
    image: "/asset01.webp",
    title: "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ โฉมใหม่",
    description:
      "หอมสดชื่น อ่อนโยน ไม่แสบปาก เสริมฟันแข็งแรงด้วยฟลูออไรด์ ลดกลิ่นปาก พร้อมปกป้องช่องปากในทุกวัน.",
    purchaseUrl:
      "https://shopee.co.th/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B9%89%E0%B8%A7%E0%B8%99%E0%B8%9B%E0%B8%B2%E0%B8%81-AFTERDENT-%E0%B8%AA%E0%B8%94%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%99-%E0%B8%A5%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%9A%E0%B8%B2%E0%B8%94%E0%B9%81%E0%B8%9C%E0%B8%A5%E0%B9%83%E0%B8%99%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%B2%E0%B8%81-%E0%B8%81%E0%B8%A5%E0%B8%B4%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88-%E0%B8%A1%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B9%8C--i.135011894.2395811065", // <<== *** แก้ไข URL ***
  },
  {
    id: "p4",
    image: "/asset04.webp",
    title: "ยาสีฟัน AFTERDENT Delight Toothpaste กลิ่นแครนเบอรี่",
    description:
      "เป็นยาสีฟันชนิดเจลสูตรอ่อนโยน ป้องกันฟันผุ ช่วยลดการเสียวฟัน ช่วยลดการสะสมของแบคทีเรียซึ่งเป็นสาเหตุของกลิ่นปากและอาการฟันผุ เหมาะสำหรับคนจัดฟัน ปริมาณ 100 กรัม",
    purchaseUrl:
      "https://shopee.co.th/Bundle-AFTERDENT-Cranberry-%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B9%89%E0%B8%A7%E0%B8%99%E0%B8%9B%E0%B8%B2%E0%B8%81-%E0%B8%A2%E0%B8%B2%E0%B8%AA%E0%B8%B5%E0%B8%9F%E0%B8%B1%E0%B8%99-%E0%B8%81%E0%B8%A5%E0%B8%B4%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88-%E0%B8%AB%E0%B8%AD%E0%B8%A1%E0%B8%AA%E0%B8%94%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%99-i.135011894.29312090401", // <<== *** แก้ไข URL ***
  },
  {
    id: "p5",
    image: "/LDCIMG3.jpg",
    title:
      "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ โฉมใหม่ 700ml x3 สดชื่น ลดการระบมในช่องปาก",
    description:
      "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ ขนาด 500ml x3 สูตรผสมฟลูออไรด์ ช่วยลดกลิ่นปาก ทำความสะอาดล้ำลึก พร้อมดูแลเหงือกและเคลือบฟันให้แข็งแรง สดชื่นทุกครั้งที่ใช้",
    purchaseUrl:
      "https://shopee.co.th/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B9%89%E0%B8%A7%E0%B8%99%E0%B8%9B%E0%B8%B2%E0%B8%81-AFTERDENT-%E0%B8%81%E0%B8%A5%E0%B8%B4%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88-%E0%B8%AA%E0%B8%94%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%99-%E0%B8%A5%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%9A%E0%B8%B2%E0%B8%94%E0%B9%81%E0%B8%9C%E0%B8%A5%E0%B9%83%E0%B8%99%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%B2%E0%B8%81-%E0%B9%81%E0%B8%9E%E0%B9%87%E0%B8%81-x3-i.135011894.26312080091", // <<== *** แก้ไข URL ***
  },
  {
    id: "p6",
    image: "/ldc-4.webp",
    title:
      "เครื่องพ่นน้ำทำความสะอาดฟัน Waterpik WP-660 Ultra Professional กำจัดคราบล้ำลึก เหมาะสำหรับคนจัดฟัน",
    description:
      "Waterpik WP-660 Ultra Professional เครื่องพ่นน้ำทำความสะอาดฟัน ช่วยขจัดคราบจุลินทรีย์และหินปูนได้ล้ำลึก ฆ่าเชื้อแบคทีเรียก่อกลิ่นได้ถึง 99% ให้ความสดชื่น พร้อมดูแลสุขภาพช่องปาก เหมาะสำหรับคนจัดฟัน รักษาราก ครอบฟัน หรือผู้ที่แปรงสีฟันเข้าถึงยาก.",
    purchaseUrl:
      "https://shopee.co.th/%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9E%E0%B9%88%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%97%E0%B8%B3%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B0%E0%B8%AD%E0%B8%B2%E0%B8%94%E0%B8%9F%E0%B8%B1%E0%B8%99-Waterpik-Ultra-Professional-(WP-660)-i.135011894.21985850407", // <<== *** แก้ไข URL ***
  },
];
export const ProductPreview: Product[] = [
  // << ใส่ Type Product[]
  {
    id: "p1",
    image: "/asset04.webp",
    title: "ยาสีฟัน AFTERDENT Delight Toothpaste กลิ่นแครนเบอรี่",
    description:
      "เป็นยาสีฟันชนิดเจลสูตรอ่อนโยน ป้องกันฟันผุ ช่วยลดการเสียวฟัน ช่วยลดการสะสมของแบคทีเรียซึ่งเป็นสาเหตุของกลิ่นปากและอาการฟันผุ เหมาะสำหรับคนจัดฟัน ปริมาณ 100 กรัม",
    purchaseUrl:
      "https://shopee.co.th/ยาสีฟัน-AFTERDENT-Cranberry-Delight-ชุ่มชื้น-ช่วยสมานแผลในช่องปาก-i.135011894.12024470629", // <<== *** แก้ไข URL ***
  },
  {
    id: "p2",
    image: "/asset01.webp",
    title: "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ โฉมใหม่",
    description:
      "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ ขนาด 500ml สูตรผสมฟลูออไรด์ ช่วยลดกลิ่นปาก ทำความสะอาดล้ำลึก พร้อมดูแลเหงือกและเคลือบฟันให้แข็งแรง สดชื่นทุกครั้งที่ใช้",
    purchaseUrl:
      "https://shopee.co.th/product/135011894/29975611175?d_id=29559&uls_trackid=52fi3tqd00ve&utm_content=2Mf9cQbpVLMYrG7Pa2tB9bqxNMqR", // <<== *** แก้ไข URL ***
  },
  {
    id: "p3",
    image: "/asset01.webp",
    title: "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ โฉมใหม่",
    description:
      "หอมสดชื่น อ่อนโยน ไม่แสบปาก เสริมฟันแข็งแรงด้วยฟลูออไรด์ ลดกลิ่นปาก พร้อมปกป้องช่องปากในทุกวัน.",
    purchaseUrl:
      "https://shopee.co.th/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B9%89%E0%B8%A7%E0%B8%99%E0%B8%9B%E0%B8%B2%E0%B8%81-AFTERDENT-%E0%B8%AA%E0%B8%94%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%99-%E0%B8%A5%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%9A%E0%B8%B2%E0%B8%94%E0%B9%81%E0%B8%9C%E0%B8%A5%E0%B9%83%E0%B8%99%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%B2%E0%B8%81-%E0%B8%81%E0%B8%A5%E0%B8%B4%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88-%E0%B8%A1%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B9%8C--i.135011894.2395811065", // <<== *** แก้ไข URL ***
  },
  {
    id: "p4",
    image: "/asset04.webp",
    title: "ยาสีฟัน AFTERDENT Delight Toothpaste กลิ่นแครนเบอรี่",
    description:
      "เป็นยาสีฟันชนิดเจลสูตรอ่อนโยน ป้องกันฟันผุ ช่วยลดการเสียวฟัน ช่วยลดการสะสมของแบคทีเรียซึ่งเป็นสาเหตุของกลิ่นปากและอาการฟันผุ เหมาะสำหรับคนจัดฟัน ปริมาณ 100 กรัม",
    purchaseUrl:
      "https://shopee.co.th/Bundle-AFTERDENT-Cranberry-%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B9%89%E0%B8%A7%E0%B8%99%E0%B8%9B%E0%B8%B2%E0%B8%81-%E0%B8%A2%E0%B8%B2%E0%B8%AA%E0%B8%B5%E0%B8%9F%E0%B8%B1%E0%B8%99-%E0%B8%81%E0%B8%A5%E0%B8%B4%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88-%E0%B8%AB%E0%B8%AD%E0%B8%A1%E0%B8%AA%E0%B8%94%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%99-i.135011894.29312090401", // <<== *** แก้ไข URL ***
  },
  {
    id: "p5",
    image: "/LDCIMG3.jpg",
    title:
      "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ โฉมใหม่ 700ml x3 สดชื่น ลดการระบมในช่องปาก",
    description:
      "น้ำยาบ้วนปาก AFTERDENT กลิ่นแครนเบอรี่ ขนาด 500ml x3 สูตรผสมฟลูออไรด์ ช่วยลดกลิ่นปาก ทำความสะอาดล้ำลึก พร้อมดูแลเหงือกและเคลือบฟันให้แข็งแรง สดชื่นทุกครั้งที่ใช้",
    purchaseUrl:
      "https://shopee.co.th/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B9%89%E0%B8%A7%E0%B8%99%E0%B8%9B%E0%B8%B2%E0%B8%81-AFTERDENT-%E0%B8%81%E0%B8%A5%E0%B8%B4%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88-%E0%B8%AA%E0%B8%94%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%99-%E0%B8%A5%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%9A%E0%B8%B2%E0%B8%94%E0%B9%81%E0%B8%9C%E0%B8%A5%E0%B9%83%E0%B8%99%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%B2%E0%B8%81-%E0%B9%81%E0%B8%9E%E0%B9%87%E0%B8%81-x3-i.135011894.26312080091", // <<== *** แก้ไข URL ***
  },
  {
    id: "p6",
    image: "/ldc-4.webp",
    title:
      "เครื่องพ่นน้ำทำความสะอาดฟัน Waterpik WP-660 Ultra Professional กำจัดคราบล้ำลึก เหมาะสำหรับคนจัดฟัน",
    description:
      "Waterpik WP-660 Ultra Professional เครื่องพ่นน้ำทำความสะอาดฟัน ช่วยขจัดคราบจุลินทรีย์และหินปูนได้ล้ำลึก ฆ่าเชื้อแบคทีเรียก่อกลิ่นได้ถึง 99% ให้ความสดชื่น พร้อมดูแลสุขภาพช่องปาก เหมาะสำหรับคนจัดฟัน รักษาราก ครอบฟัน หรือผู้ที่แปรงสีฟันเข้าถึงยาก.",
    purchaseUrl:
      "https://shopee.co.th/%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9E%E0%B9%88%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%97%E0%B8%B3%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B0%E0%B8%AD%E0%B8%B2%E0%B8%94%E0%B8%9F%E0%B8%B1%E0%B8%99-Waterpik-Ultra-Professional-(WP-660)-i.135011894.21985850407", // <<== *** แก้ไข URL ***
  },
];
// --- Features Data ---
export const features = [
  {
    id: "f1",
    icon: Sparkles,
    title: "Visibly Whiter Teeth",
    description: "Clinically proven to gently polish away stains.",
  },
  {
    id: "f2",
    icon: Leaf,
    title: "Natural Ingredients",
    description: "Formulated with effective, plant-derived components.",
  },
  {
    id: "f3",
    icon: ShieldCheck,
    title: "Enamel Safe",
    description: "Strengthens teeth and protects against sensitivity.",
  },
  {
    id: "f4",
    icon: CheckCircle,
    title: "Dentist Recommended",
    description: "Trusted by professionals for optimal oral health.",
  },
];
export interface SlideItem {
  id: string;
  backgroundImage: string; // <<== Path to background image
  title: string;
  subtitle: string;
  description: string;
}

// --- Example Slide Data (MUST EDIT PATHS & CONTENT!) ---
export const presentationSlides: SlideItem[] = [
  {
    id: "slide1",
    backgroundImage: "/LDCIMG42.jpg", // <<== *** แก้ Path ***
    title: "Implants",
    subtitle: "ทันตกรรมรากเทียม",
    description:
      "ทางเลือกใหม่สำหรับการใส่ฟันทดแทน สะดวก ไม่ต้องถอด และไม่ต้องสูญเสียเนื้อฟันซี่อื่น โดยทันตแพทย์เฉพาะทาง",
  },
  {
    id: "slide2",
    backgroundImage: "/clinic2.webp", // <<== *** แก้ Path ***
    title: "Esthetics",
    subtitle: "ทันตกรรมเพื่อความงาม",
    description:
      "ทันตแพทย์เฉพาะทาง ด้านการซ่อมแซมตัวฟันและการตกแต่งฟันเพื่อความสวยงาม",
  },
  {
    id: "slide3",
    backgroundImage: "/clinic1.webp", // <<== *** แก้ Path ***
    title: "Orthodontics", // << ชื่อตามรูปที่ 2
    subtitle: "ทันตกรรมจัดฟัน",
    description:
      "สำหรับผู้ที่ความผิดปกติในการสบฟัน ฟันห่าง ฟันซ้อนเก ทำให้ฟันเรียง ฟันสวย โดยทันตแพทย์เฉพาะทาง", // << เนื้อหาตามรูปที่ 2
  },
  // เพิ่ม Slides อื่นๆ ที่คุณต้องการ
];
