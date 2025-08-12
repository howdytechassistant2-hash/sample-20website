import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, DollarSign, Smartphone, Copy, CheckCircle, ArrowLeft, Info } from "lucide-react";

const gameOptions = [
  "VBLink", "Ultra Panda", "Juwa", "Fire Kirin", 
  "Orion Stars", "Milky Ways", "Panda Master", "GAME VAULT"
];

export default function Deposit() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState("");
  const [amount, setAmount] = useState("");
  const [cashappTag, setCashappTag] = useState("$myuniversecasino");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const handleCopyTag = () => {
    navigator.clipboard.writeText(cashappTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitDeposit = async () => {
    if (!selectedGame || !amount) return;
    
    setSubmitting(true);
    try {
      const response = await fetch("/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          username: user?.username,
          game: selectedGame,
          amount: parseFloat(amount),
          cashappTag,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert(
          `Deposit request submitted for ${selectedGame} - $${amount}. Please send payment to ${cashappTag}`,
        );
        setSelectedGame("");
        setAmount("");
      }
    } catch (error) {
      console.error("Deposit error:", error);
      alert("Failed to submit deposit request");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 text-neutral-600 hover:text-neutral-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-current" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">MyUniverse</h1>
                <p className="text-xs text-neutral-500 -mt-1">Casino</p>
              </div>
            </div>
            <div className="text-neutral-700">
              Welcome, <span className="font-semibold text-neutral-900">{user?.username}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Make a Deposit
          </h1>
          <p className="text-lg text-neutral-600">
            Quick and secure deposits to your gaming account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deposit Form */}
          <Card className="bg-surface-primary border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-neutral-900 flex items-center space-x-2">
                <DollarSign className="w-6 h-6 text-brand-primary" />
                <span>Deposit Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="game" className="text-neutral-900 font-medium">Select Game</Label>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="border-neutral-300 focus:border-brand-primary focus:ring-brand-primary">
                    <SelectValue placeholder="Choose a game" />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-primary border-neutral-200">
                    {gameOptions.map((game) => (
                      <SelectItem
                        key={game}
                        value={game}
                        className="text-neutral-900 hover:bg-neutral-50"
                      >
                        {game}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-neutral-900 font-medium">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="10"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-neutral-300 focus:border-brand-primary focus:ring-brand-primary"
                  placeholder="Enter deposit amount"
                />
                <p className="text-sm text-neutral-500">Minimum deposit: $10</p>
              </div>

              <Button
                onClick={handleSubmitDeposit}
                disabled={!selectedGame || !amount || parseFloat(amount) < 10 || submitting}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 text-lg"
              >
                {submitting ? "Submitting..." : "Submit Deposit Request"}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="bg-surface-primary border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-neutral-900 flex items-center space-x-2">
                <Smartphone className="w-6 h-6 text-brand-primary" />
                <span>Payment Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-neutral-700 mb-6">Send payment to our CashApp:</p>
                
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-primary text-xl font-semibold">{cashappTag}</span>
                    <Button
                      onClick={handleCopyTag}
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 bg-white"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-8 mx-auto w-48 h-48 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Smartphone className="w-16 h-16 text-neutral-400 mx-auto mb-2" />
                    <p className="text-neutral-600 text-sm">CashApp QR Code</p>
                    <p className="text-neutral-500 text-xs">{cashappTag}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h3 className="text-brand-primary font-semibold mb-2">Payment Instructions:</h3>
                      <ul className="text-neutral-700 text-sm space-y-1">
                        <li>• Include your username: <span className="font-semibold">{user?.username}</span></li>
                        <li>• Include the game name in the payment note</li>
                        <li>• Processing takes 5-15 minutes</li>
                        <li>• Screenshots are helpful but not required</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-neutral-900 font-semibold mb-2">Secure Payment Processing</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  All deposits are processed securely through our automated system. Your funds will be credited to your gaming account within 5-15 minutes of payment confirmation. For any issues, please contact our 24/7 support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
