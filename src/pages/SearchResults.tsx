
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import { theme } from "@/lib/theme";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const results = products.filter(
      product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredProducts(results);
  }, [query]);

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
              <span className="font-medium text-gray-900">Search Results</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: theme.colors.primary }}>
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try searching with different keywords or browse our categories.
              </p>
              <Button 
                onClick={() => window.history.back()}
                style={{ backgroundColor: theme.colors.primary }}
              >
                Go Back
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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

export default SearchResults;
