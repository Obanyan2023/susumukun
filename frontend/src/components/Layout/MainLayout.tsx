import { Head } from "../Head/Head";
 
type MainLayoutProps = {
    title: string;
    head?: React.ReactNode;
    children: React.ReactNode;
};
 
/**
 * @param {string} title - ページのタイトル
 * @param {React.ReactNode} children - 子要素
 * @returns {JSX.Element} - レイアウト
 */
export const MainLayout = ({ title, head, children }: MainLayoutProps) => (
    <>
        <Head title={title} />
        <Head title={title}>
            {head}
        </Head>
        {children}
    </>
);