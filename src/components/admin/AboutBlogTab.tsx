
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface AboutContent {
  title: string;
  description: string;
  mission: string;
  vision: string;
  storyTitle: string;
  storyContent: string;
  teamTitle: string;
  teamDescription: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

const AboutBlogTab = () => {
  // About Us state
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: "About Betagi E-Shop",
    description: "Welcome to Betagi E-Shop, your destination for high-quality products at competitive prices.",
    mission: "Our mission is to provide customers with a seamless shopping experience and excellent customer service.",
    vision: "We envision becoming the leading e-commerce platform known for quality, reliability, and customer satisfaction.",
    storyTitle: "Our Story",
    storyContent: "Betagi E-Shop was established in 2020 with a vision to revolutionize online shopping. What started as a small venture has now grown into a thriving e-commerce business serving customers worldwide.",
    teamTitle: "Our Team",
    teamDescription: "We have a dedicated team of professionals who work tirelessly to ensure that you get the best shopping experience."
  });

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogPost>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: "",
    image: ""
  });

  useEffect(() => {
    // Load about content from localStorage if available
    const storedAboutContent = localStorage.getItem("aboutContent");
    if (storedAboutContent) {
      setAboutContent(JSON.parse(storedAboutContent));
    }
    
    // Load blog posts from localStorage if available
    const storedPosts = localStorage.getItem("blogPosts");
    if (storedPosts) {
      setBlogPosts(JSON.parse(storedPosts));
    }
  }, []);

  // About Us handlers
  const handleAboutInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutContent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAboutContent = () => {
    localStorage.setItem("aboutContent", JSON.stringify(aboutContent));
    toast.success("About Us content saved successfully");
  };

  // Blog handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPost = () => {
    setEditingPost(null);
    setFormData({
      id: `post-${Date.now()}`,
      title: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      image: "https://placehold.co/600x400"
    });
    setShowDialog(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setShowDialog(true);
  };

  const handleDeletePost = (postId: string) => {
    const updatedPosts = blogPosts.filter(post => post.id !== postId);
    setBlogPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    toast.success("Blog post deleted successfully");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPost) {
      // Update existing post
      const updatedPosts = blogPosts.map(post =>
        post.id === editingPost.id ? formData : post
      );
      setBlogPosts(updatedPosts);
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
      toast.success("Blog post updated successfully");
    } else {
      // Add new post
      const newPosts = [...blogPosts, formData];
      setBlogPosts(newPosts);
      localStorage.setItem("blogPosts", JSON.stringify(newPosts));
      toast.success("Blog post added successfully");
    }

    setShowDialog(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Content Management</h2>
      </div>
      
      <Tabs defaultValue="aboutUs">
        <TabsList>
          <TabsTrigger value="aboutUs">About Us</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>
        
        {/* About Us Tab */}
        <TabsContent value="aboutUs">
          <Card>
            <CardHeader>
              <CardTitle>About Us Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Page Title</label>
                <Input 
                  id="title" 
                  name="title" 
                  value={aboutContent.title}
                  onChange={handleAboutInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Main Description</label>
                <Textarea 
                  id="description" 
                  name="description" 
                  rows={4}
                  value={aboutContent.description}
                  onChange={handleAboutInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mission" className="block text-sm font-medium mb-1">Mission</label>
                  <Textarea 
                    id="mission" 
                    name="mission" 
                    rows={3}
                    value={aboutContent.mission}
                    onChange={handleAboutInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="vision" className="block text-sm font-medium mb-1">Vision</label>
                  <Textarea 
                    id="vision" 
                    name="vision" 
                    rows={3}
                    value={aboutContent.vision}
                    onChange={handleAboutInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="storyTitle" className="block text-sm font-medium mb-1">Story Section Title</label>
                <Input 
                  id="storyTitle" 
                  name="storyTitle" 
                  value={aboutContent.storyTitle}
                  onChange={handleAboutInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="storyContent" className="block text-sm font-medium mb-1">Story Content</label>
                <Textarea 
                  id="storyContent" 
                  name="storyContent" 
                  rows={4}
                  value={aboutContent.storyContent}
                  onChange={handleAboutInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="teamTitle" className="block text-sm font-medium mb-1">Team Section Title</label>
                <Input 
                  id="teamTitle" 
                  name="teamTitle" 
                  value={aboutContent.teamTitle}
                  onChange={handleAboutInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="teamDescription" className="block text-sm font-medium mb-1">Team Description</label>
                <Textarea 
                  id="teamDescription" 
                  name="teamDescription" 
                  rows={3}
                  value={aboutContent.teamDescription}
                  onChange={handleAboutInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#040273]" onClick={handleSaveAboutContent}>
                Save About Us Content
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Blog Tab */}
        <TabsContent value="blog">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Blog Posts</CardTitle>
              <Button onClick={handleAddPost} className="flex items-center gap-2 bg-[#040273]">
                <Plus size={16} />
                Add New Post
              </Button>
            </CardHeader>
            <CardContent>
              {blogPosts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No blog posts created yet.</p>
                  <p className="text-sm text-gray-400 mt-1">Click "Add New Post" to create your first blog post.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3">Image</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Author</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="border-b">
                          <td className="p-3">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-12 h-12 object-cover rounded"
                            />
                          </td>
                          <td className="p-3 font-medium">{post.title}</td>
                          <td className="p-3">{post.author}</td>
                          <td className="p-3">{new Date(post.date).toLocaleDateString()}</td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditPost(post)}
                                className="flex items-center gap-1"
                              >
                                <Edit size={14} />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeletePost(post.id)}
                                className="flex items-center gap-1 text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={14} />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Blog Post Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Post Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-1">
                Author
              </label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                Excerpt (Short Summary)
              </label>
              <Textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                value={formData.excerpt}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Post Content (HTML Supported)
              </label>
              <Textarea
                id="content"
                name="content"
                rows={8}
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#040273]">
                {editingPost ? "Update Post" : "Add Post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutBlogTab;
