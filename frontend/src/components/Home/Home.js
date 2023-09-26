import React, { Fragment } from 'react';
import './Home.css'
import Search from './Search';

const Home = () => {
    return (
        <Fragment>
            <div className='home'>
                <div className='home__left'>
                    <div className='home__line1'>
                        <p>Discover Most Suitable College</p>
                    </div>
                    <div className='home__line2'>
                        <p>
                            Find a varity of colleges and hostels that suit you very easily, 
                            forget all difficulties in finding your college
                        </p>
                    </div>
                    <div className='home__line3'>
                        <Search />
                    </div>
                </div>
                <div className='home__right'>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
