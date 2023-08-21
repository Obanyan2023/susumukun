import React from "react";
import { Head } from "../Head/Head";

type MainLayoutProps = {
    title: string;
    children: React.ReactNode;
};

/**
 * @param {string} title - ページのタイトル
 * @param {React.ReactNode} children - 子要素
 * @returns {JSX.Element} - レイアウト
 */
export const MainLayout = ({ title, children }: MainLayoutProps) => (
    <>
        <Head title={title} />
        {children}
    </>
);