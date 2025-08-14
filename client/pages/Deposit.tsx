import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Play,
  DollarSign,
  Smartphone,
  Copy,
  CheckCircle,
  ArrowLeft,
  Zap,
  Target,
  Award,
} from "lucide-react";

const gameOptions = [
  "VBLink",
  "Ultra Panda",
  "Juwa",
  "Fire Kirin",
  "Orion Stars",
  "Milky Ways",
  "Panda Master",
  "GAME VAULT",
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
              <span className="font-black uppercase tracking-wide">BACK TO HOME</span>
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

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-black via-nike-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-20 w-64 h-64 bg-nike-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-20 w-64 h-64 bg-nike-red rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6">
            FUEL YOUR
            <br />
            <span className="text-nike-orange">VICTORY</span>
          </h1>
          <p className="text-xl lg:text-2xl font-bold uppercase tracking-wide text-nike-gray-300">
            INSTANT DEPOSITS FOR INSTANT WINS
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Deposit Form */}
          <Card className="bg-white text-black border-4 border-nike-orange nike-card">
            <CardHeader className="bg-gradient-to-r from-nike-orange to-nike-red text-black">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-8 h-8" />
                <span className="text-2xl font-black uppercase tracking-tight">
                  DEPOSIT DETAILS
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                <Label className="text-black font-black uppercase tracking-wide text-lg">
                  SELECT GAME PLATFORM
                </Label>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="border-2 border-black focus:border-nike-orange text-black font-bold text-lg py-4">
                    <SelectValue placeholder="CHOOSE YOUR BATTLEFIELD" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-black">
                    {gameOptions.map((game) => (
                      <SelectItem
                        key={game}
                        value={game}
                        className="text-black font-bold hover:bg-nike-orange hover:text-black"
                      >
                        {game}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-black font-black uppercase tracking-wide text-lg">
                  DEPOSIT AMOUNT ($)
                </Label>
                <Input
                  type="number"
                  min="10"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-2 border-black focus:border-nike-orange text-black font-bold text-xl py-4"
                  placeholder="ENTER AMOUNT"
                />
                <p className="text-nike-gray-600 font-bold uppercase text-sm">
                  MINIMUM DEPOSIT: $10
                </p>
              </div>

              <Button
                onClick={handleSubmitDeposit}
                disabled={
                  !selectedGame ||
                  !amount ||
                  parseFloat(amount) < 10 ||
                  submitting
                }
                className="w-full bg-black text-white hover:bg-nike-orange hover:text-black font-black text-xl uppercase tracking-wide py-6 nike-button"
              >
                {submitting ? "PROCESSING..." : "SUBMIT DEPOSIT REQUEST"}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="bg-nike-gray-900 text-white border-4 border-nike-orange nike-card">
            <CardHeader className="bg-gradient-to-r from-nike-orange to-nike-red text-black">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-8 h-8" />
                <span className="text-2xl font-black uppercase tracking-tight">
                  PAYMENT ZONE
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="text-center">
                <p className="text-xl font-black uppercase tracking-wide mb-6">
                  SEND PAYMENT TO CASHAPP:
                </p>

                <div className="bg-black border-2 border-nike-orange p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-nike-orange text-3xl font-black">
                      {cashappTag}
                    </span>
                    <Button
                      onClick={handleCopyTag}
                      className="bg-nike-orange text-black hover:bg-white font-black nike-button"
                    >
                      {copied ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Copy className="w-6 h-6" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-white border-4 border-nike-orange p-8 mx-auto w-64 h-64 flex items-center justify-center mb-8 nike-card">
                  <div className="text-center">
                    <Smartphone className="w-20 h-20 text-black mx-auto mb-4" />
                    <p className="text-black font-black text-lg">QR CODE</p>
                    <p className="text-nike-gray-600 font-bold text-sm">
                      {cashappTag}
                    </p>
                  </div>
                </div>

                <div className="bg-nike-orange text-black p-6 border-4 border-white">
                  <div className="flex items-start space-x-4">
                    <Target className="w-8 h-8 flex-shrink-0" />
                    <div className="text-left">
                      <h3 className="font-black text-xl mb-4 uppercase">
                        PAYMENT INSTRUCTIONS:
                      </h3>
                      <ul className="font-bold space-y-2 uppercase text-sm">
                        <li>
                          • INCLUDE USERNAME:{" "}
                          <span className="font-black">
                            {user?.username}
                          </span>
                        </li>
                        <li>• INCLUDE GAME NAME IN NOTE</li>
                        <li>• PROCESSING: 5-15 MINUTES</li>
                        <li>• SCREENSHOTS HELPFUL</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-nike-orange rounded-full flex items-center justify-center">
              <Zap className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-wide mb-2">
              LIGHTNING FAST
            </h3>
            <p className="text-nike-gray-400 font-bold uppercase">
              5-15 MINUTE PROCESSING
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-nike-orange rounded-full flex items-center justify-center">
              <Target className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-wide mb-2">
              PRECISION
            </h3>
            <p className="text-nike-gray-400 font-bold uppercase">
              AUTOMATED SYSTEM
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-nike-orange rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-wide mb-2">
              CHAMPIONSHIP
            </h3>
            <p className="text-nike-gray-400 font-bold uppercase">
              24/7 SUPPORT
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-16">
          <div className="bg-nike-gray-900 border-l-8 border-nike-orange p-8">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-nike-orange flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-nike-orange font-black text-2xl mb-4 uppercase">
                  SECURE PAYMENT PROCESSING
                </h3>
                <p className="text-white font-bold text-lg leading-relaxed uppercase">
                  ALL DEPOSITS ARE PROCESSED THROUGH OUR CHAMPIONSHIP-GRADE
                  AUTOMATED SYSTEM. YOUR FUNDS WILL BE CREDITED TO YOUR GAMING
                  ACCOUNT WITHIN 5-15 MINUTES. FOR ANY ISSUES, CONTACT OUR
                  24/7 ELITE SUPPORT TEAM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
