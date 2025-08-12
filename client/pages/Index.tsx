import {
  Play,
  ArrowRight,
  DollarSign,
  CreditCard,
  HeadphonesIcon,
  Shield,
  Gift,
  LogOut,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const gameProviders = [
  {
    name: "VBLink",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fffae681dbcd7461980d77d5e3a05910d%2Ff122436734a44c019543e59662ae84e4",
    url: "https://www.vblink777.club/",
  },
  {
    name: "Ultra Panda",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fffae681dbcd7461980d77d5e3a05910d%2F982576dc41b547c8bdffdbd3014d1750",
    url: "https://www.ultrapanda.mobi/",
  },
  {
    name: "Juwa",
    image:
      "https://play-lh.googleusercontent.com/iVYgmsm9piJ1vxRoaY_fEFYB_cG2DuaKA7NQq54-_u1f5M4dDCFU6YHJ6hTY28ZKtRg=w240-h480-rw",
    url: "https://dl.juwa777.com/",
  },
  {
    name: "Fire Kirin",
    image:
      "https://lh3.googleusercontent.com/8jDkXoDAnLFL2TUNAw8k3yZ0n8IMH9iVe4N0bTpi1e307T1bD4aOne3njqlfSIx2vHc",
    url: "http://start.firekirin.xyz:8580/",
  },
  {
    name: "Orion Stars",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUa6WX9nQjt3VUZAKnENvhr3EHpw_8KkFv8w&s",
    url: "http://start.orionstars.vip:8580/index.html",
  },
  {
    name: "Milky Ways",
    image:
      "https://casinohipster.com/wp-content/uploads/2022/05/slots-milky-ways-nolimit-city-play-logo.jpg",
    url: "https://milkywayapp.xyz/",
  },
  {
    name: "Panda Master",
    image:
      "https://ballislife.com/betting/wp-content/uploads/sites/20/2023/08/Panda-Master-768x432.png.webp",
    url: "http://mobile.pandamaster.vip/web_game/pandamaster/",
  },
  {
    name: "GAME VAULT",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEVZCP_zefwDunNZOHtgVvE3JduxqFt7c7Zw&s",
    url: "https://product.gamevault7777.com/web/",
  },
];

const features = [
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Secure Payments",
    description: "Advanced payment processing with multiple secure options",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Round-the-clock customer service when you need it",
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Daily Rewards",
    description: "Exclusive bonuses and rewards for active users",
  },
];

export default function Index() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-primary/80 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-neutral-600">
                    Welcome,{" "}
                    <span className="font-medium text-neutral-900">
                      {user?.username}
                    </span>
                  </span>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 bg-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button
                    size="sm"
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
              <Button
                size="sm"
                variant="outline"
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 bg-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6">
              Premium Gaming
              <br />
              <span className="text-brand-primary">Experience</span>
            </h2>
            <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover a world-class gaming platform with instant deposits,
              secure withdrawals, and exclusive rewards designed for the modern
              player.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isAuthenticated ? (
                <Link to="/auth">
                  <Button
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-6 text-lg"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/deposit">
                    <Button
                      size="lg"
                      className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-6 text-lg"
                    >
                      Make Deposit
                      <DollarSign className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/withdraw">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 bg-white px-8 py-6 text-lg"
                    >
                      Withdraw Funds
                    </Button>
                  </Link>
                </>
              )}
            </div>
            {!isAuthenticated && (
              <p className="text-sm text-neutral-500 mt-6">
                New players receive a 100% signup bonus
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Gaming Platforms
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Access premium gaming platforms with seamless integration and
              instant connectivity.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gameProviders.map((provider, index) => (
              <Card
                key={index}
                className="bg-surface-primary border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 mx-auto rounded-lg object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    {provider.name}
                  </h3>
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      className="bg-brand-primary hover:bg-brand-primary/90 text-white w-full"
                    >
                      Play
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose MyUniverse
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Experience gaming with enterprise-grade security, instant
              transactions, and dedicated support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-6 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-8">
              Trusted Gaming Platform
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              MyUniverse Casino provides a secure, fast, and user-friendly
              platform for casino gaming. Built with advanced security protocols
              and backed by 24/7 customer support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                  <span className="text-neutral-700">
                    Advanced security protocols
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                  <span className="text-neutral-700">
                    Instant automated deposits
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                  <span className="text-neutral-700">
                    Quick withdrawal processing
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <HeadphonesIcon className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                  <span className="text-neutral-700">
                    24/7 dedicated support team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-brand-primary to-brand-secondary border-none max-w-4xl mx-auto">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">75%</h2>
              <h3 className="text-2xl font-semibold mb-6">Referral Bonus</h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Refer friends to our platform and earn 75% of their deposit
                amount as your referral bonus. Share the premium gaming
                experience and get rewarded.
              </p>
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-lg flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-neutral-200 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
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
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Premium Gaming Experience
              </h3>
              <p className="text-brand-primary font-medium text-lg">Game On!</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-neutral-900 font-semibold mb-2">Contact</h4>
                <div className="space-y-2">
                  <p className="text-neutral-600 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Automatic@thesolar.solar
                  </p>
                  <p className="text-neutral-600">Telegram: @thesolarclub</p>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Live Support
              </Button>
            </div>
          </div>

          <div className="text-center text-neutral-500 pt-8 border-t border-neutral-200">
            <p>© 2024 MyUniverse Casino. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
