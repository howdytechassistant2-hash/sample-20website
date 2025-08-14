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
  Zap,
  Target,
  Award,
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
    icon: <Target className="w-8 h-8" />,
    title: "INSTANT WINS",
    description: "Lightning-fast payouts and instant game access",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "SECURE GAMING",
    description: "Bank-level security for all your transactions",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "CHAMPION REWARDS",
    description: "Exclusive bonuses for our gaming athletes",
  },
];

export default function Index() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="relative z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">
                  MyUniverse
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-nike-gray-600">
                  CASINO
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-6">
                  <span className="text-sm font-bold uppercase tracking-wide">
                    WELCOME{" "}
                    <span className="text-nike-orange font-black">
                      {user?.username}
                    </span>
                  </span>
                  <Button
                    onClick={logout}
                    className="bg-white text-black border-2 border-black hover:bg-black hover:text-white font-black uppercase tracking-wide nike-button"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    SIGN OUT
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button className="bg-black text-white hover:bg-nike-gray-800 font-black uppercase tracking-wide nike-button">
                    SIGN IN
                  </Button>
                </Link>
              )}
              <Button className="bg-nike-orange text-black hover:bg-nike-red font-black uppercase tracking-wide nike-button">
                <Phone className="w-4 h-4 mr-2" />
                SUPPORT
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-nike-gray-900 to-nike-gray-800"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter nike-hero-text">
                  JUST
                  <br />
                  <span className="text-nike-orange">WIN</span>
                  <br />
                  IT
                </h2>
                <p className="text-xl lg:text-2xl font-bold uppercase tracking-wide text-nike-gray-300">
                  ULTIMATE GAMING PLATFORM FOR CHAMPIONS
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                {!isAuthenticated ? (
                  <Link to="/auth">
                    <Button
                      size="lg"
                      className="bg-nike-orange text-black hover:bg-nike-red font-black text-xl uppercase tracking-wide px-12 py-8 nike-button"
                    >
                      START WINNING
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/deposit">
                      <Button
                        size="lg"
                        className="bg-nike-orange text-black hover:bg-nike-red font-black text-xl uppercase tracking-wide px-12 py-8 nike-button"
                      >
                        <DollarSign className="w-6 h-6 mr-3" />
                        DEPOSIT NOW
                      </Button>
                    </Link>
                    <Link to="/withdraw">
                      <Button
                        size="lg"
                        className="bg-white text-black border-2 border-white hover:bg-transparent hover:text-white font-black text-xl uppercase tracking-wide px-12 py-8 nike-button"
                      >
                        CASH OUT
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              {!isAuthenticated && (
                <p className="text-lg font-bold uppercase tracking-widest text-nike-orange">
                  100% SIGNUP BONUS
                </p>
              )}
            </div>
            <div className="relative">
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-nike-orange rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-24 h-24 text-black mx-auto mb-4 fill-current" />
                    <p className="text-black font-black text-2xl uppercase">
                      PLAY NOW
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gaming Platforms */}
      <section className="py-20 bg-nike-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black uppercase tracking-tighter mb-6">
              GAME
              <br />
              <span className="text-nike-orange">PLATFORMS</span>
            </h2>
            <p className="text-xl font-bold uppercase tracking-wide text-nike-gray-700">
              CHOOSE YOUR BATTLEFIELD
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gameProviders.map((provider, index) => (
              <Card
                key={index}
                className="bg-white border-2 border-black nike-card group overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  <div className="mb-6">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-20 h-20 mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wide mb-6">
                    {provider.name}
                  </h3>
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-black text-white hover:bg-nike-orange hover:text-black font-black uppercase tracking-wide w-full nike-button">
                      PLAY
                    </Button>
                  </a>
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-nike-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black uppercase tracking-tighter mb-6">
              ELITE
              <br />
              <span className="text-nike-orange">FEATURES</span>
            </h2>
            <p className="text-xl font-bold uppercase tracking-wide text-nike-gray-300">
              BUILT FOR CHAMPIONS
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-8 bg-nike-orange rounded-full flex items-center justify-center text-black group-hover:bg-white transition-colors nike-card">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg font-bold text-nike-gray-300 uppercase tracking-wide">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-8">
                PERFORMANCE
                <br />
                <span className="text-nike-orange">DRIVEN</span>
              </h2>
              <p className="text-xl font-bold mb-8 uppercase tracking-wide">
                MYUNIVERSE CASINO DELIVERS HIGH-PERFORMANCE GAMING WITH
                CHAMPIONSHIP-LEVEL SECURITY AND INSTANT PAYOUTS.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Zap className="w-8 h-8 text-nike-orange" />
                  <span className="text-lg font-black uppercase">
                    LIGHTNING-FAST DEPOSITS
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Shield className="w-8 h-8 text-nike-orange" />
                  <span className="text-lg font-black uppercase">
                    FORTRESS-LEVEL SECURITY
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Target className="w-8 h-8 text-nike-orange" />
                  <span className="text-lg font-black uppercase">
                    PRECISION PAYOUTS
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <HeadphonesIcon className="w-8 h-8 text-nike-orange" />
                  <span className="text-lg font-black uppercase">
                    24/7 CHAMPIONSHIP SUPPORT
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-nike-orange opacity-20"></div>
                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-white uppercase mb-6">
                    GAME STATS
                  </h3>
                  <div className="space-y-4 text-white">
                    <div className="flex justify-between">
                      <span className="font-bold uppercase">PLATFORMS:</span>
                      <span className="font-black text-nike-orange">8+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold uppercase">PLAYERS:</span>
                      <span className="font-black text-nike-orange">1000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold uppercase">UPTIME:</span>
                      <span className="font-black text-nike-orange">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral */}
      <section className="py-20 nike-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-8">
              <span className="text-9xl font-black">75%</span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
              REFERRAL
              <br />
              CHAMPIONSHIP
            </h2>
            <p className="text-xl font-bold uppercase tracking-wide mb-8 max-w-3xl mx-auto">
              RECRUIT YOUR SQUAD AND EARN 75% OF THEIR DEPOSITS. BUILD YOUR
              CHAMPION NETWORK AND GET REWARDED.
            </p>
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center">
              <Gift className="w-10 h-10 text-nike-orange" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-nike-orange flex items-center justify-center">
                  <Play className="w-8 h-8 text-black fill-current" />
                </div>
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter">
                    MyUniverse
                  </h1>
                  <p className="text-sm font-bold uppercase tracking-widest text-nike-gray-400">
                    CASINO
                  </p>
                </div>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
                CHAMPIONSHIP
                <br />
                <span className="text-nike-orange">GAMING</span>
              </h3>
              <p className="text-nike-orange font-black text-2xl uppercase tracking-wide">
                JUST WIN IT!
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-white font-black mb-4 uppercase tracking-wide text-xl">
                  CONTACT HQ
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-nike-orange" />
                    <span className="font-bold uppercase">
                      Automatic@thesolar.solar
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-nike-orange" />
                    <span className="font-bold uppercase">@thesolarclub</span>
                  </div>
                </div>
              </div>
              <Button className="bg-nike-orange text-black hover:bg-white font-black uppercase tracking-wide nike-button">
                <Phone className="w-5 h-5 mr-3" />
                LIVE SUPPORT
              </Button>
            </div>
          </div>

          <div className="text-center text-nike-gray-400 pt-8 border-t-2 border-nike-gray-800">
            <p className="font-bold uppercase tracking-wide">
              © 2024 MYUNIVERSE CASINO. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
