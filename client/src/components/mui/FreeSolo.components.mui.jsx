import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo(props) {
  return (
      <Autocomplete
        id="free-solo-demo"
        disabled={props.disabled}
        freeSolo
        options={props.options}
        value={props.value || ""}
        onChange={(event, value) => props.handleChange(value)}
        onInputChange={(event, value) => props.handleChange(value)}
        renderInput={(params) => <TextField {...params} label={props.label} />}
      />
  );
}
