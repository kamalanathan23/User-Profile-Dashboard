import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./ImageWithFallback";
import { Separator } from "./ui/separator";
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

const cart01 = new URL("../assets/cart-01.jpg", import.meta.url).toString();
const cart02 = new URL("../assets/cart-02.jpg", import.meta.url).toString();
const cart03 = new URL("../assets/cart-03.jpg", import.meta.url).toString();

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Cashmere Blend Sweater",
    price: 195,
    originalPrice: 245,
    size: "M",
    color: "Cream",
    image: cart02,
    quantity: 1
  },
  {
    id: 2,
    name: "Silk Midi Dress",
    price: 320,
    size: "S",
    color: "Navy",
    image: cart03,
    quantity: 1
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 280,
    size: "One Size",
    color: "Black",
    image: cart01,
    quantity: 2
  }
];

interface MyCartProps {
  onBackClick?: () => void;
}

export function MyCart({ onBackClick }: MyCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={onBackClick}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            className="p-2"
            onClick={onBackClick}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl text-gray-900">Shopping Cart</h1>
          <span className="text-sm text-gray-600">({cartItems.length} items)</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 py-6 border-b border-gray-100 last:border-b-0">
                <ImageWithFallback 
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-32 object-cover rounded"
                />
                
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-gray-900 font-medium">{item.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <span>Size: {item.size}</span>
                        <span className="mx-2">•</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0 border-gray-200"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0 border-gray-200"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <div className="text-gray-900 font-medium">
                        {formatINR(item.price * item.quantity)}
                      </div>
                      {item.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatINR(item.originalPrice * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 space-y-6 sticky top-6">
              <h3 className="text-lg text-gray-900">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? "Free" : formatINR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">{formatINR(tax)}</span>
                </div>
                
                <Separator className="bg-gray-200" />
                
                <div className="flex justify-between">
                  <span className="text-gray-900 font-medium">Total</span>
                    <span className="text-gray-900 font-medium">{formatINR(total)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                  />
                  <Button variant="outline" className="px-4 border-gray-200">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Checkout Button */}
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Proceed to Checkout
              </Button>

              {/* Continue Shopping */}
              <Button 
                variant="ghost" 
                className="w-full text-gray-600 hover:text-gray-900"
                onClick={onBackClick}
              >
                Continue Shopping
              </Button>

              {/* Free Shipping Notice */}
              {subtotal < 200 && (
                <div className="text-xs text-gray-600 text-center p-3 bg-gray-100 rounded">
                  Add {formatINR(200 - subtotal)} more for free shipping
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}