
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Edit, ImageIcon, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const CategoriesTab = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Category>({
    id: "",
    name: "",
    image: "",
    productCount: 0
  });

  // Load categories from localStorage
  useEffect(() => {
    const storedCategories = localStorage.getItem("custom_categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      // Initialize with default categories if none exist in localStorage
      const defaultCategories = [
        {
          id: "electronics",
          name: "Electronics",
          image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1301&q=80",
          productCount: 24
        },
        {
          id: "clothing",
          name: "Clothing",
          image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          productCount: 36
        },
        {
          id: "furniture",
          name: "Furniture",
          image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          productCount: 15
        }
      ];
      setCategories(defaultCategories);
      localStorage.setItem("custom_categories", JSON.stringify(defaultCategories));
    }
  }, []);

  const handleAddCategory = () => {
    setEditCategory(null);
    setFormData({
      id: "",
      name: "",
      image: "",
      productCount: 0
    });
    setShowDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditCategory(category);
    setFormData({...category});
    setShowDialog(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    setCategories(updatedCategories);
    localStorage.setItem("custom_categories", JSON.stringify(updatedCategories));
    toast.success("Category deleted successfully");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "productCount" ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate slug-like ID from name if creating new category
    const categoryId = editCategory ? editCategory.id : formData.name.toLowerCase().replace(/\s+/g, '-');
    
    const updatedCategory = {
      ...formData,
      id: categoryId
    };
    
    let updatedCategories: Category[];
    
    if (editCategory) {
      // Update existing category
      updatedCategories = categories.map(category => 
        category.id === editCategory.id ? updatedCategory : category
      );
      toast.success("Category updated successfully");
    } else {
      // Add new category
      updatedCategories = [...categories, updatedCategory];
      toast.success("Category added successfully");
    }
    
    setCategories(updatedCategories);
    localStorage.setItem("custom_categories", JSON.stringify(updatedCategories));
    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories Management</h2>
        <Button onClick={handleAddCategory} className="flex items-center gap-2 bg-[#040273]">
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <Card key={category.id}>
            <div className="aspect-video relative overflow-hidden">
              {category.image ? (
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.productCount} Products</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEditCategory(category)}
                className="flex items-center gap-1"
              >
                <Edit size={14} />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDeleteCategory(category.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Category Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a URL for the category image
              </p>
            </div>
            
            <div>
              <label htmlFor="productCount" className="block text-sm font-medium mb-1">
                Product Count
              </label>
              <Input
                id="productCount"
                name="productCount"
                type="number"
                min="0"
                value={formData.productCount}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#040273]">
                {editCategory ? 'Update Category' : 'Add Category'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesTab;
