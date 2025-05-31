
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { theme } from "@/lib/theme";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, email } = location.state || {};
  
  useEffect(() => {
    // If no order information, redirect to home
    if (!orderNumber) {
      navigate("/");
    }
  }, [orderNumber, navigate]);

  if (!orderNumber) {
    return null;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mt-6 mb-2">Thank You For Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been received and is now being processed.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-left">
              <h3 className="text-sm font-semibold text-gray-500">ORDER NUMBER</h3>
              <p className="text-lg font-medium">{orderNumber}</p>
            </div>
            <div className="text-left">
              <h3 className="text-sm font-semibold text-gray-500">EMAIL</h3>
              <p className="text-lg font-medium">{email}</p>
            </div>
          </div>
          
          <div className="border-t border-dashed my-6"></div>
          
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-500">ORDER DETAILS</h3>
            <p className="mt-2">
              We've sent an order confirmation email to <span className="font-medium">{email}</span> with the order details and tracking information.
            </p>
          </div>
        </div>
        
        <div className="space-y-4 max-w-md mx-auto">
          <Button 
            onClick={() => navigate(`/track-order`)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            Track Your Order
            <ArrowRight size={16} />
          </Button>
          
          <Button 
            onClick={() => navigate("/")}
            className="w-full"
            style={{ backgroundColor: theme.colors.primary }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
