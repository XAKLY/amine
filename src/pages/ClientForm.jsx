import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 

export function ClientForm({ onClose }) {
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
          {step === 1 ? "Sélectionnez le Type de Client" : "Ajouter un Client"}
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
        {step === 1 && (
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-lg font-semibold text-gray-700">Choisir le type de client</h2>
            
            <div className="flex space-x-4">
              {/* Blue Button */}
              <Button
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-100 transition-all py-2 px-6"
                onClick={() => handleClientTypeChange("Particulier")}
              >
                Client particulier
              </Button>

              {/* White Button with Blue Border */}
              <Button
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-100 transition-all py-2 px-6"
                onClick={() => handleClientTypeChange("Pro")}
              >
                Client professionnel
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Progress bar */}
            <div className="flex justify-between items-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>

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
                      placeholder="Entrez le nom du client"
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
                      placeholder="Entrez l'email du client"
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
                      placeholder="Entrez le numéro de téléphone du client"
                      type="tel"
                      className="w-full p-3"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Conditionally show Company Information if client is "Pro" */}
              {clientType === "Pro" && (
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
                        placeholder="Entrez l'adresse du client"
                        className="w-full p-3"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>Retour</Button>
              <Button type="submit">Soumettre</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
