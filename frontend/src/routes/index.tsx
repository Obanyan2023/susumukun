import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Example } from "../pages/Example";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={Home()} />
                <Route path="/example" element={Example()} />
            </Routes>
        </BrowserRouter>
    );
}
