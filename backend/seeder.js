import mongoose from "mongoose"
import dotenv from 'dotenv'
import User from './models/userModel.js'
import connectDB from "./config/db.js"


// Load environment variables
dotenv.config()

// Connect to database
connectDB()

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany()

    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      isAdmin: true,
    })

    // Create regular users
    const userPassword = 123456

    await User.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password: userPassword,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: userPassword,
      },
    ])

    console.log("Data Imported!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

// Delete data
const destroyData = async () => {
  try {
    await User.deleteMany()

    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}