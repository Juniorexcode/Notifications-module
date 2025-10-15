import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const openButton = document.getElementById('open-sidebar-main');
      if (
        window.innerWidth < 768 &&
        sidebar &&
        !sidebar.contains(event.target) &&
        openButton &&
        !openButton.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans flex min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 pr-2 pb-0 pl-2 sm:pr-4 sm:pb-0 sm:pl-4 lg:pr-6 lg:pb-0 lg:pl-6 xl:pr-10 xl:pb-0 xl:pl-10 overflow-x-hidden" style={{ paddingTop: '3.7rem' }}>
        <header className="flex items-center justify-end mb-8">
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
              Módulo de Notificaciones
            </h2>
          </div>
        </header>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <Outlet />
          

        </div>
      </main>
    </div>
  );
}

export default Layout;
