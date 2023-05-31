import React, { useState, useEffect } from 'react';
import MapComponent from './GoogleMapsApi';
const LocateMe = () => {
  
  const [parkingLotsPoints, setParkingLotsPoints] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {

    let getParkingLotsPoints = async() => {
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/parkingLots`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }) 

      setParkingLotsPoints(await response.json());
  }

  getParkingLotsPoints();

  if (!navigator.geolocation) {
    window.alert('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  function error() {
    window.alert('Unable to retrieve your location');
  }
  }, []);


  return (
    <div>
      <header >
      <MapComponent
          latitude={latitude}
          longitude={longitude}
          parkingLots={parkingLotsPoints}
        />
      </header>
    </div>
  );
};

export default LocateMe;
