import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { isEmpty } from "../../Shared/utils";

import FollowHandler from "./FollowHandler";
import Events from "../Events/Events";

const Others = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [playOne, setPlayOne] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    useEffect(() => {
        if(playOne && !isEmpty(usersData[0]) && !isEmpty(userData._id)){
            setIsLoading(false);
        }
    }, [usersData, userData, playOne])

  return(

    <div className="get-friends-container">
      {isLoading ? (
        <div className="icon">
            <i className="fas fa-sprinner fa-pulse"></i>
        </div>
      ): (
        <ul>
            <li className="user-hint">
                Others
            </li>

            <li className="user-hint">

            <Link to="/followingPost">
                <button>Following Posts</button>
            </Link>

            </li>
            <li className="user-hint">

            <Link to="/events">
                <button>Event</button>
            </Link>

            </li>
        </ul>
      ) }
    </div>
  );
};

export default Others;
