import { ChevronRight, ChevronFirst, ChevronLast } from "lucide-react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  // Adjust the height based on the top bar height (e.g., 64px)
  const topBarHeight = '64px'; // Update this value if your top bar height changes

  return (
    <aside
      className={`transition-all duration-300 h-[calc(100vh-${topBarHeight})] ${expanded ? "w-64" : "w-16"}`} // Sidebar width based on state
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Logo and toggle button */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all duration-300 ${expanded ? "w-10" : "w-0"}`} // Hide logo when sidebar is closed
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 space-y-1"> {/* Added space-y-1 for spacing between items */}
            {children}
          </ul>
        </SidebarContext.Provider>

        {/* Footer section with profile */}
        
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, children, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const [open, setOpen] = useState(false);

  // Toggle submenu only when the arrow is clicked
  const handleArrowClick = (e) => {
    e.stopPropagation(); // Prevent triggering the parent click event
    setOpen(!open);
  };

  // Handle the main item click (for navigation)
  const handleItemClick = () => {
    if (text === "Tasks") {
      // Redirect to the tasks page (or home, as you mentioned)
      onClick && onClick("tasks"); // Call the onClick prop if provided
    } else if (!children) {
      onClick && onClick(); // Call the onClick prop if provided
    }
  };

  return (
    <>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800 border-l-2 border-blue-600"
            : "hover:bg-blue-50 text-gray-600"
        }`}
        onClick={handleItemClick} // Call the main item click handler
      >
        {icon}
        <span
          className={`overflow-hidden transition-all duration-300 ${expanded ? "w-40 ml-3" : "w-0"}`}
        >
          {text}
        </span>

        {children && (
          <ChevronRight
            className={`ml-auto transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"} ${expanded ? "block" : "hidden"}`}
            onClick={handleArrowClick} // Arrow click only triggers submenu toggle
          />
        )}

        {alert && (
          <div className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${expanded ? "" : "top-2"}`}></div>
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>

      {open && expanded && children && (
        <ul className={`ml-4 mt-1 space-y-1 transition-all duration-300 ease-in-out submenu ${open ? 'show' : ''}`}>
          {children}
        </ul>
      )}
    </>
  );
}