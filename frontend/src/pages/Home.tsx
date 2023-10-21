import { MainLayout } from "../components/Layout/MainLayout";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Typography
} from "@mui/material";
import * as React from 'react';
import Background from '../assets/images/image.png';
import '../index.css'
import { GameComponent } from "../components/Game";
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';



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
        height: window.innerHeight
    };
    const imageUrlWithParams = `${Background}?w=${windowSize.width}&h=${windowSize.height}`;

    return imageUrlWithParams;
};

const image = {
    backgroundImage: `url(${setWinSize()})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',  // 画像の繰り返しを無効にする
    backgroundPosition: 'center'
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
    const [isFullScreen, setIsFullScreen] = React.useState<boolean>(document.fullscreenElement ? true : false);
    const [nickname, setNickname] = React.useState<string>("");

    const [open, setOpen] = React.useState(false);

    const [difficult, setDifficult] = React.useState<number>(2);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: SelectChangeEvent<number>) => {
        setDifficult(event.target.value as number);
    };

    const handleGameStart = (difficult: number) => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }

        localStorage.setItem("nickname", nickname);
        setIsFullScreen(!isFullScreen);
        localStorage.setItem("difficult", String(difficult));
    }

    const HomeComponent = () => (
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
                    <Typography color="#000000" bgcolor="#ffffff">ニックネーム入力</Typography>
                    <input value={nickname} onChange={(e) => setNickname(e.target.value)} /><br />
                    <FormControl sx={{ background: "#ffffff", width: 100, marginRight: '10px', borderRadius: "5px" }}>
                        <InputLabel id="a-label">難易度</InputLabel>
                        <Select labelId="a-label" id="a" onChange={handleChange} value={difficult} label="Age">
                            <MenuItem value={1}>Hard</MenuItem>
                            <MenuItem value={2}>Normal</MenuItem>
                            <MenuItem value={4}>Easy</MenuItem>
                        </Select>
                    </FormControl><br />
                    <Button variant="contained" onClick={() => handleGameStart(difficult)}>Game Start</Button><br />
                    <Button variant="contained" color='inherit' sx={{ margin: 3 }} onClick={handleOpen}>ゲーム内容</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                ゲーム内容
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <b>「走れ！すすむ君！」はアプリ開発の世界を舞台にしたゲームです。主人公、すすむくんはアプリ開発者で、新しいアプリを完成させるためにはバグ（昆虫）たちとの戦いを繰り広げなければなりません。</b><br/>
                            <br/>
                            <strong>主人公のすすむ君を動かしてゴールを目指すゲーム！<br/></strong>
                                ・緑のいもむしをふむと50点！<br/>
                                ・赤のいもむしをふむと100点！<br/>
                                ・エラーが出ているいもむしをふむと130点！<br/>
                                ・バッタを踏むと150点！<br/>
                                ・ゲームオーバーやタイムオーバーになると点数が減ってしまうゾ！<br/>
                            </Typography>
                            <Box sx={closebutton}>
                                <Button variant="contained" onClick={handleClose}>閉じる</Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Button href="/scores" variant="contained" color='inherit' sx={{ margin: 3 }}> スコア確認</Button>
                </Grid >
            </Grid >
        </Box>
    );

    return (
        <MainLayout title={"走れ！すすむ君！ - " + isFullScreen ? "ようこそ！" : "ゲーム"} head={head()}>
            {isFullScreen ? <GameComponent /> : HomeComponent()}
        </MainLayout>
    )
}
