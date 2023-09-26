import React, { Fragment, useState } from 'react';
import './Search.css';
import { AiFillEnvironment } from "react-icons/ai";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    return (
        <Fragment>
            <form className='searchBox'>
                <AiFillEnvironment />
                <input
                    type="text"
                    placeholder="Search for a college..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search"  />
            </form>
        </Fragment>
    )
}

export default Search
