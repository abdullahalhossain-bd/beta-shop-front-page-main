
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

// Admin credentials - in a real app, these would be stored securely
const ADMIN_EMAIL = "jawadnoor.work@gmail.com";
const ADMIN_PASSWORD = "Tahim10114";

// Demo credentials for easy testing
const DEMO_EMAIL = "admin@example.com";
const DEMO_PASSWORD = "admin1111";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      toast.error("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    // Check credentials (simple client-side authentication for demo)
    // In a real app, you would use a proper authentication system
    if ((email === ADMIN_EMAIL && password === ADMIN_PASSWORD) || 
        (email === DEMO_EMAIL && password === DEMO_PASSWORD)) {
      // Set a flag in localStorage to indicate admin is logged in
      localStorage.setItem("isAdminLoggedIn", "true");
      toast.success("Login successful!");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#040273]" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            
            <div className="text-center text-sm">
              <p className="text-gray-500 mt-4">
                Demo login: Email: admin@example.com, Password: admin1111
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
