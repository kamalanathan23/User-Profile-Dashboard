import { Github } from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-medium tracking-wider mb-6">
                <a
                  href="https://github.com/kamalanathan23"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="cursor-pointer inline-flex items-center gap-2"
                >
                  <Github className="w-7 h-7 text-gray-900" aria-hidden="true" />
                  <span className="font-bold text-gray-900">GitHub</span>
                </a>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Premium fashion for the modern lifestyle. Curated with care and designed with purpose.
              </p>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">New Arrivals</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Women</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Men</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Accessories</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Sale</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Customer Care</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Size Guide</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">FAQ</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Press</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-200" />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2026 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}