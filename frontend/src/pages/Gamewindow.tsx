import Phaser from "phaser"
import { MainLayout } from "../components/Layout/MainLayout";
import { useEffect } from "react";
import { GameComponent } from "../components/Game";

export const Gamewindow = () => {
    return (
        <MainLayout title="Game">
            <GameComponent />
        </MainLayout>
    )
}
