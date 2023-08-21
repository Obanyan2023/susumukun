import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Example } from "../components/Layout/Example";
import { Menu } from "../pages/Menu";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={Home()} />
                <Route path="/example" element={Example()} />
                <Route path="/menu" element={Menu()} />
            </Routes>
        </BrowserRouter>
    );
}
