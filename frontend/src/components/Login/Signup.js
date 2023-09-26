import React, { Fragment , useEffect , useState } from 'react';
import { register , clearErrors } from "../../actions/UserAction";
import { useDispatch , useSelector} from 'react-redux';
import Loader from '../Home/Loader/Loader';

const Login = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        collegeName: ""
      });
    
      const { firstName , lastName , email , password , collegeName} = user;

    
    const { error , loading , isAuthenticated } = useSelector((state) => state.user);

    const registerSubmit = (e) => {
      e.preventDefault();

      dispatch(register(firstName , lastName , email , password , collegeName));
    };

    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log("user" , collegeName)
      };

  
      
    useEffect(() => {
        if(error){
            console.log("error" , error)
            dispatch(clearErrors());
        }
    }, [error , dispatch ]);

    return<Fragment>
    {
        loading ?(
            <Loader />
        ):(
     <Fragment>
        <div className='login'>
            <div className='signup__leftContainer'>
            </div>
            <form className='login__rightContainer' onSubmit={registerSubmit}>
                <div className='login__signIn'>
                    SIGN UP
                </div>
                <div className='login__name'>
                    <input type='text' placeholder='First Name' name="firstName" value={firstName} onChange={registerDataChange}  required />
                </div>
                <div className='login__name'>
                    <input type='text' placeholder='Last Name' name="lastName" value={lastName} onChange={registerDataChange} required />
                </div>
                <div className='login__name'>
                    <input type='email' placeholder='Email Id' name="email" value={email} onChange={registerDataChange} required />
                </div>
                <div className='login__name'>
                    <input type='text' placeholder='College Name' name="collegeName" value={collegeName} onChange={registerDataChange} required />
                </div>
                <div className='login__password'>
                    <input type='password' placeholder='Password' name="password" value={password} onChange={registerDataChange} required />
                </div>
                <button className='login__button'>
                    Create Account
                </button>
            </form>
        </div>
        </Fragment>
        ) }
    </Fragment>
}

export default Login
