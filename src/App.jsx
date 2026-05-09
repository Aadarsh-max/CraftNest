import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/comman/Navbar'
import Footer from './components/comman/Footer'
import Toast from './components/others/Toast'
import ProtectedRoute from './components/others/ProtectedRoute'

import Home from './pages/comman/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import ProductListing from './pages/product/ProductListing'
import ProductDetail from './pages/product/ProductDetail'
import Cart from './pages/cart/Cart'
import Checkout from './pages/cart/Checkout'
import OrderSuccess from './pages/order/OrderSuccess'
import OrderHistory from './pages/order/OrderHistory'
import ArtisanProfile from './pages/comman/ArtisanProfile'
import SellerDashboard from './pages/comman/SellerDashboard'
import AdminPanel from './pages/comman/AdminPanel'
import Recommendations from './pages/product/Recommendations'
import Wishlist from './pages/product/Wishlist'
import NotFound from './pages/comman/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-white">
        <Toast />

        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/products"
              element={<ProductListing />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />

            <Route
              path="/recommendations"
              element={<Recommendations />}
            />

            <Route
              path="/artisan/:id"
              element={<ArtisanProfile />}
            />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/checkout"
                element={<Checkout />}
              />

              <Route
                path="/wishlist"
                element={<Wishlist />}
              />

              <Route
                path="/orders"
                element={<OrderHistory />}
              />

              <Route
                path="/order-success"
                element={<OrderSuccess />}
              />
            </Route>

            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["seller"]}
                />
              }
            >
              <Route
                path="/seller/dashboard"
                element={<SellerDashboard />}
              />
            </Route>

            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["admin"]}
                />
              }
            >
              <Route
                path="/admin/dashboard"
                element={<AdminPanel />}
              />
            </Route>

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;