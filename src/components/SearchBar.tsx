import { MagnifyingGlassIcon} from "@phosphor-icons/react";

function SearchBar(){
    return (
        <label className="relative w-64 shrink-0">
            <span className="sr-only">Search for historical analysis</span>
            <input
                type="search"
                placeholder="Search for historical analysis"
                className="w-full rounded-full border border-slate-300 py-2 pl-4 pr-9 text-xs text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none"
            />
            <MagnifyingGlassIcon size={24} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </label>
    );
}
export default SearchBar;

