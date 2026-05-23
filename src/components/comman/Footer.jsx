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
    <footer className="relative overflow-hidden border-t border-slate-50 bg-white pt-16 animate-[fadeIn_0.8s_ease-out]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-violet-50/40 via-white to-white"></div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 lg:grid-cols-4 lg:px-10">
        <div className="flex flex-col items-start">
          <Link
            to="/"
            className="cursor-pointer bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-3xl font-black tracking-tight text-transparent transition-transform duration-500 hover:scale-[1.02] origin-left"
          >
            CraftNest
          </Link>

          <p className="mt-5 text-sm font-medium leading-relaxed text-slate-500">
            Discover handcrafted products made with creativity, passion, and
            authenticity from talented artisans around the world.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="/"
              className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-600/30 active:scale-95"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="/"
              className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-600/30 active:scale-95"
            >
              <FiFacebook size={18} />
            </a>
            <a
              href="/"
              className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-600/30 active:scale-95"
            >
              <FiTwitter size={18} />
            </a>
            <a
              href="/"
              className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-600/30 active:scale-95"
            >
              <FiYoutube size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-900">Quick Links</h3>
          <div className="mt-6 flex flex-col gap-4">
            <Link
              to="/"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Shop
            </Link>
            <Link
              to="/recommendations"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Recommendations
            </Link>
            <Link
              to="/wishlist"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Wishlist
            </Link>
            <Link
              to="/cart"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Cart
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-900">Support & Legal</h3>
          <div className="mt-6 flex flex-col gap-4">
            <Link
              to="/contact"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              FAQs
            </Link>
            <Link
              to="/orders"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Order Tracking
            </Link>
            <Link
              to="/privacy"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="cursor-pointer w-fit text-sm font-bold text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-violet-600"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-900">Get In Touch</h3>
          <div className="mt-6 flex flex-col gap-5">
            <div className="group/contact cursor-pointer flex items-start gap-4 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100 transition-transform duration-300 group-hover/contact:scale-110 group-hover/contact:bg-violet-100">
                <FiMapPin size={18} />
              </div>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500 transition-colors duration-300 group-hover/contact:text-violet-700">
                Boisar, Maharashtra, India
              </p>
            </div>

            <div className="group/contact cursor-pointer flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100 transition-transform duration-300 group-hover/contact:scale-110 group-hover/contact:bg-violet-100">
                <FiMail size={18} />
              </div>
              <p className="text-sm font-medium text-slate-500 transition-colors duration-300 group-hover/contact:text-violet-700">
                support@craftnest.com
              </p>
            </div>

            <div className="group/contact cursor-pointer flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100 transition-transform duration-300 group-hover/contact:scale-110 group-hover/contact:bg-violet-100">
                <FiPhone size={18} />
              </div>
              <p className="text-sm font-medium text-slate-500 transition-colors duration-300 group-hover/contact:text-violet-700">
                +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-6 text-center lg:px-10">
          <p className="text-sm font-bold tracking-wide text-slate-400">
            © {new Date().getFullYear()} CraftNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
