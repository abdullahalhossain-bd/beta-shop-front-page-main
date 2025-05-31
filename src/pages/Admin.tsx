import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import { products } from "@/lib/data";
import { Product, useStore } from "@/lib/store";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import OrdersTab from "@/components/admin/OrdersTab";
import CustomersTab from "@/components/admin/CustomersTab";
import SettingsTab from "@/components/admin/SettingsTab";
import AboutBlogTab from "@/components/admin/AboutBlogTab";
import PoliciesTab from "@/components/admin/PoliciesTab";
import SocialMediaTab from "@/components/admin/SocialMediaTab";
import SubscriberTab from "@/components/admin/SubscriberTab";
import CategoriesTab from "@/components/admin/CategoriesTab";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [showDialog, setShowDialog] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  // Updated formData state type definition to match Product interface with optional oldPrice
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    featured: boolean;
    new: boolean;
    sale: boolean;
    rating: number;
    reviewCount: number;
  }>({
    id: "",
    name: "",
    description: "",
    price: 0,
    oldPrice: 0,
    image: "https://placehold.co/300x400",
    category: "",
    featured: false,
    new: false,
    sale: false,
    rating: 0,
    reviewCount: 0,
  });

  // Check if admin is logged in
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!adminLoggedIn) {
      navigate("/admin-login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setFormData({
      id: `product-${Date.now()}`,
      name: "",
      description: "",
      price: 0,
      oldPrice: 0,
      image: "https://placehold.co/300x400",
      category: "",
      featured: false,
      new: false,
      sale: false,
      rating: 0,
      reviewCount: 0,
    });
    setShowDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    // Fixed: ensure all required properties have default values if they're optional in Product
    setFormData({
      ...product,
      featured: product.featured || false,
      new: product.new || false,
      sale: product.sale || false,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      oldPrice: product.oldPrice || 0
    });
    setShowDialog(true);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, you would make an API call to delete the product
    const updatedProducts = allProducts.filter((p) => p.id !== productId);
    setAllProducts(updatedProducts);
    toast.success("Product deleted successfully");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would make an API call to add/update the product
    if (editProduct) {
      // Update existing product
      const updatedProducts = allProducts.map((p) =>
        p.id === editProduct.id ? formData : p
      );
      setAllProducts(updatedProducts);
      toast.success("Product updated successfully");
    } else {
      // Add new product
      setAllProducts((prev) => [...prev, formData]);
      toast.success("Product added successfully");
    }

    setShowDialog(false);
  };

  if (!isAuthenticated) {
    return null; // Or a loading indicator
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="ghost" className="flex items-center gap-2" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="products">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Products Management</h2>
              <Button onClick={handleAddProduct} className="flex items-center gap-2 bg-[#040273]">
                <Plus size={16} />
                Add Product
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4">Image</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4 text-gray-500">{product.category}</td>
                        <td className="p-4">${product.price.toFixed(2)}</td>
                        <td className="p-4">
                          {product.new && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              New
                            </span>
                          )}
                          {product.sale && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full ml-1">
                              Sale
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                              className="flex items-center gap-1"
                            >
                              <Edit size={14} />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="flex items-center gap-1 text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          
          <TabsContent value="customers">
            <CustomersTab />
          </TabsContent>

          <TabsContent value="content">
            <AboutBlogTab />
          </TabsContent>
          
          <TabsContent value="policies">
            <PoliciesTab />
          </TabsContent>
          
          <TabsContent value="social">
            <SocialMediaTab />
          </TabsContent>
          
          <TabsContent value="subscribers">
            <SubscriberTab />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Product Name
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
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="oldPrice" className="block text-sm font-medium mb-1">
                  Old Price (Optional)
                </label>
                <Input
                  id="oldPrice"
                  name="oldPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.oldPrice || ""}
                  onChange={handleInputChange}
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
                  required
                />
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-1">
                  Rating (0-5)
                </label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating || 0}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="reviewCount" className="block text-sm font-medium mb-1">
                  Review Count
                </label>
                <Input
                  id="reviewCount"
                  name="reviewCount"
                  type="number"
                  min="0"
                  value={formData.reviewCount || 0}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#040273] focus:ring-[#040273]"
                    checked={formData.featured || false}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="featured" className="ml-2 text-sm font-medium">
                    Featured
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="new"
                    name="new"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#040273] focus:ring-[#040273]"
                    checked={formData.new || false}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="new" className="ml-2 text-sm font-medium">
                    New
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sale"
                    name="sale"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#040273] focus:ring-[#040273]"
                    checked={formData.sale || false}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="sale" className="ml-2 text-sm font-medium">
                    Sale
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#040273]">
                {editProduct ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
