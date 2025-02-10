
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import About from './Pages/About'
import ProductDetails from './Pages/ProductDetails'
import './index.css'
import Products from './Pages/Products'
import ShopingCart from './Pages/ShopingCart'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products/:pid' element={<ProductDetails />} />
          <Route path='/product' element={<Products />} />
          <Route path='/cart' element={<ShopingCart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>


    </>
  )
}

export default App
