import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FriendsFreeSolo(props) {

  const handleChange = (newValue) => {
    if (typeof newValue === 'string') {
      props.handleChange(newValue);
    } else if (newValue && newValue.email) {
      props.handleChange(newValue.email);
    } else {
      props.handleChange("");
    }
  };

  const handleGetOption = (option) => {
    if (typeof option === 'string') {
      return option
    } else if (option && option.email) {
      return option.email
    } else {
      return ""
    }
  };

  return (
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        disabled={props.disabled}
        sx={{color: "black", userSelect: "none"}}
        getOptionLabel={(option) => handleGetOption(option)}
        options={props.options}
        value={props.value || ""}
        onChange={(event, value) => handleChange(value)}
        onInputChange={(event, value) => handleChange(value)}
        renderInput={(params) => <TextField {...params} label={props.label} />}
        renderOption={(props, option) => {
          let newProps = props
          delete newProps.key
         return <li key={option.email} {...newProps}>
          <h4>{option.fullName}</h4>
          <p>{option.email}</p>
        </li>
      }}
      />
  );
}

