import React from 'react';
import {useEffect, useState} from "react";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import TransitionsModal from "./modalLive";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {titleStyle} from "./settings";
import {apiKey} from "./menu";


function Live() {
    const [fixtures, setFixtures] = useState([]);
    const [searched, setSearched] = useState(true);


    useEffect(() => {
        fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all`, {
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
                setFixtures(
                    data.response
                )
                // warunek brak meczy live
                if (data.response.length === 0) {
                    setSearched(false)
                } else {
                    setSearched(true)
                }
            })
            .catch((err) => {
                console.log("Błąd!", err);
            });

    }, [])

    if (!fixtures) {
        return <CircularProgress/>;
    }
    const flagItem = (el) => {
        if (el.league.flag) {
            return (
                <img src={el.league.flag}
                     alt={"flag"} style={{width: "20px"}}/>
            )
        } else return <img src='https://www.flashscore.pl/res/_fs/build/world.ee5f190.png' alt={"flag"}
                           style={{width: "20px"}}/>
    }
    return (
        <>
            {searched === false ? (
                <Typography variant="h5" style={{marginTop: 80}}> Currently no live matches
                </Typography>) : (
                <div>
                    <Typography variant="h4" style={titleStyle} component="div" sx={{flexGrow: 1}}>
                        Live matches
                    </Typography>
                    <List>
                        {fixtures.map(el => {
                            return (
                                <ListItemButton key={el.teams.home.id} className={"list__item"}>
                                    <ListItemIcon>
                                        {flagItem(el)}
                                    </ListItemIcon>
                                    <ListItemText primary={`${el.teams.home.name}`} style={{width: "200px"}}/>
                                    <ListItemText primary={`${el.goals.home}`} style={{width: "20px"}}/>
                                    <ListItemText primary={`-`}/>
                                    <ListItemText primary={`${el.goals.away}`} style={{width: "20px"}}/>
                                    <ListItemText primary={`${el.teams.away.name}`} style={{width: "300px"}}/>
                                    <ListItemText primary={`${el.fixture.status.elapsed}'`} style={{width: "20px",}}/>
                                    <TransitionsModal fixtureID={el}/>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </div>
            )}
        </>
    );
}

export default Live;