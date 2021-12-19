import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import {styleSelect} from "./settings";

export default function BasicTable({tables, leagueTitle}) {
    // kolorowanie liter według formy drużyn
    const colorForm = (form) => {
        const result = [...form];
        return result.map((item) => {
            if (item === "W") {
                return <span className="green">W</span>
            }
            if (item === "D") {
                return <span className="black">D</span>
            }
            if (item === "L") {
                return <span className="red">L</span>
            }
        })
    }
    const bold = {
        fontWeight: "bold"
    }
    const logoItem = (leagueTitle) => {
// warunek umożliwiający poprawne wyświetlanie logo na starcie
        if (leagueTitle) {
            return (
                <img src={leagueTitle}
                     alt={"LigLogo"}
                     style={{
                         width: "50px",
                         marginRight: "15px"
                     }}/>
            )
        } else return ""
    }
    return (
        <>
            <Typography variant="h4"
                        style={styleSelect}
                        component="div" sx={{flexGrow: 1}}>
                {logoItem(leagueTitle.logo)}{leagueTitle.name} Table season 2020/2021
            </Typography>
            <TableContainer component={Paper} className={"table"}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={bold}>Rank</TableCell>
                            <TableCell align="left" style={bold}>Team name</TableCell>
                            <TableCell align="center" style={bold}>Matches</TableCell>
                            <TableCell align="center" style={bold}>Win</TableCell>
                            <TableCell align="center" style={bold}>Draw</TableCell>
                            <TableCell align="center" style={bold}>Lose</TableCell>
                            <TableCell align="center" style={bold}>Goals different</TableCell>
                            <TableCell align="center" style={bold}>Points</TableCell>
                            <TableCell align="center" style={bold}>Form</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*warunek żeby nie mapować po pustych tablicach które nie mają podanych kluczy*/}
                        {tables.length === 0 ? "" :
                            (tables.map((el) => (
                                <TableRow
                                    key={el.team.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    className={"table__row"}>
                                    <TableCell component="th" scope="row">
                                        {el.rank}
                                    </TableCell>
                                    <TableCell align="left"><img src={el.team.logo} alt="teamLogo" style={{
                                        width: "20px",
                                        marginRight: "10px"
                                    }}/>{el.team.name}
                                    </TableCell>
                                    <TableCell align="center">{el.all.played}</TableCell>
                                    <TableCell align="center">{el.all.win}</TableCell>
                                    <TableCell align="center">{el.all.draw}</TableCell>
                                    <TableCell align="center">{el.all.lose}</TableCell>
                                    <TableCell align="center">{el.goalsDiff}</TableCell>
                                    <TableCell align="center">{el.points}</TableCell>
                                    <TableCell align="center">{colorForm(el.form)}</TableCell>
                                </TableRow>
                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}