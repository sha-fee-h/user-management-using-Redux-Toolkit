import axios from "axios"

const API_URL = "http://localhost:7000/api/"

// Get all users (admin only)
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "admin", config)
  return response.data
}

// Get user profile
const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "users/profile", config)
  return response.data
}

// Update user profile
const updateUserProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + "users/profile", userData, config)
  return response.data
}

// Upload profile image
const uploadProfileImage = async (formData, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + "users/profile/upload", formData, config)
  return response.data
}

// Create user (admin only)
const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + "admin", userData, config)
  return response.data
}

// Update user (admin only)
const updateUser = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + `admin/${id}`, userData, config)
  return response.data
}

// Delete user (admin only)
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + `admin/${id}`, config)
  return response.data
}

const userService = {
  getUsers,
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  createUser,
  updateUser,
  deleteUser,
}

export default userService