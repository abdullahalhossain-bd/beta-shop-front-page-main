
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Sample customers data - in a real app, you would fetch this from an API
const sampleCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: 5,
    totalSpent: 542.75,
    joinDate: "2023-01-15",
    status: "active"
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    orders: 3,
    totalSpent: 178.50,
    joinDate: "2023-02-22",
    status: "active"
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    orders: 8,
    totalSpent: 947.25,
    joinDate: "2022-11-05",
    status: "inactive"
  },
  {
    id: "CUST-004",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    orders: 2,
    totalSpent: 129.99,
    joinDate: "2023-04-18",
    status: "active"
  },
  {
    id: "CUST-005",
    name: "Alex Brown",
    email: "alex.brown@example.com",
    orders: 0,
    totalSpent: 0,
    joinDate: "2023-05-10",
    status: "pending"
  }
];

const CustomersTab = () => {
  const [customers, setCustomers] = useState(sampleCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof sampleCustomers[0] | null>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const viewCustomerDetails = (customer: typeof sampleCustomers[0]) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  const updateCustomerStatus = (customerId: string, newStatus: string) => {
    const updatedCustomers = customers.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    );
    setCustomers(updatedCustomers);
    
    if (selectedCustomer && selectedCustomer.id === customerId) {
      setSelectedCustomer({ ...selectedCustomer, status: newStatus });
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customer Management</h2>
      </div>

      <div className="mb-4 w-full md:w-1/3">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={
                    customer.status === 'active' ? 'bg-green-100 text-green-800' :
                    customer.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => viewCustomerDetails(customer)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showCustomerDetails} onOpenChange={setShowCustomerDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer ID</p>
                  <p className="font-medium">{selectedCustomer.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">{selectedCustomer.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Orders</p>
                  <p className="font-medium">{selectedCustomer.orders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="font-medium">${selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Update Status:</p>
                <div className="flex space-x-2">
                  {["active", "inactive", "pending"].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedCustomer.status === status ? "default" : "outline"}
                      className={selectedCustomer.status === status ? "bg-[#040273]" : ""}
                      onClick={() => updateCustomerStatus(selectedCustomer.id, status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomerDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersTab;
