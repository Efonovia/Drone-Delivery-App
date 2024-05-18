import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const AdminProtectedRoute = () => {
    const userInfo = useSelector(state => state.user)
    const isLoggedIn = Boolean(userInfo)
    const authorized = isLoggedIn && (userInfo.type === "admin")
    
    if(!isLoggedIn) {
        return <Navigate to="/" />
    } else if(isLoggedIn && userInfo.type === "user") {
        return <Navigate to="/user/profile" />
    } else if(authorized) {
        return <Outlet/>
    }
}

export default AdminProtectedRoute