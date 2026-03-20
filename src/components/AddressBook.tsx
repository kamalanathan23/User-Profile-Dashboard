import { useMemo, useState } from "react";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Edit, Trash2, Plus, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Address = {
  id: number;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: 1,
    label: "Home",
    name: "John Anderson",
    street: "123 MG Road, Apt 4B",
    city: "Mumbai",
    state: "MH",
    zipCode: "400001",
    country: "India",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    name: "John Anderson",
    street: "456 Residency Road, Suite 200",
    city: "Pune",
    state: "MH",
    zipCode: "411001",
    country: "India",
    phone: "+91 98765 12345",
    isDefault: false,
  },
  {
    id: 3,
    label: "Mom's House",
    name: "John Anderson",
    street: "789 Lake View Road",
    city: "Bengaluru",
    state: "KA",
    zipCode: "560001",
    country: "India",
    phone: "+91 98765 98765",
    isDefault: false,
  },
];

export function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<Omit<Address, "id" | "isDefault">>({
    label: "Home",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: "",
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Omit<Address, "id" | "isDefault">>({
    label: "Home",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: "",
  });

  const nextId = useMemo(() => {
    return addresses.reduce((maxId, a) => Math.max(maxId, a.id), 0) + 1;
  }, [addresses]);

  const handleDelete = (id: number) => {
    setAddresses((prev) => {
      const deletingWasDefault = prev.find((a) => a.id === id)?.isDefault;
      const remaining = prev.filter((a) => a.id !== id);

      if (!deletingWasDefault || remaining.length === 0) {
        return remaining;
      }

      // Ensure exactly one default remains after deleting the current default.
      return remaining.map((a, idx) => ({ ...a, isDefault: idx === 0 }));
    });
  };

  const handleSetDefault = (id: number) => {
    setAddresses((prev) => {
      const selected = prev.find((a) => a.id === id);
      if (!selected) return prev;

      const rest = prev.filter((a) => a.id !== id);
      return [
        { ...selected, isDefault: true },
        ...rest.map((a) => ({ ...a, isDefault: false })),
      ];
    });
  };

  const handleCreate = () => {
    setAddresses((prev) => [
      ...prev,
      {
        id: nextId,
        isDefault: false,
        ...form,
      },
    ]);
    setDialogOpen(false);
    setForm({
      label: "Home",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      phone: "",
    });
  };

  const handleEdit = (address: Address) => {
    setEditId(address.id);
    setEditForm({
      label: address.label,
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editId == null) return;
    setAddresses((prev) =>
      prev.map((a) => (a.id === editId ? { ...a, ...editForm } : a)),
    );
    setEditDialogOpen(false);
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Address Book</h2>
          <p className="text-gray-600">Manage your shipping and billing addresses.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Enter your shipping address details. Click Create to add it to the address book.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={form.label}
                  onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={form.street}
                  onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={form.state}
                  onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP / PIN</Label>
                <Input
                  id="zipCode"
                  value={form.zipCode}
                  onChange={(e) => setForm((f) => ({ ...f, zipCode: e.target.value }))}
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Address</DialogTitle>
              <DialogDescription>
                Update the address details and click Save changes.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-label">Label</Label>
                <Input
                  id="edit-label"
                  value={editForm.label}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, label: e.target.value }))
                  }
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-street">Street</Label>
                <Input
                  id="edit-street"
                  value={editForm.street}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, street: e.target.value }))
                  }
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-city">City</Label>
                <Input
                  id="edit-city"
                  value={editForm.city}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, city: e.target.value }))
                  }
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-state">State</Label>
                <Input
                  id="edit-state"
                  value={editForm.state}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, state: e.target.value }))
                  }
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-zipCode">ZIP / PIN</Label>
                <Input
                  id="edit-zipCode"
                  value={editForm.zipCode}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, zipCode: e.target.value }))
                  }
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-country">Country</Label>
                <Input
                  id="edit-country"
                  value={editForm.country}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, country: e.target.value }))
                  }
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  required
                  className="bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditDialogOpen(false);
                  setEditId(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <CardTitle className="text-lg">{address.label}</CardTitle>
                  {address.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(address)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="font-medium">{address.name}</p>
                <p className="text-gray-600">{address.street}</p>
                <p className="text-gray-600">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-600">{address.country}</p>
                <p className="text-gray-600">{address.phone}</p>
              </div>
              
              {!address.isDefault && (
                <div className="pt-4 border-t mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}