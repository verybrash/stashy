import Link from "next/link";

export const Logo: React.FC<{ shrink?: boolean }> = ({ shrink = false }) => {
    const large = (
        <>
            <div className="font-display text-blue-300 text-4xl uppercase leading-none">Stashy</div>
            <div className="font-display text-white text-xs text-center -mt-0.5 leading-none">
                Memes made easy.
            </div>
        </>
    );

    const small = <div className="font-display text-blue-300 text-5xl uppercase">S</div>;

    return (
        <Link href="/trending">
            <a className="select-none">{shrink ? small : large}</a>
        </Link>
    );
};
