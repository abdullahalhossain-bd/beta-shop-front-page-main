
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface PrivacyPolicyType {
  title: string;
  lastUpdated: string;
  sections: Section[];
}

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState<PrivacyPolicyType>({
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
    // Load privacy policy from localStorage if available
    const storedPolicy = localStorage.getItem("privacyPolicy");
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
          <p className="mb-4">
            Last updated: {policy.lastUpdated}
          </p>
          
          {policy.sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-2xl font-semibold mb-4 mt-8">{section.title}</h2>
              <p className="mb-4">
                {section.content}
              </p>
              {section.id === "information" && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data:</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
                  <li><strong>Financial Data:</strong> includes payment card details (stored securely via our payment processors).</li>
                  <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                  <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                </ul>
              )}
              {section.id === "usage" && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>To process and deliver your orders</li>
                  <li>To manage your account and relationship with us</li>
                  <li>To improve our website, products, and services</li>
                  <li>To recommend products that may be of interest to you</li>
                  <li>To comply with legal obligations</li>
                </ul>
              )}
              {section.id === "rights" && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Request access to your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request erasure of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                  <li>Right to withdraw consent</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
