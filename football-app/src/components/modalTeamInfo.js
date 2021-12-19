import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
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

export default function TransitionsModal({info}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        <List className="teamInfo">
                            <ListItem className={"list__item"}>
                                <ListItemIcon style={{margin: "0 auto"}}>
                                    <img src={info.team.logo}
                                         alt={"teamLogo"} align="center" style={{width: "30px"}}/>
                                    <ListItemText primary={`${info.team.name}`}
                                                  style={{marginLeft: 15, color: "black"}}/>
                                </ListItemIcon>
                            </ListItem>
                            {info.team.country !== null ? (
                                <ListItem className={"list__item"} style={center}>
                                    <ListItemText primary={`country: ${info.team.country}`}
                                                  style={{width: "200px"}}/>
                                </ListItem>
                            ) : null
                            }
                            {info.team.founded !== null ? (
                                <ListItem className={"list__item"} style={center}>
                                    <ListItemText primary={`founded: ${info.team.founded}`}
                                                  style={{width: "200px"}}/>
                                </ListItem>
                            ) : null
                            }
                            {info.venue.image !== null ? (
                                <ListItem className={"list__item"} style={center}>
                                    <ListItemText primary={`Stadium`} style={{width: "200px"}}/>
                                </ListItem>
                            ) : null
                            }
                            {info.venue.image !== null ? (
                                <ListItem className={"list__item"} style={center}>
                                    <ListItemIcon style={{margin: "0 auto"}}>
                                        <img src={info.venue.image}
                                             alt={"stadium"} style={{width: "200px"}}/>
                                    </ListItemIcon>
                                </ListItem>
                            ) : null
                            }
                            {info.venue.city || info.venue.address !== null ? (
                                <ListItem className={"list__item"} style={center}>
                                    <ListItemText
                                        primary={`Adress: ${info.venue.city} ${info.venue.address}`}
                                        style={{width: "400px"}}
                                    />
                                </ListItem>
                            ) : null
                            }
                            {info.venue.name !== null ? (
                                <ListItem className={"list__item"} style={center}>
                                    <ListItemText primary={`Name: ${info.venue.name}`}
                                                  style={{width: "200px"}}/>
                                </ListItem>
                            ) : null
                            }
                            {info.venue.capacity !== null ? (
                                <ListItem className={"list__item"} style={center}>
                                    <ListItemText primary={`Capacity: ${info.venue.capacity}`}
                                                  style={{width: "200px"}}/>
                                </ListItem>
                            ) : null
                            }
                        </List>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}