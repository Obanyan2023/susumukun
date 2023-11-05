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
import { getScoresApi } from "../features/scores/api";
import '../index.css';
import Background from '../assets/images/black.png';
import {
    CHALLENGE,
    DIFFICULTY_LEVELS,
    DifficultyLevel,
    EASY,
    HARD,
    NORMAL
} from "../features/game/constants/DifficultyLevel";

function Head(): JSX.Element {
    const title = "走れ！すすむ君！ - スコア";
    const description = "「走れ！すすむ君！」はアプリ開発の世界を舞台にしたゲームです。主人公、すすむくんが完成させたアプリに潜むバグ（昆虫）をどれだけ取り除けたかを確認してみましょう！";
    const host = window.location.protocol + window.location.host;
    const url = window.location.href;

    return (
        <>
            {/* https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=ja */}
            <meta name="description" content={description}/>
            <meta property="og:description" content={description} />

            {/*  OGP  */}
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={host + "/ogp-scores.png"} />
        </>

    );
}

/**
 * スコア画面
 *
 * @return {JSX.Element}
 */
export default function Scores(): JSX.Element {
    const [scores, setScores] = useState<{ [key: number]: ScoreEntity[] }>([]);

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
        getScoresApi(DESC).then((res: ScoreEntity[]) => {
            const hardScores: ScoreEntity[] = res.filter((v: ScoreEntity): boolean => v.difficulty === HARD.SEED);
            const normalScores: ScoreEntity[] = res.filter((v: ScoreEntity): boolean => v.difficulty === NORMAL.SEED);
            const easyScores: ScoreEntity[] = res.filter((v: ScoreEntity): boolean => {
                return v.difficulty === EASY.SEED;
            });

            setScores({
                [HARD.SEED]: hardScores ?? [],
                [NORMAL.SEED]: normalScores ?? [],
                [EASY.SEED]: easyScores ?? [],
            });
        });
    }, []);

    return (
        <MainLayout title={"スコア - 走れ！すすむ君！"} head={Head()}>
            <Box sx={{ ...image, height: '100%', width: '100%' }}>
                <Grid>
                    <Button href="/" variant="contained" color='inherit' sx={{ margin: 3 }}> 閉じる</Button>
                </Grid>
                <Grid container alignItems={"flex-start"} justifyContent={"space-evenly"} direction={"row"}>
                    {is_set<{ [key: number]: ScoreEntity[] }>(scores) && DIFFICULTY_LEVELS.map((v: DifficultyLevel): React.JSX.Element => {
                        if (v.SEED === CHALLENGE.SEED) {
                            return <></>;
                        }

                        return(
                            <Box sx={{ margin: 3 }}>
                                <Typography className="mfont" align="center" sx={{ color: 'red', fontFamily: 'Impact', fontSize: 40 }}>
                                    {v.NAME}
                                </Typography>
                                {is_set<ScoreEntity[]>(scores[v.SEED]) && scores[v.SEED].map((v: ScoreEntity, i: number) => (
                                    <Typography key={i} className="mfont" align="center" sx={{ color: 'gray', fontFamily: 'Impact', fontSize: 30, marginTop: 1, marginBottom: 1 }}>
                                        {i + 1}位 {v.nickname} {v.score}
                                    </Typography>
                                ))}
                            </Box>
                        );
                    })}
                </Grid>
            </Box>
        </MainLayout>
    );
}
