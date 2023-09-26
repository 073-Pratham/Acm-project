import React, { Fragment, useEffect , useRef } from 'react';
import CollegeCard from './CollegeCard';
import './HeroSection.css';
import { getAllColleges } from "../../actions/CollegeAction";
import {  useDispatch, useSelector } from "react-redux";
import { VscChevronDown } from "react-icons/vsc";


const HeroSection = () => {
    const dispatch = useDispatch();

    const { colleges  } = useSelector(state => state.colleges);

    // const switchTabs = (e, tab) => {
    //     if (tab === "login") {
    //       switcherTab.current.classList.add("shiftToNeutral");
    //       switcherTab.current.classList.remove("shiftToRight");
    
    //       registerTab.current.classList.remove("shiftToNeutralForm");
    //       loginTab.current.classList.remove("shiftToLeft");
    //     }
    //     if (tab === "register") {
    //       switcherTab.current.classList.add("shiftToRight");
    //       switcherTab.current.classList.remove("shiftToNeutral");
    
    //       registerTab.current.classList.add("shiftToNeutralForm");
    //       loginTab.current.classList.add("shiftToLeft");
    //     }
    //   };


    const activeTab = useRef(null);

    const switchTabs = (e , tabs) => {
        if(activeTab.current.classList.contains("active")){
            activeTab.classList.toggle("active")
        }
        else{
            activeTab.classList.remove("active")
            activeTab.classList.add("active")
        }
    }

    useEffect(() => {
        dispatch(getAllColleges());
    }, [dispatch]);

    return (
        <Fragment>
            <div className='heroSection'>
                <div className='heroSection__line1'>
                    <p>Best Choice</p>
                </div>
                <div className='heroSection__line2'>
                    <p>Popular Colleges</p>
                </div>
                <div className='heroSection__colleges'>
                    {colleges && 
                        colleges.map((college) => (
                            <CollegeCard key={college._id} college={college}/>
                        ))}
                </div>
                <div className='heroSection__down'>
                    <div className='heroSection__down__left'></div>
                    <div className='heroSection__down__right'>
                        <div className='heroSection__down__line1'>Our Value</div>
                        <div className='heroSection__down__line2'>Value We Give To You</div>
                        <div className='heroSection__down__line3'>We always ready to help by providing the best serivce for you. We believe a good place to live can make your life</div>
                        <div class="accordion__wrapper">
                        <div class="questions__accordions">
                            <div class="question-answer__accordion">
                                <div class="question" ref={activeTab} onClick={(e) => switchTabs(e , "active" )}>
                                    <h3 class="title__question">
                                        what would we get from this website
                                    </h3>
                                    <VscChevronDown />
                                </div>
                                <div class="answer"  onClick={(e) => switchTabs(e , "noactive" )}>
                                    You can search any information about the colleges in india and some foreign also. And apart from 
                                    this you can see the nearby hostels around the college.
                                </div>
                            </div>

                            <div class="question-answer__accordion">
                                <div class="question" ref={activeTab} onClick={(e) => switchTabs(e , "active")}>
                                    <h3 class="title__question">
                                        How can I review the college 
                                    </h3>
                                    <VscChevronDown />
                                </div>
                                <div class="answer "  onClick={(e) => switchTabs(e , "noactive" )}>
                                    If you are a student / passout from that college then you can write a review and can rate the college out of 5.
                                </div>
                            </div>
                            
                            <div class="question-answer__accordion">
                                <div class="question" ref={activeTab} onClick={(e) => switchTabs(e , "active")}>
                                    <h3 class="title__question">
                                        Do you provide additional support?
                                    </h3>
                                    <VscChevronDown />
                                </div>
                                <div class="answer "  onClick={(e) => switchTabs(e , "noactive" )}>
                                    Chat and email support is available 24/7. Phone lines are open during normal business hours.
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default HeroSection
