import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [cartItemCount, setCartItemCount] = useState(0)

    const navigate = useNavigate()

    const handlNavigate = () => {
        if (!isLogin) {
            toast.warning("You Are Not Logged in...!", {
                position: "bottom-right",
            });

            setTimeout(() => {
                navigate('/login')
            }, 3000);
            return;
        } else {
            navigate('/cart')
            return;
        }
    }

    const handlNavigateLogin = () => {
        if (!isLogin) {
            navigate('/login')
        } else {
            navigate('/profile')
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setIsLogin(true)
            
            // Update cart item count
            const cartKey = `cart_${user.id}`;
            const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
            setCartItemCount(savedCart.length);
        }

        // Listen for cart updates in localStorage
        const handleStorageChange = (e) => {
            if (e.key && e.key.startsWith('cart_')) {
                const savedCart = JSON.parse(e.newValue) || [];
                setCartItemCount(savedCart.length);
            }
        }

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, [])

    return (
        <header className="bg-white shadow-md">
            {/* Topbar */}
            <div className="bg-gray-100 py-2">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="text-sm text-gray-600">
                        Free shipping for standard orders over $100
                    </div>
                    <div className="flex space-x-4 text-sm text-gray-600">
                        <a href="#" className="hover:text-gray-900 transition">Help & FAQs</a>
                        <a href="#" className="hover:text-gray-900 transition">My Account</a>
                        <a href="#" className="hover:text-gray-900 transition">EN</a>
                        <a href="#" className="hover:text-gray-900 transition">USD</a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                {/* Logo */}
                <a href="#" className="text-xl font-bold">
                    <img src="images/icons/logo-01.png" alt="Logo" className="w-32" />
                </a>

                {/* Navigation Menu */}
                <nav className="hidden lg:flex space-x-8">
                    <a href="/" className="text-gray-700 hover:text-gray-900 transition">Home</a>
                    <a href="/product" className="text-gray-700 hover:text-gray-900 transition">Shop</a>
                    <a href="/" className="text-gray-700 hover:text-gray-900 transition">Features</a>
                    <a href="/about" className="text-gray-700 hover:text-gray-900 transition">About</a>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-gray-900">
                        <i className="zmdi zmdi-search text-xl"></i>
                    </button>
                    <button onClick={handlNavigate} className="text-gray-600 hover:text-gray-900 relative">
                        <i className="zmdi zmdi-shopping-cart text-2xl"></i>
                        {cartItemCount > 0 && (
                            <span className="absolute top-[-5px] left-4 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                    <button onClick={handlNavigateLogin} className="text-gray-600 hover:text-gray-900 relative">
                        <i className="ri-user-line text-2xl"></i>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-gray-600">
                    <i className="zmdi zmdi-menu text-2xl"></i>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden bg-gray-100">
                <ul className="flex flex-col space-y-2 p-4">
                    <li><a href="/" className="text-gray-700 hover:text-gray-900 transition">Home</a></li>
                    <li><a href="/product" className="text-gray-700 hover:text-gray-900 transition">Shop</a></li>
                    <li><a href="/" className="text-gray-700 hover:text-gray-900 transition">Features</a></li>
                    <li><a href="/" className="text-gray-700 hover:text-gray-900 transition">Blog</a></li>
                    <li><a href="/about" className="text-gray-700 hover:text-gray-900 transition">About</a></li>
                    <li><a href="/contact" className="text-gray-700 hover:text-gray-900 transition">Contact</a></li>
                </ul>
            </div>
            <ToastContainer/>
        </header>
    )
}

export default Navbar