
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

const AboutUs = () => {
  const [aboutContent, setAboutContent] = useState({
    title: "About Betagi E-Shop",
    description: "Welcome to Betagi E-Shop, your destination for high-quality products at competitive prices.",
    mission: "Our mission is to provide customers with a seamless shopping experience and excellent customer service.",
    vision: "We envision becoming the leading e-commerce platform known for quality, reliability, and customer satisfaction.",
    storyTitle: "Our Story",
    storyContent: "Betagi E-Shop was established in 2020 with a vision to revolutionize online shopping. What started as a small venture has now grown into a thriving e-commerce business serving customers worldwide.",
    teamTitle: "Our Team",
    teamDescription: "We have a dedicated team of professionals who work tirelessly to ensure that you get the best shopping experience."
  });

  useEffect(() => {
    // Load about content from localStorage (set by admin panel)
    const storedAboutContent = localStorage.getItem("aboutContent");
    if (storedAboutContent) {
      setAboutContent(JSON.parse(storedAboutContent));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{aboutContent.title}</h1>
              
              <div className="bg-white shadow-md rounded-lg p-8 mb-10">
                <p className="text-lg mb-6">{aboutContent.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-purple-800">Our Mission</h3>
                    <p>{aboutContent.mission}</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-purple-800">Our Vision</h3>
                    <p>{aboutContent.vision}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-8 mb-10">
                <h2 className="text-2xl font-bold mb-4">{aboutContent.storyTitle}</h2>
                <p className="mb-6">{aboutContent.storyContent}</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">{aboutContent.teamTitle}</h2>
                <p>{aboutContent.teamDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default AboutUs;
