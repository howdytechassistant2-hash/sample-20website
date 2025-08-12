import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, LogIn, UserPlus, ArrowLeft, Info } from "lucide-react";
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
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-3 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-current" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">
                  MyUniverse
                </h1>
                <p className="text-xs text-neutral-500 -mt-1">Casino</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md bg-surface-primary border border-neutral-200 shadow-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-neutral-900 flex items-center justify-center space-x-2">
              {isLogin ? (
                <LogIn className="w-6 h-6 text-brand-primary" />
              ) : (
                <UserPlus className="w-6 h-6 text-brand-primary" />
              )}
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
            </CardTitle>
            <p className="text-neutral-600 mt-2">
              {isLogin
                ? "Welcome back to MyUniverse Casino"
                : "Join MyUniverse Casino today"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isLogin && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Info className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-brand-primary font-semibold text-sm mb-1">
                      Universal Game Access
                    </h4>
                    <p className="text-neutral-700 text-xs leading-relaxed">
                      Your login credentials work for{" "}
                      <span className="font-semibold">all games</span> on our
                      platform including VBLink, Ultra Panda, Juwa, Fire Kirin,
                      Orion Stars, Milky Ways, Panda Master, and Game Vault.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-neutral-900 font-medium"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required={!isLogin}
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`border-neutral-300 focus:border-brand-primary focus:ring-brand-primary ${
                      validationErrors.username ? "border-red-500" : ""
                    }`}
                    placeholder="MUC + letters & numbers (7-13 chars)"
                  />
                  {validationErrors.username && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.username}
                    </p>
                  )}
                  {!isLogin && !validationErrors.username && (
                    <p className="text-neutral-500 text-xs">
                      Must begin with MUC, 7-13 characters, letters and numbers
                      only, at least one letter and one number
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-900 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-neutral-300 focus:border-brand-primary focus:ring-brand-primary"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-neutral-900 font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`border-neutral-300 focus:border-brand-primary focus:ring-brand-primary ${
                    validationErrors.password ? "border-red-500" : ""
                  }`}
                  placeholder="6-16 characters with letter & number"
                />
                {validationErrors.password && (
                  <p className="text-red-500 text-xs">
                    {validationErrors.password}
                  </p>
                )}
                {!isLogin && !validationErrors.password && (
                  <p className="text-neutral-500 text-xs">
                    6-16 characters, at least one letter and one number,
                    optional symbols allowed
                  </p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-neutral-900 font-medium"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="border-neutral-300 focus:border-brand-primary focus:ring-brand-primary"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 text-lg"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                    ? "Sign In"
                    : "Create Account"}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-neutral-200">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-primary hover:text-brand-primary/80 transition-colors font-medium"
              >
                {isLogin
                  ? "Don't have an account? Create one"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
