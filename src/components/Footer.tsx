// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-[#f0f4f8] text-gray-700 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* โลโก้และข้อความแนะนำ */}
          <div className="col-span-2 md:col-span-2">
            <img
              src="/logo.svg"
              alt="Afterdent Care Logo"
              className="h-16 mb-4"
            />
            <p className="text-sm text-gray-600 pr-4">
              มุ่งมั่นในการให้บริการผลิตภัณฑ์ดูแลช่องปากที่มีคุณภาพสูงและเป็นธรรมชาติ
              เพื่อรอยยิ้มที่มั่นใจและสุขภาพดี
            </p>
          </div>

          {/* ลิงก์ด่วน */}
          <div className="col-span-1">
            <h4 className="text-base font-semibold text-[#004080] mb-3 tracking-wide">
              ลิงก์ด่วน
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#0066cc] transition-colors">
                  หน้าแรก
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-[#0066cc] transition-colors"
                >
                  ผลิตภัณฑ์
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#0066cc] transition-colors"
                >
                  เกี่ยวกับเรา
                </a>
              </li>
              <li>
                <a
                  href="#developer-section"
                  className="hover:text-[#0066cc] transition-colors"
                >
                  ผู้พัฒนา
                </a>
              </li>
            </ul>
          </div>

          {/* สินค้า */}
          <div className="col-span-1">
            <h4 className="text-base font-semibold text-[#004080] mb-3 tracking-wide">
              สินค้า
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#products"
                  className="hover:text-[#0066cc] transition-colors"
                >
                  ยาสีฟัน
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-[#0066cc] transition-colors"
                >
                  แปรงสีฟัน
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-[#0066cc] transition-colors"
                >
                  น้ำยาบ้วนปาก
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-[#0066cc] transition-colors"
                >
                  ชุดรวมสินค้า
                </a>
              </li>
            </ul>
          </div>

          {/* การสนับสนุน */}
          <div className="col-span-1">
            <h4 className="text-base font-semibold text-[#004080] mb-3 tracking-wide">
              การสนับสนุน
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#0066cc] transition-colors">
                  คำถามที่พบบ่อย
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0066cc] transition-colors">
                  การจัดส่งและการคืนสินค้า
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0066cc] transition-colors">
                  บัญชีผู้ใช้
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* copyright */}
        <div className="border-t border-gray-300 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Afterdent Care. สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
