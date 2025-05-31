
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

const SocialMediaTab = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/"
  });

  useEffect(() => {
    // Load social media links from localStorage if available
    const storedSocialLinks = localStorage.getItem("socialLinks");
    if (storedSocialLinks) {
      setSocialLinks(JSON.parse(storedSocialLinks));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks({
      ...socialLinks,
      [name]: value
    });
  };

  const handleSaveSocialLinks = () => {
    localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    toast.success("Social media links saved successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Social Media Links</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium mb-1">Facebook URL</label>
            <Input 
              id="facebook" 
              name="facebook" 
              value={socialLinks.facebook} 
              onChange={handleInputChange}
              placeholder="https://facebook.com/your-page"
            />
          </div>
          
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium mb-1">Instagram URL</label>
            <Input 
              id="instagram" 
              name="instagram" 
              value={socialLinks.instagram}
              onChange={handleInputChange}
              placeholder="https://instagram.com/your-handle"
            />
          </div>
          
          <div>
            <label htmlFor="twitter" className="block text-sm font-medium mb-1">X (Twitter) URL</label>
            <Input 
              id="twitter" 
              name="twitter" 
              value={socialLinks.twitter}
              onChange={handleInputChange}
              placeholder="https://twitter.com/your-handle"
            />
          </div>
          
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium mb-1">LinkedIn URL</label>
            <Input 
              id="linkedin" 
              name="linkedin" 
              value={socialLinks.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/company/your-company"
            />
          </div>
          
          <div>
            <label htmlFor="youtube" className="block text-sm font-medium mb-1">YouTube URL</label>
            <Input 
              id="youtube" 
              name="youtube" 
              value={socialLinks.youtube}
              onChange={handleInputChange}
              placeholder="https://youtube.com/channel/your-channel"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-[#040273]" onClick={handleSaveSocialLinks}>
            Save Social Media Links
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SocialMediaTab;
