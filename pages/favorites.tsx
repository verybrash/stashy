import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Gif } from "../components/Gif";
import { Logo } from "../components/Logo";
import { FavoritesLink, TrendingLink } from "../components/Nav";
import {
    Column,
    ColumnGrid,
    Nav,
    useColumns,
    useFavorites,
    useWindowResize,
} from "../components/Page";
import { Search } from "../components/Search";

const FavoritesPage: NextPage = () => {
    const { favorites, favorite, unfavorite } = useFavorites();
    const [columns, setColumns] = useColumns(3, favorites, (gif) => gif.height);
    const [mobile, setMobile] = useState(false);

    useWindowResize(() => {
        setMobile(window.innerWidth < 600);
        if (window.innerWidth < 420) {
            setColumns(1);
        } else if (window.innerWidth < 800) {
            setColumns(2);
        } else {
            setColumns(3);
        }
    });

    return (
        <div>
            <Head>
                <title>Favorites - STASHY</title>
            </Head>

            <main className="max-w-screen-lg mx-auto">
                <Nav>
                    <Logo shrink={mobile} />
                    <Search />
                    <TrendingLink hideLabel={mobile} />
                    <FavoritesLink hideLabel={mobile} />
                </Nav>
                <ColumnGrid columns={columns.length}>
                    {columns.map((column, i) => {
                        return (
                            <Column key={`column-${i}`}>
                                {column.map((gif) => (
                                    <Gif
                                        key={gif.id}
                                        gif={gif}
                                        isFavorite={favorites.some((fav) => fav.id === gif.id)}
                                        onFavorite={favorite}
                                        onUnfavorite={unfavorite}
                                    />
                                ))}
                            </Column>
                        );
                    })}
                </ColumnGrid>
            </main>
        </div>
    );
};

export default FavoritesPage;
