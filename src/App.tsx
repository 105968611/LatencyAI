
import { useState } from "react";
import type { Page } from "./types";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import UploadLogs from "./pages/UploadLogs";
import Settings from "./pages/Settings";
import History from "./pages/History";

function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>("uploadlogs");

  return (
    <div className="min-h-screen">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="ml-64 min-w-0 p-8">
        {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}

        {currentPage === "uploadlogs" && <UploadLogs />}

        {currentPage === "history" && <History />}

        {currentPage === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default App;
