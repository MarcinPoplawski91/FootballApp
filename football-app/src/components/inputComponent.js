import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {FormControl} from "@mui/material";

export default function BasicTextFields(props) {

    return (

        <FormControl onSubmit={props.handleSubmit}>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch', height: "50px"},
                }}
                // noValidate
                Validate
                autoComplete="off"
            >
                <TextField id="outlined-basic"
                           label="Team Name"
                           variant="outlined"
                           value={props.teamName}
                           onChange={props.handleInputChange}
                />
                <Button
                    type="submit"
                    align="center"
                    variant="contained">Search</Button>
            </Box>

        </FormControl>

    );
}