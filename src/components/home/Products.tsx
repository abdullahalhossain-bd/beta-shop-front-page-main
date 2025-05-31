
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/lib/data";
import { theme } from "@/lib/theme";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Handle category click to navigate to shop with category filter
  const handleCategoryClick = (category: string) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#040273] relative inline-block pb-4">
            Featured Products
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#6a0dad]"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of high-quality products that our customers love.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            style={!selectedCategory ? { backgroundColor: theme.colors.primary } : {}}
          >
            All Products
          </Button>
          
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryClick(category)}
              style={selectedCategory === category ? { backgroundColor: theme.colors.primary } : {}}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <Button 
              className="px-8 py-6 text-lg"
              style={{ backgroundColor: theme.colors.primary }}
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
