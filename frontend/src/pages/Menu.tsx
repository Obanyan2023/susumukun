import { MainLayout } from "../components/Layout/MainLayout";
import * as React from "react";
import { Button, Grid, TypeBackground } from "@mui/material";

export const Menu = () => (
    <MainLayout title={"Menu"}>

        <Grid container alignItems="center" justifyContent="center" direction="column">
            <h1>メニュー画面</h1>
            <Button variant="contained" sx={{margin:3}}>ゲームスタート</Button>        
            <Button variant="outlined" sx={{margin:3}}>ルール説明</Button>        
            <Button variant="outlined" sx={{margin:3}}> スコア確認</Button>
        </Grid>

    </MainLayout>
)
