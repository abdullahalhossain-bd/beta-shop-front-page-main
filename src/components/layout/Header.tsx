import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, User, Heart, Phone, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { theme } from "@/lib/theme";

export const navigationItems = [{
  name: "Home",
  href: "/"
}, {
  name: "Shop",
  href: "/shop"
}, {
  name: "Featured",
  href: "/featured-products"
}, {
  name: "FAQs",
  href: "/faqs"
}];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useStore(state => state.cart);
  const wishlist = useStore(state => state.wishlist);
  const clearCart = useStore(state => state.clearCart);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      const {
        data
      } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    fetchUser();

    // Subscribe to auth changes
    const {
      data: authListener
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const totalQuantity = cart.reduce((sum: number, item) => sum + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cart]);

  useEffect(() => {
    setWishlistCount(wishlist.length);
  }, [wishlist]);

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full py-2 text-white" style={{
      backgroundColor: "#6a0dad" // Changed from theme.colors.primary to purple
    }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <h2 className="text-2xl font-bold">Betagi E-Shop</h2>
            <div className="flex items-center mt-2 sm:mt-0 text-sm">
              <div className="flex items-center mr-4">
                <a href="tel:+8801584013318" className="flex items-center hover:underline">
                  <Phone size={16} className="mr-2" />
                  <span>+880-1584013318, +880-1305006515</span>
                </a>
              </div>
              <div className="flex items-center">
                <a href="mailto:betagieshop@gmail.com" className="flex items-center hover:underline">
                  <Mail size={16} className="mr-2" />
                  <span>betagieshop@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            
          </Link>
          
          <div className="w-full md:w-1/3 mt-4 md:mt-0 order-3 md:order-2">
            <form onSubmit={handleSearch} className="relative">
              <Input type="search" placeholder="Search products..." className="w-full pl-3 pr-10 py-2 rounded-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full" style={{
              backgroundColor: theme.colors.secondary
            }}>
                <Search size={18} />
              </Button>
            </form>
          </div>
          
          <div className="flex items-center space-x-6 order-2 md:order-3">
            <Link to="/wishlist" className="relative">
              <Heart size={24} />
              {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>}
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart size={24} />
                  {cartQuantity > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartQuantity}
                    </span>}
                </Button>
              </SheetTrigger>
              <SheetContent>
                {/* Cart content would go here */}
                <div className="py-4">
                  <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                  {cart.length === 0 ? <p>Your cart is empty</p> : <div>
                      {/* Cart items would go here */}
                      <Button onClick={handleClearCart} variant="destructive" className="mt-4">
                        Clear Cart
                      </Button>
                    </div>}
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to={user ? "/profile" : "/login"} className="flex items-center">
              <User size={24} />
            </Link>
          </div>
        </div>
        
        <nav className="border-t border-gray-200 py-3 hidden md:block">
          <ul className="flex justify-center space-x-8">
            {navigationItems.map(item => <li key={item.name}>
                <Link to={item.href} className="text-gray-700 hover:text-primary font-medium transition duration-200">
                  {item.name}
                </Link>
              </li>)}
            <li>
              <Link to="/track-order" className="text-gray-700 hover:text-primary font-medium transition duration-200">
                Track Order
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>;
};

export default Header;
