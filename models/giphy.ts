export interface GiphyGif {
    id: string;
    slug: string;
    url: string;
    username: string;
    rating: string;
    title: string;
    images: {
        original: {
            /** Width in pixels. */
            width: string;
            /** Height in pixels. */
            height: string;
            /** URL of this GIF in WEBP format. */
            webp: string;
            /** Size of the WEBP in bytes. */
            webp_size: string;
        };
        fixed_width: {
            width: string;
            height: string;
            webp: string;
        };
    };
}

export interface GiphyResponse<T> {
    data: T;
    meta: {
        status: number;
        msg: string;
        response_id: string;
    };
    pagination: {
        total_count: number;
        count: number;
        offset: 0;
    };
}
