// One-off script to create a real test user in the `users` collection.
// Usage: node scripts/seedUser.js
import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../src/config/db.js'
import User from '../src/models/User.js'

const seedUser = {
  username: 'dilan',
  email: 'dilan@gmail.com',
  password: 'password1234',
  type: 'buyer',
}

async function run() {
  await connectDB()

  const existing = await User.findOne({ email: seedUser.email })
  if (existing) {
    console.log(`User with email ${seedUser.email} already exists. Skipping.`)
  } else {
    const user = await User.create(seedUser)
    console.log(`Created user: ${user.username} (${user.email})`)
  }

  await mongoose.disconnect()
}

run().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
