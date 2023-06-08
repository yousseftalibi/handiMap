import React, { useContext } from "react";

import LeftNav from "../../Shared/leftNav";
import Thread from "../../Shared/Thread";
import { UidContext } from "../../Shared/AppContext";
import NewPostForm from "../Post/NewPostForm";
import Log from "../Authentification/Login"
import FriendsHint from "../Profil/FriendsHint";
import FollowingThread from "../../Shared/FollowingThread";

const FollowingPost = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">

      <LeftNav />

      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>

        <FollowingThread />

      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">

            {uid && <FriendsHint />}

          </div>
        </div>
      </div>
    </div>

  );
};

export default FollowingPost;