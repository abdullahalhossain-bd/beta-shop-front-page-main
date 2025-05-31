
import { Heart, ShoppingCart } from "lucide-react";
import { Product, useStore } from "@/lib/store";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToWishlist, wishlist } = useStore();
  const [isHovering, setIsHovering] = useState(false);
  
  // Check if product is in wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <motion.div 
      className="product-card group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-64 overflow-hidden rounded-t-lg">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        
        {(product.new || product.sale) && (
          <div 
            className={`absolute top-3 left-3 py-1 px-3 text-xs font-bold text-white rounded-full ${
              product.new ? 'bg-[#040273]' : 'bg-[#dc3545]'
            }`}
          >
            {product.new ? 'NEW' : 'SALE'}
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <motion.button 
            onClick={handleAddToWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              isInWishlist 
                ? 'bg-[#6a0dad] text-white' 
                : 'bg-white text-gray-700 hover:bg-[#6a0dad] hover:text-white'
            }`}
            whileTap={{ scale: 0.9 }}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className="h-4 w-4" fill={isInWishlist ? "currentColor" : "none"} />
          </motion.button>
          <motion.button 
            onClick={() => addToCart(product)}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#6a0dad] hover:text-white transition-colors"
            whileTap={{ scale: 0.9 }}
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
      
      <motion.div 
        className="p-4 bg-white rounded-b-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-lg mb-2 line-clamp-1 hover:text-[#040273] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#040273] text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-gray-500 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          
          {isHovering && (
            <motion.button
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-full bg-[#6a0dad] text-white"
              onClick={() => addToCart(product)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
