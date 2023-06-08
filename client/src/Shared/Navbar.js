import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "../components/Authentification/Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state)=> state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div>
                    <NavLink exact to="/">
                        <div>
                            <img src="./img/handimap.png" alt="icon" style={{height: "40px", width: "auto", marginLeft: "10px", marginTop: "10px"}}/>
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>Welcome {userData.pseudo}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/profil">
                            <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>

    );
};

export default Navbar;