import { useState } from "react";
import { Header } from "./components/Header";
import { ProfileHero } from "./components/ProfileHero";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { PersonalInfo } from "./components/PersonalInfo";
import { OrderHistory } from "./components/OrderHistory";
import { AddressBook } from "./components/AddressBook";
import { Wishlist } from "./components/Wishlist";
import { AccountSettings } from "./components/AccountSettings";
import { MyCart } from "./components/MyCart";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeSection, setActiveSection] = useState("personal");
  const [currentPage, setCurrentPage] = useState<"profile" | "cart">("profile");

  const handleCartClick = () => {
    setCurrentPage("cart");
  };

  const handleBackToProfile = () => {
    setCurrentPage("profile");
  };

  const handleProfileClick = () => {
    setActiveSection("personal");
    setCurrentPage("profile");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfo />;
      case "orders":
        return <OrderHistory />;
      case "addresses":
        return <AddressBook />;
      case "wishlist":
        return <Wishlist />;
      case "payment":
        return (
          <div className="py-12">
            <h3 className="text-xl text-gray-900 mb-4">Payment Methods</h3>
            <p className="text-gray-600">Payment methods management coming soon.</p>
          </div>
        );
      case "notifications":
        return (
          <div className="py-12">
            <h3 className="text-xl text-gray-900 mb-4">Notification Center</h3>
            <p className="text-gray-600">Notification history coming soon.</p>
          </div>
        );
      case "settings":
        return <AccountSettings />;
      default:
        return <PersonalInfo />;
    }
  };

  if (currentPage === "cart") {
    return (
      <div className="min-h-screen bg-white">
        <Header
          onCartClick={() => setCurrentPage("cart")}
          onProfileClick={handleProfileClick}
          cartItemCount={3}
        />
        <MyCart onBackClick={handleBackToProfile} />
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onCartClick={handleCartClick}
        onProfileClick={handleProfileClick}
        cartItemCount={3}
      />
      <ProfileHero />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-1">
                <ProfileSidebar 
                  activeSection={activeSection} 
                  onSectionChange={setActiveSection} 
                />
              </div>
              <div className="lg:col-span-4">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <Toaster />
    </div>
  );
}
