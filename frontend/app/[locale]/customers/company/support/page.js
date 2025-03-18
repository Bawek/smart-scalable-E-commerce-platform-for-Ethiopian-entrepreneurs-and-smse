'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
const DescriptionCard = ({ description }) => {
  const steps = description.split("\n").filter(Boolean); // Split description into steps by line breaks
  
  return (
    <div className="space-y-4 text-gray-700 text-lg">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-start gap-2 bg-slate-100 p-4 rounded-lg shadow-sm transition hover:bg-orange-50"
        >
          <span className="font-bold text-orange-600">{index + 1}.</span>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
};
const data = [
  {
    title: "EZ-PZ Shop Setup (No Tech Degree Required!)",
    description: `Become an instant digital storeowner in 3... 2... 1...

Template Tango ➡️ Pick a design like choosing pizza toppings (Don't worry, no pineapple options!)

Drag-n-Drop Magic ➡️ Arrange elements like playing digital LEGO (CEO hat optional but encouraged)

Preview Party ➡️ See your shop baby before it meets the world (Proud parent moment!)

Publish Panic Button ➡️ Hit it when ready! Warning: May cause happy dancing`
  },
  {
    title: "Product Parade Planning",
    description: `Stock your shop like a pro (minus the warehouse forklift)

Snap Happy ➡️ Upload product pics (Bonus points for creative angles)

Description Drama ➡️ Write listings Shakespeare would shop from

Price Poker Face ➡️ Set numbers that won't make customers faint

Inventory IQ ➡️ Track stock like a squirrel with acorns Pro Tip: Low stock alerts = no angry mobs`
  },
  {
    title: "Checkout Choreography",
    description: `Make money moves without stepping on toes

Cart Capers ➡️ Customers add goodies like supermarket sweep winners

Address Adventure ➡️ "Where should we deliver your treasures?" 🌍

Payment Puzzle ➡️ Choose cash or card (No IOUs... yet)

Confirmation Confetti 🎉 Order number = digital high five!`
  },
  {
    title: "Merchant Spy HQ (Dashboard)",
    description: `Your secret mission control center

Order Radar 🔍 Spot new orders like a superhero spotting villains

Stock-o-Meter 📊 Watch numbers drop faster than TikTok trends

Sales Map 🗺️ Track money trails like a pirate tracking treasure

Panic Button 🔴 For when sales spike (Good panic!)`
  },
  {
    title: "Template Tinkering Toolkit",
    description: `Be the Picasso of e-commerce

Color Roulette 🎨 Mix hues like a mad scientist ("What if everything was neon pink?")

Font Fiesta ✍️ Choose letters that shout your brand (Comic Sans = instant party)

Layout Limbo ➰ How low can elements go? (Mobile-friendly edition)

Undo Uh-Oh ↩️ Because everyone deserves 2nd chances (67th chances)`
  },
  {
    title: "Order Fulfillment Fiesta",
    description: `From "Cha-ching!" to "Package shipped!"

New Order Alert 📣 Cue mission impossible music

Inventory Check ✔️ Play hide-and-seek with products (Hint: They're in the warehouse)

Packaging Puzzle 📦 Box size vs. product size = 3D tetris

Delivery Dash 🚚 Send it off! Optional: Kiss package goodbye`
  },
  {
    title: "Security Shield (No Cape Needed)",
    description: `Keeping digital gremlins at bay

Password Potions 🔑 Mix letters, numbers, symbols - no "password123"!

Payment Forcefield 💳 Encrypt transactions like Fort Knox

Data Vault 🏦 Lock info tighter than grandma's secret recipe

Spy Watch 👀 Monitor for shady activity (No actual spies harmed)`
  },
  {
    title: "Customer Quest Mode",
    description: `Shopper's journey from "Hmm" to "Mine!"

Scroll Survival 🖱️ Endless products (Resist click fatigue!)

Wishlist Wonderland ❤️ Save for later (aka "Maybe when I'm rich")

Cart Calculus 🧮 Math time! (Total = Coffee budget - impulse buys)

Checkout Sprint 🏁 Final click = victory lap!`
  }
];

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const filteredCards = data.filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen container bg-gray-50">
      <header className="bg-white -mt-6 border-b p-5 bg-gradient-to-r from-blue-100 via-gray-50 to-slate-400">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedCard ? (
              <button onClick={handleBack} className="flex items-center gap-2 hover:text-orange-600">
                <ArrowLeft className="h-6 w-6" />
                Back to Help Center
              </button>
            ) : (
              "Welcome to the Help Center"
            )}
          </h1>
          {!selectedCard && (
            <div className="flex gap-4">
              <Input
                placeholder="How can we help?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-2xl rounded-lg py-6 px-4 border-gray-300 focus:ring-2 focus:ring-orange-500"
              />
              <Button className="bg-orange-600 hover:bg-orange-700 px-8 py-6">Search</Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {selectedCard ? (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
            <p className="text-gray-600 text-lg">{selectedCard.description}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCards && filteredCards.length > 0 ? (
              filteredCards.map((card, index) => (
                <div
                key={index}
                onClick={() => handleCardClick(card)}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                </div>
                <DescriptionCard description={card.description} /> {/* Render your new component here */}
              </div>
              ))
            ) : (
              <p>No search results found</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
