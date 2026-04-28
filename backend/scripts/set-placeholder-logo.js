import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project.js'

dotenv.config()

const setPlaceholderLogo = async () => {
  try {
    console.log('🖼️  Setting placeholder logo for FoodBridge...\n')

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const project = await Project.findOne({ title: 'FoodBridge - Food Waste Management' })

    if (!project) {
      console.log('❌ FoodBridge project not found')
      process.exit(1)
    }

    // Use a high-quality food donation/sharing themed image
    const placeholderUrl = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop&q=80'

    project.imageUrl = placeholderUrl
    await project.save()

    console.log('✅ Placeholder logo set successfully!')
    console.log(`   URL: ${placeholderUrl}\n`)

    console.log('📊 Updated Project:')
    console.log(`   Title: ${project.title}`)
    console.log(`   Image: ${project.imageUrl}`)
    console.log(`   Live: ${project.liveLink}\n`)

    console.log('💡 To update with your actual logo:')
    console.log('   1. Go to: http://localhost:5173/admin/login')
    console.log('   2. Login: prakash@admin.com / admin123')
    console.log('   3. Edit FoodBridge project')
    console.log('   4. Update Image URL with your logo')
    console.log('   5. Save\n')

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

setPlaceholderLogo()
