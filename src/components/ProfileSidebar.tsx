import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  CreditCard, 
  Bell, 
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "./ui/utils";

interface ProfileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: "personal",
    label: "Personal Info",
    icon: User,
  },
  {
    id: "orders",
    label: "Order History",
    icon: Package,
  },
  {
    id: "addresses",
    label: "Address Book",
    icon: MapPin,
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
  },
  {
    id: "payment",
    label: "Payment Methods",
    icon: CreditCard,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export function ProfileSidebar({ activeSection, onSectionChange }: ProfileSidebarProps) {
  return (
    <nav className="bg-white">
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-0 py-3 text-left text-sm transition-colors cursor-pointer",
                  isActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
        
        {/* Sign Out */}
        <li className="pt-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-0 py-3 text-left text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}