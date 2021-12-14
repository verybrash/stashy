import { GiphyGif } from "./giphy";

export interface StashyGif {
    id: string;
    title: string;
    href: string;
    width: number;
    height: number;
}

export function stashyFromGiphy(gif: GiphyGif): StashyGif {
    return {
        id: gif.id,
        title: gif.title,
        href: gif.images.fixed_width.webp,
        width: parseInt(gif.images.fixed_width.width),
        height: parseInt(gif.images.fixed_width.height),
    };
}
