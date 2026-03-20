import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ImageWithFallback";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";

const wishlist01 = new URL("../assets/wishlist-01.jpg", import.meta.url).toString();
const wishlist02 = new URL("../assets/wishlist-02.jpg", import.meta.url).toString();
const wishlist03 = new URL("../assets/wishlist-03.jpg", import.meta.url).toString();
const wishlist04 = new URL("../assets/wishlist-04.jpg", import.meta.url).toString();
const wishlist05 = new URL("../assets/wishlist-05.jpg", import.meta.url).toString();
const wishlist06 = new URL("../assets/wishlist-06.jpg", import.meta.url).toString();

const wishlistItems = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    price: "₹199.99",
    originalPrice: "₹249.99",
    image: wishlist04,
    rating: 4.5,
    reviews: 128,
    inStock: true,
    discount: "20% off"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: "₹299.99",
    originalPrice: null,
    image: wishlist01,
    rating: 4.8,
    reviews: 256,
    inStock: true,
    discount: null
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: "₹89.99",
    originalPrice: "₹119.99",
    image: wishlist05,
    rating: 4.3,
    reviews: 89,
    inStock: false,
    discount: "25% off"
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: "₹39.99",
    originalPrice: null,
    image: wishlist03,
    rating: 4.2,
    reviews: 45,
    inStock: true,
    discount: null
  },
  {
    id: 5,
    name: "USB-C Hub with HDMI",
    price: "₹79.99",
    originalPrice: "₹99.99",
    image: wishlist06,
    rating: 4.6,
    reviews: 167,
    inStock: true,
    discount: "20% off"
  },
  {
    id: 6,
    name: "Mechanical Gaming Keyboard",
    price: "₹149.99",
    originalPrice: null,
    image: wishlist02,
    rating: 4.7,
    reviews: 203,
    inStock: true,
    discount: null
  }
];

export function Wishlist() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Wishlist</h2>
        <p className="text-gray-600">Items you've saved for later.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              <ImageWithFallback 
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  {item.discount}
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
              
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(item.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  ({item.reviews})
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-lg">{item.price}</span>
                {item.originalPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    {item.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}