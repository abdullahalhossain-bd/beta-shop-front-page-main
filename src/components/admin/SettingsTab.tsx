import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { products } from "@/lib/data";
import { Product } from "@/lib/store";

interface FeaturedProduct extends Product {}

const SettingsTab = () => {
  // Existing settings state
  const [storeInfo, setStoreInfo] = useState({
    storeName: "Betagi E-Shop",
    storeEmail: "contact@betagi-eshop.com",
    storePhone: "+1 (234) 567-890",
    storeAddress: "123 E-Commerce St, Shopping City, 10001",
    storeDescription: "Your one-stop shop for quality products at affordable prices.",
  });
  
  const [deliverySettings, setDeliverySettings] = useState({
    deliveryCharge: 5,
    freeDeliveryThreshold: 50,
    deliveryLocations: "New York, Los Angeles, Chicago, Houston, Miami"
  });

  // Featured products state
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initial setup - load all products
    setAvailableProducts(products);
    
    // Load featured products from localStorage if available
    const storedFeaturedProducts = localStorage.getItem("featuredProducts");
    if (storedFeaturedProducts) {
      setFeaturedProducts(JSON.parse(storedFeaturedProducts));
    }
    
    // Load delivery settings from localStorage if available
    const storedDeliverySettings = localStorage.getItem("deliverySettings");
    if (storedDeliverySettings) {
      setDeliverySettings(JSON.parse(storedDeliverySettings));
    }
    
    // Load store info from localStorage if available
    const storedStoreInfo = localStorage.getItem("storeInfo");
    if (storedStoreInfo) {
      setStoreInfo(JSON.parse(storedStoreInfo));
    }
  }, []);

  const handleAddToFeatured = (product: Product) => {
    if (!featuredProducts.some(p => p.id === product.id)) {
      const newFeaturedProducts = [...featuredProducts, product];
      setFeaturedProducts(newFeaturedProducts);
      localStorage.setItem("featuredProducts", JSON.stringify(newFeaturedProducts));
      toast.success(`${product.name} added to featured products`);
    } else {
      toast.info(`${product.name} is already in featured products`);
    }
  };

  const handleRemoveFromFeatured = (productId: string) => {
    const updatedFeatured = featuredProducts.filter(p => p.id !== productId);
    setFeaturedProducts(updatedFeatured);
    localStorage.setItem("featuredProducts", JSON.stringify(updatedFeatured));
    toast.info("Product removed from featured products");
  };

  const filteredProducts = availableProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveStoreInfo = () => {
    localStorage.setItem("storeInfo", JSON.stringify(storeInfo));
    toast.success("Store information saved successfully");
  };

  const handleSaveDeliverySettings = () => {
    localStorage.setItem("deliverySettings", JSON.stringify(deliverySettings));
    toast.success("Delivery settings saved successfully");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, stateSetter: Function, stateObject: any) => {
    const { name, value } = e.target;
    stateSetter({
      ...stateObject,
      [name]: value
    });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, stateSetter: Function, stateObject: any) => {
    const { name, value } = e.target;
    stateSetter({
      ...stateObject,
      [name]: parseFloat(value) || 0
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>
      
      <Tabs defaultValue="storeInfo">
        <TabsList>
          <TabsTrigger value="storeInfo">Store Information</TabsTrigger>
          <TabsTrigger value="featuredProducts">Featured Products</TabsTrigger>
          <TabsTrigger value="deliverySettings">Delivery Settings</TabsTrigger>
        </TabsList>
        
        {/* Store Information Tab */}
        <TabsContent value="storeInfo">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium mb-1">Store Name</label>
                <Input 
                  id="storeName" 
                  name="storeName" 
                  value={storeInfo.storeName} 
                  onChange={(e) => handleInputChange(e, setStoreInfo, storeInfo)}
                />
              </div>
              
              <div>
                <label htmlFor="storeEmail" className="block text-sm font-medium mb-1">Email Address</label>
                <Input 
                  id="storeEmail" 
                  name="storeEmail" 
                  type="email" 
                  value={storeInfo.storeEmail}
                  onChange={(e) => handleInputChange(e, setStoreInfo, storeInfo)}
                />
              </div>
              
              <div>
                <label htmlFor="storePhone" className="block text-sm font-medium mb-1">Phone Number</label>
                <Input 
                  id="storePhone" 
                  name="storePhone" 
                  value={storeInfo.storePhone}
                  onChange={(e) => handleInputChange(e, setStoreInfo, storeInfo)}
                />
              </div>
              
              <div>
                <label htmlFor="storeAddress" className="block text-sm font-medium mb-1">Address</label>
                <Input 
                  id="storeAddress" 
                  name="storeAddress" 
                  value={storeInfo.storeAddress}
                  onChange={(e) => handleInputChange(e, setStoreInfo, storeInfo)}
                />
              </div>
              
              <div>
                <label htmlFor="storeDescription" className="block text-sm font-medium mb-1">Store Description</label>
                <Textarea 
                  id="storeDescription" 
                  name="storeDescription" 
                  rows={4}
                  value={storeInfo.storeDescription}
                  onChange={(e) => handleInputChange(e, setStoreInfo, storeInfo)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#040273]" onClick={handleSaveStoreInfo}>
                Save Information
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Featured Products Tab */}
        <TabsContent value="featuredProducts">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Currently Featured Products</CardTitle>
            </CardHeader>
            <CardContent>
              {featuredProducts.length === 0 ? (
                <p className="text-gray-500">No featured products selected yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden flex flex-col">
                      <div className="h-36 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3 flex flex-col flex-grow">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        <p className="font-semibold">${product.price.toFixed(2)}</p>
                        <div className="mt-auto pt-2">
                          <Button 
                            variant="outline" 
                            className="w-full text-red-500 hover:text-red-700 hover:border-red-200"
                            onClick={() => handleRemoveFromFeatured(product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Add Featured Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input 
                  placeholder="Search products by name or category..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr className="border-b">
                        <th className="p-3">Image</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-3 text-center text-gray-500">
                            No products found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b">
                            <td className="p-3">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-10 h-10 object-cover rounded" 
                              />
                            </td>
                            <td className="p-3 font-medium">{product.name}</td>
                            <td className="p-3 text-gray-500">{product.category}</td>
                            <td className="p-3">${product.price.toFixed(2)}</td>
                            <td className="p-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={featuredProducts.some(p => p.id === product.id)}
                                onClick={() => handleAddToFeatured(product)}
                                className="text-[#040273] border-[#040273] hover:bg-[#040273] hover:text-white"
                              >
                                {featuredProducts.some(p => p.id === product.id) ? 'Added' : 'Add to Featured'}
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Delivery Settings Tab */}
        <TabsContent value="deliverySettings">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="deliveryCharge" className="block text-sm font-medium mb-1">
                  Standard Delivery Charge ($)
                </label>
                <Input
                  id="deliveryCharge"
                  name="deliveryCharge"
                  type="number"
                  min="0"
                  step="0.01"
                  value={deliverySettings.deliveryCharge}
                  onChange={(e) => handleNumberInputChange(e, setDeliverySettings, deliverySettings)}
                />
              </div>
              
              <div>
                <label htmlFor="freeDeliveryThreshold" className="block text-sm font-medium mb-1">
                  Free Delivery Threshold ($)
                </label>
                <Input
                  id="freeDeliveryThreshold"
                  name="freeDeliveryThreshold"
                  type="number"
                  min="0"
                  step="0.01"
                  value={deliverySettings.freeDeliveryThreshold}
                  onChange={(e) => handleNumberInputChange(e, setDeliverySettings, deliverySettings)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Orders above this amount qualify for free delivery.
                </p>
              </div>
              
              <div>
                <label htmlFor="deliveryLocations" className="block text-sm font-medium mb-1">
                  Delivery Locations
                </label>
                <Textarea
                  id="deliveryLocations"
                  name="deliveryLocations"
                  rows={4}
                  placeholder="Enter delivery locations (separate by commas)"
                  value={deliverySettings.deliveryLocations}
                  onChange={(e) => handleInputChange(e, setDeliverySettings, deliverySettings)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter city names separated by commas where delivery service is available.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#040273]" onClick={handleSaveDeliverySettings}>
                Save Delivery Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTab;
