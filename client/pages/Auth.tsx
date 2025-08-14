import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, LogIn, UserPlus, ArrowLeft, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
  });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const validateUsername = (username: string): string => {
    if (username.length < 7) return "Username must be at least 7 characters";
    if (username.length > 13) return "Username must be at most 13 characters";
    if (!username.startsWith("MUC")) return "Username must begin with MUC";
    if (!/^[A-Za-z0-9]+$/.test(username))
      return "Username can only contain letters and numbers";
    if (!/[A-Za-z]/.test(username))
      return "Username must contain at least one letter";
    if (!/[0-9]/.test(username))
      return "Username must contain at least one number";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password.length > 16) return "Password must be at most 16 characters";
    if (!/[A-Za-z]/.test(password))
      return "Password must contain at least one letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password))
      return "Password contains invalid characters";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setValidationErrors({ username: "", password: "" });

    // Frontend validation for signup
    if (!isLogin) {
      const usernameError = validateUsername(formData.username);
      const passwordError = validatePassword(formData.password);

      if (usernameError || passwordError) {
        setValidationErrors({
          username: usernameError,
          password: passwordError,
        });
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }
    }

    try {
      let success = false;
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup(
          formData.username,
          formData.email,
          formData.password,
        );
      }

      if (success) {
        navigate("/");
      } else {
        setError(
          isLogin ? "Invalid email or password" : "Failed to create account",
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation errors when user starts typing
    if (name === "username" && validationErrors.username) {
      setValidationErrors((prev) => ({ ...prev, username: "" }));
    }
    if (name === "password" && validationErrors.password) {
      setValidationErrors((prev) => ({ ...prev, password: "" }));
    }
  };

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
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-nike-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-nike-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-nike-red rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Hero Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter">
                  {isLogin ? "WELCOME" : "JOIN THE"}
                  <br />
                  <span className="text-nike-orange">
                    {isLogin ? "BACK" : "ELITE"}
                  </span>
                </h2>
                <p className="text-xl lg:text-2xl font-bold uppercase tracking-wide text-nike-gray-300">
                  {isLogin 
                    ? "READY TO DOMINATE THE GAMES?"
                    : "BECOME A GAMING CHAMPION TODAY"
                  }
                </p>
              </div>

              {!isLogin && (
                <div className="bg-nike-gray-900 border-l-4 border-nike-orange p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-nike-orange flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h4 className="text-nike-orange font-black text-lg mb-2 uppercase">
                        UNIVERSAL ACCESS
                      </h4>
                      <p className="text-nike-gray-300 font-bold leading-relaxed">
                        YOUR CREDENTIALS UNLOCK{" "}
                        <span className="text-white font-black">ALL GAMING PLATFORMS</span>{" "}
                        INCLUDING VBLINK, ULTRA PANDA, JUWA, FIRE KIRIN, ORION STARS, 
                        MILKY WAYS, PANDA MASTER, AND GAME VAULT.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-6">
                <Zap className="w-8 h-8 text-nike-orange" />
                <span className="font-black uppercase text-lg">
                  LIGHTNING-FAST ACCESS
                </span>
              </div>
            </div>

            {/* Right Side - Form */}
            <Card className="bg-white text-black border-4 border-nike-orange shadow-2xl nike-card">
              <CardHeader className="text-center pb-8 bg-gradient-to-r from-nike-orange to-nike-red text-black">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  {isLogin ? (
                    <LogIn className="w-8 h-8" />
                  ) : (
                    <UserPlus className="w-8 h-8" />
                  )}
                  <span className="text-3xl font-black uppercase tracking-tight">
                    {isLogin ? "SIGN IN" : "SIGN UP"}
                  </span>
                </div>
                <p className="font-bold uppercase tracking-wide">
                  {isLogin
                    ? "READY TO WIN AGAIN?"
                    : "START YOUR WINNING STREAK"}
                </p>
              </CardHeader>

              <CardContent className="p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label className="text-black font-black uppercase tracking-wide">
                        USERNAME
                      </Label>
                      <Input
                        name="username"
                        type="text"
                        required={!isLogin}
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`border-2 border-black focus:border-nike-orange text-black font-bold text-lg py-4 ${
                          validationErrors.username ? "border-nike-red" : ""
                        }`}
                        placeholder="MUC + LETTERS & NUMBERS"
                      />
                      {validationErrors.username && (
                        <p className="text-nike-red text-sm font-bold">
                          {validationErrors.username}
                        </p>
                      )}
                      {!isLogin && !validationErrors.username && (
                        <p className="text-nike-gray-600 text-sm font-bold">
                          MUST BEGIN WITH MUC, 7-13 CHARACTERS, LETTERS AND NUMBERS
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-black font-black uppercase tracking-wide">
                      EMAIL
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-2 border-black focus:border-nike-orange text-black font-bold text-lg py-4"
                      placeholder="YOUR@EMAIL.COM"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-black font-black uppercase tracking-wide">
                      PASSWORD
                    </Label>
                    <Input
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`border-2 border-black focus:border-nike-orange text-black font-bold text-lg py-4 ${
                        validationErrors.password ? "border-nike-red" : ""
                      }`}
                      placeholder="STRONG PASSWORD"
                    />
                    {validationErrors.password && (
                      <p className="text-nike-red text-sm font-bold">
                        {validationErrors.password}
                      </p>
                    )}
                    {!isLogin && !validationErrors.password && (
                      <p className="text-nike-gray-600 text-sm font-bold">
                        6-16 CHARACTERS, LETTERS & NUMBERS
                      </p>
                    )}
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label className="text-black font-black uppercase tracking-wide">
                        CONFIRM PASSWORD
                      </Label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        required={!isLogin}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="border-2 border-black focus:border-nike-orange text-black font-bold text-lg py-4"
                        placeholder="CONFIRM PASSWORD"
                      />
                    </div>
                  )}

                  {error && (
                    <div className="text-nike-red font-bold text-center bg-nike-red bg-opacity-10 border-2 border-nike-red p-4 uppercase tracking-wide">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white hover:bg-nike-orange hover:text-black font-black text-xl uppercase tracking-wide py-6 nike-button"
                  >
                    {loading
                      ? "PROCESSING..."
                      : isLogin
                        ? "SIGN IN NOW"
                        : "CREATE ACCOUNT"}
                  </Button>
                </form>

                <div className="text-center pt-6 border-t-2 border-nike-gray-300">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-nike-orange hover:text-nike-red transition-colors font-black uppercase tracking-wide"
                  >
                    {isLogin
                      ? "DON'T HAVE AN ACCOUNT? SIGN UP"
                      : "ALREADY A CHAMPION? SIGN IN"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
