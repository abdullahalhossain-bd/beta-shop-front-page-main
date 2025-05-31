
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { theme } from "@/lib/theme";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { 
    cart, 
    cartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity,
    clearCart,
    getCartTotal
  } = useStore();
  const navigate = useNavigate();

  const total = getCartTotal();

  const handleCheckout = () => {
    toggleCart();
    navigate("/checkout");
  };

  return (
    <Sheet open={cartOpen} onOpenChange={toggleCart}>
      <SheetContent className="sm:max-w-md w-full overflow-auto">
        <SheetHeader className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Your Cart
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-gray-500 text-center">Looks like you haven't added any products to your cart yet.</p>
            <Button 
              onClick={toggleCart}
              style={{ backgroundColor: theme.colors.secondary }}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-6 my-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</div>
                    
                    <div className="flex items-center mt-3">
                      <Button 
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <div className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="grid gap-2 pt-2">
                <Button 
                  className="w-full"
                  style={{ backgroundColor: theme.colors.primary }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
