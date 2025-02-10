import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
  </div>
);

const Products = () => {

  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3001/products')
        const data = response.data
        setProducts(data)
        setLoading(false)
      }
      fetchProducts()
    } catch (error) {
      console.error(error);
    }
  }, [])



  if (loading) {
    return <Loader />
  }


  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            products && products.map((product) => (
              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img src={`../../images/${product.image}`} className="w-full h-80  object-contain" />
                  <Link
                    to={`/products/${product.id}`}
                    className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 text-white opacity-0 hover:opacity-100 transition"
                  >
                    Quick View
                  </Link>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{product.description.slice(0, 50) ? (product.description.slice(0, 50) + '...') : (product.description)}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/products/${product.id}`}
                      className="text-sm text-blue-500 hover:text-blue-600 transition"
                    >
                      View Details
                    </Link>
                    <a href="#" className="text-red-500 hover:text-red-600">
                      <i className="fa fa-heart-o" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
