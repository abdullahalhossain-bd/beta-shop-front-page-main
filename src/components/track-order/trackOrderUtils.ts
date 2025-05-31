
// Mock data and utility functions for the Track Order functionality

export interface TrackingEvent {
  status: string;
  date: string;
  location?: string;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: string[];
  estimatedDelivery?: string;
  trackingHistory: TrackingEvent[];
  email?: string;
}

// Mock function to fetch order data by order number
export const fetchOrderByNumber = (orderNumber: string): Promise<Order | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (orderNumber === "ORD-001" || orderNumber === "ORD-002" || orderNumber === "ORD-003") {
        const mockData: Order = {
          id: orderNumber,
          customer: "John Doe",
          email: "john@example.com", // Always include email for verification
          date: "2023-05-15",
          total: 125.99,
          status: orderNumber === "ORD-001" ? "delivered" : orderNumber === "ORD-002" ? "shipped" : "processing",
          items: [
            "Cotton T-shirt", 
            "Denim Jeans"
          ],
          estimatedDelivery: "2023-05-20",
          trackingHistory: [
            {
              status: "Order Placed",
              date: "2023-05-10 09:15",
              location: "Online"
            },
            {
              status: "Processing",
              date: "2023-05-11 11:30",
              location: "Warehouse"
            },
            {
              status: orderNumber === "ORD-001" || orderNumber === "ORD-002" ? "Shipped" : "Processing",
              date: "2023-05-12 14:45",
              location: "Distribution Center"
            }
          ]
        };
        
        if (orderNumber === "ORD-001" || orderNumber === "ORD-002") {
          mockData.trackingHistory.push({
            status: "In Transit",
            date: "2023-05-13 08:20",
            location: "Shipping Carrier"
          });
        }
        
        if (orderNumber === "ORD-001") {
          mockData.trackingHistory.push({
            status: "Delivered",
            date: "2023-05-15 14:30",
            location: "Customer Address"
          });
        }
        
        resolve(mockData);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

// Mock function to fetch user orders
export const fetchUserOrders = (userId: string): Order[] => {
  // In a real app, this would be an API call to get user orders
  // For now, using mock data - showing 2 orders as requested
  return [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      date: "2023-05-15",
      total: 125.99,
      status: "delivered",
      items: ["Cotton T-shirt", "Denim Jeans"],
      estimatedDelivery: "2023-05-20",
      trackingHistory: [
        {
          status: "Order Placed",
          date: "2023-05-10 09:15",
          location: "Online"
        },
        {
          status: "Processing",
          date: "2023-05-11 11:30",
          location: "Warehouse"
        },
        {
          status: "Shipped",
          date: "2023-05-12 14:45",
          location: "Distribution Center"
        },
        {
          status: "In Transit",
          date: "2023-05-13 08:20",
          location: "Shipping Carrier"
        },
        {
          status: "Delivered",
          date: "2023-05-15 14:30",
          location: "Customer Address"
        }
      ]
    },
    {
      id: "ORD-002",
      customer: "John Doe",
      email: "john@example.com",
      date: "2023-05-10",
      total: 78.50,
      status: "shipped",
      items: ["Wireless Earbuds", "Phone Case"],
      estimatedDelivery: "2023-05-18",
      trackingHistory: [
        {
          status: "Order Placed",
          date: "2023-05-05 14:22",
          location: "Online"
        },
        {
          status: "Processing",
          date: "2023-05-06 09:45",
          location: "Warehouse"
        },
        {
          status: "Shipped",
          date: "2023-05-07 16:30",
          location: "Distribution Center"
        },
        {
          status: "In Transit",
          date: "2023-05-09 10:15",
          location: "Shipping Carrier"
        }
      ]
    }
  ];
};
