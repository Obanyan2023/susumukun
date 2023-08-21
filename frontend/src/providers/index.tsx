import { HelmetProvider } from "react-helmet-async";

type AppProviderProps = {
    children: React.ReactNode
};

export const AppProvider = ({ children }: AppProviderProps) => (
    <HelmetProvider>
        {children}
    </HelmetProvider>
);
