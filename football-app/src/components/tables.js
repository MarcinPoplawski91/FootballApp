import React from 'react';
import {useEffect, useState} from "react";
import SelectLabels from "./selectLeague";
import BasicTable from "./leagueTable";
import {apiKey} from "./menu";

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [league, setLeague] = useState("")
    const [leagueTitle, setLeagueTitle] = useState([]);

    useEffect(() => {
        fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?season=2021&league=${league}`, {
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
                setTables(
                    data.response[0].league.standings[0]
                )
                setLeagueTitle(data.response[0].league)
            })
            .catch((err) => {
                console.log("Błąd!", err);
            });
    }, [league])
    return (
        <div>
            <SelectLabels
                setLeague={setLeague}
                league={league}
            />
            <BasicTable
                tables={tables}
                leagueTitle={leagueTitle}
            />
        </div>
    );
};

export default Tables;