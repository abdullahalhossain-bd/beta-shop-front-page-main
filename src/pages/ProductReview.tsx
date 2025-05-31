
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { theme } from "@/lib/theme";
import { supabase } from "@/integrations/supabase/client";

const ProductReview = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState<{
    id: string;
    date: string;
    items: { id: string; name: string; image: string }[];
  } | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      
      // Only load order data if user is logged in
      if (data.session?.user) {
        fetchOrderData();
      } else {
        toast.error("Please login to submit reviews");
        navigate("/login");
      }
    };
    
    fetchUser();
  }, [navigate]);

  const fetchOrderData = () => {
    // In a real app, this would fetch from Supabase
    setTimeout(() => {
      if (orderId === "ORD-001") {
        setOrderData({
          id: orderId,
          date: "2023-05-15",
          items: [
            { 
              id: "1", 
              name: "Cotton T-shirt", 
              image: "https://placehold.co/300x300/e0e0e0/ffffff?text=T-shirt" 
            },
            { 
              id: "2", 
              name: "Denim Jeans", 
              image: "https://placehold.co/300x300/e0e0e0/ffffff?text=Jeans" 
            }
          ]
        });
      } else {
        toast.error("Order not found");
        navigate("/track-order");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!selectedItem) {
      toast.error("Please select a product to review");
      return;
    }
    
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }
    
    // In a real app, submit the review to Supabase
    setIsLoading(true);
    
    try {
      // Mock submission to Supabase
      // This would be a real insertion in a production app
      // const { error } = await supabase
      //   .from('reviews')
      //   .insert({
      //     user_id: user.id,
      //     product_id: selectedItem,
      //     order_id: orderId,
      //     rating: rating,
      //     review_text: reviewText,
      //   });
      
      // if (error) throw error;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thank you for your review!");
      navigate("/track-order");
    } catch (error) {
      toast.error("Error submitting your review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !orderData) {
    return (
      <div className="container mx-auto py-20 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate('/track-order')}
      >
        <ArrowLeft size={16} />
        Back to Order Tracking
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Write a Review</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order #{orderId}. Please share your experience with the products you purchased.
        </p>
        
        {orderData && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3">Select a product to review</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orderData.items.map((item) => (
                  <div 
                    key={item.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedItem === item.id ? 'border-[#040273] bg-purple-50' : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">From order #{orderId}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-3">Rate your experience</h2>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-2xl focus:outline-none"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star 
                        size={32} 
                        className={`${
                          (hoverRating || rating) >= star 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              </div>
              
              <div>
                <label htmlFor="review" className="block text-lg font-medium mb-3">
                  Write your review
                </label>
                <Textarea
                  id="review"
                  placeholder="Share your experience with this product..."
                  rows={5}
                  className="w-full"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit"
                  className="w-full sm:w-auto px-8"
                  disabled={isLoading || !selectedItem || !rating}
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {isLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </div>
        )}
        
        {isLoading && !orderData && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-pulse text-xl">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
