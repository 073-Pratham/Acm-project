import React, { Fragment, useState } from 'react';
import './Header.css';
import './Navbar.css';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import { VscClippy } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Login from '../Login/Login';
import Signup from '../Login/Signup';
import { logout } from '../../actions/UserAction';
import { useDispatch } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();

    const [openLogin, setLoginOpen] = useState(false);
    const [openSignin, setSigninOpen] = useState(false);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {user , isAuthenticated } = useSelector((state) => state.user);
  
    const handleLoginClickOpen = () => {
        setLoginOpen(true);
    };
    
  
    const handleSigninClickOpen = () => {
        setSigninOpen(true);
    };
    
    const handleClose = () => {
        setLoginOpen(false);
        setSigninOpen(false);
    };

    const logoutUser = () => {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    return (
        <Fragment>
            <div className='header__up'>
                <div className='header__heading'>Collegyz</div>
                <div className='header__options'>
                    <p>Home</p>
                    <p>Colleges</p>
                    <p>Hostels</p> 
                    <p>About Us</p>
                    {!isAuthenticated && 
                    <>
                        <p className='loginSignup' onClick={handleLoginClickOpen}>Login</p>
                        <Dialog open={openLogin} onClose={handleClose}>
                            <DialogContent>
                            <DialogContentText>
                                <Login setSigninOpen={setSigninOpen} setLoginOpen={setLoginOpen} />
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            </DialogActions>
                        </Dialog>
                    </>
                    }
                    {!isAuthenticated && 
                    <>
                        <p className='loginSignup' onClick={handleSigninClickOpen}>Signup</p>
                        <Dialog open={openSignin} onClose={handleClose}>
                            <DialogContent>
                            <DialogContentText>
                                <Signup />
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            </DialogActions>
                        </Dialog>
                    </>
                    }
                    {isAuthenticated && <p><Link to={'./profile'} >Admin</Link></p>}
                    {isAuthenticated && <p><Link to={'./profile'} >Account</Link></p>}
                    {isAuthenticated && <p className='logout__icon' onClick={logoutUser}>Logout</p>}
                </div>
            </div>
        </Fragment>
    )
}

export default Navbar
