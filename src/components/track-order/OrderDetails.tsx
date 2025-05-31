
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { theme } from "@/lib/theme";
import { Star } from "lucide-react";

interface TrackingEvent {
  status: string;
  date: string;
  location?: string;
}

interface OrderDetailsProps {
  order: {
    id: string;
    customer: string;
    date: string;
    total: number;
    status: string;
    items: string[];
    estimatedDelivery?: string;
    trackingHistory: TrackingEvent[];
  } | null;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const navigate = useNavigate();

  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-800";
      case "shipped": 
      case "in transit": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "order placed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleWriteReview = () => {
    navigate(`/review/${order.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-semibold mb-2">Order #{order.id}</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Order Date</p>
            <p className="font-medium">{order.date}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="font-medium">${order.total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Ordered Items</h3>
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li key={index} className="px-3 py-2 bg-gray-50 rounded">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Estimated Delivery</h3>
        <p className="font-medium">{order.estimatedDelivery || "To be determined"}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Tracking History</h3>
        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute top-0 left-4 w-0.5 h-full bg-gray-200"></div>
          
          {/* Timeline items */}
          <div className="space-y-6">
            {order.trackingHistory.map((event, index) => (
              <div key={index} className="relative pl-10">
                <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-[#6a0dad] text-white' : 'bg-gray-200'}`}>
                  {index + 1}
                </div>
                <div className="mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{event.date}</span>
                </div>
                {event.location && (
                  <p className="text-sm text-gray-600">{event.location}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {order.status.toLowerCase() === "delivered" && (
        <div className="mt-8 border-t pt-6">
          <p className="mb-3 flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400" size={18} />
            How was your experience? Share your feedback!
          </p>
          <Button 
            onClick={handleWriteReview} 
            style={{ backgroundColor: theme.colors.secondary }}
            className="flex items-center gap-2"
          >
            <Star size={16} className="text-white" /> Write a Review
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
