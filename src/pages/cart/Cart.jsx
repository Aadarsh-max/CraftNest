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
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Shopping Cart
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
            Your Cart
          </h1>
        </div>

        {!cart?.items?.length ? (
          <div className="mt-16 rounded-4xl bg-white py-24 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-700">
              <FiShoppingBag size={36} />
            </div>

            <h2 className="mt-8 text-3xl font-black text-gray-900">
              Your Cart Is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Start exploring handmade products from local artisans.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="mt-14 grid gap-10 xl:grid-cols-[1.5fr_0.7fr]">
            <div className="space-y-6">
              {cart.items.map((item) => (
                <div
                  key={item.product._id}
                  className="rounded-4xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    <img
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      className="h-40 w-full rounded-3xl object-cover lg:w-40"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <h2 className="text-2xl font-black text-gray-900">
                            {item.product.name}
                          </h2>

                          <p className="mt-2 text-sm text-gray-500">
                            {item.product.category}
                          </p>

                          <h3 className="mt-5 text-2xl font-black text-gray-900">
                            ₹{item.product.price}
                          </h3>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.product._id)}
                          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition hover:bg-red-100"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 p-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product._id,
                                item.quantity - 1,
                              )
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 transition hover:bg-white"
                          >
                            <FiMinus />
                          </button>

                          <span className="flex w-14 justify-center text-sm font-bold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product._id,
                                item.quantity + 1,
                              )
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 transition hover:bg-white"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        <h3 className="text-2xl font-black text-gray-900">
                          ₹{item.product.price * item.quantity}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-4xl bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-black text-gray-900">
                Order Summary
              </h2>

              <div className="mt-10 space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Subtotal</p>

                  <h3 className="font-bold text-gray-900">₹{subtotal}</h3>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Shipping</p>

                  <h3 className="font-bold text-gray-900">Free</h3>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Tax</p>

                  <h3 className="font-bold text-gray-900">₹0</h3>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">Total</p>

                    <h2 className="text-3xl font-black text-gray-900">
                      ₹{subtotal}
                    </h2>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-10 flex items-center justify-center rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Proceed To Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
