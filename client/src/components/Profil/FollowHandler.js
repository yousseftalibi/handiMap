import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { isEmpty } from "../../Shared/utils";

import { followUser, unfollowUser } from "../../actions/user.actions";




const FollowHandler = ({ idToFollow, type}) => {




    const userData = useSelector((state) => state.userReducer);

    const [isFollowed, setIsFollowed] = useState(false);

    const dispatch = useDispatch();




    const handleFollow = () => {




        dispatch(followUser(userData._id, idToFollow));

        setIsFollowed(true);

    };




    const handleUnFollow = () => {

        dispatch(unfollowUser(userData._id, idToFollow));

        setIsFollowed(false);

    };




    useEffect(() =>{




        if(!isEmpty(userData.following)){

            if(userData.following.includes(idToFollow)){

                setIsFollowed(true);

            } else setIsFollowed(false);

        }




    }, [userData, idToFollow])




  return(

    <>

        {isFollowed && !isEmpty(userData) && (

            <span onClick={handleUnFollow}>

            {type==="suggestion" && <button className="unfollow-btn">Followed</button>}

          </span>

        )}

        {isFollowed ===false && !isEmpty(userData) &&(

            <span onClick={handleFollow}>

            {type==="suggestion" &&<button className="follow-btn">Follow</button>}

          </span>

        )}

      

    </>

  );

};




export default FollowHandler ;

