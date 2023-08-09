import { MainLayout } from "./MainLayout";
import * as React from "react";
import { Button, TypeBackground } from "@mui/material";

export const Menu = () => (
    <MainLayout>
        <h1>メニュー画面</h1>
        <body>
            <section>
                <Button variant="contained">ゲームスタート</Button>        
            </section>
            <section>
                <Button variant="outlined">ルール説明</Button>        
            </section>
            <section>
                <Button variant="outlined">スコア確認</Button>
            </section>
        </body>
    </MainLayout>
)