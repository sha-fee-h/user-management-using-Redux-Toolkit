import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import generateToken from "../services/jwtService.js"


export const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body


    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password)) && user.isAdmin) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error("Invalid admin credentials")
    }
})

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password")
  res.json(users)
})

export const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }


    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }


    const user = await User.create({
        name,
        email,
        password,
        isAdmin: isAdmin || false,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})


export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.deleteOne()
        res.json({ message: "User removed", id: req.params.id })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})