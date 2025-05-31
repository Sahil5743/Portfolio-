"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Check, Code, ExternalLink, Github, Mail, Menu, Palette, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import HeroStarBackground from "@/components/hero-star-background"

export default function Portfolio() {
  // Set default theme color to orange to match the screenshot
  const [themeColor, setThemeColor] = useState("orange")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)

  // Theme color options
  const themeColors = ["purple", "blue", "green", "orange", "pink"]

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const currentProgress = window.scrollY / totalScroll
      setScrollProgress(currentProgress)

      // Update active section based on scroll position
      const sections = ["home", "about", "education", "skills", "projects", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Apply theme changes
  useEffect(() => {
    // Always in dark mode
    document.documentElement.classList.add("dark")

    // Set theme color
    document.documentElement.setAttribute("data-theme", themeColor)
  }, [themeColor])

  const changeThemeColor = (color) => {
    setThemeColor(color)
    setThemeMenuOpen(false)
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const toggleThemeMenu = () => setThemeMenuOpen(!themeMenuOpen)

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 transition-colors duration-300 theme-${themeColor}`}
    >
      {/* Background animated elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 bg-${themeColor}-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob`}
        ></div>
        <div
          className={`absolute top-40 -left-20 w-80 h-80 bg-${themeColor}-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000`}
        ></div>
        <div
          className={`absolute -bottom-40 left-20 w-80 h-80 bg-${themeColor}-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000`}
        ></div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className={`h-full bg-gradient-to-r from-${themeColor}-500 via-${themeColor}-400 to-${themeColor}-600`}
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className={`text-xl font-bold bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-transparent bg-clip-text`}
              >
                Portfolio
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["home", "about", "education", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium capitalize transition-colors hover:text-${themeColor}-400 ${activeSection === item ? `text-${themeColor}-400` : ""
                    }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Theme color selector */}
              <div className="relative">
                <button
                  onClick={toggleThemeMenu}
                  className={`p-2 rounded-full hover:bg-gray-800 transition-colors text-${themeColor}-400`}
                  aria-label="Change theme color"
                >
                  <Palette className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {themeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-700"
                    >
                      <div className="px-4 py-2 text-sm font-medium text-gray-400">Theme Colors</div>
                      {themeColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => changeThemeColor(color)}
                          className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-700 ${themeColor === color ? `text-${color}-400 font-medium` : ""
                            }`}
                        >
                          <span className={`h-4 w-4 rounded-full bg-${color}-500 mr-3`}></span>
                          <span className="capitalize">{color}</span>
                          {themeColor === color && <Check className="h-4 w-4 ml-auto" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-gray-900 pt-16"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {["home", "about", "education", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="py-3 px-4 text-lg font-medium capitalize hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
              <div className="border-t border-gray-700 my-2 pt-4">
                <div className="px-4 text-sm font-medium text-gray-400 mb-2">Theme Colors</div>
                <div className="flex flex-wrap gap-2 px-4">
                  {themeColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => changeThemeColor(color)}
                      className={`h-8 w-8 rounded-full bg-${color}-500 ${themeColor === color ? "ring-2 ring-offset-2 ring-offset-gray-900" : ""
                        }`}
                      aria-label={`${color} theme`}
                    ></button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Hero Section with Star Background */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center py-20 relative bg-[#111827]">
          {/* Star background specifically for the hero section */}
          <div className="absolute inset-0 overflow-hidden">
            <HeroStarBackground themeColor={themeColor} />
          </div>

          <div className="relative max-w-3xl z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Hi, I'm{" "}
                <span
                  className={`bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-transparent bg-clip-text`}
                >
                  Sahil
                </span>
              </h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-300"
              >
                Full Stack Developer
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-gray-400 mb-8 max-w-2xl"
              >
                I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollToSection("projects")}
                  className={`px-6 py-3 bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white rounded-lg transition-colors flex items-center gap-2`}
                >
                  View My Work <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`px-6 py-3 border border-${themeColor}-600 text-${themeColor}-400 hover:bg-${themeColor}-600/10 rounded-lg transition-colors`}
                >
                  Contact Me
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              About{" "}
              <span
                className={`bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-transparent bg-clip-text`}
              >
                Me
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr from-${themeColor}-600 to-${themeColor}-400 rounded-2xl transform rotate-3`}
                  ></div>
                  <Image
                    src="/placeholder-user.jpg" // <-- Use the provided image filename
                    alt="Profile"
                    width={400}
                    height={400}
                    className="relative rounded-2xl object-cover w-full h-full transform -rotate-3 transition-transform hover:rotate-0 duration-300"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold">Full Stack Developer based in New Delhi</h3>
                <p className="text-gray-400">
                  I'm a passionate web developer focused on crafting high-performance, scalable, and intuitive applications.
                   I specialize in React, Node.js, and modern web technologies to deliver clean, efficient, and user-friendly solutions.
                    I thrive on turning ideas into impactful digital experiences.
                </p>
                <p className="text-gray-400">
                  My approach combines technical expertise with creative problem-solving to deliver solutions that
                  exceed client expectations. I'm constantly learning and exploring new technologies to stay at the
                  forefront of web development.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="font-semibold">Name:</h4>
                    <p className="text-gray-400">Sahil</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email:</h4>
                    <p className="text-gray-400">sahilkv.5743@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Location:</h4>
                    <p className="text-gray-400">New Delhi, India</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Availability:</h4>
                    <p className="text-gray-400">Internship, Full-time</p>
                  </div>
                </div>
                <div className="pt-4">
                  <a
                    href="/cv.pdf"
                    download
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white rounded-lg transition-colors`}
                  >
                    Download CV <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              My{" "}
              <span
                className={`bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-transparent bg-clip-text`}
              >
                Education
              </span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div
                  className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-${themeColor}-600/30`}
                ></div>

                {/* College Education */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative flex flex-col md:flex-row items-start mb-16"
                >
                  <div className="flex items-center justify-center md:justify-end md:w-1/2 md:pr-8 pb-8 md:pb-0">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:max-w-md">
                      <div className={`text-${themeColor}-400 text-sm font-semibold mb-2`}>2024 - 2028</div>
                      <h3 className="text-xl font-bold mb-2">Bachelor of Technology in Computer Science & AiMl</h3>
                      <p className="text-gray-400 mb-2">Dronacharya College of Engineering </p>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-sm bg-${themeColor}-900/30 text-${themeColor}-400 font-medium`}
                      >
                        CGPA: NA
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-${themeColor}-600 border-4 border-gray-900 flex items-center justify-center`}
                  >
                    <div className={`w-2 h-2 rounded-full bg-${themeColor}-200`}></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 pl-12">
                    <div className="pt-2">
                      <h4 className="font-semibold mb-2">Key Courses</h4>
                      <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Data Structures and Algorithms</li>
                        <li>Web Development</li>
                        <li>Database Management Systems</li>
                        <li>Machine Learning</li>
                        <li>Software Engineering</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* 12th Education */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative flex flex-col md:flex-row-reverse items-start mb-16"
                >
                  <div className="flex items-center justify-center md:justify-start md:w-1/2 md:pl-8 pb-8 md:pb-0">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:max-w-md">
                      <div className={`text-${themeColor}-400 text-sm font-semibold mb-2`}>2023 - 2024</div>
                      <h3 className="text-xl font-bold mb-2">Higher Secondary Education (12th)</h3>
                      <p className="text-gray-400 mb-2">Adarsh Jain Public School</p>
                    </div>
                  </div>
                  <div
                    className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-${themeColor}-600 border-4 border-gray-900 flex items-center justify-center`}
                  >
                    <div className={`w-2 h-2 rounded-full bg-${themeColor}-200`}></div>
                  </div>
                  <div className="md:w-1/2 md:pr-8 md:text-right pl-12 md:pl-0">
                    <div className="pt-2">
                      <h4 className="font-semibold mb-2">Subjects</h4>
                      <p className="text-gray-400">Physics, Chemistry, Mathematics (PCM)</p>
                      <p className="text-gray-400 mt-2">Physical Education, English</p>
                     
                    </div>
                  </div>
                </motion.div>

                {/* 10th Education */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative flex flex-col md:flex-row items-start"
                >
                  <div className="flex items-center justify-center md:justify-end md:w-1/2 md:pr-8 pb-8 md:pb-0">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:max-w-md">
                      <div className={`text-${themeColor}-400 text-sm font-semibold mb-2`}>2021 - 2022</div>
                      <h3 className="text-xl font-bold mb-2">Secondary Education (10th)</h3>
                      <p className="text-gray-400 mb-2">Kendriya Vidyalaya School</p>
                    </div>
                  </div>
                  <div
                    className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-${themeColor}-600 border-4 border-gray-900 flex items-center justify-center`}
                  >
                    <div className={`w-2 h-2 rounded-full bg-${themeColor}-200`}></div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 pl-12">
                    <div className="pt-2">
                      <h4 className="font-semibold mb-2">Subjects</h4>
                      <p className="text-gray-400">Mathematics, Science, Social Studies</p>
                      <p className="text-gray-400 mt-2">English, Hindi, Computer Science</p>
              
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              My{" "}
              <span
                className={`bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-transparent bg-clip-text`}
              >
                Skills
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "React", icon: <Code className="h-6 w-6" />, level: 90, color: "from-blue-500 to-cyan-400" },
                {
                  name: "JavaScript",
                  icon: <Code className="h-6 w-6" />,
                  level: 95,
                  color: "from-yellow-400 to-yellow-600",
                },
                {
                  name: "TypeScript",
                  icon: <Code className="h-6 w-6" />,
                  level: 85,
                  color: "from-blue-600 to-blue-400",
                },
                {
                  name: "Node.js",
                  icon: <Code className="h-6 w-6" />,
                  level: 80,
                  color: "from-green-500 to-green-700",
                },
                {
                  name: "HTML/CSS",
                  icon: <Code className="h-6 w-6" />,
                  level: 90,
                  color: "from-orange-500 to-red-500",
                },
                {
                  name: "Tailwind CSS",
                  icon: <Code className="h-6 w-6" />,
                  level: 85,
                  color: "from-cyan-500 to-blue-500",
                },
                { name: "Next.js", icon: <Code className="h-6 w-6" />, level: 80, color: "from-gray-700 to-gray-900" },
                {
                  name: "MongoDB",
                  icon: <Code className="h-6 w-6" />,
                  level: 75,
                  color: "from-green-600 to-green-800",
                },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.2 },
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 transform"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className={`p-3 bg-gradient-to-br ${skill.color} rounded-lg text-white`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                    >
                      {skill.icon}
                    </motion.div>
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`bg-gradient-to-r ${skill.color} h-3 rounded-full relative`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2 + index * 0.1,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <span className="absolute -right-1 -top-7 bg-gray-800 text-xs font-semibold py-1 px-2 rounded shadow">
                        {skill.level}%
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              My{" "}
              <span
                className={`bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-transparent bg-clip-text`}
              >
                Projects
              </span>
            </h2>

            <motion.p
              className="text-center text-gray-400 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Here are some of my recent projects. Each one was carefully crafted with attention to detail and modern
              technologies.
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Minnitwitter Clone",
                  description: "A real-time Twitter clone with user authentication and live updates.",
                  image: "/placeholder.svg?height=300&width=500",
              
                  tags: ["React", "Node.js", "MongoDB"],
                },
                {
                  title: "Note-taking Application",
                  description: "A collaborative note-taking app with rich text editing and sharing features.",
                  image: "/placeholder.svg?height=300&width=500",
                 
                  tags: ["React", "Tailwind CSS"],
                },
                // {
                //   title: "Task Management App",
                //   description: "Collaborative task management application with real-time updates.",
                //   image: "/placeholder.svg?height=300&width=500",
                //   tags: ["React", "Firebase", "Tailwind CSS"],
                // },
                {
                  title: "Portfolio Website",
                  description: "Responsive portfolio website with dark mode and animations.",
                  image: "/placeholder.svg?height=300&width=500",
                  tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
                },
                // {
                //   title: "Weather Application",
                //   description: "Real-time weather forecasting app with location detection.",
                //   image: "/placeholder.svg?height=300&width=500",
                //   tags: ["React", "OpenWeather API", "Geolocation"],
                // },
                // {
                //   title: "Recipe Finder",
                //   description: "Search and save recipes with filtering by ingredients and dietary restrictions.",
                //   image: "/placeholder.svg?height=300&width=500",
                //   tags: ["React", "Node.js", "MongoDB"],
                // },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 50,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg group border border-gray-700"
                >
                  <div className="relative overflow-hidden h-48">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="font-bold text-xl text-white mb-2"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="text-gray-200 text-sm mb-4"
                      >
                        {project.description}
                      </motion.p>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="flex gap-2"
                      >
                        <a
                          href="#"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                        >
                          <Github className="h-5 w-5 text-white" />
                        </a>
                        <a
                          href="#"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5 text-white" />
                        </a>
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className={`font-bold text-xl mb-2 group-hover:text-${themeColor}-400 transition-colors duration-300`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 },
                          }}
                          className={`px-3 py-1 bg-${themeColor}-900/30 text-${themeColor}-400 rounded-full text-sm`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-medium text-${themeColor}-400 hover:text-${themeColor}-300 flex items-center gap-1 group`}
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                View All Projects
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              Get In{" "}
              <span
                className={`bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-transparent bg-clip-text`}
              >
                Touch
              </span>
            </h2>

            {/* Contact section with card design */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-gray-700">
                <div className="grid lg:grid-cols-2">
                  {/* Left side - Contact info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`p-8 lg:p-12 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden`}
                  >
                    {/* Background accent */}
                    <div
                      className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400`}
                    ></div>
                    <div
                      className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-${themeColor}-600 to-${themeColor}-400`}
                    ></div>

                    <h3 className="text-2xl font-bold mb-6">Let's discuss your project</h3>
                    <p className="text-gray-400 mb-8">
                      I'm currently available for Internship work. Connect with me via phone, email or social media.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-${themeColor}-900/30 rounded-lg text-${themeColor}-400`}>
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Email</h4>
                          <a
                            href="mailto:sahilkv.5743@gmail.com"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            sahilkv.5743@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-${themeColor}-900/30 rounded-lg text-${themeColor}-400`}>
                          <Github className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold">GitHub</h4>
                          <a
                            href="https://github.com/Sahil5743"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            github.com/Sahil5743
                          </a>
                        </div>
                      </div>

                      <div className="pt-8">
                        <h4 className="font-semibold mb-4">Connect with me</h4>
                        <div className="flex space-x-4">
                          <a
                            href="https://github.com/Sahil5743"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 bg-${themeColor}-900/30 rounded-lg text-${themeColor}-400 hover:bg-${themeColor}-800/50 transition-colors`}
                          >
                            <Github className="h-5 w-5" />
                          </a>
                          <a
                            href="mailto:sahilkv.5743@gmail.com"
                            className={`p-3 bg-${themeColor}-900/30 rounded-lg text-${themeColor}-400 hover:bg-${themeColor}-800/50 transition-colors`}
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                          <a
                            href="#"
                            className={`p-3 bg-${themeColor}-900/30 rounded-lg text-${themeColor}-400 hover:bg-${themeColor}-800/50 transition-colors`}
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right side - Contact form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="p-8 lg:p-12"
                  >
                    <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
                    <form
                      className="space-y-6"
                      action={process.env.NEXT_PUBLIC_FORMSPREE_KEY}
                      method="POST"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className={`w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-${themeColor}-600 transition-all duration-300`}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className={`w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-${themeColor}-600 transition-all duration-300`}
                            placeholder="Your email"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className={`w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-${themeColor}-600 transition-all duration-300`}
                          placeholder="Subject"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className={`w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-${themeColor}-600 transition-all duration-300`}
                          placeholder="Your message"
                          required
                        ></textarea>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className={`w-full px-6 py-3 bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-white rounded-lg hover:shadow-lg hover:shadow-${themeColor}-600/20 transition-all duration-300`}
                      >
                        Send Message
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link
                href="/"
                className={`text-xl font-bold bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 text-transparent bg-clip-text`}
              >
                Portfolio
              </Link>
              <p className="mt-2 text-gray-400">Creating exceptional digital experiences.</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/Sahil5743"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 hover:text-${themeColor}-400`}
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="mailto:sahilkv.5743@gmail.com"
                className={`text-gray-400 hover:text-${themeColor}-400`}
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Sahil. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
