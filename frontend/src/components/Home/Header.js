import React, { Fragment} from 'react';
import './Header.css';
import Home from './Home';
import Navbar from './Navbar';

const Header = () => {
    return (
        <Fragment>
            <div className='header'>
                <Navbar />
                <div className='header__down'>
                    <Home />
                </div>
            </div>
        </Fragment>
    )
}

export default Header
