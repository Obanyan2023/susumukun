import { MainLayout } from "./MainLayout";
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
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    href="/menu"
                >メニュー</Button>
            </Grid>
            <Grid item m={15} border={1}>
                {"ゲーム説明"}
            </Grid>
        </Grid>
    </MainLayout>
)