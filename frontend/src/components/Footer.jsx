import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/prakashkchaudhary', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/prakash-chaudhary-232231401', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://x.com/praakashh', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:prakashchaudhary92290@gmail.com', label: 'Email' }
  ]

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Author */}
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Prakash Chaudhary
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
