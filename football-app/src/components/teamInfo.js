import {ListItemButton} from "@mui/material";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {List, ListItemIcon, ListItemText} from "@material-ui/core";
import TransitionsModal from "./modalTeamInfo";
import * as React from "react";
import BasicTextFields from "./inputComponent";
import {titleStyle} from "./settings";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import StarRateIcon from '@mui/icons-material/StarRate';
import {apiKey} from "./menu";

const FavTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [listTeams, setListTeams] = useState([]);
    const [searched, setSearched] = useState(true);
    const [favorite, setFavorite] = useState()

    const handleInputChange = (e) => {
        setTeamName(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (teamName.length === 0) return
        else {
            fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?name=${teamName}`, {
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
                    setListTeams(
                        data.response
                    )

                    // warunek brak drużyny w bazie lub bląd pisowni
                    if (data.response.length === 0) {
                        setSearched(false)
                    } else {
                        setSearched(true)
                    }
                })
                .catch((err) => {
                    console.log("Błąd!", err);

                });
            setTeamName("")
        }
    }

    const favoriteTeams = JSON.parse(localStorage.getItem("teamId")) === null ? [] : JSON.parse(localStorage.getItem("teamId"));

    const addData = (el) => {
        const a = favoriteTeams.some((favTeam) => favTeam.team.id === el.team.id);

        if (a === false) {
            favoriteTeams.push(el)
            window.localStorage.setItem('teamId', JSON.stringify(favoriteTeams))
            setFavorite(favoriteTeams)
        } else return
        console.log(favoriteTeams)
    }

    const removeData = (el) => {
        const remove = favoriteTeams.some((removeTeam, index) => {
            const data = removeTeam.team.id === el.team.id
            if (data === true) {
                favoriteTeams.splice(index, 1)
                window.localStorage.setItem('teamId', JSON.stringify(favoriteTeams))
                setFavorite(favoriteTeams)
            }
        })
    }

    return (
        <>
            <Typography variant="h4" style={titleStyle} component="div" sx={{
                flexGrow: 1
            }}>
                Search info about team
            </Typography>

            <BasicTextFields
                teamName={teamName}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
            {/*renderowanie warunkowe - błąd wyszukiwania drużyny*/}

            {searched === false ? (
                    <Typography variant="h5" style={{marginTop: 80}}> This team is not in the database, check the
                        spelling!</Typography>) :
                <List style={{marginTop: 50}}>
                    {listTeams.map(el => {
                        return (
                            <ListItemButton key={el.team.id} className={"list__item"}>
                                <ListItemIcon>
                                    <img src={el.team.logo}
                                         alt={"teamLogo"} style={{width: "20px"}}/>
                                </ListItemIcon>
                                <ListItemText primary={`${el.team.name}`} style={{width: "100px"}}/>
                                <ListItemText primary={`country: ${el.team.country}`} style={{width: "100px"}}/>
                                <TransitionsModal info={el}/>

                                <Button variant="contained"
                                        onClick={() => {
                                            addData(el)
                                        }}
                                        style={{marginLeft:30}}
                                        endIcon={<StarRateIcon/>}>
                                    Add to favorite
                                </Button>

                            </ListItemButton>
                        )
                    })}
                </List>
            }

            {favoriteTeams.length > 0 ? (
                <>
                    <Typography variant="h5" style={{marginTop: 50, marginBottom: 30}}>
                        Favorite teams
                    </Typography>

                    <List>
                        {favoriteTeams.map((el, i) => {
                            return (
                                <ListItemButton key={el.team.id} className={"list__item"}>
                                    <ListItemIcon>
                                        <img src={el.team.logo}
                                             alt={"teamLogo"} style={{width: "20px"}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={`${el.team.name}`} style={{width: "200px"}}/>

                                    <TransitionsModal info={el}/>
                                    <Button variant="contained"
                                            onClick={() => {
                                                removeData(el, i)
                                            }}
                                            style={{marginLeft:30}}
                                            endIcon={<DeleteIcon/>}>
                                        remove
                                    </Button>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </>
            ) : null
            }
        </>
    )
}

export default FavTeam;