import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FormDialog from './FormDialog.components.mui';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useMutation } from 'react-query';
import { userPostRequest } from '../../hooks/users.hooks';
import { useDispatch } from 'react-redux';
import { updateUserArray } from '../../state';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList(props) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const addressMutation = useMutation(userPostRequest, {
    onSuccess: data => {
      console.log(data)
      if(data.ok) {
        dispatch(updateUserArray({ field: "otherAddresses", value: data.body.otherAddresses }))
      } else {
        alert(data.error)
      }
    },
    onSettled: handleClose,
    onError: () => alert("Network error. try again")
  })

  const addressesHTML = props.addresses.map(address => {
    return (
      <ListItem
        key={address}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => removeAddress(address)}>
              <DeleteIcon sx={{color: "red"}} />
          </IconButton>
        }
      >
        <ListItemText primary={address}/>
      </ListItem>
    )
  })

  const handleClickOpen = () => {
      setOpen(true);
  };



  function removeAddress(address) {
    addressMutation.mutate({ postDetails: { userId: props.userId, field: "otherAddresses", value: address, type: "remove" }, route: "updatelist" })
  }

  return (
    <>
    <FormDialog open={open} userId={props.userId} mutation={addressMutation} field="otherAddresses" tip="Address" title={"Add a new address"} handleClose={handleClose}/>
    <Grid container sx={{flexDirection: "row"}} spacing={2}>
        <Grid item xs={12} md={6}>
            <h2 className="me-4">Other Addresses</h2>
          <Demo>
            <List dense={true}>
              {Boolean(props.addresses.length) ? addressesHTML : <p>You haven't added any more addresses</p>}
            </List>
          </Demo>
        </Grid>
        <IconButton onClick={handleClickOpen} sx={{height: "50px"}} edge="end" aria-label="add">
            <AddBoxIcon sx={{color: "#ffb11f", height: "100px"}} />
        </IconButton>
    </Grid>
    </>
  );
}
