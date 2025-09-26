import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, createUser, deleteUser, updateUser } from "../../features/user/userThunk"
import { reset } from "../../features/user/userSlice"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner"
import UserModal from "./UserModal"


function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [modalMode, setModalMode] = useState("create") // 'create' or 'edit'
  const [deleteModal, setDeleteModal] = useState(false)

  const dispatch = useDispatch()
  const { users, isLoading, isSuccess, isError, message } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && message) {
      toast.success(message)
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])

  const openCreateModal = () => {
    setCurrentUser(null)
    setModalMode("create")
    setIsModalOpen(true)
  }

  const openEditModal = (user) => {
    setCurrentUser(user)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleCreateUser = (userData) => {
    dispatch(createUser(userData))
    setIsModalOpen(false)
  }

  const handleUpdateUser = (userData) => {
    dispatch(updateUser({ id: currentUser._id, userData }))
    setIsModalOpen(false)
  }


  const openDeleteModal = (id) => {

    setDeleteModal(true)
    setCurrentUser(id)

  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setCurrentUser(null)
  }

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
    setDeleteModal(false)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="bg-white dark:bg-gray-900 max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Admin Dashboard
      </h1>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-gray-800 dark:text-gray-200">
            User Management
          </h2>
          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-5 rounded-xl shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
          >
            + Add New User
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search users by name or email..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Profile Image</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-6 text-left">{user.name}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-center">
                      {user.profileImage ? (
                        <img
                          src={`http://localhost:7000/${user.profileImage}`}
                          alt="Profile"
                          className="w-10 h-10 rounded-full mx-auto object-cover border border-gray-200 dark:border-gray-700"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-xs shadow"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-xs shadow"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-gray-500 dark:text-gray-400 italic"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={modalMode === "create" ? handleCreateUser : handleUpdateUser}
          user={currentUser}
          mode={modalMode}
        />
      )}
      {
        deleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#111827] p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-white">Confirm Deletion</h2>
              <p className="mb-6 text-gray-300">Are you sure you want to delete this user?</p>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(currentUser)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>



        )
      }
    </div>

  )
}

export default AdminDashboard