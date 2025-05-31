
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Phone, Mail } from "lucide-react";

interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
}

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    // In a real app, this would be an API call to fetch featured products
    const getFeaturedProducts = () => {
      try {
        // Get featured products from localStorage (set in admin panel)
        const storedProducts = localStorage.getItem('featuredProducts');
        if (storedProducts) {
          setFeaturedProducts(JSON.parse(storedProducts));
        } else {
          // Fallback if no products are set in admin
          setFeaturedProducts([]);
        }
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedProducts();
  }, []);

  const handleAddToCart = (product: FeaturedProduct) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#040273] relative inline-block pb-4">
              Featured Products
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#6a0dad]"></span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our hand-picked selection of premium products
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 text-[#040273] hover:text-[#6a0dad] transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span className="font-medium">+1 (234) 567-890</span>
              </a>
              <a 
                href="mailto:contact@betagi-eshop.com" 
                className="flex items-center gap-2 text-[#040273] hover:text-[#6a0dad] transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">contact@betagi-eshop.com</span>
              </a>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#040273]"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600">No featured products available at the moment.</h3>
              <p className="mt-2 text-gray-500">Please check back later or explore our shop.</p>
              <Button 
                className="mt-6 bg-[#040273]"
                asChild
              >
                <a href="/shop">Browse All Products</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#040273]">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(product)} 
                      className="w-full bg-[#040273] hover:bg-[#6a0dad]"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default FeaturedProducts;
