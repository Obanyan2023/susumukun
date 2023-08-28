import Phaser from "phaser"
import { MainLayout } from "../components/Layout/MainLayout";
import { useEffect } from "react";
import { Game } from "../features/game";

export const Gamewindow = () => {
    return (
        <MainLayout title="Game"><Game/></MainLayout>
    )
}
