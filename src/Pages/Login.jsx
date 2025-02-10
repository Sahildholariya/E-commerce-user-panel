import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {

  const [userEmail, setUserEmail] = useState(null)
  const [userPassword, setUserPassword] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [users, setUsers] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/users');
      const fetchedUsers = response.data;
      const user = fetchedUsers.find((i) => i.email === userEmail && i.password === userPassword);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        setIsLogin(true);
        // window.location.reload();

        toast.success('Login Successful Plese Wait...', {
          position: "bottom-right",
        });

        setTimeout(() => {
          navigate('/profile');
          window.location.reload();
        }, 4000);
      } else {
        toast.error('Invalid email or password', {
          position: "bottom-right",
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };


  console.log(users);


  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => { setUserEmail(e.target.value) }}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => { setUserPassword(e.target.value) }}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isLogin} // Button is disabled when isLoading is true
              className={`p-2 w-full bg-blue-500 text-white rounded ${isLogin ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
            >
              {isLogin ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </section>

      <ToastContainer />

    </div>
  )
}

export default Login
