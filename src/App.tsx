
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import UploadLogs from "./pages/UploadLogs";
import Settings from "./pages/Settings";
import History from "./pages/History";

type Page =  "uploadlogs" |  "dashboard" | "history" | "settings";

function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>("uploadlogs");

  return (
    <div className="flex min-h-screen">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="min-w-0 flex-1 p-8">
        {currentPage === "dashboard" && <Dashboard />}

        {currentPage === "uploadlogs" && <UploadLogs />}

        {currentPage === "history" && <History />}

        {currentPage === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default App;
