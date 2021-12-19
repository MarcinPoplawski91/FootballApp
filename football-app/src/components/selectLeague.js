import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({setLeague, l}) {

    const handleChange = (event) => {
        setLeague(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-helper-label">League</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={l}
                    label="League"
                    onChange={handleChange}
                >
                    <MenuItem value="106">Ekstraklasa - Poland</MenuItem>
                    <MenuItem value="39">Premier League - England</MenuItem>
                    <MenuItem value="140">LaLiga - Spain</MenuItem>
                    <MenuItem value="135">Seria A - Italy</MenuItem>
                    <MenuItem value="78">Bundesliga - Germany</MenuItem>
                    <MenuItem value="61">Ligue1 - France</MenuItem>
                </Select>
                <FormHelperText>Select a league</FormHelperText>
            </FormControl>
        </div>
    );
}