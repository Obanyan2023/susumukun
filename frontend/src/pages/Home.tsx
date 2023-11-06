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
import {CHALLENGE, DIFFICULTY_LEVELS, DifficultyLevel, NORMAL} from "../features/game/constants/DifficultyLevel";
import {
    CAN_CHALLENGE,
    CHA_CHALLENGE_NOTIFICATION,
    DIFFICULTY,
    NICKNAME, PLAYING, TRY_ORIENTATION_LOCK
} from "../features/game/constants/localStorageKeys";
import {customBoolean} from "../utils/isType";
import {useEffect} from "react";
import {isLandscape, setLandscape} from "../utils/Orientations";

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

function head(): JSX.Element {
    return (
        <link href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=DotGothic16&family=Kiwi+Maru:wght@500&family=Mochiy+Pop+P+One&family=Zen+Antique&family=Zen+Kurenaido&display=swap" rel="stylesheet"></link>
    );
};

/**
 * webアプリの初期化処理
 *
 * @returns void
 */
function init(): void {
    const localStorageRefresh = () => {
        localStorage.removeItem(TRY_ORIENTATION_LOCK);
        localStorage.removeItem(PLAYING);
    }

    localStorageRefresh();

    window.addEventListener('orientationchange', () => {
        if (customBoolean(localStorage.getItem(PLAYING)) && isLandscape()) {
            return;
        }

        localStorageRefresh();
        window.location.reload();
    })
}

export const Home = () => {
    const [isFullScreen, setIsFullScreen] = React.useState<boolean>(document.fullscreenElement ? true : false);
    const [nickname, setNickname] = React.useState<string>(localStorage.getItem("nickname") || "");
    const [open, setOpen] = React.useState(false);
    const [difficult, setDifficult] = React.useState<number>(Number(localStorage.getItem(DIFFICULTY)) || NORMAL.SEED);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleChange = (event: SelectChangeEvent<number>) => {
        setDifficult(event.target.value as number);
    };

    const handleGameStart = (difficult: number) => {
        // フルスクリーン処理
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            try {
                document.documentElement.requestFullscreen();
            } catch (error) {
                //
            }
        }

        // 画面向きを横に固定
        if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i) && !setLandscape()) {
            localStorage.removeItem(TRY_ORIENTATION_LOCK);
            return;
        }

        localStorage.setItem(NICKNAME, nickname);
        localStorage.setItem(DIFFICULTY, String(difficult));
        setIsFullScreen(!isFullScreen);
    }

    useEffect(() => {
        setTimeout(() => {
            if (customBoolean(localStorage.getItem(CAN_CHALLENGE)) && !customBoolean(localStorage.getItem(CHA_CHALLENGE_NOTIFICATION))) {
                localStorage.setItem(CHA_CHALLENGE_NOTIFICATION, "true");
                alert(`チャレンジモードが解放されました！\n難易度を「${CHALLENGE.NAME}」に変更してみてください！`);
            }
        }, 100);
    }, []);

    // 初期化処理
    init();

    const HomeComponent = () => (
        <Box sx={image}>
            <Box sx={{ minHeight: '100vh', minWidth: '100vw', justifyContent: "space-between" }}>
                <Typography className="mfont" align="center" variant="h3" sx={{ fontFamily: 'Mochiy Pop P One', paddingY: 7 }}>
                    走れ！すすむ君！
                </Typography>
                <Grid container spacing={1} component="form" alignItems="center" justifyContent="center" direction="column">
                    <Grid item xs={12} sx={{ paddingBottom: 3 }}>
                        <TextField focused label="ニックネーム" variant="filled" value={nickname} onChange={(e) => setNickname(e.target.value)} sx={{ bgcolor: "white" }} />
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: 3}}>
                        <FormControl>
                            <InputLabel id="a-label">難易度</InputLabel>
                            <Select labelId="a-label" id="a" sx={{ bgcolor: "white" }} onChange={handleChange} value={difficult} label="Age">
                                {DIFFICULTY_LEVELS.map((LEVEL: DifficultyLevel, index: number): JSX.Element | null => {
                                    if (LEVEL.SEED !== CHALLENGE.SEED || customBoolean(localStorage.getItem(CAN_CHALLENGE))) {
                                        return <MenuItem key={index} value={LEVEL.SEED}>{LEVEL.NAME}</MenuItem>
                                    }

                                    return null;
                                })}
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
        <MainLayout head={head()}>
            {isFullScreen ? <GameComponent /> : HomeComponent()}
        </MainLayout>
    )
}
