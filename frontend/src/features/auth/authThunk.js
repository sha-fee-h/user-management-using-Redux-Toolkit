import { createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

// Register user
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    console.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    console.error(message);
    
    return thunkAPI.rejectWithValue(message)
  }
})

// Admin login
export const adminLogin = createAsyncThunk("auth/adminLogin", async (userData, thunkAPI) => {
  try {
    return await authService.adminLogin(userData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout()
})