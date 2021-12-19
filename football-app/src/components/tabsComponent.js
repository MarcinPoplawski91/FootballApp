import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {List, ListItem, ListItemText} from "@mui/material";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({squads}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (squads.length === 0) {
        return <p style={{marginTop: 80, textAlign: "center"}}>
            We apologize, but we haven't more information about this match
        </p>
    }

    // funkcja konwertująca litery na nazwy pozycji
    const position = (pos) => {

        if (pos === "G") {
            return <p className="greenPos">Goalkeeper</p>
        }
        if (pos === "D") {
            return <p className="bluePos"> Defender </p>
        }
        if (pos === "M") {
            return <p className="yellowPos">Midfielder</p>
        }
        if (pos === "F") {
            return <p className="redPos">Forward</p>
        }
    }

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={squads[0].team.name} {...a11yProps(0)} />
                    <Tab label={squads[1].team.name} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Typography variant="h6" component="h2" align="center">
                    Coach: {squads[0].coach.name}
                </Typography>
                <Typography variant="h6" component="h2" align="center">
                    Formation: {squads[0].formation}
                </Typography>
                <List>
                    <Typography variant="h6" component="h2" align="center"
                                style={{marginTop: "20px", marginBottom: "20px"}}>
                        Start squad:
                    </Typography>
                    {squads[0].startXI.map(el => {
                        return (
                            <ListItem key={el.player.id} className={"list__item"}>
                                <ListItemText secondary={el.player.number} style={{width: "10px"}}/>
                                <ListItemText primary={el.player.name} style={{width: "100px"}}/>
                                <ListItemText secondary={position(el.player.pos)} style={{width: "10px"}}/>
                            </ListItem>
                        )
                    })}
                </List>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h6" component="h2" align="center">
                    Coach: {squads[1].coach.name}
                </Typography>
                <Typography variant="h6" component="h2" align="center">
                    Formation: {squads[1].formation}
                </Typography>
                <List>
                    <Typography variant="h6" component="h2" align="center"
                                style={{marginTop: "20px", marginBottom: "20px"}}>
                        Start squad:
                    </Typography>
                    {squads[1].startXI.map(el => {
                        return (
                            <ListItem key={el.player.id} className={"list__item"}>
                                <ListItemText secondary={el.player.number} style={{width: "10px"}}/>
                                <ListItemText primary={el.player.name} style={{width: "100px"}}/>
                                <ListItemText secondary={position(el.player.pos)} style={{width: "10px"}}/>
                            </ListItem>
                        )
                    })}
                </List>
            </TabPanel>
        </Box>
    )
}