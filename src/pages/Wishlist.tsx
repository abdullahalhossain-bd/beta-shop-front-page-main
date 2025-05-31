
import { Link } from "react-router-dom";
import { useStore, WishlistItem } from "@/lib/store";
import { Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (item: WishlistItem) => {
    addToCart(item);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600 mb-8">Items you've saved for later</p>

          {wishlist.length === 0 ? (
            <motion.div 
              className="text-center py-16 bg-white rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mx-auto text-gray-400"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">
                Start saving items you love for later by clicking the heart icon
              </p>
              <Link to="/shop">
                <Button className="bg-[#040273] hover:bg-[#040273]/90">
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {wishlist.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden" 
                  variants={itemVariants}
                >
                  <div className="flex flex-col sm:flex-row">
                    <Link to={`/product/${item.id}`} className="sm:w-48 h-48">
                      <img 
                        src={item.image} 
                        alt={item.name}  
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.id}`} className="hover:underline">
                          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                        </Link>
                        <p className="text-gray-600 line-clamp-2 mb-4">
                          {item.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-lg font-bold text-[#040273]">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.oldPrice && (
                            <span className="text-gray-500 line-through">
                              ${item.oldPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-sm text-gray-500 ml-2">
                            Category: {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-6 pt-4 border-t">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="bg-[#040273] hover:bg-[#040273]/90 flex items-center gap-2"
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </Button>
                        <Button
                          onClick={() => removeFromWishlist(item.id)}
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
