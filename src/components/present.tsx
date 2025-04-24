import { motion } from "framer-motion";

export default function Present() {
  return (
    <section
      id="introduction"
      className="py-16 md:py-32 bg-white scroll-mt-16 md:scroll-mt-20 font-['IBM Plex Sans']"
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
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
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 drop-shadow-md"
            >
              AFTERDENT สูตรที่หมอใช้ในห้องฟัน!
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-base md:text-2xl text-gray-800 md:text-gray-600 leading-relaxed space-y-4"
            >
              <span className="block md:hidden">
                AFTERDENT ถูกออกแบบมาเพื่อใช้ในคลินิก LDC Dental
                โดยทันตแพทย์แนะนำให้ผู้ป่วยใช้ก่อนการรักษา
                เพื่อเตรียมความพร้อมและลดความเสี่ยงในการติดเชื้อ
                รสชาติแครนเบอร์รี่หอมหวาน บ้วนปากง่าย สนุก และมั่นใจ
                เหมาะกับทุกเพศทุกวัย เพราะนี่คือสูตรที่หมอเลือกใช้!
              </span>
              <span className="hidden md:block">
                ผลิตภัณฑ์ของเราได้รับการออกแบบมาเพื่อใช้ในคลินิก LDC Dental
                โดยทันตแพทย์จะแนะนำให้ผู้ป่วยใช้ก่อนการรักษา
                เพื่อเตรียมความพร้อมและลดความเสี่ยงของการติดเชื้อ
                รสชาติแครนเบอร์รี่หอมหวาน
                ทำให้การบ้วนปากเป็นเรื่องง่ายและน่าสนุก เหมาะสำหรับทุกเพศทุกวัย
                ให้คุณดูแลสุขภาพช่องปากได้อย่างมั่นใจ เพราะนี่คือ
                สูตรที่หมอเลือกใช้.
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
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white text-sm md:text-base font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300"
              >
                สั่งซื้อเลย
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
