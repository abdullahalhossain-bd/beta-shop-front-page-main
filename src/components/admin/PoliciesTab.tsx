
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

const PoliciesTab = () => {
  const [shippingPolicy, setShippingPolicy] = useState({
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

  const [returnsPolicy, setReturnsPolicy] = useState({
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

  const [privacyPolicy, setPrivacyPolicy] = useState({
    title: "Privacy Policy",
    lastUpdated: "May 21, 2025",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "Betagi E-Shop respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
      },
      {
        id: "information",
        title: "Information We Collect",
        content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, Financial Data, Transaction Data, and Technical Data."
      },
      {
        id: "usage",
        title: "How We Use Your Data",
        content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to process and deliver orders, manage your account, improve our website, recommend products, and comply with legal obligations."
      },
      {
        id: "security",
        title: "Data Security",
        content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know."
      },
      {
        id: "rights",
        title: "Your Legal Rights",
        content: "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including: request access, correction, erasure, object to processing, restriction of processing, data transfer, and right to withdraw consent."
      },
      {
        id: "contact",
        title: "Contact Us",
        content: "If you have any questions about this privacy policy or our privacy practices, please contact us at: Email: betagieshop@gmail.com, Phone: +880 1584-013318"
      }
    ]
  });

  useEffect(() => {
    // Load policies from localStorage if available
    const storedShippingPolicy = localStorage.getItem("shippingPolicy");
    const storedReturnsPolicy = localStorage.getItem("returnsPolicy");
    const storedPrivacyPolicy = localStorage.getItem("privacyPolicy");
    
    if (storedShippingPolicy) {
      setShippingPolicy(JSON.parse(storedShippingPolicy));
    }
    
    if (storedReturnsPolicy) {
      setReturnsPolicy(JSON.parse(storedReturnsPolicy));
    }
    
    if (storedPrivacyPolicy) {
      setPrivacyPolicy(JSON.parse(storedPrivacyPolicy));
    }
  }, []);

  const handlePolicyTitleChange = (e: React.ChangeEvent<HTMLInputElement>, setPolicyFn: React.Dispatch<React.SetStateAction<any>>) => {
    const { value } = e.target;
    setPolicyFn(prev => ({ ...prev, title: value }));
  };

  const handleLastUpdatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPrivacyPolicy(prev => ({ ...prev, lastUpdated: value }));
  };

  const handleSectionChange = (
    sectionId: string, 
    field: 'title' | 'content', 
    value: string, 
    policy: any, 
    setPolicyFn: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const updatedSections = policy.sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, [field]: value };
      }
      return section;
    });
    
    setPolicyFn(prev => ({ ...prev, sections: updatedSections }));
  };

  const handleSavePolicy = (policy: any, policyName: string) => {
    localStorage.setItem(policyName, JSON.stringify(policy));
    toast.success(`${policy.title} saved successfully`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Policies Management</h2>
      </div>
      
      <Tabs defaultValue="shipping">
        <TabsList>
          <TabsTrigger value="shipping">Shipping Policy</TabsTrigger>
          <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        </TabsList>
        
        {/* Shipping Policy Tab */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Edit Shipping Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="shippingTitle" className="block text-sm font-medium mb-1">Policy Title</label>
                <Input 
                  id="shippingTitle" 
                  value={shippingPolicy.title} 
                  onChange={(e) => handlePolicyTitleChange(e, setShippingPolicy)}
                />
              </div>
              
              {shippingPolicy.sections.map((section) => (
                <div key={section.id} className="border p-4 rounded-lg">
                  <div className="mb-3">
                    <label htmlFor={`shipping-${section.id}-title`} className="block text-sm font-medium mb-1">Section Title</label>
                    <Input 
                      id={`shipping-${section.id}-title`} 
                      value={section.title} 
                      onChange={(e) => handleSectionChange(section.id, 'title', e.target.value, shippingPolicy, setShippingPolicy)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`shipping-${section.id}-content`} className="block text-sm font-medium mb-1">Section Content</label>
                    <Textarea 
                      id={`shipping-${section.id}-content`} 
                      rows={4} 
                      value={section.content} 
                      onChange={(e) => handleSectionChange(section.id, 'content', e.target.value, shippingPolicy, setShippingPolicy)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="bg-[#040273]" onClick={() => handleSavePolicy(shippingPolicy, "shippingPolicy")}>
                Save Shipping Policy
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Returns & Exchanges Tab */}
        <TabsContent value="returns">
          <Card>
            <CardHeader>
              <CardTitle>Edit Returns & Exchanges Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="returnsTitle" className="block text-sm font-medium mb-1">Policy Title</label>
                <Input 
                  id="returnsTitle" 
                  value={returnsPolicy.title} 
                  onChange={(e) => handlePolicyTitleChange(e, setReturnsPolicy)}
                />
              </div>
              
              {returnsPolicy.sections.map((section) => (
                <div key={section.id} className="border p-4 rounded-lg">
                  <div className="mb-3">
                    <label htmlFor={`returns-${section.id}-title`} className="block text-sm font-medium mb-1">Section Title</label>
                    <Input 
                      id={`returns-${section.id}-title`} 
                      value={section.title} 
                      onChange={(e) => handleSectionChange(section.id, 'title', e.target.value, returnsPolicy, setReturnsPolicy)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`returns-${section.id}-content`} className="block text-sm font-medium mb-1">Section Content</label>
                    <Textarea 
                      id={`returns-${section.id}-content`} 
                      rows={4} 
                      value={section.content} 
                      onChange={(e) => handleSectionChange(section.id, 'content', e.target.value, returnsPolicy, setReturnsPolicy)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="bg-[#040273]" onClick={() => handleSavePolicy(returnsPolicy, "returnsPolicy")}>
                Save Returns Policy
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Privacy Policy Tab */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Edit Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="privacyTitle" className="block text-sm font-medium mb-1">Policy Title</label>
                <Input 
                  id="privacyTitle" 
                  value={privacyPolicy.title} 
                  onChange={(e) => handlePolicyTitleChange(e, setPrivacyPolicy)}
                />
              </div>
              
              <div>
                <label htmlFor="lastUpdated" className="block text-sm font-medium mb-1">Last Updated Date</label>
                <Input 
                  id="lastUpdated" 
                  value={privacyPolicy.lastUpdated} 
                  onChange={handleLastUpdatedChange}
                />
              </div>
              
              {privacyPolicy.sections.map((section) => (
                <div key={section.id} className="border p-4 rounded-lg">
                  <div className="mb-3">
                    <label htmlFor={`privacy-${section.id}-title`} className="block text-sm font-medium mb-1">Section Title</label>
                    <Input 
                      id={`privacy-${section.id}-title`} 
                      value={section.title} 
                      onChange={(e) => handleSectionChange(section.id, 'title', e.target.value, privacyPolicy, setPrivacyPolicy)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`privacy-${section.id}-content`} className="block text-sm font-medium mb-1">Section Content</label>
                    <Textarea 
                      id={`privacy-${section.id}-content`} 
                      rows={4} 
                      value={section.content} 
                      onChange={(e) => handleSectionChange(section.id, 'content', e.target.value, privacyPolicy, setPrivacyPolicy)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="bg-[#040273]" onClick={() => handleSavePolicy(privacyPolicy, "privacyPolicy")}>
                Save Privacy Policy
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PoliciesTab;
