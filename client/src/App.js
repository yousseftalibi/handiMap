import React, { useEffect, useState } from "react";
import Routes from "./Routes/routes";
import { UidContext } from "./Shared/AppContext";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await Axios.get(`${process.env.REACT_APP_API_URL}jwtid`, {
          withCredentials: true,
        });
        setUid(response.data);
      } catch (err) {
        console.log("No.token");
      }
    };
    fetchToken();

    if(uid) dispatch(getUser(uid));
  }, [uid]);

  return(
    <UidContext.Provider value={uid}>
        <Routes />
    </UidContext.Provider>
  );
};

export default App;