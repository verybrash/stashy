import type { GetStaticProps, NextPage } from "next";
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
import { GiphyGif, GiphyResponse } from "../models/giphy";
import { stashyFromGiphy, StashyGif } from "../models/stashy";

interface TrendingPageProps {
    gifs: StashyGif[];
}

const TrendingPage: NextPage<TrendingPageProps> = ({ gifs }) => {
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
                <title>Trending - STASHY</title>
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

export const getStaticProps: GetStaticProps<TrendingPageProps> = async () => {
    const key = process.env.GIPHY_API_KEY;
    const httpResponse = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}`);
    if (!httpResponse.ok) {
        // TODO: Log the error in Sentry and pass the error onto the page to display to the user.
        return { notFound: true };
    }

    const giphyResponse: GiphyResponse<GiphyGif[]> = await httpResponse.json();
    const gifs = giphyResponse.data.map(stashyFromGiphy);
    return {
        props: { gifs },

        // Giphy beta keys are limited to 42 requests per hour.
        revalidate: Math.ceil((60 * 60) / 42),
    };
};

export default TrendingPage;
