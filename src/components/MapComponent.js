import {useState, useMemo, useCallback, useRef} from "react";
import GoogleMapReact from 'google-map-react';
//https://github.com/google-map-react/google-map-react

import { GOOGLE_MAPS_API_KEY, MAP_ID } from "../keys";
import '../styles/FireMarker.css';
import FireMarker from "./FireMarker";
import InfoBox from "./InfoBox";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapComponent({eventData}){

  const [locationInfo, setLocationInfo] = useState(null);
  
  const markers = eventData.map(event => { //each event in array of events
    if(event.categories[0].id === 8) { //category 8 is fire in NASA EONET
      return  <FireMarker 
        key={event.id}
        className="fire-marker-wrapper" 
        lat={event.geometries[0].coordinates[1]} 
        lng={event.geometries[0].coordinates[0]}
        onClick={
          () => {console.log("testing " + event.id + " " + event.title)}
          // ()=> setLocationInfo({ id: event.id, title: event.title })
        }
        />
    }
    return null
  })

  const defaultProps = { //starting default values for the map
    center: {
      lat: 34.0344088,
      lng: -117.7805787,
    },
    zoom: 10
  };

  const mapOptions = useMemo(() => ({
    mapId: MAP_ID, //refers to the stylized map that is customized in Google Maps Platform
    clickableIcons: false,
    streetViewControl: false,
    backgroundColor: "black",
  }), []);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        mapId = {MAP_ID}
        options = {mapOptions}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >

        {/* list of markers to be rendered */}
        {markers} 

        {/* <FireMarker className="fire-marker-wrapper" lat={34.0344088} lng={-117.7805787}/> */}
      </GoogleMapReact>
    </div>
  );
}