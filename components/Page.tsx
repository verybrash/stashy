import { useState, useEffect } from "react";
import { StashyGif } from "../models/stashy";

export const Nav: React.FC = ({ children }) => (
    <div className="flex p-4 items-center gap-4 sticky top-0 bg-dark-100 z-10">{children}</div>
);

export const ColumnGrid: React.FC<{ columns: number }> = ({ children, columns }) => (
    <div
        className="grid gap-4 p-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
        {children}
    </div>
);
export const Column: React.FC<{ key: string | number | undefined }> = ({ children, key }) => (
    <div key={key} className="flex flex-col gap-4">
        {children}
    </div>
);

/**
 * Return favorite GIFs and functions for favoriting/unfavoriting.
 *
 * Currently stored client-side.
 */
export function useFavorites(): {
    favorites: StashyGif[];
    favorite: (gif: StashyGif) => void;
    unfavorite: (gif: StashyGif) => void;
} {
    const [favorites, setFavorites] = useState<StashyGif[]>([]);

    useEffect(() => {
        const savedFavoritesJson = localStorage.getItem("favorites");
        if (!savedFavoritesJson) {
            return;
        }
        setFavorites(JSON.parse(savedFavoritesJson));
    }, []);
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const favorite = (gif: StashyGif) => {
        setFavorites([...favorites, gif]);
    };
    const unfavorite = (gif: StashyGif) => {
        setFavorites(favorites.filter((fav) => fav.id !== gif.id));
    };

    return { favorites, favorite, unfavorite };
}

/**
 * Run a given function every time the window is resized. Useful for responsive layouts.
 */
export function useWindowResize(onWindowResize: () => void): void {
    useEffect(() => {
        onWindowResize();
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, [onWindowResize]);
}

/**
 * Return `items` split into columns and a function to change the number of columns.
 */
export function useColumns<T>(initialColumnCount: number, items: T[], height: (item: T) => number) {
    const [columnCount, setColumnCount] = useState(initialColumnCount);
    const [columns, setColumns] = useState<T[][]>([]);

    useEffect(() => {
        setColumns(columnsOfItems(columnCount, items, height));
    }, [columnCount, items]);

    return [columns, setColumnCount] as const;
}

/**
 * Split `items` into columns, keeping the columns roughly eqaul in height.
 *
 * This function is generic over any type, so you need to provide a method
 * (`height`) which returns the height of each individual item.
 */
function columnsOfItems<T>(columnCount: number, items: T[], height: (item: T) => number): T[][] {
    const heights = Array.from({ length: columnCount }, () => 0);
    const columns: T[][] = Array.from({ length: columnCount }, () => []);

    for (const item of items) {
        let shortest = 0;
        for (let i = 1; i < heights.length; i += 1) {
            if (heights[i] < heights[shortest]) {
                shortest = i;
            }
        }

        columns[shortest].push(item);
        heights[shortest] += height(item);
    }

    return columns;
}
