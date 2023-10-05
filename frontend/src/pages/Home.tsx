import { MainLayout } from "../components/Layout/MainLayout";
import {
    Box,
    Button,
    Grid,
    Modal,
    Container,
    Typography
} from "@mui/material";
import { url } from "inspector";
import * as React from 'react';
import Background from '../assets/images/image.jpg';
import '../index.css'
import { useState } from 'react';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px',
};

const setWinSize = () => {
    const windowSize = {
        width: window.innerWidth,
        height: 600
    };
    const imageUrlWithParams = `${Background}?w=${windowSize.width}&h=${windowSize.height}`;

    return imageUrlWithParams;
};





const image = {
    backgroundImage: `url(${setWinSize()})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',  // 画像の繰り返しを無効にする
    backgroundPosition: 'center',
};

const closebutton = {
    textAlign: "right",
};



const head = () => {
    return (
        <link href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=DotGothic16&family=Kiwi+Maru:wght@500&family=Mochiy+Pop+P+One&family=Zen+Antique&family=Zen+Kurenaido&display=swap" rel="stylesheet"></link>
    );
};

export const Home = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <MainLayout title={"走れ！すすむ君！ - ようこそ！"} head={head()}>
            <Box sx={image}>
                <Grid container alignItems={"center"} direction={"column"} sx={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>
                    <Grid container spacing={2} sx={{ height: "30%" }} alignItems="center">
                        <Grid item xs={12}>
                            <Typography className="mfont" align="center" sx={{ fontFamily: 'Mochiy Pop P One', fontSize: 50 }}>
                                {"走れ！すすむ君！"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" direction="column" sx={{ bottom: "10%" }} >
                        <Button variant="contained" sx={{ margin: 3 }} href="gamewindow">ゲームスタート</Button>
                        <Button variant="contained" color='inherit' sx={{ margin: 3 }} onClick={handleOpen}>ルール説明</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    ルール説明
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    ・三回ミスしたらゲームオーバー<br />
                                    ・ステージが変わるごとに体力は回復する<br />
                                    ・スコアを他のプレイヤーと競う<br />
                                    ・最高得点が10000 <br />
                                    ・アイテム：100点（隠しアイテムは点数を高くする）<br />
                                    ・敵：100点～（敵が強くなるたびに加算点数を増加させるから最高得点未定！敵の数によって決める) <br />
                                </Typography>
                                <Box sx={closebutton}>
                                    <Button variant="contained" onClick={handleClose}>閉じる</Button>
                                </Box>
                            </Box>
                        </Modal>
                        <Button variant="contained" color='inherit' sx={{ margin: 3 }}> スコア確認</Button>
                    </Grid>
                </Grid>
            </Box>
        </MainLayout >
    )
}