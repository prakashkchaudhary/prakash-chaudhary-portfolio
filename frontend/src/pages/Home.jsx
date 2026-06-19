import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaReact, FaNodeJs, FaDatabase, FaPython, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { SiJavascript, SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si'
import { HiDownload } from 'react-icons/hi'
import { getProjects } from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'
import LazyImage from '../components/LazyImage'

const Home = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await getProjects()
      setProjects(response.data.slice(0, 3)) // Get only first 3 projects
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToAbout = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  const skills = [
    { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
    { name: 'React', icon: FaReact, color: 'text-blue-500' },
    { name: 'Node.js', icon: FaNodeJs, color: 'text-green-600' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
    { name: 'Express', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
    { name: 'Python', icon: FaPython, color: 'text-blue-600' },
    { name: 'Database', icon: FaDatabase, color: 'text-orange-500' }
  ]

  const education = [
    {
      degree: 'Bachelor in Computer Application (BCA)',
      institution: "Tula's Institute",
      location: 'Dehradun, India',
      year: '2023 - 2026',
      status: 'Completed'
    },
    {
      degree: 'High School (+2)',
      institution: 'V.S Niketan College',
      location: 'Kathmandu, Nepal',
      year: '2021 - 2023',
      status: 'Completed'
    },
    {
      degree: 'Secondary Education (SEE)',
      institution: "Jaycee's Secondary School",
      location: 'Kathmandu, Nepal',
      year: '2017 - 2019',
      status: 'Completed'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    Prakash Chaudhary
                  </span>
                </h1>
                <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4">
                  Software Developer
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  From Kathmandu, Nepal 🇳🇵
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
                  Passionate about creating innovative web solutions with HTML, CSS, and JavaScript.
                  Dedicated to continuous learning and contributing to meaningful projects.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
              >
                <Link
                  to="/projects"
                  className="btn-primary inline-flex items-center"
                >
                  View My Work
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary inline-flex items-center"
                >
                  Get In Touch
                </Link>
                <a
                  href="/Prakash_Chaudhary_Resume.pdf.pdf"
                  download="Prakash_Chaudhary_Resume.pdf"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <HiDownload className="w-5 h-5" />
                  Download CV
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center lg:justify-start gap-6"
              >
                <a
                  href="https://github.com/prakashkchaudhary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
                >
                  <FaGithub className="w-8 h-8" />
                </a>
                <a
                  href="https://www.linkedin.com/in/prakash-chaudhary-232231401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
                >
                  <FaLinkedin className="w-8 h-8" />
                </a>
                <a
                  href="https://x.com/praakashh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
                >
                  <FaTwitter className="w-8 h-8" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Side - Profile Photo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Decorative Background Elements */}
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                
                {/* Profile Photo Container */}
                <div className="relative">
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
                    <LazyImage
                      src="/images/profile.jpg"
                      alt="Prakash Chaudhary"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border-2 border-primary-500"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="text-sm font-semibold">Available for Work</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Open to opportunities</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaArrowDown className="w-6 h-6" />
        </motion.button>
      </section>

      {/* Quick About Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="section-title">About Me</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              I'm a passionate software developer from Kathmandu, Nepal, with expertise in HTML, CSS, and JavaScript.
              I love turning complex problems into simple, beautiful, and intuitive solutions. With a strong foundation 
              in Computer Science and a dedication to continuous learning, I strive to contribute positively to every project.
            </p>
            <Link to="/about" className="btn-primary">
              Learn More About Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">My Skills</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card text-center"
              >
                <skill.icon className={`w-16 h-16 mx-auto mb-4 ${skill.color}`} />
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/skills" className="btn-primary">
              View All Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Education Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              My academic journey
            </p>
          </motion.div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="card hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <FaGraduationCap className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        <span className="inline-block mt-2 md:mt-0 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
                          {edu.status}
                        </span>
                      </div>
                      
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        {edu.institution}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary-600" />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-primary-600" />
                          <span>{edu.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/about" className="btn-primary">
              View Complete Timeline
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Check out some of my recent work
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No projects yet. Login to admin dashboard to add your projects!
              </p>
              <Link to="/admin/login" className="btn-primary">
                Go to Admin Dashboard
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card group"
                  >
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <LazyImage
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-secondary text-center"
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-primary text-center"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/projects" className="btn-primary">
                  View All Projects
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
