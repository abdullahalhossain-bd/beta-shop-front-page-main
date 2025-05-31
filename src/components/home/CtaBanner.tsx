
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { theme } from "@/lib/theme";

const CtaBanner = () => {
  return (
    <section 
      className="py-16"
      style={{
        background: `linear-gradient(to right, ${theme.colors.secondary}, #9c42ff)`,
        color: "white"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Limited Time Offers!</h2>
          <p className="text-lg opacity-90">Get up to 50% off on all products. Explore our exclusive collection today!</p>

          <Button 
            className="text-lg px-8 py-6 rounded-full" 
            style={{ backgroundColor: "white", color: theme.colors.secondary }}
            asChild
          >
            <Link to="/featured-products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
