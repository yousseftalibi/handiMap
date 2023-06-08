import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Home from "../components/Home/home"
import Chat from "../components/chat/chat";
import profil from "../components/Profil/profil"
import Events from "../components/Events/Events";
import LocateMe from "../components/ParkingLots/ParkingLots";
import FollowingPost from "../components/Home/FollowingPost";

const Routes = () => {
  return (

    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/profil" exact component={profil} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/parkings" exact component={LocateMe} />
        <Route path="/events" exact component={Events} />
        <Route path="/followingPost" exact component={FollowingPost} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>

  );
};

export default Routes;