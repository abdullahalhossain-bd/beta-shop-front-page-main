
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { theme } from "@/lib/theme";

interface TrackOrderFormProps {
  onTrackOrder: (orderNumber: string, orderEmail: string) => void;
  loading: boolean;
}

const TrackOrderForm = ({ onTrackOrder, loading }: TrackOrderFormProps) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderEmail, setOrderEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber) {
      toast.error("Please enter your order number");
      return;
    }
    
    if (!orderEmail) {
      toast.error("Please enter your email address");
      return;
    }
    
    onTrackOrder(orderNumber, orderEmail);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
          Order Number <span className="text-red-500">*</span>
        </label>
        <Input
          id="orderNumber"
          placeholder="e.g. ORD-001"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="orderEmail" className="block text-sm font-medium mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <Input
          id="orderEmail"
          type="email"
          placeholder="Email used for order"
          value={orderEmail}
          onChange={(e) => setOrderEmail(e.target.value)}
          required
        />
      </div>
      <Button 
        type="submit"
        className="w-full flex items-center justify-center gap-2"
        disabled={loading || !orderNumber || !orderEmail}
        style={{ backgroundColor: theme.colors.primary }}
      >
        {loading ? "Searching..." : (
          <>
            <Search size={16} /> Track Order
          </>
        )}
      </Button>
      <div className="text-center text-xs text-gray-500 mt-2">
        Try with demo order numbers: ORD-001, ORD-002, or ORD-003
      </div>
    </form>
  );
};

export default TrackOrderForm;
