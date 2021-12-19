import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SportsSoccerTwoToneIcon from '@mui/icons-material/SportsSoccerTwoTone';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom'
import Live from "./live";
import Tables from "./tables";
import Scorers from "./scorers";
import {Container} from "@mui/material";
import teamInfo from "./teamInfo";

require('dotenv').config()
export const apiKey = process.env.REACT_APP_API_KEY;

export default function Menu() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            FootballAPP <SportsSoccerTwoToneIcon/>
                        </Typography>
                        <nav className={"menu"}>
                            <ul className={"menu__list"}>
                                <li className={"menu__element"}><NavLink to="/" className={"menu__link"} exact
                                                                         activeClassName="selected">Live</NavLink></li>
                                <li className={"menu__element"}><NavLink to="/tables" className={"menu__link"}
                                                                         activeClassName="selected">Tables</NavLink>
                                </li>
                                <li className={"menu__element"}><NavLink to="/scorers" className={"menu__link"}
                                                                         activeClassName="selected">Top
                                    Scorers</NavLink></li>
                                <li className={"menu__element"}><NavLink to="/teamInfo" className={"menu__link"}
                                                                         activeClassName="selected">Your favorite
                                    team </NavLink></li>
                            </ul>
                        </nav>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="lg">
                <section>
                    <Route path="/" exact component={Live}/>
                    <Route path="/tables" component={Tables}/>
                    <Route path="/scorers" component={Scorers}/>
                    <Route path="/teamInfo" component={teamInfo}/>
                </section>
            </Container>
        </Router>
    )
}
