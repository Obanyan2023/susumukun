import Phaser from "phaser"
import { MainLayout } from "../components/Layout/MainLayout";

export const Gamewindow = () => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
    };
    const game = new Phaser.Game(config);

    return (
        <MainLayout title={"Gamewindow"}>
            <h1>Gamewindow</h1>
        </MainLayout>
    )
        
}
