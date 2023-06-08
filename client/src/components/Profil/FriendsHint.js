import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../Shared/utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [playOne, setPlayOne] = useState(true);

    const [friendsHint, setFriendsHint] = useState([]);

    const userData = useSelector((state) => state.userReducer);

    const usersData = useSelector((state) => state.usersReducer);






    useEffect(() => {




        const notFriendList = () => {

            let array = [];

            usersData.map((user) => {

                if(user._id !== userData._id && !user.followers.includes(userData._id))

                    return array.push(user._id);

            });

            array.sort(()=>0.5 - Math.random());

            if(window.innerHeight > 780) {

                array.length = 10;

            } else if(window.innerHeight > 720){

                array.length = 8;

            } else if(window.innerHeight > 615){

                array.length = 6;

            } else if(window.innerHeight > 540){

                array.length = 4;

            } else {

                array.length = 0;

            }

            setFriendsHint(array);

        }




        if(playOne && !isEmpty(usersData[0]) && !isEmpty(userData._id)){

            notFriendList();

            setIsLoading(false);

            setPlayOne(false);

        }

    }, [usersData, userData, playOne])




  return(

    <div className="get-friends-container">

      <h4>People you can follow</h4>

      {isLoading ? (

        <div className="icon">

            <i className="fas fa-sprinner fa-pulse"></i>

        </div>

      ): (

        <ul>

           {friendsHint && friendsHint.map((user) => {

                for(let i=0; i< usersData.length; i++){

                    if(user=== usersData[i]._id) {

                        return(

                            <li className="user-hint" key={user}>

                                <img src={usersData[i].picture} alt="user-pic" />

                                <p>{usersData[i].pseudo}</p>

                                <FollowHandler idToFollow={usersData[i]._id} type=

                                {"suggestion"} />

                            </li>

                        )

                    }

                }

           })}

        </ul>

      ) }

    </div>

  );

};




export default FriendsHint;