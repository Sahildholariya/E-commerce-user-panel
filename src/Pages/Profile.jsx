import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {

  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)


  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setIsLogin(true)
      setUser(user)
    }

  }, [])




  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login')
    window.location.reload()
  }
  return (
    <div>
      <section className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl">
              {/* Profile Header */}
              <div className="p-6 md:p-8 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Avatar */}
                  <div className="w-28 h-28 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">
                      {user?.name?.slice(0, 1)}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-500 mt-1">{user?.email}</p>
                  </div>

                  {/* Edit Button */}
                  <button className="sm:ml-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Full Name</p>
                        <p className="text-gray-900">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="text-gray-900">{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <p className="text-gray-900">{user?.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Street</p>
                        <p className="text-gray-900">{user?.street}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">City</p>
                        <p className="text-gray-900">{user?.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Country</p>
                        <p className="text-gray-900">{user?.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-500" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        value="johndoe"
                        readOnly
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-500">
                        Password
                      </label>
                      <button className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <button className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200">
                    Delete Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  )
}

export default Profile
