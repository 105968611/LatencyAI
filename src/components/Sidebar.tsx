
import { UploadSimpleIcon, ChartLineIcon, ClockCounterClockwiseIcon, GearIcon, type Icon } from "@phosphor-icons/react";
import logo from "../assets/LogoLatency.svg"


type Page = "uploadlogs" | "dashboard" | "history" | "settings";

type SidebarProps = {
    currentPage: Page;
    onNavigate: (page: Page) => void;
};

const analysisItems: {
    id: Page;
    label: string;
    icon: Icon;
}[] = [
        { id: "uploadlogs", label: "Uplaod Logs", icon: UploadSimpleIcon },
        { id: "dashboard", label: "Dashboard", icon: ChartLineIcon },
    ];

const libraryItems: {
    id: Page;
    label: string;
    icon: Icon;
}[] = [
        { id: "history", label: "History", icon: ClockCounterClockwiseIcon },
    ]


function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    return (
        <aside className="flex min-h-screen w-64 shrink-0 flex-col  border-slate-200 bg-[#0A1335] p-4">
            {/* Sidebar header */}
            <div className="mb-20">
                <img
                    src={logo}
                    alt="Log Detector logo"
                    className="w-96"
                />
            </div>

            {/*Sidebar analysis options*/}
            <nav aria-label="Main navigation">
                <div className="mb-10">
                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Analysis
                    </p>

                    {analysisItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onNavigate(item.id)}
                            aria-current={currentPage === item.id ? "page" : undefined}
                            className={`mb-1 w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${currentPage === item.id
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <item.icon size={20} weight="regular" />
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/*Sidebar history options*/}

                <div>
                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Library
                    </p>

                    {libraryItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onNavigate(item.id)}
                            aria-current={currentPage === item.id ? "page" : undefined}
                            className={`mb-1 w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${currentPage === item.id
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <item.icon size={20} weight="regular" />
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </nav>


            {/*Sidebar footer for Settings*/}

            <div className="mt-auto border-t border-slate-200 pt-4">
                <button
                    type="button"
                    onClick={() => onNavigate("settings")}
                    aria-current={currentPage === "settings" ? "page" : undefined}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${currentPage === "settings"
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                >
                    <span className="flex items-center gap-3">
                        <GearIcon size={20} weight="regular" />
                        Settings
                    </span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;