import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../organisms/sideBar";
import { useAuth } from "../../context/authContext";

interface WatchlistLayoutProps {
  children: React.ReactNode;
}

const WatchlistLayout: React.FC<WatchlistLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      <SideBar />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-30">
          <div className="container mx-auto px-6 py-4">
            {/* ← Changed: flex justify-between to show tagline + user info */}
            <div className="flex items-center justify-between">
              {user && (
                  <span className="text-sm text-gray-400">
                    👤 <span className="text-white font-medium">{user.name}</span>
                  </span>
                )}

              {/* ← NEW: User info + Logout button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 border border-red-600/30 hover:border-red-500 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 flex-1">{children}</main>

        <footer className="bg-gray-800/30 border-t border-gray-700 py-6">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>Because every film deserves to be remembered.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WatchlistLayout;