import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentInitialProps,
    DocumentContext,
} from "next/document";

class AppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="description" content="Invest in memes." />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@400&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="bg-dark-100 overflow-y-scroll">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
