import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import UserProfile from "./pages/UserProfile";
import TrackOrder from "./pages/TrackOrder";
import ProductReview from "./pages/ProductReview";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import FeaturedProducts from "./pages/FeaturedProducts";
import FAQs from "./pages/FAQs";
import AboutUs from "./pages/AboutUs";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import ShippingPolicy from "./pages/ShippingPolicy";
import Returns from "./pages/Returns";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
           <Route path="/" element={<Index />} />
             <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/review/:orderId" element={<ProductReview />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/featured-products" element={<FeaturedProducts />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
