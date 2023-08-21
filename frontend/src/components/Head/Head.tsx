import "../../App.css";
import { Helmet } from "react-helmet-async";

type HeadProps = {
    title: string
};

/**
 * @param {string} title - タイトル
 * @returns {JSX.Element} - ヘッダー(もどき)
 */
export const Head = ({ title }: HeadProps) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}