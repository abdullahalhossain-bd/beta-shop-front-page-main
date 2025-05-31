import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/lib/data";
import { Product, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, ArrowLeft, Check, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { theme } from "@/lib/theme";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, wishlist } = useStore();
  const isInWishlist = product ? wishlist.some(item => item.id === product.id) : false;
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Get related products from the same category
      const related = products.filter(p => 
        p.category === foundProduct.category && p.id !== foundProduct.id
      ).slice(0, 4);
      setRelatedProducts(related);
    }
    
    setIsLoading(false);
  }, [productId]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Call addToCart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`${quantity} ${product.name} added to cart`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Add to cart first
      handleAddToCart();
      // Navigate to checkout
      navigate('/checkout');
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 px-4 flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-20 px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
        <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
      </div>
    );
  }

  // Mock images for demo purposes
  const productImages = [
    product.image,
    'https://placehold.co/600x800/eee/ccc',
    'https://placehold.co/600x800/ddd/bbb',
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} />
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
            <motion.img 
              src={productImages[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {product.new && (
              <div className="absolute top-3 left-3 py-1 px-3 text-xs font-bold text-white rounded-full bg-[#040273]">
                NEW
              </div>
            )}
            {product.sale && (
              <div className="absolute top-3 left-3 py-1 px-3 text-xs font-bold text-white rounded-full bg-[#dc3545]">
                SALE
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {productImages.map((img, index) => (
              <div 
                key={index}
                className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                  selectedImage === index ? 'border-[#040273]' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-gray-500">({product.reviewCount || 0} reviews)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#040273]">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xl text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
            {product.oldPrice && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
              </span>
            )}
          </div>
          
          <div className="border-t border-b py-6 my-6">
            <p className="text-gray-700">{product.description}</p>
            <div className="mt-4 flex items-center">
              <div className="text-sm font-medium text-gray-500">Category:</div>
              <span className="ml-2 rounded-full bg-gray-100 px-3 py-1 text-sm">
                {product.category}
              </span>
            </div>
            <div className="mt-4 flex items-center">
              <div className="text-sm font-medium text-gray-500">Availability:</div>
              <div className="ml-2 flex items-center">
                <Check size={16} className="text-green-500 mr-1" />
                <span>In Stock</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="mr-4">Quantity:</div>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 border-r"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 border-l"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleAddToCart}
                className="bg-[#040273] hover:bg-[#040273]/90 flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              
              <Button
                onClick={handleBuyNow}
                style={{ backgroundColor: theme.colors.secondary }}
                className="flex items-center gap-2"
              >
                Buy Now
              </Button>
              
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className={`flex items-center gap-2 ${
                  isInWishlist ? 'text-[#6a0dad] border-[#6a0dad]' : ''
                }`}
              >
                <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full flex justify-start border-b mb-0 rounded-none">
            <TabsTrigger value="description" className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-[#040273]">
              Description
            </TabsTrigger>
            <TabsTrigger value="details" className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-[#040273]">
              Product Details
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-[#040273]">
              Reviews ({product.reviewCount || 0})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Product Specifications</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Material</td>
                      <td className="py-2">Premium Quality</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Dimensions</td>
                      <td className="py-2">Varies by size</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Weight</td>
                      <td className="py-2">0.5 kg</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Warranty</td>
                      <td className="py-2">1 Year</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Origin</td>
                      <td className="py-2">Imported</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Free shipping on orders over $50</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Ships within 1-3 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>30-day return policy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>International shipping available</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            {product.reviewCount && product.reviewCount > 0 ? (
              <div className="space-y-6">
                {/* Mock reviews */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">John Smith</div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">2 weeks ago</div>
                  </div>
                  <p className="mt-2">Great product! Exactly what I was looking for and the quality is excellent.</p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">1 month ago</div>
                  </div>
                  <p className="mt-2">Very happy with my purchase. Fast delivery and the product looks even better in person.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <motion.div 
                key={product.id}
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="mt-3">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-[#040273]">${product.price.toFixed(2)}</span>
                    {product.rating && (
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
