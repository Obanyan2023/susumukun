import "../../App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

type HeadProps = {
    title: string
};

/**
 * @param {string} title - タイトル
 * @returns {JSX.Element} - ヘッダー(もどき)
 */
export const Head = ({ title }: HeadProps) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </HelmetProvider>
    );
}