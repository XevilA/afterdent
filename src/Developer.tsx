import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code, ExternalLink } from 'lucide-react';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// --- Placeholder Data ---
// *** แทนที่ด้วยข้อมูลจริงของคุณ ***
const developerInfo = {
  name: "Your Name / Company Name",
  title: "Web Developer / Designer",
  bio: "Passionate developer creating modern and engaging web experiences. Specializing in React, TypeScript, and Tailwind CSS.",
  contact: {
    email: "your.email@example.com",
    linkedin: "https://linkedin.com/in/yourprofile", // ใส่ Link จริง
  },
  github: "https://github.com/yourusername", // ใส่ Link จริง
  projects: [
    { id: 1, name: "Project Alpha", description: "An innovative web application for task management.", tech: ["React", "Node.js", "MongoDB"], link: "#" },
    { id: 2, name: "Project Beta", description: "E-commerce platform focused on user experience.", tech: ["Next.js", "Tailwind CSS", "Stripe"], link: "#" },
    { id: 3, name: "Project Gamma", description: "Portfolio website showcasing creative work.", tech: ["React", "Framer Motion", "CMS"], link: "#" },
  ]
};

// --- Developer Component ---
const Developer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 font-sans">
      <div className="container mx-auto px-4 md:px-6">

        {/* --- Header --- */}
        <motion.div
          initial="hidden" animate="visible" variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Meet the Developer
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-500">
            Behind the scenes of Afterdent Care's web presence.
          </motion.p>
        </motion.div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

          {/* --- Left Column (Info & Contact) --- */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
            className="lg:col-span-1 bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">{developerInfo.name}</h2>
            <p className="text-teal-600 font-medium mb-4">{developerInfo.title}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{developerInfo.bio}</p>

            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-t pt-4">Contact & Links</h3>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${developerInfo.contact.email}`} className="flex items-center text-gray-600 hover:text-teal-700 transition-colors group">
                <Mail className="w-4 h-4 mr-2 text-gray-400 group-hover:text-teal-600" /> {developerInfo.contact.email}
              </a>
              <a href={developerInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-teal-700 transition-colors group">
                <Github className="w-4 h-4 mr-2 text-gray-400 group-hover:text-teal-600" /> GitHub Profile
              </a>
              <a href={developerInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-teal-700 transition-colors group">
                <Linkedin className="w-4 h-4 mr-2 text-gray-400 group-hover:text-teal-600" /> LinkedIn Profile
              </a>
            </div>
          </motion.div>

          {/* --- Right Column (Projects) --- */}
          <motion.div
             initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
             className="lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Projects</h2>
            <div className="space-y-6">
              {developerInfo.projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-teal-700">{project.name}</h3>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-teal-600 flex items-center">
                      View <ExternalLink className="w-3 h-3 ml-1"/>
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Developer;