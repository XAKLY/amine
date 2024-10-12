import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 

export function FourFrom({ onClose }) {
  const [step, setStep] = useState(1); // To track which step the user is on
  const [clientType, setClientType] = useState(""); // To track "Particulier" or "Pro"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClientTypeChange = (type) => {
    setClientType(type);
    setStep(2); // Move to step 2 after choosing the client type
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onClose(); // Close the form after submission
  };

  return (
<Card className="w-full max-w-4xl bg-white shadow-lg relative">
  <CardHeader className="relative">
    <CardTitle className="text-left text-blue-600 text-3xl font-bold">
      Ajouter un Fournisseur
    </CardTitle>

    {/* Close Button (X) */}
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
    >
      ✕
    </button>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Informations Personnelles</h2>
          <Separator className="my-2" />
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="block mb-2 text-gray-700">Nom</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Entrez le nom du fournisseur"
                className="w-full p-3"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="block mb-2 text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Entrez l'email du fournisseur"
                type="email"
                className="w-full p-3"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="block mb-2 text-gray-700">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Entrez le numéro de téléphone du fournisseur"
                type="tel"
                className="w-full p-3"
                required
              />
            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Informations de l'Entreprise</h2>
          <Separator className="my-2" />
          <div className="space-y-4">
            <div>
              <Label htmlFor="company" className="block mb-2 text-gray-700">Nom de l'Entreprise</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Entrez le nom de l'entreprise"
                className="w-full p-3"
                required
              />
            </div>
            <div>
              <Label htmlFor="address" className="block mb-2 text-gray-700">Adresse</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Entrez l'adresse du fournisseur"
                className="w-full p-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={onClose}>Annuler</Button>
        <Button type="submit">Soumettre</Button>
      </div>
    </form>
  </CardContent>
</Card>
  );
}
