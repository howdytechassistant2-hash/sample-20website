import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: ""
  });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const validateUsername = (username: string): string => {
    if (username.length < 7) return "Username must be at least 7 characters";
    if (username.length > 13) return "Username must be at most 13 characters";
    if (!username.startsWith("MUC")) return "Username must begin with MUC";
    if (!/^[A-Za-z0-9]+$/.test(username)) return "Username can only contain letters and numbers";
    if (!/[A-Za-z]/.test(username)) return "Username must contain at least one letter";
    if (!/[0-9]/.test(username)) return "Username must contain at least one number";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password.length > 16) return "Password must be at most 16 characters";
    if (!/[A-Za-z]/.test(password)) return "Password must contain at least one letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password)) return "Password contains invalid characters";
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
          password: passwordError
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
        success = await signup(formData.username, formData.email, formData.password);
      }

      if (success) {
        navigate("/");
      } else {
        setError(isLogin ? "Invalid email or password" : "Failed to create account");
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
      [name]: value
    });

    // Clear validation errors when user starts typing
    if (name === "username" && validationErrors.username) {
      setValidationErrors(prev => ({ ...prev, username: "" }));
    }
    if (name === "password" && validationErrors.password) {
      setValidationErrors(prev => ({ ...prev, password: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-casino-dark via-slate-900 to-casino-dark flex items-center justify-center px-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-casino-gold to-yellow-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-casino-dark" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">MYUNIVERSE</h1>
            <h2 className="text-xl md:text-2xl font-bold text-white">CASINO</h2>
          </div>
        </Link>
      </div>

      <Card className="w-full max-w-md bg-casino-card/95 border-casino-green/20 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center space-x-2">
            {isLogin ? <LogIn className="w-6 h-6 text-casino-green" /> : <UserPlus className="w-6 h-6 text-casino-green" />}
            <span>{isLogin ? "Sign In" : "Sign Up"}</span>
          </CardTitle>
          <p className="text-gray-300">
            {isLogin ? "Welcome back to MyUniverse Casino" : "Join MyUniverse Casino today"}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required={!isLogin}
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`bg-casino-dark/50 border-casino-green/20 text-white placeholder:text-gray-400 ${
                    validationErrors.username ? 'border-red-500/50' : ''
                  }`}
                  placeholder="MUC + letters & numbers (7-13 chars)"
                />
                {validationErrors.username && (
                  <p className="text-red-400 text-xs">{validationErrors.username}</p>
                )}
                {!isLogin && !validationErrors.username && (
                  <p className="text-gray-400 text-xs">
                    Must begin with MUC, 7-13 characters, letters and numbers only, at least one letter and one number
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-casino-dark/50 border-casino-green/20 text-white placeholder:text-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="bg-casino-dark/50 border-casino-green/20 text-white placeholder:text-gray-400"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-casino-dark/50 border-casino-green/20 text-white placeholder:text-gray-400"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/20 rounded p-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-casino-green to-green-400 hover:from-green-400 hover:to-casino-green text-casino-dark font-bold py-3 text-lg rounded-full shadow-lg shadow-casino-green/50 hover:shadow-casino-green/80 transition-all duration-300"
            >
              {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-casino-green hover:text-green-400 transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
