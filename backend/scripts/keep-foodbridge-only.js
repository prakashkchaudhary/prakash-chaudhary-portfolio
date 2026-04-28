import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project.js'

// Load environment variables
dotenv.config()

const keepFoodBridgeOnly = async () => {
  try {
    console.log('🗑️  Removing all projects except FoodBridge...\n')

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Delete all projects except FoodBridge
    const result = await Project.deleteMany({
      title: { $ne: 'FoodBridge - Food Waste Management' }
    })

    console.log(`✅ Deleted ${result.deletedCount} project(s)\n`)

    // Check remaining projects
    const remainingProjects = await Project.find()
    console.log('📊 Remaining Projects:')
    remainingProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title}`)
    })

    console.log('\n🎉 Done! Only FoodBridge project remains.\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('👋 Database connection closed')
    process.exit(0)
  }
}

// Run
keepFoodBridgeOnly()
