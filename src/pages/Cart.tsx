import { Button, CandleStickLoader, Input, Toast } from '@/components';
import { CartItem } from '@/interfaces/cart';
import { userServices } from '@/services';
import { RootState } from '@/store';
import { ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [DiscountApplied, setDiscountApplied] = useState(false);
  const [loader, setLoader] = useState<Boolean>(true);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.user);
  const { register, handleSubmit, reset } = useForm();

  // Calculate subtotal, discount, and total whenever cartItems or percentage changes
  useEffect(() => {
    const calculatedSubTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    setSubTotal(calculatedSubTotal);

    const calculatedDiscount = (calculatedSubTotal * percentage) / 100;
    setDiscount(calculatedDiscount);

    const calculatedTotal = calculatedSubTotal - calculatedDiscount;
    setTotal(calculatedTotal);
  }, [cartItems, percentage]);

  const removeFromCart = async (id: number) => {
    if (userData?.email) {
      await Toast.promise(userServices.RemoveFromCart(userData.email, id.toString()), {
        loading: 'Removing from cart',
        success: (response) => {
          // Update cart items - this will trigger the useEffect above to recalculate totals
          setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
          return `${response.data.message}`;
        },
        error: (error) => {
          return `${error.response.data.message}`;
        },
      });
    }
  };

  const applyDiscountCode = async (code: string) => {
    if (code != null && code !== '') {
      await Toast.promise(userServices.ApplyDiscount(code), {
        loading: 'Applying discount code',
        success: (response) => {
          const discountPercentage = response.data.data.discount;
          setPercentage(discountPercentage);
          setDiscountApplied(true);
          return `${response.data.message}`;
        },
        error: (error) => {
          return `${error.response.data.message}`;
        },
      });
    }
  };

  const removeDiscountCode = () => {
    setDiscountApplied(false);
    setPercentage(0);
    reset({ DiscountCode: '' }); // clears input field too
  };

  const fetchCart = async () => {
    if (userData?.email) {
      try {
        const response: any = await userServices.GetCart(userData.email);
        setCartItems(response.data.data.items || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCartItems([]);
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchCart();
  }, [userData?.email]);

  if (loader) {
    return <CandleStickLoader />;
  }

  return (
    <>
      <div className="min-h-screen font-geist bg-black text-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto pt-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-x-3">
              Your Cart <AiOutlineShoppingCart size={35} className="text-white" />
            </h1>
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
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row items-start md:items-center py-4 border-b border-gray-700 last:border-b-0"
                    >
                      <div className="flex-grow md:ml-6">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <div>
                            <h3 className="text-lg font-medium">{item.title}</h3>
                          </div>

                          <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end">
                            <div className="flex items-center">
                              <span className="text-lg font-semibold">₹{item.price}</span>
                            </div>
                            <button
                              onClick={() => removeFromCart(item._id)}
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
                <form
                  onSubmit={handleSubmit((data) => {
                    applyDiscountCode(data.DiscountCode);
                  })}
                  id="cartForm"
                  className="bg-white/5 border border-zinc-800 rounded-lg p-4 sticky top-4"
                >
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>₹{subTotal.toFixed(2)}</span>
                    </div>

                    {DiscountApplied && (
                      <div className="flex flex-col justify-center gap-y-3 text-green-400">
                        <div className="flex justify-between">
                          <span>Discount ({percentage}%)</span>
                          <span>-₹{discount.toFixed(2)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeDiscountCode}
                          className="text-red-400 hover:text-red-300 text-sm self-end"
                        >
                          Remove Discount
                        </button>
                      </div>
                    )}

                    <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Discount code */}
                  <div className="mb-6">
                    <label htmlFor="Discount" className="block text-sm mb-2">
                      Discount Code
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Enter Discount Code"
                        innerDivClasses="bg-white/5 border-b border-r px-3 py-2.5 m-0 border-zinc-500"
                        divClasses="my-0"
                        {...register('DiscountCode', { required: true })}
                      />
                      <Button
                        name="Apply"
                        type="submit"
                        form="cartForm"
                        btnClass="bg-blue-900 hover:bg-blue-950 transition border-b border-r border-zinc-500 text-white px-4 py-2 rounded"
                      />
                    </div>
                    {DiscountApplied && (
                      <div className="flex flex-col mt-2 space-y-2">
                        <p className="text-green-400 text-sm">
                          Discount code applied successfully!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Checkout button */}
                  <Button
                    posticon={<ChevronRight size={18} className="ml-1" />}
                    btnClass="w-full transition rounded-md px-6 border-b border-r bg-green-900 border-zinc-500 gap-x-1 text-white hover:bg-green-800 transition"
                    name="Proceed to Checkout"
                  />

                  <div
                    className="mt-4 text-center text-sm text-gray-400 cursor-pointer"
                    onClick={() => {
                      navigate('/contact');
                    }}
                  >
                    Need help? Contact our support team.
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 rounded-lg">
              <div className="flex justify-center mb-4">
                <ShoppingCart size={64} className="text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Looks like you haven't added any courses yet.</p>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                onClick={() => navigate('/courses')}
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
