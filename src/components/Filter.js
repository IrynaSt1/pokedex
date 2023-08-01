import { useState } from "react";
import { pokemonTypes } from "../pokemonTypes";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import classes from "./Filter.module.css";

const Filter = ({ onFetchPokemons }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeChange = (event) => {
    event.preventDefault();
    setSelectedType(event.target.value);
    onFetchPokemons(event.target.value);
  };

  return (
    <div className={classes.filter}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          value={pokemonTypes.name}
          label="Type"
          onChange={handleTypeChange}
        >
          {pokemonTypes.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filter;
