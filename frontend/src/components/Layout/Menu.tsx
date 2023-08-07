import { MainLayout } from "./MainLayout";
import * as React from "react";
import { Button } from "@mui/material";

export const Menu = () => (
    <MainLayout >
        <h1>Menu</h1>
        <Button>text</Button>
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
    </MainLayout>
)