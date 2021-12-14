import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Gif } from "../components/Gif";
import { Logo } from "../components/Logo";
import { TrendingLink, FavoritesLink } from "../components/Nav";
import {
    Column,
    ColumnGrid,
    Nav,
    useColumns,
    useFavorites,
    useWindowResize,
} from "../components/Page";
import { Search } from "../components/Search";
import { GiphyGif, GiphyResponse } from "../models/giphy";
import { stashyFromGiphy, StashyGif } from "../models/stashy";

interface SearchProps {
    gifs: StashyGif[];
    query: string;
}

const SearchPage: NextPage<SearchProps> = ({ gifs, query }) => {
    const { favorites, favorite, unfavorite } = useFavorites();
    const [columns, setColumns] = useColumns(3, gifs, (gif) => gif.height);
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
                <title>{query} - STASHY</title>
            </Head>

            <main className="max-w-screen-lg mx-auto">
                <Nav>
                    <Logo shrink={mobile} />
                    <Search query={query} />
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

export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
    const query = context.query?.q ?? undefined;
    if (typeof query !== "string" || query === "") {
        // Empty queries won't show anything and were probably a mistake by the user.
        // Redirect to the trending page to show _something_.
        return { redirect: { destination: "/trending", permanent: false } };
    }
    const key = process.env.GIPHY_API_KEY;
    const httpResponse = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query}&limit=50`
    );
    if (!httpResponse.ok) {
        // TODO: Log the error in Sentry and pass the error onto the page to display to the user.
        return { notFound: true };
    }

    const giphyResponse: GiphyResponse<GiphyGif[]> = await httpResponse.json();
    const gifs = giphyResponse.data.map(stashyFromGiphy);
    return {
        props: { gifs, query },
    };
};

export default SearchPage;
