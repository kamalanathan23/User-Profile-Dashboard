import { Badge } from "./ui/badge";

export function ProfileHero() {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            {/* Profile Avatar */}
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-600">
              JS
            </div>

            {/* Welcome Info */}
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Welcome back, Kamal</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Last online 20 March 2026</span>
                <span>VIP Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}