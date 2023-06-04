import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./Events.css";
import { useSelector } from "react-redux";


const Events = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markerPosition, setMarkerPosition] = useState(null); 
  const [actionMark, setActionMark] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventsData, setEventsData] = useState([]); 
  const userData = useSelector((state) => state.userReducer); 
  const [selectedEvent, setSelectedEvent] = useState(null);

  const containerStyle = {
    width: "60vw",
    height: "60vh",
  };

  const createEvent = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    let location = markerPosition ? [markerPosition.lat, markerPosition.lng] : [longitude, latitude];
    const eventData = { title, description, date, location, user: userData._id }; 
    axios
      .post("http://localhost:5000/api/events", eventData)
      .then((res) => {
        console.log(res.data);
        setModalOpen(false);
        setEventsData([...eventsData, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleMarkerClick = (event) => {
    setActionMark(event.domEvent.currentTarget);
  };

  const openEventModal = () => {
    setActionMark(null);
    setModalOpen(true);
  };

  const handleMapClick = (event) => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      window.alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }

    function error() {
      window.alert("Unable to retrieve your location");
    }

    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        setEventsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD_mTJq6vddk8brD_c7PCShWDj0NWDrrcg",
  });

  const location = { lat: latitude, lng: longitude };

  return (
    <>
      <header className="googleMap">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={13}
            center={location}
            onClick={handleMapClick} 
          >
            {markerPosition && ( 
              <Marker
                key={1} 
                position={markerPosition}
                onClick={handleMarkerClick}
                icon="https://cdn.iconscout.com/icon/premium/png-256-thumb/pin-8243259-6574491.png?f=webp&w=56" 
              />
            )}
            {eventsData.map((event) => (
              <Marker
                key={event._id}
                position={{ lat: event.location[0], lng: event.location[1] }}
                icon="https://cdn.iconscout.com/icon/premium/png-256-thumb/pin-8253543-6589762.png?f=webp&w=56"
                onClick={() => setSelectedEvent(event)}  
            />
            
            ))}

            {selectedEvent && ( 
              <InfoWindow
                position={{ lat: selectedEvent.location[0], lng: selectedEvent.location[1] }}
                onCloseClick={() => setSelectedEvent(null)}
              >
                <div>
                  <h2>{selectedEvent.title}</h2>
                  <p>{selectedEvent.description}</p>
                  <p>{selectedEvent.date}</p>
                </div>
              </InfoWindow>
            )}

          </GoogleMap>
          
        )}
      </header>
      <Menu
        anchorEl={actionMark}
        open={Boolean(actionMark)}
        onClose={() => setActionMark(null)}
      >
        <MenuItem id="menuItem" onClick={openEventModal}>
          Create Event
        </MenuItem>
       
      </Menu>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box id="box">
          <TextField id="title" fullWidth label="Title" />
          <TextField id="description" fullWidth label="Description" />
          <TextField id="date" fullWidth type="datetime-local" />
          <Button fullWidth color="primary" onClick={createEvent}>
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Events;