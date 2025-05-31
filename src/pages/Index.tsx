
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Products from "@/components/home/Products";
import Team from "@/components/home/Team";
import Newsletter from "@/components/home/Newsletter";
import CtaBanner from "@/components/home/CtaBanner";
import CartDrawer from "@/components/ui/CartDrawer";

const Index = () => {
  return <div className="min-h-screen flex flex-col">
      {/* Blue banner is now part of Header component */}
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <Products />
        <Features />
        <CtaBanner />
        <Team />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
    </div>;
};
export default Index;
