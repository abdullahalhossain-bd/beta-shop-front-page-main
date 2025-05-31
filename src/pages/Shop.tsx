
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products, categories as defaultCategories } from "@/lib/data";
import ProductCard from "@/components/home/ProductCard";
import CartDrawer from "@/components/ui/CartDrawer";
import { ChevronRight } from "lucide-react";
import { theme } from "@/lib/theme";

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [sortBy, setSortBy] = useState<string>("default");
  const [categories, setCategories] = useState<Category[]>([]);

  // Load custom categories from localStorage if available
  useEffect(() => {
    const customCategories = localStorage.getItem("custom_categories");
    if (customCategories) {
      setCategories(JSON.parse(customCategories));
    } else {
      setCategories(defaultCategories);
    }
  }, []);

  // Update selected category when URL parameter changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0; // Default, no sorting
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm">
              <a href="/" className="text-gray-500 hover:text-primary">
                Home
              </a>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <span className="font-medium text-gray-900">Shop</span>
              {selectedCategory && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar / Category Filter */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: theme.colors.primary }}>
                  Categories
                </h2>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                    style={selectedCategory === null ? { backgroundColor: theme.colors.primary } : {}}
                  >
                    All Products
                  </Button>
                  
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                      style={selectedCategory === category.id ? { backgroundColor: theme.colors.primary } : {}}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Listing */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                  {selectedCategory 
                    ? categories.find(c => c.id === selectedCategory)?.name 
                    : "All Products"}
                </h1>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded p-2 text-sm"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>

              {sortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-500">
                    Try selecting a different category or check back later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Shop;
