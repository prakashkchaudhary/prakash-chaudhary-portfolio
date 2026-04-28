import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project.js'

// Load environment variables
dotenv.config()

const updateFoodBridgeLogo = async () => {
  try {
    console.log('🖼️  Updating FoodBridge project with logo...\n')

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

    // Try common logo paths from the FoodBridge website
    const possibleLogoPaths = [
      'https://food-bridge-app-zeta.vercel.app/logo.png',
      'https://food-bridge-app-zeta.vercel.app/assets/logo.png',
      'https://food-bridge-app-zeta.vercel.app/images/logo.png',
      'https://food-bridge-app-zeta.vercel.app/static/logo.png',
      'https://food-bridge-app-zeta.vercel.app/public/logo.png',
      // Fallback to a high-quality food sharing image
      'https://raw.githubusercontent.com/prakashkchaudhary/food-bridge-app/main/public/logo.png'
    ]

    // Use the first logo path (you can test which one works)
    const logoUrl = possibleLogoPaths[0]

    project.imageUrl = logoUrl
    await project.save()

    console.log('✅ Logo URL updated successfully!')
    console.log(`   New URL: ${logoUrl}\n`)

    console.log('📊 Updated Project:')
    console.log(`   Title: ${project.title}`)
    console.log(`   Image: ${project.imageUrl}`)
    console.log(`   Live: ${project.liveLink}\n`)

    console.log('🎉 Done!\n')
    console.log('💡 If logo doesn\'t show, try these URLs:')
    possibleLogoPaths.forEach((url, index) => {
      console.log(`   ${index + 1}. ${url}`)
    })
    console.log('\n')

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
updateFoodBridgeLogo()
