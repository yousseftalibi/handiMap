import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ParkingSpotInfo from './ParkingSpotInfo';
import { Carousel } from 'react-responsive-carousel';
import './GoogleMapsApi.css';
import LeftNav from "../../Shared/leftNav";

const containerStyle = {
    width: '60vw',
    height: '60vh'
};


const MapComponent = (props) => {

    const coordinatesToObject = (coordinates) => {
        return {
          lat: coordinates[1],
          lng: coordinates[0],
        };
      };
      
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDch5OcDgWH-sKCF5rDQq3yYJy8O0eyRuE'
    })
    const location = {
        lat: props.latitude,
        lng: props.longitude
    };


    const parkingSpots = props.parkingLots;
 
    return isLoaded ? (
        <>
        <LeftNav />

      <div class="googleMap">
        
              <GoogleMap
                  mapContainerStyle={containerStyle}
                  zoom={13}
                  center={location}
              >
              {parkingSpots && parkingSpots.records && parkingSpots.records.map((record, index) => (
          <Marker
            key={index}
            position={coordinatesToObject(record.geometry.coordinates)}
          />
        ))}
              </GoogleMap>

         </div>

    <div class="carousel">
          <Carousel
            showArrows
            swipeable
            useKeyboardArrows
            emulateTouch
          >
            {parkingSpots &&
              parkingSpots.records &&
              parkingSpots.records.map((record, index) => (
                <ParkingSpotInfo key={index} parkingSpot={record.fields} />
              ))}
          </Carousel>
    </div>
  </>
) : (
  <></>
);
}

export default MapComponent;  