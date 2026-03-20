import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function PersonalInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl text-gray-900">Personal Information</h2>
      </div>

      <div className="space-y-8">
        {/* Profile Photo Section */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-600">
            JS
          </div>
          <div>
            <p className="text-sm text-gray-600">Change Photo</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm text-gray-700">First Name</Label>
            <Input 
              id="firstName" 
              defaultValue="Kamal" 
              className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm text-gray-700">Last Name</Label>
            <Input 
              id="lastName" 
              defaultValue="" 
              className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email" className="text-sm text-gray-700">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              defaultValue="kamal@example.com" 
              className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-gray-700">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              defaultValue="+91 98765 43210" 
              className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-sm text-gray-700">Birth Date</Label>
            <Input 
              id="birthDate" 
              type="date" 
              defaultValue="1992-03-15" 
              className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
        </div>

        {/* Edit Button */}
        <div className="pt-4">
          <Button className="bg-black text-white hover:bg-gray-800 px-6">
            Edit Information
          </Button>
        </div>
      </div>
    </div>
  );
}