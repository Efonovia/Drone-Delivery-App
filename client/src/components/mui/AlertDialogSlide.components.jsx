import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { CircularProgress, DialogContent } from '@mui/material';
import { useMutation } from 'react-query';
import { deliveryPostRequest } from '../../hooks/users.hooks';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const navigate = useNavigate()
    const handleDialogClose = (event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        props.handleClose();
    }

    const changeApprovalMutation = useMutation(deliveryPostRequest, {
        onError: () => alert("Couldn't make that request. Check your internet and try again"),
        onSuccess: data => {
            if(!data.ok) {
                alert(data.error)
            } else {
                if(props.type === "approved") {
                    props.handleClose()
                    props.refetch()
                }
                if(props.type === "denied") {
                    navigate(props.redir)
                }
            }
        }
    })

    function handleApproval() {
        changeApprovalMutation.mutate({ postDetails: { deliveryId: props.deliveryId, updates: [{ field: props.clientType, value: props.type }] }, route: `edit` })
    }

  return (
    <React.Fragment>
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDialogClose}
            aria-describedby="alert-dialog-slide-description"
            disableBackdropClick 
        >
            {changeApprovalMutation.isLoading ? <DialogContent sx={{background: "rgba(0, 0, 0, 0.87)"}}>
                <CircularProgress size={100}/>
            </DialogContent> :

            <>
                <DialogTitle>Are you sure you want to {(props.type && props.type === "approved") ? "APPROVE": "DECLINE"} this delivery?</DialogTitle>
                
                <DialogActions>
                    <Button onClick={handleApproval}>Yes</Button>
                    <Button onClick={props.handleClose}>No</Button>
                </DialogActions>
            </>}
        </Dialog>
    </React.Fragment>
  );
}
