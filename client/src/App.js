import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavWrapper from "./components/NavWrapper.components";
import UserNavbar from "./components/UserNavbar.components";
import Friends from "./pages/Friends.page";
import MakeDelivery from "./pages/MakeDelivery.page";
import UserProfile from "./pages/UserProfile.page";
import AdminDeliveries from "./pages/AdminDeliveries.page";
import AdminHome from "./pages/AdminHome.page";
import AdminViewDrones from "./pages/AdminViewDrones.page";
import React from 'react';
import Home from './pages/Home.page';
import HomeNavbar from './components/HomeNavbar.components';
import Register from './pages/Register.page';
import Login from './pages/Login.page';
import AdminLogin from './pages/AdminLogin.page';
import UserViewSentDelivery from './pages/UserViewSentDelivery.page';
import UserSentDeliveries from './pages/UserSentDeliveries.page';
import UserRecievedDeliveries from './pages/UserReceivedDeliveries.page';
import UserViewReceivedDelivery from './pages/UserViewReceivedDelivery.page';


function App() {
    return <BrowserRouter>
    <Routes>
        <Route path="/" element={<><HomeNavbar/><Home/></>} />
        <Route path="/user/register" element={<><HomeNavbar/><Register /></>} />
        <Route path="/user/login" element={<><HomeNavbar/><Login /></>} />
        <Route path="/user/profile" element={<><UserNavbar/><UserProfile /></>} />
        <Route path="/user/drones" element={<><UserNavbar/><MakeDelivery/></>} />
        <Route path="/user/sent" element={<><UserNavbar/><UserSentDeliveries /></>} />
        <Route path="/user/sent/view/:id" element={<><UserNavbar/><UserViewSentDelivery/></>} />
        <Route path="/user/received" element={<><UserNavbar/><UserRecievedDeliveries /></>} />
        <Route path="/user/received/view/:id" element={<><UserNavbar/><UserViewReceivedDelivery/></>} />
        <Route path="/user/friends" element={<><UserNavbar/><Friends /></>} />


        <Route path="/admin/login" element={<><HomeNavbar/><AdminLogin /></>} />
        <Route path="/admin/home" element={<NavWrapper><AdminHome/></NavWrapper>} />
        <Route path="/admin/drones" element={<NavWrapper><AdminViewDrones/></NavWrapper>} />
        <Route path="/admin/all" element={<NavWrapper><AdminDeliveries type="all"/></NavWrapper>} />
        <Route path="/admin/unprocessed" element={<NavWrapper><AdminDeliveries type="unprocessed"/></NavWrapper>} />
        <Route path="/admin/pending" element={<NavWrapper><AdminDeliveries type="pending"/></NavWrapper>} />
        <Route path="/admin/completed" element={<NavWrapper><AdminDeliveries type="completed"/></NavWrapper>} />

    </Routes>
  </BrowserRouter>
}

export default App;
