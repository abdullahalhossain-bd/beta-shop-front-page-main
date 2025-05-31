
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Initial FAQ questions and answers
const initialFaqs = [
  {
    id: "1",
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused and unopened items. Please contact our customer service team to initiate a return."
  },
  {
    id: "2",
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping may take 7-14 business days depending on the destination."
  },
  {
    id: "3", 
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location."
  },
  {
    id: "4",
    question: "How can I track my order?",
    answer: "Once your order ships, you will receive a tracking number via email that you can use to monitor your shipment's progress."
  },
  {
    id: "5",
    question: "Are your products covered by warranty?",
    answer: "Most of our products come with a standard manufacturer's warranty. Details are provided on individual product pages."
  },
  {
    id: "6",
    question: "Do you offer gift wrapping?",
    answer: "Yes, we offer gift wrapping for a small additional fee. You can select this option during checkout."
  },
  {
    id: "7",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay."
  },
  {
    id: "8",
    question: "Can I change or cancel my order after it's been placed?",
    answer: "You may request changes or cancellation within 2 hours of placing your order. Please contact customer service immediately."
  },
  {
    id: "9",
    question: "Do you have a physical store location?",
    answer: "Currently, we operate exclusively online to provide the best prices and widest selection to our customers."
  },
  {
    id: "10",
    question: "How do I contact customer service?",
    answer: "You can reach our customer service team via email at support@betagi-eshop.com or by phone at +1 (234) 567-890 during business hours (9am-5pm EST, Monday-Friday)."
  }
];

const FAQs = () => {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [newQuestion, setNewQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQuestion.trim()) {
      toast.error("Please enter your question");
      return;
    }
    
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    
    // In a real application, this would be sent to a backend
    toast.success("Your question has been submitted! We'll respond as soon as possible.");
    
    // Reset form
    setNewQuestion("");
    setEmail("");
    setName("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-16">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Ask a Question Form */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name (optional)
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="question" className="block text-sm font-medium mb-1">
                Your Question <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="What would you like to know?"
                rows={4}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              style={{ backgroundColor: "#040273" }}
            >
              Submit Question
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
