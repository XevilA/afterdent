// src/components/Navbar.tsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "../index.css";

// --- Menu Items ---
const navLinks = [
  { name: "หน้าแรก", path: "#hero", id: "hero" },
  { name: "ซื้อสินค้า", path: "#products", id: "products" },
  { name: "รีวิว", path: "#reviews", id: "reviews" },
  { name: "Gallery", path: "#gallery", id: "gallery" },
  { name: "เกี่ยวกับเรา", path: "#about", id: "about" },
];
// ------------------------------------------------------------

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // --- Logic ตรวจสอบ Section ที่ Active ---
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "hero";
      const navbarHeight = 64; // หรือความสูงจริงของ Navbar ถ้าปรับ
      const offset = navbarHeight + 60; // ปรับได้ตามความเหมาะสม
      let foundSection = false;
      let minDistance = Infinity;

      navLinks.forEach((link) => {
        if (link.path.startsWith("#") && link.id) {
          const element = document.getElementById(link.id);
          if (element) {
            const rect = element.getBoundingClientRect();

            if (rect.top >= 0 - offset && rect.top < window.innerHeight / 2) {
              const distanceToTop = Math.abs(rect.top);
              if (distanceToTop < minDistance) {
                minDistance = distanceToTop;
                currentSection = link.id;
                foundSection = true;
              }
            } else if (rect.top < offset && rect.bottom > offset) {
              if (!foundSection) {
                currentSection = link.id;
                foundSection = true;
                minDistance = Infinity;
              }
            }
          }
        }
      });

      if (window.scrollY < navbarHeight) {
        currentSection = "hero";
      }
      setActiveSection((prev) =>
        prev === currentSection ? prev : currentSection,
      );
    };

    let timeoutId: NodeJS.Timeout | null = null;
    const debouncedScrollHandler = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", debouncedScrollHandler, {
      passive: true,
    });
    handleScroll(); // ตรวจสอบครั้งแรก

    return () => {
      window.removeEventListener("scroll", debouncedScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  // ------------------------------------

  return (
    <>
      {/* Navbar สำหรับจอใหญ่ (md ขึ้นไป) */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-screen bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ส่วนซ้าย: Logo */}
            <div className="flex-1 flex justify-start">
              <a href="/" className="flex items-center flex-shrink-0">
                <img
                  className="h-12 md:h-[60px] w-auto"
                  src="/logo.svg"
                  alt="Afterdent Logo"
                />
              </a>
            </div>

            {/* ส่วนกลาง: Menu Links (Desktop) */}
            <div className="hidden md:flex justify-center flex-shrink-0">
              <div className="flex items-baseline space-x-4 lg:space-x-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === link.id
                        ? "text-teal-600 font-semibold"
                        : "text-gray-600 hover:text-teal-500"
                    }`}
                    aria-current={
                      activeSection === link.id ? "page" : undefined
                    }
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* ส่วนขวา: Hamburger */}
            <div className="flex-1 flex justify-end">
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {!isMobileMenuOpen ? <Menu size={24} /> : <X size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden fixed top-16 md:top-20 inset-x-0 z-40 bg-white shadow-lg overflow-hidden"
            id="mobile-menu"
          >
            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${
                    activeSection === link.id
                      ? "bg-teal-50 text-teal-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
