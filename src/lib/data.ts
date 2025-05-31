
import { Product, Category } from './store';

export const categories: Category[] = [
  {
    id: "books",
    name: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    productCount: 120
  },
  {
    id: "digital",
    name: "Digital Products",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0",
    productCount: 85
  },
  {
    id: "lights",
    name: "Decor LED Lights",
    image: "https://images.unsplash.com/photo-1558002038-1055e2e095a1",
    productCount: 95
  },
  {
    id: "handmade",
    name: "Handmade",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    productCount: 70
  },
  {
    id: "electronics",
    name: "Electronic Devices",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    productCount: 150
  },
  {
    id: "health",
    name: "Medicine & Health",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c",
    productCount: 110
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 129.99,
    oldPrice: 159.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    category: "electronics",
    rating: 4.5,
    reviewCount: 120,
    featured: true,
    new: true
  },
  {
    id: "2",
    name: "Smartphone Stand",
    description: "Adjustable smartphone stand for desk or bedside",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "electronics",
    rating: 4.2,
    reviewCount: 85,
    sale: true
  },
  {
    id: "3",
    name: "Digital Drawing Tablet",
    description: "Professional grade drawing tablet for digital artists",
    price: 199.99,
    oldPrice: 249.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    category: "digital",
    rating: 4.8,
    reviewCount: 210,
    featured: true
  },
  {
    id: "4",
    name: "LED String Lights",
    description: "Decorative LED string lights for home decor",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1558002038-1055e2e095a1",
    category: "lights",
    rating: 4.7,
    reviewCount: 95
  },
  {
    id: "5",
    name: "Handcrafted Wooden Box",
    description: "Beautifully crafted wooden storage box with intricate designs",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    category: "handmade",
    rating: 4.9,
    reviewCount: 42,
    featured: true
  },
  {
    id: "6",
    name: "Classic Novel Collection",
    description: "Set of 5 classic novels in hardcover edition",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    category: "books",
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: "7",
    name: "Smart Health Monitor",
    description: "Track your vital health metrics with this smart device",
    price: 129.99,
    oldPrice: 149.99,
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c",
    category: "health",
    rating: 4.3,
    reviewCount: 64,
    new: true
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    description: "Portable bluetooth speaker with 24 hour battery life",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "electronics",
    rating: 4.4,
    reviewCount: 112,
    sale: true
  }
];

export const teamMembers = [
  {
    id: "1",
    name: "Jawad Noor Tahim",
    nickname: "Tahim",
    role: "CO-FOUNDER, MARKETING HEAD, PRODUCT SUPPORT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    id: "2",
    name: "Golam Mortuja Shikder",
    nickname: "Emon",
    role: "Sub Social Media Manager And Official Partner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    id: "3",
    name: "MD Abdullah Al Hossain",
    nickname: "Abdullah",
    role: "CO-FOUNDER, PRODUCT LEAD, MARKETING SUPPORT",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  }
];

export const features = [
  {
    id: "1",
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
    icon: "truck"
  },
  {
    id: "2",
    title: "Easy Returns",
    description: "30-day return policy for all items",
    icon: "arrows-right-left"
  },
  {
    id: "3",
    title: "Secure Payment",
    description: "All payments are securely processed",
    icon: "credit-card"
  },
  {
    id: "4",
    title: "24/7 Support",
    description: "Get support anytime via chat or email",
    icon: "headphones"
  }
];
