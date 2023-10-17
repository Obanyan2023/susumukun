import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Grid,
    Typography
} from "@mui/material";
import { MainLayout } from "../components/Layout/MainLayout";
import { DESC } from "../config";
import { ScoreEntity } from "../types";
import { is_set } from "../utils/isType";
import { getScoresApi, storeScoresApi } from "../features/scores/api";
import '../index.css';
import Background from '../assets/images/black.png';

/**
 * スコア画面
 *
 * @return {JSX.Element}
 */
export default function Scores(): JSX.Element {
    const [scores, setScores] = useState<ScoreEntity[]>([]);
    const [open, setOpen] = React.useState(false);

    // 背景画像のスタイル
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

    // ウィンドウサイズを設定
    const setWinSize = () => {
        const windowSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        const imageUrlWithParams = `${Background}?w=${windowSize.width}&h=${windowSize.height}`;

        return imageUrlWithParams;
    };

    // 背景画像のスタイル
    const image = {
        backgroundImage: `url(${setWinSize()})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    // スコアを取得
    useEffect(() => {
        // スコアを取得し、降順にソートして表示
        getScoresApi(DESC).then((res: ScoreEntity[]) => {
            res.sort((a, b) => b.score - a.score);
            setScores(res);
        });
    }, []);

    // TOP 5 スコアを表示
    const topFiveScores = scores.slice(0, 5).map((score: ScoreEntity, index: number) => {
        let fontSize;
        let textColor;
        if (index === 0) {
            fontSize = 40; // 1位の文字サイズ
            textColor = "#FFD700"; // 1位の文字色
        } else if (index === 1) {
            fontSize = 30; // 2位の文字サイズ
            textColor = "#C0C0C0"; // 2位の文字色
        } else if (index === 2) {
            fontSize = 25; // 3位の文字サイズ
            textColor = "#8C4841"; // 3位の文字色
        } else {
            fontSize = 20; // 4位と5位の文字サイズ
            textColor = 'black'; // 4位と5位の文字色
        }

            return (
                <Typography key={index} className="mfont" align="center" sx={{ color: textColor, fontFamily: 'fantasy', fontSize: fontSize }}>
                    <div>{`NO.${index + 1} ${score.nickname}`}</div>
                    <div>{`${score.score}p`}</div>
                    <br />
                </Typography>
            );
        });

    // すべてのスコアを表示
    const allScores = scores.map((score: ScoreEntity, index: number) => {
        return (
            <Typography key={index} className="mfont" align="center" sx={{ color: 'black', fontFamily: 'fantasy', fontSize: 20 }}>
                <div>{`${index + 1}. ${score.nickname}`}</div>
                <div>{`${score.score}p`}</div>
                <br />
            </Typography>
        );
    });

    return (
        <MainLayout title={"走れ！すすむ君！ - スコア"}>
            <Box sx={image}>
                <Grid container alignItems={"center"} direction={"column"} sx={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>
                    <button onClick={() => storeScoresApi(
                        Math.random().toString(32).substring(2),
                        Math.floor(Math.random() * 100 + 1)
                    )}>デバッグ用 - ランダムデータ保存</button>
                    <div>
                        <div style={{ float: 'left', width: '50%' }}>
                            <Typography className="mfont" align="center" sx={{ color: 'red', fontFamily: 'fantasy', fontSize: 40 }}>
                                TOP 5
                            </Typography>
                            {is_set<ScoreEntity[]>(scores) && (
                                <div style={{ overflow: 'auto', maxWidth: '1000px', maxHeight: '500px', textAlign: 'center', overflowY: 'scroll' }}>
                                    {topFiveScores}
                                </div>
                            )}
                        </div>
                        <div style={{ float: 'left', width: '50%' }}>
                            <Typography className="mfont" align="center" sx={{ color: 'gray', fontFamily: 'fantasy', fontSize: 40 }}>
                                ALL RANKING
                            </Typography>
                            {is_set<ScoreEntity[]>(scores) && (
                                <div style={{ overflow: 'auto', maxHeight: '500px', textAlign: 'center', overflowY: 'scroll' }}>
                                    {allScores}
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>
            </Box>
        </MainLayout>
    );
}
