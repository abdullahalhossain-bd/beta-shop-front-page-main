
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface ReturnsPolicyType {
  title: string;
  sections: Section[];
}

const Returns = () => {
  const [policy, setPolicy] = useState<ReturnsPolicyType>({
    title: "Returns & Exchange Policy",
    sections: [
      {
        id: "return-policy",
        title: "Return Policy",
        content: "We accept returns within 14 days of receipt. Items must be unused, unwashed, and in the original packaging with all tags attached."
      },
      {
        id: "process",
        title: "Return Process",
        content: "To initiate a return, please contact our customer service team with your order number and reason for return. We will provide you with return instructions and a return authorization number."
      },
      {
        id: "exchanges",
        title: "Exchanges",
        content: "If you wish to exchange an item for a different size or color, please follow the return process and place a new order for the desired item. Once we receive your return, we will process your refund."
      },
      {
        id: "refunds",
        title: "Refunds",
        content: "Refunds will be issued to the original payment method within 5-7 business days after we receive and inspect the returned items. Shipping costs are non-refundable."
      },
      {
        id: "exceptions",
        title: "Exceptions",
        content: "Some items cannot be returned, including personalized items, intimate apparel, and clearance items marked as final sale. Please check the product description for any return restrictions."
      }
    ]
  });

  useEffect(() => {
    // Load returns policy from localStorage if available
    const storedPolicy = localStorage.getItem("returnsPolicy");
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

export default Returns;
