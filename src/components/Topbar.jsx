import { Bell, User, Cog } from "lucide-react"; // Import des icônes
import logo from "../assets/logo.png"; // Chemin du logo
import profile from "../assets/profile.png"; // Chemin de l'image du profil
import { useState } from "react"; // Import de useState pour gérer l'état

export default function TopBar() {
  const [expanded, setExpanded] = useState(false); // État pour basculer la section de profil

  return (
    <header className="h-30 bg-white shadow-md flex items-center justify-between px-4" style={{ width: '100%', margin: '0 auto' }}>
      {/* Section du logo */}
  
      {/* Icônes à droite */}
      <div className="ml-auto flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded">
          <Bell size={20} />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded">
          <Cog size={20} />
        </button>

        {/* Section de profil */}
        <div className="relative border-t flex items-center p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <img src={profile} className="w-10 h-10 rounded-md" alt="Profile" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? "w-40 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Ilyes Mekersi</h4>
              <span className="text-xs text-gray-600">mekersiilyes@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}