import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader/Loader';
import { useNavigate } from 'react-router-dom'; // History substitution:
import Navbar from './Navbar';
import './Profile.css';
import { FaExchangeAlt } from "react-icons/fa";
import { loadUser } from '../../actions/UserAction';


const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        // if(isAuthenticated===false)
        // {
        //     navigate("/")
        // }
        // dispatch(loadUser());
    }, [isAuthenticated , navigate])


    return (
        <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <>
                <div className="profileContainer">
                    <div>
                        <h1>My Profile</h1>
                        <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt={user.firstName} />
                        <Link to="/update/profile">Edit Profile</Link>
                    </div>
                    <div>
                        <div>
                            <p className='profile__heading'>Full Name</p>
                            <p>{user.firstName} {user.lastName}</p>
                        </div>
                        <div>
                            <p className='profile__heading'>College Name</p>
                            <p>{user.collegeName}</p>
                        </div>
                        <div>
                            <p className='profile__heading'>Email</p>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <p className='profile__heading'>Joined On</p>
                            {/* <p>{(user.createdAt).substr(0,10)}</p> */}
                        </div>

                        <div>
                            <Link to="/password/update">Change Password</Link>
                        </div>
                    </div>
                </div>
            </>
        )}

        </Fragment>
    )
}

export default Profile
