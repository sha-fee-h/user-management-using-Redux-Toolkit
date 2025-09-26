import { Link, useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../features/auth/authThunk"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-wide hover:text-indigo-200 transition-colors"
        >
          User Management App
        </Link>

        {/* Links */}
        <div className="flex space-x-5 items-center">
          {user ? (
            <>
              {user.isAdmin ? (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-indigo-200 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                {
                  location.pathname==='/profile' && <Link
                    to="/"
                    className="hover:text-indigo-200 transition-colors"
                  >
                    Home
                  </Link>
                }
                  
                  {
                    location.pathname==='/' && <Link
                    to="/profile"
                    className="hover:text-indigo-200 transition-colors"
                  >
                    Profile
                  </Link>
                  }
                </>
              )}
              <button
                onClick={onLogout}
                className="bg-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname === "/login" && (
                <Link
                  to="/register"
                  className="hover:text-indigo-200 transition-colors"
                >
                  Register
                </Link>
              )}
              {location.pathname === "/register" && (
                <Link
                  to="/login"
                  className="hover:text-indigo-200 transition-colors"
                >
                  Login
                </Link>
              )}
              {location.pathname === "/admin/login" ? (
                <Link
                  to="/login"
                  className="hover:text-indigo-200 transition-colors"
                >
                  User
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="hover:text-indigo-200 transition-colors"
                >
                  Admin
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>

  )
}

export default Navbar