import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navItems = [
    { path: "/", label: "Search"},
    { path: "/watchlist", label: "Watchlist"},
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-700 z-40">
      
      <div className="p-3.5 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          MovieMark
        </h1>
      </div>


      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;