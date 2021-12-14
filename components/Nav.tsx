import Link from "next/link";
import { FireIcon, StarFillIcon } from "./Icons";

export const TrendingLink: React.FC<{ hideLabel?: boolean }> = ({ hideLabel = false }) => (
    <Link href="/trending">
        <a className="flex gap-2.5 items-center bg-dark-400 px-4 py-3 rounded-md text-white h-12">
            <FireIcon className="text-blue-300" width="16" height="16" />
            {hideLabel ? "" : "Trending"}
        </a>
    </Link>
);

export const FavoritesLink: React.FC<{ hideLabel?: boolean }> = ({ hideLabel = false }) => (
    <Link href="/favorites">
        <a className="flex gap-2.5 items-center bg-dark-400 px-4 py-3 rounded-md text-white h-12">
            <StarFillIcon className="text-blue-300" width="16" height="16" />
            {hideLabel ? "" : "Favorites"}
        </a>
    </Link>
);
