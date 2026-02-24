import React from "react";
import SideBar from "../organisms/sideBar";

interface WatchlistLayoutProps {
  children: React.ReactNode;
}

const WatchlistLayout: React.FC<WatchlistLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      <SideBar />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-30">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-center">
              <h1 className="text-base italic text-white">
                Because every film deserves to be remembered.
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 flex-1">{children}</main>

        <footer className="bg-gray-800/30 border-t border-gray-700 py-6">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>Watch. Rate. Remember.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WatchlistLayout;