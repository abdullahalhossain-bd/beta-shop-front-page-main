
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load blog posts from localStorage (set by admin panel)
    const fetchBlogPosts = () => {
      try {
        const storedPosts = localStorage.getItem('blogPosts');
        if (storedPosts) {
          setBlogPosts(JSON.parse(storedPosts));
        } else {
          // Set default blog posts if none exist
          const defaultPosts: BlogPost[] = [
            {
              id: '1',
              title: 'Latest Fashion Trends for Summer',
              excerpt: 'Explore the hottest fashion trends this summer season.',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              author: 'Fashion Team',
              date: '2025-05-10',
              image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop'
            },
            {
              id: '2',
              title: 'Top 10 Gadgets of 2025',
              excerpt: 'Check out our list of the most innovative gadgets this year.',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              author: 'Tech Team',
              date: '2025-05-05',
              image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop'
            }
          ];
          setBlogPosts(defaultPosts);
          localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleViewPost = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Blog</h1>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-600">No blog posts available at the moment.</h3>
                <p className="mt-2 text-gray-500">Check back later for new content.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                      <div className="flex text-sm text-gray-500 mb-3">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <Button 
                        onClick={() => handleViewPost(post.id)}
                        className="w-full"
                        style={{ backgroundColor: "#6a0dad" }}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Blogs;
