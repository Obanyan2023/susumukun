import { MainLayout } from "../components/Layout/MainLayout";
import {
    Button,
    Grid,
    Typography
} from "@mui/material";

export const Home = () => (
    <MainLayout title={"アプリ探検隊と行くフラット開発ベアー - ようこそ！"}>
        <Grid container alignItems={"center"} direction={"column"}>
            <Grid item m={15}>
                <Typography variant="h2">
                    {"アプリ探検隊と行くフラット開発ベアー"}
                </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="center" direction="column">
                <Button href="./Gamewindow.tsx" variant="contained" sx={{ margin: 3 }}>ゲームスタート</Button>
                <Button variant="outlined" sx={{ margin: 3 }}>ルール説明</Button>
                <Button variant="outlined" sx={{ margin: 3 }}> スコア確認</Button>
            </Grid>
        </Grid>
    </MainLayout>
)
