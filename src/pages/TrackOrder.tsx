
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TrackOrderContainer from "@/components/track-order/TrackOrderContainer";
import { fetchUserOrders } from "@/components/track-order/trackOrderUtils";
import type { Order } from "@/components/track-order/trackOrderUtils";
import { toast } from "sonner";

const TrackOrder = () => {
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          setUser(data.session.user);
          const orders = await fetchUserOrders(data.session.user.id);
          setUserOrders(orders);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        toast.error("Failed to load user information");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[80vh]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-8">Track Your Order</h1>
      <TrackOrderContainer user={user} userOrders={userOrders} />
    </div>
  );
};

export default TrackOrder;
