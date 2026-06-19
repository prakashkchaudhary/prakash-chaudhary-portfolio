import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaRocket, FaUsers, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import LazyImage from '../components/LazyImage'

const About = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code is my priority.'
    },
    {
      icon: FaLaptopCode,
      title: 'Responsive Design',
      description: 'Creating beautiful experiences that work seamlessly across all devices.'
    },
    {
      icon: FaRocket,
      title: 'Fast Performance',
      description: 'Optimizing applications for speed and performance is crucial.'
    },
    {
      icon: FaUsers,
      title: 'User Focused',
      description: 'Building intuitive interfaces that users love to interact with.'
    }
  ]

  const education = [
    {
      degree: 'Bachelor in Computer Application (BCA)',
      institution: "Tula's Institute",
      location: 'Dehradun, India',
      year: '2023 - 2026',
      score: 'Expected 2026',
      description: 'Pursuing Bachelor in Computer Application with focus on software development, algorithms, and full-stack system architecture. Building strong foundation in computer science fundamentals and modern development practices.'
    },
    {
      degree: 'High School (+2)',
      institution: 'V.S Niketan College',
      location: 'Kathmandu, Nepal',
      year: '2021 - 2023',
      score: '70%',
      description: 'Completed high school with focus on science and mathematics, building a strong foundation for technical studies.'
    },
    {
      degree: 'Secondary Education (SEE)',
      institution: "Jaycee's Secondary School",
      location: 'Kathmandu, Nepal',
      year: '2017 - 2019',
      score: '72%',
      description: 'Completed secondary education with excellent grades, developing problem-solving and analytical skills.'
    }
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
              About <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate developer dedicated to creating amazing digital experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                My Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Hello! I'm Prakash Chaudhary, a software developer from Kathmandu, Nepal. 
                  I'm currently pursuing my Bachelor's in Computer Application (BCA) from Tula's Institute, Dehradun, India,
                  where I'm specializing in software development, algorithms, and full-stack system architecture.
                </p>
                <p>
                  My educational journey includes completing high school (+2) from V.S Niketan College, Kathmandu (70%) in 2023, 
                  and my secondary education from Jaycee's Secondary School (72%) in 2019. My passion for web development 
                  is driven by creating innovative solutions that make a difference, with expertise in HTML, CSS, JavaScript, 
                  React, Node.js, and modern development tools.
                </p>
                <p>
                  When I'm not coding, you can find me reading books or playing sports. I believe in continuous 
                  learning and am always eager to explore new technologies and contribute to meaningful projects.
                  My objective is to leverage my technical skills and problem-solving abilities in challenging software 
                  development roles.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-800 overflow-hidden">
                  <LazyImage
                    src="/images/profile.jpg"
                    alt="Prakash Chaudhary"
                    className="rounded-2xl w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">What I Bring</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Core values and principles that guide my work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
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
                Education Timeline
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My academic journey and qualifications
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-purple-600 transform md:-translate-x-1/2"></div>

            {/* Education Items */}
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-1/2 md:translate-x-0 border-4 border-white dark:border-gray-900 z-10">
                  <div className="absolute inset-0 rounded-full bg-primary-600 animate-ping opacity-75"></div>
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="card hover:shadow-2xl transition-all duration-300 group">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300 ${
                      index % 2 === 0 ? 'md:float-right md:ml-4' : 'md:float-left md:mr-4'
                    }`}>
                      <FaGraduationCap className="w-7 h-7" />
                    </div>

                    {/* Degree & Score */}
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {edu.degree}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
                        Score: {edu.score}
                      </div>
                    </div>

                    {/* Institution */}
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {edu.institution}
                    </p>

                    {/* Location & Year */}
                    <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary-600" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary-600" />
                        <span>{edu.year}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Decorative gradient line */}
                    <div className="mt-4 h-1 w-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="card text-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-2 border-primary-200 dark:border-primary-800">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                3
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Educational Qualifications
              </div>
            </div>
            <div className="card text-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-2 border-primary-200 dark:border-primary-800">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                BCA
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Currently Pursuing
              </div>
            </div>
            <div className="card text-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-2 border-primary-200 dark:border-primary-800">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                2023
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Started Bachelor's
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
