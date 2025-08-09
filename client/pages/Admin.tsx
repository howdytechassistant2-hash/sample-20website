import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Send, Users, Mail, AlertCircle, Info, DollarSign, Gift } from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [messageData, setMessageData] = useState({
    userEmail: "",
    title: "",
    content: "",
    messageType: "info"
  });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/data');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setMessage("");

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Message sent successfully!");
        setMessageData({
          userEmail: "",
          title: "",
          content: "",
          messageType: "info"
        });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4" />;
      case 'promotion':
        return <Gift className="w-4 h-4" />;
      case 'deposit':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-casino-dark via-slate-900 to-casino-dark">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-casino-gold to-yellow-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-casino-dark" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">MYUNIVERSE</h1>
            <h2 className="text-xl md:text-2xl font-bold text-white">CASINO</h2>
          </div>
        </Link>
        <div className="text-white">
          <span className="text-casino-green font-bold">Admin Panel</span>
        </div>
      </header>

      <div className="px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <Send className="w-8 h-8 text-casino-green" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Send Message to Users</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Send Message Form */}
            <div className="lg:col-span-2">
              <Card className="bg-casino-card/95 border-casino-green/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Mail className="w-6 h-6 text-casino-green" />
                    <span>Compose Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userEmail" className="text-white">Recipient Email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        required
                        value={messageData.userEmail}
                        onChange={(e) => setMessageData({ ...messageData, userEmail: e.target.value })}
                        className="bg-casino-dark/50 border-casino-green/20 text-white placeholder:text-gray-400"
                        placeholder="Enter user's email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="messageType" className="text-white">Message Type</Label>
                      <Select value={messageData.messageType} onValueChange={(value) => setMessageData({ ...messageData, messageType: value })}>
                        <SelectTrigger className="bg-casino-dark/50 border-casino-green/20 text-white">
                          <SelectValue placeholder="Select message type" />
                        </SelectTrigger>
                        <SelectContent className="bg-casino-dark border-casino-green/20">
                          <SelectItem value="info" className="text-white hover:bg-casino-green/20">
                            <div className="flex items-center space-x-2">
                              <Info className="w-4 h-4" />
                              <span>Information</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="alert" className="text-white hover:bg-casino-green/20">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="w-4 h-4" />
                              <span>Alert</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="promotion" className="text-white hover:bg-casino-green/20">
                            <div className="flex items-center space-x-2">
                              <Gift className="w-4 h-4" />
                              <span>Promotion</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="deposit" className="text-white hover:bg-casino-green/20">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4" />
                              <span>Deposit Related</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">Subject</Label>
                      <Input
                        id="title"
                        type="text"
                        required
                        value={messageData.title}
                        onChange={(e) => setMessageData({ ...messageData, title: e.target.value })}
                        className="bg-casino-dark/50 border-casino-green/20 text-white placeholder:text-gray-400"
                        placeholder="Enter message subject"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content" className="text-white">Message Content</Label>
                      <Textarea
                        id="content"
                        required
                        value={messageData.content}
                        onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                        className="bg-casino-dark/50 border-casino-green/20 text-white placeholder:text-gray-400 min-h-[120px]"
                        placeholder="Enter your message content..."
                      />
                    </div>

                    {message && (
                      <div className={`p-3 rounded-lg ${
                        message.includes('Error') || message.includes('Failed')
                          ? 'bg-red-900/20 border border-red-500/20 text-red-400'
                          : 'bg-green-900/20 border border-green-500/20 text-green-400'
                      }`}>
                        {message}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-gradient-to-r from-casino-green to-green-400 hover:from-green-400 hover:to-casino-green text-casino-dark font-bold py-3 text-lg rounded-full shadow-lg shadow-casino-green/50 hover:shadow-casino-green/80 transition-all duration-300"
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Users List */}
            <div className="lg:col-span-1">
              <Card className="bg-casino-card/95 border-casino-green/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Users className="w-6 h-6 text-casino-green" />
                    <span>Users ({users.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {users.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">No users found</p>
                    ) : (
                      users.map((user) => (
                        <div
                          key={user.id}
                          className="p-3 bg-casino-dark/30 rounded-lg cursor-pointer hover:bg-casino-dark/50 transition-colors"
                          onClick={() => setMessageData({ ...messageData, userEmail: user.email })}
                        >
                          <div className="flex flex-col space-y-1">
                            <span className="text-white font-medium">{user.username}</span>
                            <span className="text-gray-400 text-sm">{user.email}</span>
                            <span className="text-gray-500 text-xs">
                              Joined: {new Date(user.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link 
              to="/"
              className="text-casino-green hover:text-green-400 transition-colors"
            >
              ← Back to Casino
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
