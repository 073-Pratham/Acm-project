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

        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(collegeName)
        console.log(password)

        const myForm = new FormData();
  
        myForm.set("firstName", firstName);
        myForm.set("lastName", lastName);
        myForm.set("email", email);
        myForm.set("collegeName", collegeName);
        myForm.set("password", password);

        console.log("myForm " , myForm)

        dispatch( register(myForm));
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
                    <input type='text' placeholder='First Name' onChange={(e) => setUser(e.target.value)}  required />
                </div>
                <div className='login__name'>
                    <input type='text' placeholder='Last Name' onChange={(e) => setUser(e.target.value)} required />
                </div>
                <div className='login__name'>
                    <input type='email' placeholder='Email Id' onChange={(e) => setUser(e.target.value)} required />
                </div>
                <div className='login__name'>
                    <input type='text' placeholder='College Name' onChange={(e) => setUser(e.target.value)} required />
                </div>
                <div className='login__password'>
                    <input type='password' placeholder='Password' onChange={(e) => setUser(e.target.value)} required />
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
