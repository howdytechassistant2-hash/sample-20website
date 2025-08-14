import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  DollarSign,
  Banknote,
  Info,
  ArrowLeft,
  Clock,
} from "lucide-react";

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-50 bg-black border-b-2 border-nike-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              to="/"
              className="flex items-center space-x-3 text-nike-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <span className="font-black uppercase tracking-wide">
                BACK TO HOME
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-nike-orange flex items-center justify-center">
                <Play className="w-6 h-6 text-black fill-current" />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">
                  MyUniverse
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-nike-gray-400">
                  CASINO
                </p>
              </div>
            </div>
            <div className="text-nike-gray-300">
              <span className="font-bold uppercase">CHAMPION:</span>{" "}
              <span className="font-black text-nike-orange">
                {user?.username}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-black via-nike-gray-900 to-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-20 w-64 h-64 bg-nike-orange rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-20 w-64 h-64 bg-nike-red rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 text-white">
              CLAIM YOUR
              <br />
              <span className="text-nike-orange">VICTORY</span>
            </h1>
            <p className="text-xl lg:text-2xl font-bold uppercase tracking-wide text-nike-gray-300">
              INSTANT WITHDRAWALS FOR CHAMPIONS
            </p>
          </div>
        </section>

        <Card className="bg-white text-black border-4 border-nike-orange nike-card">
          <CardHeader className="bg-gradient-to-r from-nike-orange to-nike-red text-black">
            <CardTitle className="text-black flex items-center space-x-3">
              <Banknote className="w-8 h-8" />
              <span className="text-2xl font-black uppercase tracking-tight">
                VICTORY CLAIM
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-3">
              <Label
                htmlFor="amount"
                className="text-black font-black uppercase tracking-wide text-lg"
              >
                VICTORY AMOUNT ($)
              </Label>
              <Input
                id="amount"
                type="number"
                min="20"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-2 border-black focus:border-nike-orange text-black font-bold text-xl py-4"
                placeholder="ENTER AMOUNT"
              />
              <p className="text-nike-gray-600 font-bold uppercase text-sm">
                MINIMUM WITHDRAWAL: $20
              </p>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="cashtag"
                className="text-black font-black uppercase tracking-wide text-lg"
              >
                YOUR CASHAPP TAG
              </Label>
              <Input
                id="cashtag"
                type="text"
                value={cashtag}
                onChange={(e) => setCashtag(e.target.value)}
                className="border-2 border-black focus:border-nike-orange text-black font-bold text-xl py-4"
                placeholder="$YOURCASHTAG"
              />
              <p className="text-nike-gray-600 font-bold uppercase text-sm">
                ENTER YOUR CASHAPP CASHTAG (E.G., $JOHNDOE)
              </p>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="notes"
                className="text-black font-black uppercase tracking-wide text-lg"
              >
                GAME PLATFORM *
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border-2 border-black focus:border-nike-orange text-black font-bold text-lg py-4"
                placeholder="ENTER THE GAME NAME FROM WHERE YOU WANT TO REDEEM (E.G. VBLINK, ULTRA PANDA, FIRE KIRIN, ETC.)"
                rows={3}
                required
              />
              <p className="text-nike-gray-600 font-bold uppercase text-sm">
                REQUIRED: ENTER THE GAME NAME FROM WHERE YOU WANT TO REDEEM YOUR
                WINNINGS
              </p>
            </div>

            {/* Withdrawal Information */}
            <div className="bg-nike-orange text-black border-4 border-white p-6">
              <h3 className="font-black text-xl mb-4 uppercase flex items-center space-x-3">
                <Info className="w-8 h-8" />
                <span>VICTORY INFORMATION</span>
              </h3>
              <ul className="font-bold space-y-2 uppercase text-sm">
                <li>
                  • PROCESSING TIME: DEPOSITS ARE MADE SHORTLY AFTER REQUEST
                </li>
                <li>• MINIMUM WITHDRAWAL: $20</li>
                <li>• MAXIMUM DAILY WITHDRAWAL: $5000</li>
                <li>• VERIFY YOUR CASHAPP TAG IS CORRECT</li>
                <li>• CONTACT SUPPORT IF YOU HAVE ANY QUESTIONS</li>
              </ul>
            </div>

            {/* Balance Display */}
            <div className="bg-black border-2 border-nike-orange p-6">
              <div className="flex items-center justify-between">
                <span className="text-white font-black uppercase text-lg">
                  AVAILABLE BALANCE:
                </span>
                <span className="text-nike-orange text-3xl font-black">
                  $0.00
                </span>
              </div>
              <p className="text-nike-gray-300 font-bold uppercase text-sm mt-2">
                CONTACT ADMIN TO CHECK YOUR ACTUAL BALANCE
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
              className="w-full bg-black text-white hover:bg-nike-orange hover:text-black font-black text-xl uppercase tracking-wide py-6 nike-button"
            >
              {submitting ? "PROCESSING..." : "CLAIM VICTORY NOW"}
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-16">
          <div className="bg-nike-gray-900 border-l-8 border-nike-orange p-8">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-nike-orange flex items-center justify-center flex-shrink-0">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-nike-orange font-black text-2xl mb-4 uppercase">
                  ELITE PAYMENT PROCESSING
                </h3>
                <p className="text-white font-bold text-lg leading-relaxed uppercase">
                  YOUR WITHDRAWAL REQUEST WILL BE PROCESSED PROMPTLY. WE USE
                  SECURE PAYMENT METHODS TO ENSURE YOUR FUNDS REACH YOU SAFELY.
                  ALL TRANSACTIONS ARE MONITORED FOR SECURITY AND COMPLIANCE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
