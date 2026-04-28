import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project.js'

// Load environment variables
dotenv.config()

const sampleProjects = [
  {
    title: 'FoodBridge - Food Waste Management',
    description: 'A smart platform connecting food donors with those in need, reducing food waste and fighting hunger. Features real-time notifications, location-based matching, and impact tracking.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Cloudinary', 'Vercel'],
    githubLink: 'https://github.com/prakashkchaudhary',
    liveLink: 'https://food-bridge-app-zeta.vercel.app/',
    imageUrl: 'https://food-bridge-app-zeta.vercel.app/logo.png',
    category: 'web'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern full-stack portfolio website with admin dashboard, project management, contact form, and dark mode. Built with React, Node.js, and MongoDB.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT', 'Framer Motion'],
    githubLink: 'https://github.com/prakashkchaudhary/portfolio-website',
    liveLink: 'https://your-portfolio.vercel.app',
    imageUrl: 'https://via.placeholder.com/600x400/0ea5e9/ffffff?text=Portfolio+Website',
    category: 'web'
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment integration, and order management. Responsive design with modern UI.',
    techStack: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubLink: 'https://github.com/prakashkchaudhary',
    liveLink: 'https://example.com',
    imageUrl: 'https://via.placeholder.com/600x400/10b981/ffffff?text=E-Commerce',
    category: 'web'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, team collaboration, and project tracking. Features drag-and-drop interface.',
    techStack: ['React', 'Firebase', 'Material-UI', 'React DnD'],
    githubLink: 'https://github.com/prakashkchaudhary',
    liveLink: 'https://example.com',
    imageUrl: 'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Task+Manager',
    category: 'web'
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with forecasts, weather maps, and location-based alerts. Clean and intuitive interface with data visualization.',
    techStack: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    githubLink: 'https://github.com/prakashkchaudhary',
    liveLink: 'https://example.com',
    imageUrl: 'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Weather+App',
    category: 'web'
  },
  {
    title: 'Blog Platform',
    description: 'Modern blogging platform with markdown support, comments, likes, and user authentication. SEO optimized with server-side rendering.',
    techStack: ['Next.js', 'MongoDB', 'Markdown', 'Tailwind CSS'],
    githubLink: 'https://github.com/prakashkchaudhary',
    liveLink: 'https://example.com',
    imageUrl: 'https://via.placeholder.com/600x400/ef4444/ffffff?text=Blog+Platform',
    category: 'web'
  }
]

const seedProjects = async () => {
  try {
    console.log('🌱 Starting Project Seeding...\n')

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Check existing projects
    const existingCount = await Project.countDocuments()
    console.log(`📊 Current projects in database: ${existingCount}\n`)

    if (existingCount > 0) {
      console.log('⚠️  Projects already exist in database')
      console.log('   Do you want to:')
      console.log('   1. Keep existing and add new ones')
      console.log('   2. Delete all and reseed')
      console.log('\n   To delete all: Run with --force flag')
      console.log('   Example: node seed-projects.js --force\n')

      if (!process.argv.includes('--force')) {
        console.log('   Adding sample projects to existing ones...\n')
      } else {
        console.log('🗑️  Deleting all existing projects...')
        await Project.deleteMany({})
        console.log('✅ All projects deleted\n')
      }
    }

    // Insert sample projects
    console.log('📝 Inserting sample projects...')
    
    for (const project of sampleProjects) {
      // Check if project already exists
      const exists = await Project.findOne({ title: project.title })
      
      if (!exists) {
        await Project.create(project)
        console.log(`   ✅ Added: ${project.title}`)
      } else {
        console.log(`   ⏭️  Skipped (already exists): ${project.title}`)
      }
    }

    console.log('\n📊 Final Statistics:')
    const finalCount = await Project.countDocuments()
    console.log(`   Total projects: ${finalCount}`)

    // Display all projects
    console.log('\n📚 Projects in Database:')
    const allProjects = await Project.find().select('title category')
    allProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} (${project.category})`)
    })

    console.log('\n🎉 Project seeding completed successfully!\n')
    console.log('📋 Next Steps:')
    console.log('   1. Start the backend server: npm run dev')
    console.log('   2. Visit frontend to see projects')
    console.log('   3. Login to admin dashboard to manage projects\n')

  } catch (error) {
    console.error('❌ Project seeding failed:', error.message)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('👋 Database connection closed')
    process.exit(0)
  }
}

// Run seeding
seedProjects()
