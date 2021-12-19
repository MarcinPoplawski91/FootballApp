import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {List, ListItem, ListItemAvatar, ListItemIcon, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import {center} from "./settings";

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
};

export default function TransitionsModal({scorers}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const convertValue = (value) => {

        if (value === null) {
            return "0"
        } else {
            return value
        }
    }

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
                        <List className="scorers">
                            <ListItem className={"list__item"}>
                                <ListItemAvatar>
                                    <img src={scorers.player.photo}
                                         alt={"playerPhoto"} style={{width: "150px"}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="h6" align={"center"} style={{fontWeight: "bold"}}>
                                        {scorers.player.firstname} {scorers.player.lastname}</Typography>}
                                />
                            </ListItem>
                            <ListItem className={"list__item"}>
                                <ListItemIcon style={{margin: "0 auto"}}>
                                    <img src={scorers.statistics[0].team.logo}
                                         alt={"teamLogo"} style={{width: "30px"}}/>
                                    <ListItemText primary={`${scorers.statistics[0].team.name}`}
                                                  style={{marginLeft: 15, color: "black"}}/>
                                </ListItemIcon>
                            </ListItem>
                            <ListItem className={"list__item"} style={center}>
                                <ListItemText primary={`Nationality: ${scorers.player.nationality}`}/>
                            </ListItem>
                            <ListItem className={"list__item"} style={center}>
                                <ListItemText primary={`Matches: ${scorers.statistics[0].games.appearences}`}/>
                            </ListItem>
                            <ListItem className={"list__item"} style={center}>
                                <ListItemText primary={`Goals: ${scorers.statistics[0].goals.total}`}/>
                            </ListItem>
                            <ListItem className={"list__item"} style={center}>
                                <ListItemText
                                    primary={`Assists: ${convertValue(scorers.statistics[0].goals.assists)}`}/>
                            </ListItem>
                        </List>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}