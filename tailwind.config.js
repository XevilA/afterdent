/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // เริ่ม object theme
    extend: {
      // เริ่ม object extend
      fontFamily: {
        // เริ่ม object fontFamily
        sans: [
          /* ใส่ฟอนต์ sans เดิมของคุณ หรือ fallback เช่น */
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "DB Helvethaica Mon X",
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ], // << อย่าลืมใส่ fallback หรือฟอนต์ sans เดิมของคุณ
        kodchasan: ["Kodchasan", "sans-serif"], // << ที่คุณเพิ่มมา ถูกต้องแล้ว!
      }, // << ปิด object fontFamily
    }, // << ปิด object extend
  }, // << ปิด object theme
  plugins: [], // << ย้าย plugins มาอยู่นอก theme
};
