
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Trash2, DownloadCloud } from "lucide-react";

const SubscriberTab = () => {
  const [subscribers, setSubscribers] = useState<string[]>([]);

  useEffect(() => {
    // Load subscribers from localStorage
    const storedSubscribers = localStorage.getItem("newsletter_subscribers");
    if (storedSubscribers) {
      setSubscribers(JSON.parse(storedSubscribers));
    }
  }, []);

  const handleRemoveSubscriber = (email: string) => {
    const updatedSubscribers = subscribers.filter(sub => sub !== email);
    setSubscribers(updatedSubscribers);
    localStorage.setItem("newsletter_subscribers", JSON.stringify(updatedSubscribers));
    toast.success(`Removed ${email} from subscribers`);
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      toast.error("No subscribers to export");
      return;
    }
    
    // Create CSV content
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Email Address\n" + 
      subscribers.join("\n");
    
    // Create download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Subscribers exported successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleExportCSV}
          disabled={subscribers.length === 0}
        >
          <DownloadCloud size={16} />
          Export CSV
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Subscribers ({subscribers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="mx-auto mb-3 h-12 w-12 opacity-30" />
              <p>No subscribers yet</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="p-3">Email</th>
                      <th className="p-3">Date Subscribed</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((email, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3 font-medium">{email}</td>
                        <td className="p-3 text-gray-500">N/A</td>
                        <td className="p-3">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveSubscriber(email)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriberTab;
