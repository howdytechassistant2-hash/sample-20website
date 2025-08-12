import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Play, DollarSign, Banknote, Info, ArrowLeft, Clock } from "lucide-react";

export default function Withdraw() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [cashtag, setCashtag] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmitWithdraw = async () => {
    if (!amount || !cashtag || !notes.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          username: user?.username,
          amount: parseFloat(amount),
          cashtag: cashtag.startsWith("$") ? cashtag : `$${cashtag}`,
          notes,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert(
          `Withdrawal request submitted for $${amount} to ${cashtag}. Your withdrawal will be deposited shortly.`,
        );
        setAmount("");
        setCashtag("");
        setNotes("");
      }
    } catch (error) {
      console.error("Withdraw error:", error);
      alert("Failed to submit withdrawal request");
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Request Withdrawal
          </h1>
          <p className="text-lg text-neutral-600">
            Submit your withdrawal request and get paid quickly
          </p>
        </div>

        <Card className="bg-surface-primary border border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-neutral-900 flex items-center space-x-2">
              <Banknote className="w-6 h-6 text-brand-primary" />
              <span>Withdrawal Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-neutral-900 font-medium">
                Withdrawal Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                min="20"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-neutral-300 focus:border-brand-primary focus:ring-brand-primary"
                placeholder="Enter withdrawal amount"
              />
              <p className="text-sm text-neutral-500">Minimum withdrawal: $20</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cashtag" className="text-neutral-900 font-medium">
                Your CashApp Tag
              </Label>
              <Input
                id="cashtag"
                type="text"
                value={cashtag}
                onChange={(e) => setCashtag(e.target.value)}
                className="border-neutral-300 focus:border-brand-primary focus:ring-brand-primary"
                placeholder="$yourcashtag"
              />
              <p className="text-sm text-neutral-500">
                Enter your CashApp cashtag (e.g., $johndoe)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-neutral-900 font-medium">
                Game Name *
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border-neutral-300 focus:border-brand-primary focus:ring-brand-primary"
                placeholder="Enter the game name from where you want to redeem (e.g. VBLink, Ultra Panda, Fire Kirin, etc.)"
                rows={3}
                required
              />
              <p className="text-sm text-neutral-500">
                Required: Enter the game name from where you want to redeem your winnings
              </p>
            </div>

            {/* Withdrawal Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-brand-primary font-semibold mb-2 flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>Withdrawal Information</span>
              </h3>
              <ul className="text-neutral-700 text-sm space-y-1">
                <li>• Processing time: Deposits are made shortly after request</li>
                <li>• Minimum withdrawal: $20</li>
                <li>• Maximum daily withdrawal: $5000</li>
                <li>• Verify your CashApp tag is correct</li>
                <li>• Contact support if you have any questions</li>
              </ul>
            </div>

            {/* Balance Display */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-900 font-medium">Available Balance:</span>
                <span className="text-brand-primary text-xl font-bold">$0.00</span>
              </div>
              <p className="text-neutral-500 text-sm mt-1">
                Contact admin to check your actual balance
              </p>
            </div>

            <Button
              onClick={handleSubmitWithdraw}
              disabled={
                !amount ||
                !cashtag ||
                !notes.trim() ||
                parseFloat(amount) < 20 ||
                submitting
              }
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 text-lg"
            >
              {submitting ? "Submitting..." : "Submit Withdrawal Request"}
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-8">
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-neutral-900 font-semibold mb-2">Fast & Secure Processing</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Your withdrawal request will be processed promptly. We use secure payment methods to ensure your funds reach you safely. All transactions are monitored for security and compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
