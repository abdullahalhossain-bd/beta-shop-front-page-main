
import { theme } from "@/lib/theme";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: string[];
  estimatedDelivery?: string;
  trackingHistory: {
    status: string;
    date: string;
    location?: string;
  }[];
}

interface OrderListProps {
  orders: Order[];
  onViewOrderDetails: (order: Order) => void;
}

const OrderList = ({ orders, onViewOrderDetails }: OrderListProps) => {
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

  return (
    <div className="grid gap-4 mb-8">
      {orders.map((order) => (
        <div 
          key={order.id} 
          className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => onViewOrderDetails(order)}
        >
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h3 className="font-medium">Order #{order.id}</h3>
              <p className="text-sm text-gray-500">Placed on {order.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
