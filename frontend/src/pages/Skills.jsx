import { motion } from 'framer-motion'
import { 
  FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaDocker, 
  FaPython, FaAws, FaFigma 
} from 'react-icons/fa'
import { 
  SiJavascript, SiTypescript, SiMongodb, SiPostgresql, 
  SiExpress, SiTailwindcss, SiRedux, SiNextdotjs 
} from 'react-icons/si'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML', icon: SiJavascript, level: 85 },
        { name: 'CSS', icon: SiTailwindcss, level: 80 },
        { name: 'JavaScript', icon: SiJavascript, level: 75 },
        { name: 'React', icon: FaReact, level: 70 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 75 }
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 65 },
        { name: 'Express', icon: SiExpress, level: 60 },
        { name: 'MongoDB', icon: SiMongodb, level: 65 }
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 70 },
        { name: 'GitHub', icon: FaGitAlt, level: 75 }
      ]
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
              My <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  {category.title}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      className="card"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-primary-600 dark:text-primary-400">
                          <skill.icon className="w-10 h-10" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{skill.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {skill.level}% Proficiency
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="section-title mb-12">Experience</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="card text-left">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Software Developer</h3>
                    <p className="text-primary-600 dark:text-primary-400">Aspiring Developer</p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">2023 - Present</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Building modern web applications using HTML, CSS, and JavaScript. Learning and implementing 
                  new technologies while working on personal projects to enhance skills and contribute to open-source.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Skills
