import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const ProductDetails = () => {
    const [product, setProducts] = useState(null)

    const navigate = useNavigate()
    const { pid } = useParams()
    console.log(pid);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products?id=${pid}`);
                console.log("Product details response:", response);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [pid]);


    console.log(product);

    const handlAddToCart = (p) => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user);

        if (user) {
            const cartKey = `cart_${user.id}`;
            let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
            const productIndex = cart.findIndex(item => item.id === p.id);
            // console.log(cart[1][0].id);

            if (productIndex !== -1) {
                cart[productIndex].quantity += 1;
            } else {
                cart.push({ ...p, quantity: 1 });
            }

            localStorage.setItem(cartKey, JSON.stringify(cart));

            toast.success('Product added to cart successfully', {
                autoClose: 1000
            });
            setTimeout(() => {
                navigate('/cart');
                window.location.reload()

            }, 2000);

        } else {
            toast.warning("You Are Not Loggedin...", {
                position: "bottom-right",
            })
        }



    }



    return (
        <div>
            <div>
                {/* breadcrumb */}
                <div className="container mx-auto px-4 py-6">
                    <nav className="flex items-center text-sm text-gray-600">
                        {/* Home Link */}
                        <a
                            href="index.html"
                            className="hover:text-blue-500 transition flex items-center"
                        >
                            Home
                            <i className="fa fa-angle-right mx-2" aria-hidden="true"></i>
                        </a>

                        {/* Men Link */}
                        <a
                            href="product.html"
                            className="hover:text-blue-500 transition flex items-center"
                        >
                            Men
                            <i className="fa fa-angle-right mx-2" aria-hidden="true"></i>
                        </a>

                        {/* Current Page */}
                        <span className="text-gray-800 font-medium">
                            Lightweight Jacket
                        </span>
                    </nav>
                </div>

                {/* Product Detail */}
                <section className="bg-gray-100 py-12">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="lg:flex lg:space-x-12">
                            {/* Product Images */}
                            {
                                product && product.map((product, index) => (
                                    <div key={index} className="lg:w-4/12 mb-10 lg:mb-0">
                                        {/* Main Product Image */}
                                        <div className="relative">
                                            <img
                                                src={`../../images/${product.image}`}
                                                alt='jnkn'
                                                className="w-full rounded-lg shadow-lg object-cover"
                                            />
                                        </div>

                                        {/* Additional Images */}
                                        <div className="ml-4 mt-6 flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                            {Object.values(product.otherImages).map((img, index) => (
                                                <div
                                                    key={index}
                                                    className="relative w-36 h-full flex-shrink-0 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all "
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Other Image ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-90 flex items-center justify-center transition-opacity">
                                                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                ))
                            }

                            {/* Product Details */}
                            {
                                product && product.map((product, index) => (
                                    <div key={index} className="lg:w-6/12">
                                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                                            {product.title}
                                        </h2>
                                        <p className="text-2xl font-bold text-blue-600 mb-6">${product.price}</p>
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {product.description}
                                        </p>

                                        {/* Select Size */}
                                        <div className="mb-5">
                                            <label className="block text-gray-800 font-medium mb-2">
                                                Select Size
                                            </label>
                                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500">
                                                <option>Choose a size</option>
                                                <option>Small</option>
                                                <option>Medium</option>
                                                <option>Large</option>
                                                <option>Extra Large</option>
                                            </select>
                                        </div>

                                        {/* Select Color */}
                                        <div className="mb-5">
                                            <label className="block text-gray-800 font-medium mb-2">
                                                Select Color
                                            </label>
                                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500">
                                                <option>Choose a color</option>
                                                <option>Red</option>
                                                <option>Blue</option>
                                                <option>White</option>
                                                <option>Gray</option>
                                            </select>
                                        </div>

                                        {/* Quantity and Add to Cart */}
                                        <div className="flex items-center space-x-4 mb-6">

                                            <button onClick={() => handlAddToCart(product)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg">
                                                Add to Cart
                                            </button>
                                        </div>

                                        {/* Wishlist and Share */}
                                        <div className="flex items-center space-x-6 text-gray-500">
                                            <button className="hover:text-red-500" aria-label="Add to wishlist">
                                                <i className="ri-heart-line"></i>
                                            </button>
                                            <button className="hover:text-blue-600" aria-label="Share on Facebook">
                                                <i className="ri-facebook-line"></i>
                                            </button>
                                            <button className="hover:text-blue-400" aria-label="Share on Twitter">
                                                <i className="ri-twitter-line"></i>
                                            </button>
                                            <button className="hover:text-red-400" aria-label="Share on Google Plus">
                                                <i className="ri-google-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </section>



                {/* Related Products */}
                <section className="bg-gray-100 py-10">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Related Products</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {product && product.map((product) => (
                                <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
                                    <div className="relative">
                                        <img
                                            src={`../../images/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-64 object-cover"
                                        />
                                        <button
                                            className="absolute inset-0 bg-black bg-opacity-40 text-white opacity-0 hover:opacity-100 flex items-center justify-center transition"
                                        >
                                            Quick View
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-lg font-medium text-gray-800 hover:text-blue-500 transition">
                                            {product.name}
                                        </h4>
                                        <p className="text-gray-600 mt-2">{product.price}</p>

                                        <div className="flex justify-between items-center mt-4">
                                            <a
                                                href="#"
                                                className="text-sm text-blue-500 hover:text-blue-600 transition"
                                            >
                                                View Details
                                            </a>
                                            <button className="text-red-500 hover:text-red-600">
                                                <i className="fa fa-heart-o"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProductDetails
