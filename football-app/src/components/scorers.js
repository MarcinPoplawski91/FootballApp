import React, {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import SelectLabels from "./selectLeague";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import TransitionsModal from "./modalScorer";
import Typography from "@mui/material/Typography";
import {styleSelect} from "./settings";
import {apiKey} from "./menu";

const Scorers = () => {
    const [scorers, setScorers] = useState([]);
    const [league, setLeague] = useState("");
    const [leagueInfo, setLeagueInfo] = useState("");
    const [open, setOpen] = React.useState(false);

    useEffect(() => {

        fetch(`https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${league}&season=2021`, {
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

                setScorers(
                    data.response
                )
                setLeagueInfo(data.response[0].statistics[0].league)
            })
            .catch((err) => {
                console.log("Błąd!", err);
            });
    }, [league])

    if (!scorers) {
        return <CircularProgress/>;
    }

    const logoItem = (leagueInfo) => {

        if (leagueInfo) {
            return (
                <img src={leagueInfo}
                     alt={"LigLogo"} style={{width: "50px", marginRight: "15px"}}/>
            )
        } else {
            return ""
        }
    }
    return (
        <div>
            <SelectLabels setLeague={setLeague} league={league} leagueInfo={leagueInfo}/>
            <Typography variant="h4" style={styleSelect} component="div" sx={{flexGrow: 1}}>
                {logoItem(leagueInfo.logo)} {leagueInfo.name} Top scorers season 2020/2021
            </Typography>
            <List>
                {scorers.map((el, i) => {
                    return (
                        <>
                            <ListItemButton key={el.id} className={"list__item"}>
                                <ListItemText primary={`${i + 1}.`} className={"counter"}/>
                                <ListItemIcon>
                                    <img src={el.statistics[0].team.logo}
                                         alt={"teamLogo"} style={{width: "20px"}}/>
                                </ListItemIcon>
                                <ListItemText primary={`${el.player.firstname} ${el.player.lastname}`}
                                              style={{width: "200px"}}/>
                                <ListItemText primary={`goals: ${el.statistics[0].goals.total}`}
                                              style={{width: "50px", marginLeft: 200}}/>

                                <TransitionsModal
                                    scorers={el}
                                    league={leagueInfo}
                                    onClick={(e) => setOpen(e.target.value)}
                                />
                            </ListItemButton>
                        </>
                    )
                })}
            </List>
        </div>
    );
};
export default Scorers;