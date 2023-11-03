import { HelmetProvider } from "react-helmet-async";
import { Analytics } from '@vercel/analytics/react';

type AppProviderProps = {
    children: React.ReactNode
};

export const AppProvider = ({ children }: AppProviderProps) => (
    <HelmetProvider>
        {children}
        <Analytics />
    </HelmetProvider>
);
