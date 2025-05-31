
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Radio } from "lucide-react";
import { toast } from "sonner";
import { theme } from "@/lib/theme";

interface FormErrors {
  [key: string]: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error once user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateShippingInfo = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentInfo = () => {
    if (paymentMethod !== "card") return true;
    
    const newErrors: FormErrors = {};
    
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required";
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
    if (!formData.cardCVC.trim()) newErrors.cardCVC = "CVC is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingInfo()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePaymentInfo()) {
      setLoading(true);
      
      // In a real app, this would be an API call to process payment and create order
      setTimeout(() => {
        clearCart();
        setLoading(false);
        toast.success("Order placed successfully!");
        navigate("/order-confirmation", { 
          state: { 
            orderNumber: `ORD-${Math.floor(Math.random() * 10000)}`,
            email: formData.email
          }
        });
      }, 2000);
    }
  };

  const handleBackToCart = () => {
    navigate(-1);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8">Add some products to your cart before proceeding to checkout.</p>
        <Button onClick={() => navigate("/shop")} style={{ backgroundColor: theme.colors.primary }}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      {/* Checkout steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
            step >= 1 ? 'bg-[#040273] text-white' : 'bg-gray-200'
          }`}>
            1
          </div>
          <div className="mx-2 border-t-2 w-20"></div>
          <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
            step >= 2 ? 'bg-[#040273] text-white' : 'bg-gray-200'
          }`}>
            2
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout form */}
        <div className="lg:flex-1 space-y-6">
          {step === 1 && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <form onSubmit={handleContinueToPayment} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address *
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State
                      </label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        Zip Code *
                      </label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">
                      Order Notes (Optional)
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Notes about your order, e.g. special delivery instructions"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBackToCart}
                    >
                      Back to Cart
                    </Button>
                    <Button 
                      type="submit"
                      style={{ backgroundColor: theme.colors.primary }}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div>
                    <div 
                      className={`p-4 border rounded-md cursor-pointer flex items-center gap-3 ${
                        paymentMethod === 'card' ? 'border-[#040273] bg-purple-50' : ''
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-[#040273]' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'card' && (
                          <div className="w-3 h-3 rounded-full bg-[#040273]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-gray-500">Pay securely with your card</p>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-10 h-6 bg-gray-100 rounded"></div>
                        <div className="w-10 h-6 bg-gray-100 rounded"></div>
                        <div className="w-10 h-6 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div 
                      className={`p-4 border rounded-md cursor-pointer flex items-center gap-3 ${
                        paymentMethod === 'paypal' ? 'border-[#040273] bg-purple-50' : ''
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'paypal' ? 'border-[#040273]' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'paypal' && (
                          <div className="w-3 h-3 rounded-full bg-[#040273]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                      </div>
                      <div className="w-16 h-6 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div 
                      className={`p-4 border rounded-md cursor-pointer flex items-center gap-3 ${
                        paymentMethod === 'cash' ? 'border-[#040273] bg-purple-50' : ''
                      }`}
                      onClick={() => setPaymentMethod('cash')}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cash' ? 'border-[#040273]' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'cash' && (
                          <div className="w-3 h-3 rounded-full bg-[#040273]" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive the order</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Card Details</h2>
                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                        Card Number *
                      </label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={errors.cardNumber ? "border-red-500" : ""}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                        Name on Card *
                      </label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={errors.cardName ? "border-red-500" : ""}
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">
                          Expiry Date *
                        </label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className={errors.cardExpiry ? "border-red-500" : ""}
                        />
                        {errors.cardExpiry && (
                          <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="cardCVC" className="block text-sm font-medium mb-1">
                          CVC *
                        </label>
                        <Input
                          id="cardCVC"
                          name="cardCVC"
                          placeholder="123"
                          value={formData.cardCVC}
                          onChange={handleChange}
                          className={errors.cardCVC ? "border-red-500" : ""}
                        />
                        {errors.cardCVC && (
                          <p className="text-red-500 text-xs mt-1">{errors.cardCVC}</p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="pt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back to Shipping
                </Button>
                <Button 
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </>
          )}
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 max-h-80 overflow-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t my-4"></div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
