import React, { useContext } from "react";
import Login from '../Authentification/Login';
import {UidContext} from "../../Shared/AppContext";
import UpdateProfil from "./UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);
  return(
    <div className="profil-page">
      {uid? (
        <UpdateProfil />
      ): (
      <div className="log-container">
       <Login signin={false} signup={true} />
        <div className="img-container">
          <img src="./img/log.svg" alt = "img-log"/>
        </div>
      </div>
      )}
    </div>
  );
};

export default Profil;