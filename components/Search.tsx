import { useState } from "react";
import { SearchIcon } from "./Icons";

export const Search: React.FC<{ query?: string }> = (props) => {
    const [query, setQuery] = useState(props.query ?? "");

    return (
        <form className="relative grow" action="/search">
            <input
                type="search"
                autoComplete="off"
                placeholder="Discover diamonds amongst the stash..."
                name="q"
                className="block appearance-none w-full grow text-white placeholder:text-dark-700 bg-dark-400 rounded-md pl-5 pr-14 py-3"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                className="absolute right-0 top-1/2 transform h-full -translate-y-1/2 px-4 py-3 text-dark-700 hover:text-dark-900"
                type="submit"
            >
                <SearchIcon width="22" height="22" />
            </button>
        </form>
    );
};
