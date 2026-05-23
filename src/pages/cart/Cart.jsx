import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";

import Loader from "../../components/comman/Loader";

import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "../../redux/slices/cartSlice";

import {
  showErrorToast,
  showSuccessToast,
} from "../../components/others/Toast";

const Cart = () => {
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await dispatch(
        updateCartQuantity({
          productId,
          quantity,
        }),
      ).unwrap();
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();

      showSuccessToast("Item removed from cart");
    } catch (error) {
      showErrorToast(error);
    }
  };

  const subtotal =
    cart?.items?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ) || 0;

  if (loading && !cart) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
        <div className="group">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
            Shopping Cart
          </p>
          <h1 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black tracking-tight text-transparent transition-all duration-500 group-hover:scale-[1.01] origin-left">
            Your Cart
          </h1>
        </div>

        {!cart?.items?.length ? (
          <div className="group/empty mt-16 rounded-4xl bg-white py-24 text-center shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-violet-50 text-violet-600 shadow-[inset_0_4px_20px_rgba(124,58,237,0.1)] transition-all duration-500 group-hover/empty:scale-110 group-hover/empty:bg-violet-100 group-hover/empty:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
              <FiShoppingBag
                size={44}
                className="transition-transform duration-500 group-hover/empty:-translate-y-1 group-hover/empty:rotate-12"
              />
            </div>

            <h2 className="mt-8 text-3xl font-black text-slate-900 transition-colors duration-300">
              Your Cart Is Empty
            </h2>

            <p className="mt-3 font-medium text-slate-500 transition-colors duration-300">
              Start exploring handmade products from local artisans.
            </p>

            <Link
              to="/products"
              className="cursor-pointer group relative mt-8 inline-flex overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-10 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover:duration-1000 group-hover:transform-[skew(-13deg)_translateX(150%)]">
                <div className="w-12 bg-white/30" />
              </div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Products
              </span>
            </Link>
          </div>
        ) : (
          <div className="mt-14 grid gap-10 xl:grid-cols-[1.5fr_0.7fr]">
            <div className="space-y-6">
              {cart.items.map((item, index) => (
                <div
                  key={item.product._id}
                  className="group/item rounded-4xl bg-white p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.15)] hover:ring-violet-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    <div className="overflow-hidden rounded-3xl shadow-sm transition-transform duration-500 group-hover/item:shadow-md lg:w-40">
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.name}
                        className="h-40 w-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-110 lg:w-40"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <h2 className="cursor-pointer text-2xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-600">
                            {item.product.name}
                          </h2>

                          <p className="mt-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                            {item.product.category}
                          </p>

                          <h3 className="mt-5 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-2xl font-black text-transparent">
                            ₹{item.product.price}
                          </h3>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.product._id)}
                          className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 active:translate-y-0 active:scale-95"
                        >
                          <FiTrash2
                            size={18}
                            className="transition-transform duration-300 hover:scale-110 hover:rotate-12"
                          />
                        </button>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1 shadow-inner transition-colors duration-300 group-hover/item:border-violet-100">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product._id,
                                item.quantity - 1,
                              )
                            }
                            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition-all duration-300 hover:bg-white hover:text-violet-600 hover:shadow-sm active:scale-90"
                          >
                            <FiMinus size={18} />
                          </button>

                          <span className="flex w-14 justify-center text-sm font-black text-slate-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product._id,
                                item.quantity + 1,
                              )
                            }
                            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition-all duration-300 hover:bg-white hover:text-violet-600 hover:shadow-sm active:scale-90"
                          >
                            <FiPlus size={18} />
                          </button>
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/item:text-violet-950">
                          ₹{item.product.price * item.quantity}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="group/summary sticky top-10 h-fit rounded-4xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100">
              <h2 className="text-3xl font-black text-slate-900 transition-colors duration-300">
                Order Summary
              </h2>

              <div className="mt-10 space-y-5">
                <div className="flex items-center justify-between transition-all duration-300 hover:translate-x-1">
                  <p className="font-medium text-slate-500">Subtotal</p>
                  <h3 className="font-bold text-slate-900">₹{subtotal}</h3>
                </div>

                <div className="flex items-center justify-between transition-all duration-300 hover:translate-x-1">
                  <p className="font-medium text-slate-500">Shipping</p>
                  <h3 className="rounded-lg bg-green-50 px-3 py-1 font-bold text-green-600">
                    Free
                  </h3>
                </div>

                <div className="flex items-center justify-between transition-all duration-300 hover:translate-x-1">
                  <p className="font-medium text-slate-500">Tax</p>
                  <h3 className="font-bold text-slate-900">₹0</h3>
                </div>

                <div className="border-t border-slate-100 pt-6 mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-slate-900">Total</p>
                    <h2 className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black text-transparent transition-transform duration-500 group-hover/summary:scale-105 origin-right">
                      ₹{subtotal}
                    </h2>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="cursor-pointer group relative mt-10 flex items-center justify-center overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover:duration-1000 group-hover:transform-[skew(-13deg)_translateX(150%)]">
                  <div className="w-12 bg-white/30" />
                </div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Proceed To Checkout
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
