import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import { Package, Eye, Repeat, MessageSquare } from "lucide-react";

const order01 = new URL("../assets/order-01.jpg", import.meta.url).toString();
const order02 = new URL("../assets/order-02.jpg", import.meta.url).toString();
const order03 = new URL("../assets/order-03.jpg", import.meta.url).toString();
const order04 = new URL("../assets/order-04.jpg", import.meta.url).toString();

const orders = [
  {
    id: "#ORD-2024-001",
    date: "March 15, 2024",
    status: "Delivered",
    total: "₹299.99",
    items: [
      {
        name: "Wireless Bluetooth Headphones",
        image: order01,
        price: "₹149.99",
        quantity: 1
      },
      {
        name: "Phone Case",
        image: order04,
        price: "₹29.99",
        quantity: 1
      }
    ]
  },
  {
    id: "#ORD-2024-002",
    date: "March 8, 2024",
    status: "Processing",
    total: "₹79.99",
    items: [
      {
        name: "USB-C Cable",
        image: order03,
        price: "₹19.99",
        quantity: 2
      }
    ]
  },
  {
    id: "#ORD-2024-003",
    date: "February 28, 2024",
    status: "Delivered",
    total: "₹449.99",
    items: [
      {
        name: "Laptop Stand",
        image: order02,
        price: "₹89.99",
        quantity: 1
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function OrderHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order History</h2>
        <p className="text-gray-600">Track and manage your orders.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <p className="text-gray-600">Ordered on {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <span className="font-semibold">{order.total}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <ImageWithFallback 
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
                
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Package className="w-4 h-4 mr-2" />
                    Track Package
                  </Button>
                  {order.status === "Delivered" && (
                    <>
                      <Button variant="outline" size="sm">
                        <Repeat className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Leave Review
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}