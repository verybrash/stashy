import { StashyGif } from "../models/stashy";
import { StarFillIcon, TrashIcon } from "./Icons";

interface GifProps {
    gif: StashyGif;
    isFavorite: boolean;
    onFavorite?: (gif: StashyGif) => void;
    onUnfavorite?: (gif: StashyGif) => void;
}

export const Gif: React.FC<GifProps> = ({ gif, isFavorite, onFavorite, onUnfavorite }) => {
    return (
        <div
            key={gif.id}
            className="group relative transition duration-150 hover:scale-105 hover:ease-pop cursor-pointer overflow-hidden"
            onClick={() => {
                if (isFavorite) {
                    onUnfavorite?.(gif);
                } else {
                    onFavorite?.(gif);
                }
            }}
        >
            <img
                src={gif.href}
                alt={gif.title}
                width={gif.width}
                height={gif.height}
                draggable={false}
                className="block w-full select-none object-contain duration-150 group-hover:grayscale rounded-xl"
            />
            {isFavorite ? (
                <div className="absolute top-0 left-0 w-full h-full transition duration-150 bg-red-500 opacity-0 group-hover:opacity-60 items-center justify-center rounded-xl">
                    <TrashIcon
                        width="60"
                        height="60"
                        className="block relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none transition duration-150 group-hover:ease-pop scale-90 transform group-hover:scale-125 text-red-100"
                    />
                </div>
            ) : (
                <div className="absolute top-0 left-0 w-full h-full transition duration-150 bg-blue-700 opacity-0 group-hover:opacity-70 items-center justify-center rounded-xl">
                    <StarFillIcon
                        width="64"
                        height="64"
                        className="block relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none transition duration-150 group-hover:ease-pop scale-90 transform rotate-12 group-hover:rotate-0 group-hover:scale-125 text-blue-100"
                    />
                </div>
            )}
            <div
                className={`absolute top-2 right-2 p-2 bg-dark-300 rounded-lg transition duration-150 ease-pop ${
                    isFavorite ? "translate-y-0 rotate-0" : "-translate-y-10 rotate-90"
                }`}
            >
                <StarFillIcon width="16" height="16" className="text-blue-300" />
            </div>
        </div>
    );
};
