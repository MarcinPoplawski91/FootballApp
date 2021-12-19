import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicTabs from "./tabsComponent";
import {useEffect, useState} from "react";
import {apiKey} from "./menu";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
    height: `80vh`
};

export default function TransitionsModal({fixtureID}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [squads, setSquads] = useState([]);

    useEffect(() => {
        if (open === true) {
            fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups?fixture=${fixtureID.fixture.id}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    "x-rapidapi-key": apiKey
                }
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Błąd zapytania!");
                    }
                })
                .then((data) => {
                    console.log(data);

                    setSquads(data.response);
                })
                .catch((err) => {
                    console.log("Błąd!", err);
                });
        }

    }, [open])

    return (
        <div>
            <Button onClick={handleOpen}>More Info</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" align="center">
                            <img src={fixtureID.teams.home.logo} alt={"teamLogo"}
                                 style={{width: "20px", marginRight: "10px"}}/>
                            {fixtureID.teams.home.name} {fixtureID.goals.home} - {fixtureID.goals.away} {fixtureID.teams.away.name}
                            <img src={fixtureID.teams.away.logo} alt={"teamLogo"}
                                 style={{width: "20px", marginLeft: "10px"}}/>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{mt: 2}}>
                            <BasicTabs squads={squads}/>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}