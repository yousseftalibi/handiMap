import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Events.css';

const Events = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [actionMark, setActionMark] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const containerStyle = {
    width: '60vw',
    height: '60vh'
};

  const handleMarkerClick = (event) => {
    setActionMark(event.domEvent.currentTarget);
  };

  const openEventModal = () => {
    setActionMark(null);
    setModalOpen(true);
  };


  useEffect(() => {
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
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDch5OcDgWH-sKCF5rDQq3yYJy8O0eyRuE"
})
  const location = {
    lat: latitude,
    lng: longitude
  };
  return (
    <>
      
      <header className="googleMap">
            
            {isLoaded && (
                  <GoogleMap
                      mapContainerStyle={containerStyle}
                      zoom={13}
                      center={location}
                  > 
                  <Marker
                key={1}
                position={location}
                onClick={handleMarkerClick} 
              />
                  </GoogleMap>
          )
          }
              
      </header>
     
      <Menu
        anchorEl={actionMark}
        open={Boolean(actionMark)}
        onClose={() => setActionMark(null)}
    >
        <MenuItem id="menuItem" onClick={openEventModal}>Create Event</MenuItem>
        <MenuItem id="menuItem" onClick={openEventModal}>Share</MenuItem>

    </Menu>


      <Modal open={modalOpen} onClose={ () => setModalOpen(false)}>
        <Box id="box" >
          <TextField  fullWidth label="Title" />
          <TextField  fullWidth label="Description"  />
          <TextField  fullWidth type="datetime-local" />
          <Button fullWidth  color="primary"> Create </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Events;
