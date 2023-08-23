import { React, useState } from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({onChange, setText, searchText}) => {
    return(
    <>
        <div className="search">
            <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
                margin="normal"
                placeholder="Search by Name, Email, Role"
                value={searchText}
                onChange={(e)=>{
                    setText(e.target.value);
                    onChange(e);
                }}
            />
        </div>
    </>
    )
}

export default SearchBar;