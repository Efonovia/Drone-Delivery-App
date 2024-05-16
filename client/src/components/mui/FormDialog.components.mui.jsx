import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';


export default function FormDialog(props) {

  const handleDialogClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        return;
    }
    props.handleClose();
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const value = formJson[props.tip];

    props.mutation.mutate({ postDetails: { userId: props.userId, field: props.field, value, type: "add" }, route: "updatelist" })
    console.log(value);
  }

  

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: event => handleSubmit(event),
        }}
      >
      {props?.mutation.isLoading ? <DialogContent sx={{background: "rgba(0, 0, 0, 0.87)"}}>
        <CircularProgress size={100}/>
      </DialogContent> :
      <>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name={props.tip}
            sx={{width: "400px"}}
            label={props.tip}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </>}
      </Dialog>
    </React.Fragment>
  );
}
