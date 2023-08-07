import { Grid } from "@mui/material";
import { MainLayout } from "./MainLayout";

export const Home = () => (
    <MainLayout title={"welcome"}>
        <Grid container alignItems={"center"} justifyContent={"center"} direction={"column"}>
            <h1>Hello</h1>
        </Grid>
    </MainLayout>
)