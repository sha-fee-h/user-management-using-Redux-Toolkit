import axios from "axios"

const API_URL = "http://localhost:7000/api/"

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "users/register", userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "users/login", userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

// Admin login
const adminLogin = async (userData) => {
  const response = await axios.post(API_URL + "admin/login", userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify({ ...response.data, isAdmin: true }))
  }

  return { ...response.data, isAdmin: true }
}

// Logout user
const logout = () => {
  localStorage.removeItem("user")
}

const authService = {
  register,
  login,
  adminLogin,
  logout,
}

export default authService