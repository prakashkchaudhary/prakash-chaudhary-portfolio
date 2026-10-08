import { motion } from 'framer-motion'
import { HiDownload, HiAcademicCap, HiBriefcase, HiStar } from 'react-icons/hi'

const Resume = () => {
  const education = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Tula\'s Institute, Dehradun | Sri Dev Suman Uttarakhand University',
      year: '2023 - 2026',
      description: 'Currently pursuing BCA with focus on Computer Applications & Software Development. Learning modern web technologies, database management, and software engineering principles.'
    },
    {
      degree: 'Higher Secondary (+2)',
      institution: 'V.S. Niketan College, Kathmandu, Nepal',
      year: '2023',
      description: 'Completed higher secondary education with 70% marks. Focused on Computer Science and Mathematics with strong foundation in programming concepts.'
    },
    {
      degree: 'Secondary Education',
      institution: "Jaycee's Secondary School",
      year: '2019',
      description: 'Completed secondary education with 72% marks. Built strong foundation in science and technology subjects.'
    }
  ]

  const experience = [
    {
      position: 'Full Stack Developer',
      company: 'Personal Projects & Learning',
      year: '2023 - Present',
      responsibilities: [
        'Developed FoodBridge - a comprehensive food donation platform using React.js, Node.js, and MongoDB',
        'Built responsive web applications with modern JavaScript, React hooks, and Tailwind CSS',
        'Implemented secure authentication systems with JWT, bcrypt/Argon2, and multi-factor authentication',
        'Created RESTful APIs with Express.js, input validation, and comprehensive error handling',
        'Deployed applications on Vercel and Render with proper environment configuration',
        'Achieved 93/100 security score through implementation of enterprise-level security features',
        'Applied security best practices including CORS policies, rate limiting, and audit logging'
      ]
    }
  ]

  const certifications = [
    'HTML5, CSS3 & JavaScript (ES6+)',
    'React.js & Modern Frontend Development',
    'Node.js & Express.js Backend Development',
    'MongoDB & Database Design',
    'JWT Authentication & Security Implementation',
    'Git Version Control & GitHub Workflows',
    'Responsive Design & Tailwind CSS',
    'RESTful API Design & Development'
  ]

  const hobbies = [
    'Building Personal Projects',
    'Learning New Web Technologies',
    'Contributing to Open Source',
    'Reading Tech Articles & Documentation',
    'Playing Sports & Staying Active',
    'Exploring Security Best Practices'
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Resume</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              BCA graduate and aspiring Full Stack Developer with hands-on experience building responsive web applications using React.js, Node.js, Express.js, and MongoDB.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/Prakash_Chaudhary_Resume.html"
                target="_blank"
                className="btn-primary inline-flex items-center gap-2 justify-center"
              >
                <HiDownload className="w-5 h-5" />
                View Online Resume
              </a>
              <a
                href="/Prakash_Chaudhary_Resume_Print.html?print=true"
                target="_blank"
                className="btn-secondary inline-flex items-center gap-2 justify-center"
              >
                <HiDownload className="w-5 h-5" />
                Print/Save as PDF
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <HiAcademicCap className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card border-l-4 border-primary-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <HiBriefcase className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card border-l-4 border-primary-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{exp.position}</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      {exp.year}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li
                        key={respIndex}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <HiStar className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold">Certifications</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="card border-l-4 border-primary-600"
                >
                  <p className="font-medium">{cert}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Hobbies Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <HiStar className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold">Hobbies & Interests</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="card border-l-4 border-primary-600"
                >
                  <p className="font-medium">{hobby}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Resume
