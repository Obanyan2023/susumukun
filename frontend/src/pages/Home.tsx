import { MainLayout } from "../components/Layout/MainLayout";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import * as React from 'react';
import Background from '../assets/images/image.png';
import '../index.css';
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
            try {
                document.documentElement.requestFullscreen();
            } catch (error) {
                console.log("fullscreen処理に失敗しました");
            }
        }

        localStorage.setItem("nickname", nickname);
        setIsFullScreen(!isFullScreen);
        localStorage.setItem("difficult", String(difficult));
    }

    const HomeComponent = () => (
        <Box sx={image}>
            <Box sx={{ height: '100vh', width: '100vw', justifyContent: "space-between" }}>
                <Typography className="mfont" align="center" variant="h3" sx={{ fontFamily: 'Mochiy Pop P One', paddingY: 7 }}>
                    走れ！すすむ君！
                </Typography>
                <Grid container spacing={1} component="form" alignItems="center" justifyContent="center" direction="column">
                    <Grid item xs={12} sx={{ paddingBottom: 3 }}>
                        <TextField focused label="ニックネーム" variant="outlined" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: 3 }}>
                        <FormControl>
                            <InputLabel id="a-label">難易度</InputLabel>
                            <Select labelId="a-label" id="a" onChange={handleChange} value={difficult} label="Level">
                                <MenuItem value={1}>Hard</MenuItem>
                                <MenuItem value={2}>Normal</MenuItem>
                                <MenuItem value={4}>Easy</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: 3 }}>
                        <Button variant="contained" onClick={() => handleGameStart(difficult)}>Game Start</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: 3 }}>
                        <Button variant="contained" color='inherit' onClick={handleOpen}>ゲーム内容</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: 3 }}>
                        <Button href="/scores" variant="contained" color='inherit'>スコア確認</Button>
                    </Grid>
                </Grid>
            </Box>

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
                        <b>「走れ！すすむ君！」はアプリ開発の世界を舞台にしたゲームです。主人公、すすむくんはアプリ開発者で、新しいアプリを完成させるためにはバグ（昆虫）たちとの戦いを繰り広げなければなりません。</b><br />
                        <br />
                        <strong>主人公のすすむ君を動かしてゴールを目指すゲーム！<br /></strong>
                        ・緑のいもむしをふむと50点！<br />
                        ・赤のいもむしをふむと100点！<br />
                        ・エラーが出ているいもむしをふむと130点！<br />
                        ・バッタを踏むと150点！<br />
                        ・ゲームオーバーやタイムオーバーになると点数が減ってしまうゾ！<br />
                    </Typography>
                    <Box sx={closebutton}>
                        <Button variant="contained" onClick={handleClose}>閉じる</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );

    return (
        <MainLayout title={"走れ！すすむ君！ - " + isFullScreen ? "ようこそ！" : "ゲーム"} head={head()}>
            {isFullScreen ? <GameComponent /> : HomeComponent()}
        </MainLayout>
    )
}
