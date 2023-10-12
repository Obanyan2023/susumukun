import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import Scores from "../pages/Scores";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={Home()} />
                <Route path="/scores" element={Scores()} />
            </Routes>
        </BrowserRouter>
    );
}
