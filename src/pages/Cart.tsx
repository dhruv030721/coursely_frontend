import { useState } from 'react';
import { Trash2, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button, Input } from '@/components';
import { AiOutlineShoppingCart } from "react-icons/ai";


const initialCartItems = [
    {
        id: 1,
        title: "Modern JavaScript: From Zero to Expert",
        instructor: "Emily Johnson",
        price: 109.99,
        originalPrice: 179.99,
        image: "/images/courses/js-expert.jpg",
        category: "Development"
    },
    {
        id: 2,
        title: "Python for Data Science & Machine Learning",
        instructor: "Dr. Alex Nguyen",
        price: 99.99,
        originalPrice: 149.99,
        image: "/images/courses/data-science-python.jpg",
        category: "Data Science"
    },
    {
        id: 3,
        title: "UX/UI Design Bootcamp",
        instructor: "Laura Kim",
        price: 59.99,
        originalPrice: 99.99,
        image: "/images/courses/uiux-bootcamp.jpg",
        category: "Design"
    },
    {
        id: 4,
        title: "Stock Market Investing for Beginners",
        instructor: "Mark Dawson",
        price: 49.99,
        originalPrice: 89.99,
        image: "/images/courses/stock-market-beginners.jpg",
        category: "Finance"
    },
    {
        id: 5,
        title: "Technical Analysis Masterclass",
        instructor: "Sophia Patel",
        price: 79.99,
        originalPrice: 129.99,
        image: "/images/courses/technical-analysis.jpg",
        category: "Finance"
    },
    {
        id: 6,
        title: "Options Trading Strategies",
        instructor: "James Thompson",
        price: 89.99,
        originalPrice: 149.99,
        image: "/images/courses/options-trading.jpg",
        category: "Finance"
    }
]
    ;

export default function Cart() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === "learn25") {
            setPromoApplied(true);
        } else {
            alert("Invalid promo code");
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const discount = promoApplied ? subtotal * 0.25 : 0;
    const tax = (subtotal - discount) * 0.07;
    const total = subtotal - discount + tax;

    return (
        <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto pt-20">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-x-3">Your Cart <AiOutlineShoppingCart size={35} className="text-white" /></h1>
                    <span className="text-sm text-gray-400">
                        {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'} in cart
                    </span>

                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/5 border border-zinc-800 rounded-lg p-4 mb-4">
                                <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center py-4 border-b border-gray-700 last:border-b-0">
                                        <div className="flex-shrink-0 mb-4 md:mb-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-24 h-16 object-cover rounded"
                                            />
                                        </div>

                                        <div className="flex-grow md:ml-6">
                                            <div className="flex flex-col md:flex-row md:justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium">{item.title}</h3>
                                                    <p className="text-sm text-gray-400">By {item.instructor}</p>
                                                    <span className="inline-block px-2 py-1 mt-1 bg-gray-700 text-xs rounded-full text-gray-300">
                                                        {item.category}
                                                    </span>
                                                </div>

                                                <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end">
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
                                                        {item.originalPrice > item.price && (
                                                            <span className="ml-2 text-sm line-through text-gray-500">
                                                                ${item.originalPrice.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="flex items-center mt-2 text-red-400 hover:text-red-300 text-sm"
                                                    >
                                                        <Trash2 size={16} className="mr-1" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 border border-zinc-800 rounded-lg p-4 sticky top-4">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>

                                    {promoApplied && (
                                        <div className="flex justify-between text-green-400">
                                            <span>Discount (25%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>

                                    <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Promo code */}
                                <div className="mb-6">
                                    <label htmlFor="promo" className="block text-sm mb-2">
                                        Promo Code
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            name='Promo Code'
                                            type="text"
                                            value={promoCode}
                                            handler={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter Promo Code"
                                            innerDivClasses="bg-white/5 border-b border-r px-3 py-2.5 m-0 border-zinc-500"
                                            divClasses='my-0'
                                        />
                                        <Button
                                            name="Apply"
                                            handler={applyPromoCode}
                                            btnClass="bg-blue-900 hover:bg-blue-950 transition border-b border-r border-zinc-500 text-white px-4 py-2 rounded"
                                        />
                                    </div>
                                    {promoApplied && (
                                        <p className="text-green-400 bg-blue text-sm mt-1">Promo code applied successfully!</p>
                                    )}
                                </div>

                                {/* Checkout button */}
                                <Button posticon={<ChevronRight size={18} className="ml-1" />} btnClass="w-full transition rounded-md px-6 border-b border-r bg-green-900 border-zinc-500 gap-x-1 text-white hover:bg-green-800 transition" handler={applyPromoCode} name="Proceed to Checkout" />

                                <div className="mt-4 text-center text-sm text-gray-400">
                                    Need help? Contact our support team.
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16  rounded-lg">
                        <div className="flex justify-center mb-4">
                            <ShoppingCart size={64} className="text-gray-500" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-gray-400 mb-6">Looks like you haven't added any courses yet.</p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}