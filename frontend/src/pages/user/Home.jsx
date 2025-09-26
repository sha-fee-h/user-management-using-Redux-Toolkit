import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getUserProfile } from "../../features/user/userThunk"
import Spinner from "../../components/Spinner"


function Home() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { currentUser, isLoading } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Welcome, {user?.name || "User"}!
      </h1>

      {/* Dashboard Info */}
      <div className="bg-gradient-to-r from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Your Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is your personal dashboard where you can manage your account.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Link
            to="/profile"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl text-center shadow transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* Account Summary */}
      {currentUser && (
        <div className="bg-gradient-to-r from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Account Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-900 dark:text-gray-200">
                {currentUser.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-gray-200">
                {currentUser.email}
              </p>
            </div>
            {currentUser.profileImage && (
              <div className="col-span-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Profile Image
                </p>
                <div className="mt-2">
                  <img
                    src={`http://localhost:7000/${currentUser.profileImage}`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home