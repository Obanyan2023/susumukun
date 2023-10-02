import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Gamewindow } from "../pages/Gamewindow";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={Home()} />
                <Route path="/Gamewindow" element={Gamewindow()} />
            </Routes>
        </BrowserRouter>
    );
}
