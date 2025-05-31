
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories as defaultCategories } from "@/lib/data";

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load custom categories from localStorage if available
    const loadCategories = () => {
      try {
        setIsLoading(true);
        const customCategories = localStorage.getItem("custom_categories");
        if (customCategories) {
          const parsedCategories = JSON.parse(customCategories);
          setCategories(parsedCategories);
        } else {
          setCategories(defaultCategories);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
        setCategories(defaultCategories);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#040273] relative inline-block pb-4">
            Shop by Category
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#6a0dad]"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of product categories to find exactly what you're looking for.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                to={`/shop?category=${category.id}`}
                key={category.id} 
                className="relative h-80 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Category+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">{category.productCount}+ Products</span>
                    <span className="bg-white/20 rounded-full p-2 transform group-hover:translate-x-2 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
