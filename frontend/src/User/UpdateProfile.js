import React, { Fragment , useEffect , useState} from 'react';
import './UpdateProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Home/Loader/Loader';
import { loadUser, updateCollege, updateName } from '../actions/UserAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_COLLEGENAME_RESET, UPDATE_NAME_RESET } from '../constants/UserConstant';

const UpdateProfile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    const [name , setName] = useState('');
    const [college , setCollege] = useState('');
    const { error , isUpdated  } = useSelector( (state) => state.update);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const changeName = (e) => {
        e.preventDefault();
        var stringArray = name.split(/(\s+)/);
        var firstName = stringArray[0];
        var lastName = stringArray[2];
        console.log(firstName, lastName);
        dispatch(updateName(firstName, lastName));
    }

    const changeCollege = (e) => {
        e.preventDefault();
        dispatch(updateCollege(college));
    }

    useEffect(() => {
        if(isUpdated){
            // alert.success("Profile Updated Successfully");
            dispatch(loadUser());
  
            navigate("/profile")
            
            dispatch({
                type: UPDATE_NAME_RESET,
            })
            dispatch({
                type: UPDATE_COLLEGENAME_RESET,
            })
        }
    }, [isUpdated])



    return (
        <Fragment>
        {loading ? (
            <Loader />
        ) : (
        <Fragment>
        <div className="updateprofileContainer">
                        <div>
                            <h1>Update My Profile</h1>
                            <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt={'Photu'} />
                        </div>
                        <div className='updateProfile'>
                            <div className='searchBox'>
                                <input type="text" placeholder={`${user.firstName} ${user.lastName}`}  onChange={(e) => setName(e.target.value)} />
                                <input type="submit" value="Update" onClick={changeName}  />
                            </div>

                            <div className='searchBox'>
                                <input type="text" placeholder={`${user.collegeName}`}  onChange={(e) => setCollege(e.target.value)} />
                                <input type="submit" value="Update" onClick={changeCollege}  />
                            </div>
                        </div>
                    </div>
        </Fragment>
        )}
        </Fragment>
    )
}

export default UpdateProfile