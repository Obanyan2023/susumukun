import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Gamewindow } from "../pages/Gamewindow";
import { Example } from "../pages/Example";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={Home()} />
                <Route path="/Gamewindow" element={Gamewindow()} />
                <Route path="/example" element={Example()} />
            </Routes>
        </BrowserRouter>
    );
}
