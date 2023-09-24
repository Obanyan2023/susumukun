import "../../App.css";
import { Helmet } from "react-helmet-async";
 
type HeadProps = {

    title: string;
    children?: React.ReactNode;
};
 
/**
 * @param {string} title - タイトル
 * @returns {JSX.Element} - ヘッダー(もどき)
 */

export const Head = ({ title, children }: HeadProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            {children}
        </Helmet>
    );
}