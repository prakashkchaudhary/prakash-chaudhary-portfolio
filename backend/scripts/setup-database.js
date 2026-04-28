import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'
import Project from '../models/Project.js'

// Load environment variables
dotenv.config()

const setupDatabase = async () => {
  try {
    console.log('🚀 Starting Database Setup...\n')

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Create indexes
    console.log('📊 Creating database indexes...')
    
    // Project indexes
    await Project.collection.createIndex({ title: 1 })
    await Project.collection.createIndex({ category: 1 })
    await Project.collection.createIndex({ title: 1, category: 1 })
    await Project.collection.createIndex({ createdAt: -1 })
    console.log('✅ Project indexes created')

    // Admin indexes
    await Admin.collection.createIndex({ email: 1 }, { unique: true })
    console.log('✅ Admin indexes created\n')

    // Check if admin exists
    console.log('👤 Checking for admin account...')
    const adminExists = await Admin.findOne()
    
    if (adminExists) {
      console.log('⚠️  Admin account already exists')
      console.log(`   Email: ${adminExists.email}\n`)
    } else {
      // Create default admin
      console.log('📝 Creating default admin account...')
      
      const defaultEmail = 'prakash@admin.com'
      const defaultPassword = 'admin123'
      
      const hashedPassword = await bcrypt.hash(defaultPassword, 10)
      
      const admin = await Admin.create({
        email: defaultEmail,
        password: hashedPassword
      })
      
      console.log('✅ Admin account created successfully!')
      console.log(`   Email: ${defaultEmail}`)
      console.log(`   Password: ${defaultPassword}`)
      console.log('   ⚠️  IMPORTANT: Change this password after first login!\n')
    }

    // Check for sample projects
    console.log('📁 Checking for projects...')
    const projectCount = await Project.countDocuments()
    
    if (projectCount === 0) {
      console.log('📝 Creating sample project...')
      
      await Project.create({
        title: 'Portfolio Website',
        description: 'A modern full-stack portfolio website built with React, Node.js, Express, and MongoDB. Features include admin dashboard, contact form, project management, and dark mode.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
        githubLink: 'https://github.com/prakashkchaudhary/portfolio-website',
        liveLink: 'https://your-portfolio.vercel.app',
        imageUrl: 'https://via.placeholder.com/600x400/0ea5e9/ffffff?text=Portfolio+Website',
        category: 'web'
      })
      
      console.log('✅ Sample project created\n')
    } else {
      console.log(`✅ Found ${projectCount} project(s) in database\n`)
    }

    // Display database statistics
    console.log('📊 Database Statistics:')
    console.log(`   Admins: ${await Admin.countDocuments()}`)
    console.log(`   Projects: ${await Project.countDocuments()}`)
    console.log(`   Contacts: ${await mongoose.connection.db.collection('contacts').countDocuments()}\n`)

    // Display collections
    console.log('📚 Collections:')
    const collections = await mongoose.connection.db.listCollections().toArray()
    collections.forEach(col => {
      console.log(`   - ${col.name}`)
    })
    console.log('')

    console.log('🎉 Database setup completed successfully!\n')
    console.log('📋 Next Steps:')
    console.log('   1. Start the backend server: npm run dev')
    console.log('   2. Login to admin dashboard with the credentials above')
    console.log('   3. Add your own projects')
    console.log('   4. Change the default admin password\n')

  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('👋 Database connection closed')
    process.exit(0)
  }
}

// Run setup
setupDatabase()
