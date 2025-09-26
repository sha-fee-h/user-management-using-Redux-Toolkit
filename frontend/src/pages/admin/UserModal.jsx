import { useState, useEffect } from "react"

function UserModal({ isOpen, onClose, onSubmit, user, mode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      })
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    }
  }, [user])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitForm = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // Only include password if it's provided or if creating a new user
    const userData = {
      name: formData.name,
      email: formData.email,
      ...(formData.password || mode === "create" ? { password: formData.password } : {}),
    }

    onSubmit(userData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          {mode === "create" ? "Add New User" : "Edit User"}
        </h2>
        <form onSubmit={onSubmitForm}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder={
                mode === "create"
                  ? "Enter password"
                  : "Leave blank to keep current password"
              }
              required={mode === "create"}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              placeholder="Confirm password"
              required={mode === "create" || formData.password !== ""}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition"
            >
              {mode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default UserModal