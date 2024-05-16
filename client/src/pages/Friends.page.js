import React from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { centerStyle } from '../utils/utils';
import AlignItemsList from '../components/mui/AlignItemsList.components.mui';
import AddBox from '@mui/icons-material/AddBox';
import FormDialog from '../components/mui/FormDialog.components.mui';
import { useMutation, useQueries } from 'react-query';
import { userGetRequest, userPostRequest } from '../hooks/users.hooks';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserArray } from '../state';
import { CircularProgress } from '@mui/material';


function Friends() {
    const [open, setOpen] = React.useState(false);
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true); //testing repo
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const friendsQuery = useQueries(
        userInfo.friends.map(friendId => ({
            queryKey: ["friend", friendId],
            queryFn: () => userGetRequest({ route: `id/${friendId}` })
        }))
    )

    const isLoading = friendsQuery.some(query => query.isLoading);
    const isError = friendsQuery.some(query => query.isError);
    const data = friendsQuery.map(query => ({ fullName: query.data?.body.firstName + " " + query.data?.body.lastName, email: query.data?.body.email}));
    if (isError) {
        alert("There was an error fetching your friends. Check Your Internet and try again");
    }

    const friendsMutation = useMutation(userPostRequest, {
        onSuccess: data => {
            console.log(data)
            if(data.ok) {
                dispatch(updateUserArray({ field: "friends", value: data.body.friends }))
            } else {
                alert(data.error)
            }
        },
        onError: () => alert("Network error. try again"),
        onSettled: handleClose
    })



    return ( 
            isLoading ? <CircularProgress sx={{marginTop: "300px", marginLeft: "700px", color: "#ffb11f"}} size={100}/> : <div style={{...centerStyle}}>    
                <FormDialog open={open} userId={userInfo._id} mutation={friendsMutation} field="friends" tip={"email"} title={"Enter a friend's email to add them"} handleClose={handleClose}/>

                <div style={{...centerStyle, flexDirection: "column", marginTop: "20px"}}>
                    <h1><PeopleAltIcon sx={{width: 50, height: 50, color: "#373063"}}/>Friends</h1>
                    <AlignItemsList friends={data} />
                </div>
                <AddBox onClick={handleClickOpen} sx={{width: 70, height: 70, color: "rgb(255, 177, 31)", cursor: "pointer"}}/>
            </div>
    )
}


export default Friends