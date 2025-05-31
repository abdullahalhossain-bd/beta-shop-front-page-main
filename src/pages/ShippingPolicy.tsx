
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface ShippingPolicyType {
  title: string;
  sections: Section[];
}

const ShippingPolicy = () => {
  const [policy, setPolicy] = useState<ShippingPolicyType>({
    title: "Shipping Policy",
    sections: [
      {
        id: "domestic",
        title: "Domestic Shipping",
        content: "We currently offer shipping to all major cities within Bangladesh. Standard shipping typically takes 2-4 business days for delivery."
      },
      {
        id: "international",
        title: "International Shipping",
        content: "For international customers, we offer shipping to select countries. International shipping typically takes 7-14 business days depending on the destination country and local customs procedures."
      },
      {
        id: "rates",
        title: "Shipping Rates",
        content: "Shipping rates are calculated based on the destination, weight, and dimensions of the ordered items. The exact shipping cost will be displayed during checkout before payment is processed."
      },
      {
        id: "free",
        title: "Free Shipping",
        content: "We offer free shipping on all orders above 2000 BDT within Bangladesh. International orders do not qualify for free shipping at this time."
      },
      {
        id: "tracking",
        title: "Order Tracking",
        content: "Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use this tracking number on our Track Order page to monitor your shipment's progress."
      },
      {
        id: "delays",
        title: "Shipping Delays",
        content: "Please note that delivery times may be affected by factors outside our control such as weather conditions, customs delays, or local holidays. We appreciate your understanding in such situations."
      },
      {
        id: "damaged",
        title: "Damaged Items",
        content: "If your item arrives damaged, please contact our customer service team within 48 hours of receipt with photos of the damaged item and packaging. We will arrange for a replacement or refund as appropriate."
      }
    ]
  });

  useEffect(() => {
    // Load shipping policy from localStorage if available
    const storedPolicy = localStorage.getItem("shippingPolicy");
    if (storedPolicy) {
      setPolicy(JSON.parse(storedPolicy));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{policy.title}</h1>
        
        <div className="max-w-3xl mx-auto prose">
          {policy.sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-2xl font-semibold mb-4 mt-8">{section.title}</h2>
              <p className="mb-4">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
