import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Mail,
  MailOpen,
  AlertCircle,
  Info,
  DollarSign,
  Gift,
} from "lucide-react";

interface Message {
  id: string;
  user_id: string;
  username: string;
  title: string;
  content: string;
  message_type: string;
  is_read: boolean;
  sent_at: string;
  read_at?: string;
}

const getMessageIcon = (type: string) => {
  switch (type) {
    case "alert":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case "promotion":
      return <Gift className="w-5 h-5 text-purple-500" />;
    case "deposit":
      return <DollarSign className="w-5 h-5 text-green-500" />;
    default:
      return <Info className="w-5 h-5 text-blue-500" />;
  }
};

const getMessageTypeColor = (type: string) => {
  switch (type) {
    case "alert":
      return "bg-red-500";
    case "promotion":
      return "bg-purple-500";
    case "deposit":
      return "bg-green-500";
    default:
      return "bg-blue-500";
  }
};

export default function Inbox() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    fetchMessages();
  }, [isAuthenticated, navigate, user?.id]);

  const fetchMessages = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/messages?userId=${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch("/api/messages/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageId }),
      });

      if (response.ok) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId
              ? { ...msg, is_read: true, read_at: new Date().toISOString() }
              : msg,
          ),
        );
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-casino-dark via-slate-900 to-casino-dark">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-casino-gold to-yellow-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-casino-dark" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              MYUNIVERSE
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-white">CASINO</h2>
          </div>
        </Link>
        <div className="text-white">
          Welcome,{" "}
          <span className="text-casino-green font-bold">{user?.username}</span>
        </div>
      </header>

      <div className="px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <Mail className="w-8 h-8 text-casino-green" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Inbox</h1>
            <Badge
              variant="secondary"
              className="bg-casino-green text-casino-dark"
            >
              {messages.filter((m) => !m.is_read).length} unread
            </Badge>
          </div>

          {loading ? (
            <div className="text-center text-white py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-casino-green mx-auto mb-4"></div>
              Loading messages...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Messages List */}
              <div className="lg:col-span-1 space-y-3">
                {messages.length === 0 ? (
                  <Card className="bg-casino-card/50 border-casino-green/20">
                    <CardContent className="p-8 text-center">
                      <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300">No messages yet</p>
                      <p className="text-gray-400 text-sm mt-2">
                        You'll receive notifications and updates here
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  messages.map((message) => (
                    <Card
                      key={message.id}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        !message.is_read
                          ? "bg-casino-card border-casino-green/40 shadow-lg shadow-casino-green/20"
                          : "bg-casino-card/50 border-casino-green/20"
                      } ${
                        selectedMessage?.id === message.id
                          ? "ring-2 ring-casino-green"
                          : ""
                      }`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          {getMessageIcon(message.message_type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h3
                                className={`font-semibold truncate ${
                                  !message.is_read
                                    ? "text-white"
                                    : "text-gray-300"
                                }`}
                              >
                                {message.title}
                              </h3>
                              {!message.is_read && (
                                <MailOpen className="w-4 h-4 text-casino-green flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-gray-400 text-sm truncate mt-1">
                              {message.content}
                            </p>
                            <p className="text-gray-500 text-xs mt-2">
                              {formatDate(message.sent_at)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Message Detail */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <Card className="bg-casino-card/50 border-casino-green/20 h-full">
                    <CardHeader>
                      <div className="flex items-start space-x-3">
                        {getMessageIcon(selectedMessage.message_type)}
                        <div className="flex-1">
                          <CardTitle className="text-white text-xl">
                            {selectedMessage.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge
                              className={`${getMessageTypeColor(selectedMessage.message_type)} text-white`}
                            >
                              {selectedMessage.message_type}
                            </Badge>
                            <span className="text-gray-400 text-sm">
                              {formatDate(selectedMessage.sent_at)}
                            </span>
                            {selectedMessage.is_read &&
                              selectedMessage.read_at && (
                                <span className="text-gray-500 text-xs">
                                  Read on {formatDate(selectedMessage.read_at)}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {selectedMessage.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-casino-card/50 border-casino-green/20 h-full">
                    <CardContent className="p-12 text-center">
                      <Mail className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-white mb-2">
                        Select a message to read
                      </h3>
                      <p className="text-gray-400">
                        Click on any message from the list to view its contents
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
