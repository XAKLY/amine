import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutDashboard, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings, CheckSquare, List, Clock } from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DashboardPage from "./pages/dashboard.jsx";
import Login from "./pages/login";
import Soumission from "./pages/Soumission";
import Client from "./pages/client";
import Fournisseur from "./pages/fournisseur";

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get the current location

  const handleSidebarItemClick = (page) => {
    console.log(`${page} clicked`);
    setCurrentPage(page);
    navigate(`/${page}`); // Navigate to the selected page
    console.log(`currentPage is now: ${page}`);
  };

  // Set the current page based on the location path
  useEffect(() => {
    const path = location.pathname.split('/')[1]; // Get the path after '/'
    setCurrentPage(path || 'dashboard'); // Default to 'dashboard' if empty
  }, [location]);

  return (
    <div className="flex h-screen">
      {currentPage !== 'login' && (
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active={currentPage === 'dashboard'}
            onClick={() => handleSidebarItemClick('dashboard')}
          />
          <SidebarItem
            icon={<StickyNote size={20} />}
            text="Projects"
            alert
            active={currentPage === 'projects'}
            onClick={() => handleSidebarItemClick('projects')}
          />
          <SidebarItem
            icon={<Calendar size={20} />}
            text="Calendar"
            active={currentPage === 'calendar'}
            onClick={() => handleSidebarItemClick('calendar')}
          />
<SidebarItem
  icon={<Layers size={20} />}
  text="Tasks"
  active={currentPage === 'tasks' || currentPage.startsWith('soumission')}
  onClick={() => {
    handleSidebarItemClick('tasks'); // Set to 'tasks' for the active state
    navigate('/soumission'); // Navigate to the specific subpage
  }}
>
  <SidebarItem
    icon={<CheckSquare size={16} />}
    text={<span className="sidebar-text">Client</span>} // Ajoutez la classe ici
    active={currentPage === 'client'}
    onClick={() => {handleSidebarItemClick('client');navigate('/client');}}
  />
  <SidebarItem
    icon={<List size={16} />}
    text={<span className="sidebar-text">Fournisseurs & sous-traitants</span>} // Ajoutez la classe ici
    active={currentPage === 'fournisseur'}
    onClick={() => {handleSidebarItemClick('fournisseur');navigate('/fournisseur');}}
  />
  <SidebarItem
    icon={<Clock size={16} />}
    text={<span className="sidebar-text">Estimations et budgets</span>} // Ajoutez la classe ici
    active={currentPage === 'Estimations-et-budgets'}
    onClick={() => handleSidebarItemClick('Estimations-et-budgets')}
  />
</SidebarItem>
          <SidebarItem
            icon={<Flag size={20} />}
            text="Reporting"
            active={currentPage === 'reporting'}
            onClick={() => handleSidebarItemClick('reporting')}
          />
          <hr className="my-3" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            active={currentPage === 'settings'}
            onClick={() => handleSidebarItemClick('settings')}
          />
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Login"
            active={currentPage === 'login'}
            onClick={() => handleSidebarItemClick('login')}
          />
        </Sidebar>
      )}

<div className="flex-1 overflow-y-auto ">
  <TopBar/>
  <Routes>
    <Route path="/Soumission" element={<Soumission />} />
    <Route path="/login" element={<Login />} />
    <Route path="/*" element={<DashboardPage />} /> {/* Fallback to dashboard for all other routes */}
    <Route path="/client" element={<Client />} /> 
    <Route path="/fournisseur" element={<Fournisseur />} /> 
  </Routes>
</div>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
