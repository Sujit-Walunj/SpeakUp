import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Components/common/Home';
import About from './Components/common/About';
import Signup from './Components/common/Signup';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/common/Login';
import { useState } from 'react';
import ForgotPassword from './Components/pages/User/ForgotPassword';
import UpdatePassword from './Components/pages/User/UpdatePassword';
import VerifyEmail from './Components/pages/User/VerifyEmail';
import PrivateRoute from './Components/Auth/PrivateRoute';
import Dashboard from './Components/common/DashBoard';
import MyProfile from './Components/Dashboard/MyProfile';
import Settings from './Components/Setting';
import ViewGroup from './Components/pages/Group/ViewGroup';
import GroupDetails from './Components/pages/Group/GroupDetails'; // Assuming you have this component
import { GroupHome } from './Components/pages/Group/GroupHome';
import CreateGroup from './Components/pages/Group/CreateGroup';
import { Complaint } from './Components/pages/Complaint/Complaint';
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/update-password/:id' element={<UpdatePassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path='my-profile' element={<MyProfile />} />
          <Route path='settings' element={<Settings />} />
        </Route>

        <Route element={
        <PrivateRoute>
          <ViewGroup />
        </PrivateRoute>}>
          
          <Route path='/viewGroup' element={<GroupHome/>} /> 
        
          <Route path='/create-group' element={<CreateGroup/>} /> 

          <Route path='/group/:groupId' element={<Complaint/>} />  

          <Route path='/group/:groupId/group-details' element={<GroupDetails/>} />  

        </Route>

        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
