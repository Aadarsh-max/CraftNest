import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-10">
        <div>
          <Link
            to="/"
            className="text-3xl font-black tracking-tight text-gray-900"
          >
            CraftNest
          </Link>

          <p className="mt-5 text-sm leading-7 text-gray-500">
            Discover handcrafted products made with creativity, passion, and
            authenticity from talented artisans around the world.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="/"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            >
              <FiInstagram size={18} />
            </a>

            <a
              href="/"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            >
              <FiFacebook size={18} />
            </a>

            <a
              href="/"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            >
              <FiTwitter size={18} />
            </a>

            <a
              href="/"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            >
              <FiYoutube size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>

          <div className="mt-5 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Shop
            </Link>

            <Link
              to="/recommendations"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Recommendations
            </Link>

            <Link
              to="/wishlist"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Wishlist
            </Link>

            <Link
              to="/cart"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Cart
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">Customer Support</h3>

          <div className="mt-5 flex flex-col gap-4">
            <Link
              to="/contact"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Contact Us
            </Link>

            <Link
              to="/faq"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              FAQs
            </Link>

            <Link
              to="/privacy"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/orders"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Order Tracking
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">Get In Touch</h3>

          <div className="mt-5 flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-gray-100 p-2 text-gray-700">
                <FiMapPin size={16} />
              </div>

              <p className="text-sm leading-6 text-gray-500">
                Mumbai, Maharashtra, India
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-2 text-gray-700">
                <FiMail size={16} />
              </div>

              <p className="text-sm text-gray-500">
                support@craftnest.com
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-2 text-gray-700">
                <FiPhone size={16} />
              </div>

              <p className="text-sm text-gray-500">
                +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center lg:flex-row lg:px-10">
          <p className="text-sm text-gray-500">
            © 2026 CraftNest. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Terms
            </Link>

            <Link
              to="/cookies"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;