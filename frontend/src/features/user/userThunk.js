import { createAsyncThunk } from "@reduxjs/toolkit"
import userService from "./userService"

// Get all users (admin only)
export const getUsers = createAsyncThunk("users/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.getUsers(token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get user profile
export const getUserProfile = createAsyncThunk("users/getProfile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.getUserProfile(token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update user profile
export const updateUserProfile = createAsyncThunk("users/updateProfile", async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.updateUserProfile(userData, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Upload profile image
export const uploadProfileImage = createAsyncThunk("users/uploadImage", async (formData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.uploadProfileImage(formData, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Create user (admin only)
export const createUser = createAsyncThunk("users/create", async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.createUser(userData, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update user (admin only)
export const updateUser = createAsyncThunk("users/update", async ({ id, userData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.updateUser(id, userData, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete user (admin only)
export const deleteUser = createAsyncThunk("users/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.deleteUser(id, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})