import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project.js'

// Load environment variables
dotenv.config()

const updateFoodBridgeImage = async () => {
  try {
    console.log('🖼️  Updating FoodBridge project image...\n')

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Find FoodBridge project
    const project = await Project.findOne({ title: 'FoodBridge - Food Waste Management' })

    if (!project) {
      console.log('❌ FoodBridge project not found')
      process.exit(1)
    }

    // Update with a placeholder image (you can replace with actual screenshot)
    const newImageUrl = 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop'

    project.imageUrl = newImageUrl
    await project.save()

    console.log('✅ Image URL updated successfully!')
    console.log(`   New URL: ${newImageUrl}\n`)

    console.log('📊 Updated Project:')
    console.log(`   Title: ${project.title}`)
    console.log(`   Image: ${project.imageUrl}`)
    console.log(`   Live: ${project.liveLink}\n`)

    console.log('🎉 Done!\n')

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
updateFoodBridgeImage()
