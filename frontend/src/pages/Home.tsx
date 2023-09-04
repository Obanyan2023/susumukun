import { MainLayout } from "../components/Layout/MainLayout";
import {
    Box,
    Button,
    Grid,
    Modal,
    Typography
} from "@mui/material";
import * as React from 'react';

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
  };

export const Home = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <MainLayout title={"アプリ探検隊と行くフラット開発ベアー - ようこそ！"}>
            <Grid container alignItems={"center"} direction={"column"}>
                <Grid item m={15}>
                    <Typography variant="h2">
                        {"アプリ探検隊と行くフラット開発ベアー"}
                    </Typography>
                </Grid>
                <Grid container alignItems="center" justifyContent="center" direction="column">
                    <Button variant="contained" sx={{ margin: 3 }}>ゲームスタート</Button>
                    <Button variant="outlined" sx={{ margin: 3 }} onClick={handleOpen}>ルール説明</Button> 
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
                            ・三回ミスしたらゲームオーバー<br/>
                            ・ステージが変わるごとに体力は回復する<br/>
                            ・スコアを他のプレイヤーと競う<br/>
                            ・最高得点が10000 <br />
                            ・アイテム：100点（隠しアイテムは点数を高くする）<br />
                            ・敵：100点～（敵が強くなるたびに加算点数を増加させるから最高得点未定！敵の数によって決める) <br />
                            </Typography>
                        </Box>
                    </Modal>
                    <Button variant="outlined" sx={{ margin: 3 }}> スコア確認</Button>
                </Grid>
            </Grid>
        </MainLayout>
    )
}