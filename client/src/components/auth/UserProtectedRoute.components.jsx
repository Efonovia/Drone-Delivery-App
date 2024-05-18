import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const UserProtectedRoute = () => {
    const userInfo = useSelector(state => state.user)
    const isLoggedIn = Boolean(userInfo)
    const authorized = isLoggedIn && (userInfo.type === "user")
    
    if(isLoggedIn && userInfo.type === "admin") {
        return <Navigate to="admin/home" />
    }
    return(
        authorized ? <Outlet/> : <Navigate to="/"/>
    )
}

export default UserProtectedRoute