import { Sparkles, Send, DollarSign, CreditCard, HeadphonesIcon, Zap, Shield, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const gameProviders = [
  {
    name: "VBLink",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=300&fit=crop",
    bgColor: "from-purple-600 to-purple-800"
  },
  {
    name: "Ultra Panda",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    bgColor: "from-red-600 to-red-800"
  },
  {
    name: "Juwa",
    image: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=400&h=300&fit=crop",
    bgColor: "from-yellow-600 to-orange-600"
  },
  {
    name: "Fire Kirin",
    image: "https://images.unsplash.com/photo-1601025045471-42b8d6e98eaf?w=400&h=300&fit=crop",
    bgColor: "from-orange-500 to-yellow-500"
  },
  {
    name: "Orion Stars",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
    bgColor: "from-purple-500 to-pink-500"
  },
  {
    name: "Milky Ways",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    bgColor: "from-blue-500 to-purple-500"
  },
  {
    name: "Panda Master",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    bgColor: "from-red-700 to-red-900"
  },
  {
    name: "GAMC",
    image: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=400&h=300&fit=crop",
    bgColor: "from-blue-600 to-blue-800"
  }
];

const features = [
  {
    icon: <CreditCard className="w-12 h-12" />,
    title: "VERSATILE PAYMENT SYSTEM",
    description: "We accept payment from various cards/apps",
    bgColor: "from-pink-400 to-pink-600"
  },
  {
    icon: <HeadphonesIcon className="w-12 h-12" />,
    title: "24/7 SERVICE",
    description: "We provide 24/7 customer service",
    bgColor: "from-pink-400 to-pink-600"
  },
  {
    icon: <Gift className="w-12 h-12" />,
    title: "DAILY REWARDS",
    description: "Log in daily and claim exclusive bonuses",
    bgColor: "from-green-400 to-green-600"
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-casino-dark via-slate-900 to-casino-dark">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-casino-gold to-yellow-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-casino-dark" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">MYSOLAR</h1>
            <h2 className="text-xl md:text-2xl font-bold text-white">CASINO</h2>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Send className="w-5 h-5 text-casino-green" />
          <Button className="bg-casino-green hover:bg-casino-green/90 text-casino-dark font-bold px-6 py-2 rounded-full">
            LIVE CHAT
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-8">
        <Card className="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 border-casino-green/20 relative overflow-hidden">
          <CardContent className="p-8 md:p-12 text-center relative z-10">
            <div className="mb-4">
              <span className="bg-casino-green text-casino-dark px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                New Player Offer
              </span>
            </div>
            <h3 className="text-6xl md:text-8xl font-bold text-white mb-4">100%</h3>
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-8">SIGNUP BONUS</h4>
            
            {/* Slot Machine Graphic */}
            <div className="flex justify-center items-center mb-8 space-x-4">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center animate-spin">
                <Star className="w-8 h-8 text-yellow-900" />
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl">
                <div className="flex space-x-2">
                  <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center text-white font-bold">🍒</div>
                  <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white font-bold">BAR</div>
                  <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center text-white font-bold">🍒</div>
                </div>
              </div>
              <div className="w-16 h-16 bg-casino-gold rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-casino-dark" />
              </div>
            </div>

            <Button className="bg-casino-green hover:bg-casino-green/90 text-casino-dark font-bold px-12 py-4 text-xl rounded-full uppercase tracking-wide">
              Signup
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Our Platforms Section */}
      <section className="px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 uppercase tracking-wide">
          Our Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gameProviders.map((provider, index) => (
            <Card key={index} className={`bg-gradient-to-br ${provider.bgColor} border-none relative overflow-hidden group hover:scale-105 transition-transform duration-300`}>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img src={provider.image} alt={provider.name} className="w-20 h-20 mx-auto rounded-xl object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">{provider.name}</h3>
                <Button className="bg-casino-green hover:bg-casino-green/90 text-casino-dark font-bold px-8 py-2 rounded-full uppercase tracking-wide w-full">
                  Play
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Deposit/Withdraw Buttons */}
      <section className="px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <Button className="bg-casino-green hover:bg-casino-green/90 text-casino-dark font-bold px-12 py-6 text-xl rounded-full uppercase tracking-wide flex-1">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
              <span>Deposit</span>
            </div>
          </Button>
          <Button className="bg-casino-green hover:bg-casino-green/90 text-casino-dark font-bold px-12 py-6 text-xl rounded-full uppercase tracking-wide flex-1">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
              <span>Withdraw</span>
            </div>
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 uppercase tracking-wide">
          About Us
        </h2>
        <Card className="bg-casino-card/50 border-casino-green/20 max-w-4xl mx-auto relative">
          <CardContent className="p-8 md:p-12">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              MySolar Casino is your trusted platform for fast, secure, and automated casino slots recharge and redemption services.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-casino-green mt-1 flex-shrink-0" />
                <span>Automated INSTANT deposits</span>
              </li>
              <li className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-casino-green mt-1 flex-shrink-0" />
                <span>Exclusive payment system solely dedicated to our website and patrons</span>
              </li>
              <li className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-casino-green mt-1 flex-shrink-0" />
                <span>Quick withdrawals, and a user-friendly interface</span>
              </li>
              <li className="flex items-start space-x-3">
                <HeadphonesIcon className="w-5 h-5 text-casino-green mt-1 flex-shrink-0" />
                <span>Backed by advanced security and 24/7 support</span>
              </li>
            </ul>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-20">
              <div className="w-full h-full bg-casino-gold rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-casino-card/50 border-casino-green/20 text-center">
              <CardContent className="p-8">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-casino-gold mb-4 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Referral Bonus Section */}
      <section className="px-4 md:px-6 py-12">
        <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 border-casino-green/20 max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-casino-gold mb-2">75%</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-casino-purple mb-6 uppercase tracking-wide">Referral Bonus</h3>
            <p className="text-xl text-white mb-8 leading-relaxed">
              Refer our platform to your friends and receive 75% of what they deposit as your REFERRAL BONUS
            </p>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8">
              <Gift className="w-16 h-16 text-white" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-12 border-t border-casino-green/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-casino-gold to-yellow-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-casino-dark" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">MYSOLAR</h1>
                  <h2 className="text-xl font-bold text-white">CASINO</h2>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-casino-gold mb-4 uppercase">
                Play Like Never Before
              </h3>
              <p className="text-casino-green font-bold text-lg mb-4">GAME ON!</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Telegram</h4>
                <p className="text-casino-green">@thesolarclub</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Email</h4>
                <p className="text-casino-green">Automatic@thesolar.solar</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Social</h4>
                <div className="flex space-x-4">
                  <Send className="w-6 h-6 text-casino-green" />
                  <div className="w-6 h-6 bg-casino-green rounded-full"></div>
                </div>
              </div>
              <Button className="bg-casino-green hover:bg-casino-green/90 text-casino-dark font-bold px-8 py-3 rounded-full uppercase tracking-wide">
                Live Chat
              </Button>
            </div>
          </div>
          
          <div className="text-center text-gray-400 pt-8 border-t border-casino-green/10">
            <p>© 2024 MySolar Casino. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
