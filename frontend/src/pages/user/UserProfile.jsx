import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, updateUserProfile, uploadProfileImage } from "../../features/user/userThunk"
import { reset } from "../../features/user/userSlice"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner"

function UserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const dispatch = useDispatch()
  const { currentUser, isLoading, isSuccess, isError, message } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        password: "",
        confirmPassword: "",
      })

      if (currentUser.profileImage) {
        setPreview(`http://localhost:7000/${currentUser.profileImage}`)
      }
    }
  }, [currentUser])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success("Profile updated successfully")
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    // Only include password if it's provided
    const userData = {
      name: formData.name,
      email: formData.email,
      ...(formData.password && { password: formData.password }),
    }

    dispatch(updateUserProfile(userData))
  }

  const onUploadImage = (e) => {
    e.preventDefault()

    if (!image) {
      toast.error("Please select an image")
      return
    }

    const formData = new FormData()
    formData.append("image", image)

    dispatch(uploadProfileImage(formData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        User Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Profile Image
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4">
                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <form onSubmit={onUploadImage} className="w-full">
                <div className="mb-4">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={onImageChange}
                    accept="image/*"
                    className="w-full text-sm text-gray-600 dark:text-gray-300 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-lg file:border-0 
                  file:font-medium 
                  file:bg-blue-100 dark:file:bg-blue-900 
                  file:text-blue-700 dark:file:text-blue-300 
                  hover:file:bg-blue-200 dark:hover:file:bg-blue-800"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  Upload Image
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Profile Information
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-gray-50 dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-gray-50 dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-gray-50 dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-gray-50 dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={onChange}
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserProfile