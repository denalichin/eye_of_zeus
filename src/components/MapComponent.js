import {useState, useMemo, useCallback, useRef} from "react";
import GoogleMapReact from 'google-map-react'; //https://github.com/google-map-react/google-map-react
import useSupercluster from "use-supercluster"; //https://github.com/leighhalliday/use-supercluster

import '../styles/FireMarker.css';
import { GOOGLE_MAPS_API_KEY, MAP_ID } from "../keys";
import FireMarker from "./FireMarker";
import FireCluster from "./FireCluster";
import InfoBox from "./InfoBox";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapComponent({eventData}){

  const [locationInfo, setLocationInfo] = useState(null);
  const mapRef = useRef(); //creating a reference to the map
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);

  const defaultProps = { //starting default values for the map
    center: {
      lat: 34.0344088,
      lng: -117.7805787,
    },
    defaultZoom: 0
  };

  const mapOptions = useMemo(() => ({
    mapId: MAP_ID, //refers to the stylized map that is customized in Google Maps Platform
    clickableIcons: false,
    streetViewControl: false,
    backgroundColor: "black",
  }), []);

  //setting up array of markers from data fetched in App.js
  // const markers = eventData.map(event => { //each event in array of events
  //   if(event.categories[0].id === 8) { //category 8 is fire in NASA EONET
  //     return  <FireMarker 
  //       key={event.id}
  //       className="fire-marker-wrapper" 
  //       lat={event.geometries[0].coordinates[1]} 
  //       lng={event.geometries[0].coordinates[0]}
  //       onClick={
  //         () => {console.log("testing " + event.id + " " + event.title)}
  //         // ()=> setLocationInfo({ id: event.id, title: event.title })
  //       }
  //       />
  //   }
  //   return null
  // })

  const points = eventData.flatMap(event => { //flatmap allows removing unwanted events (non fire), while if we used map we're forced to return null entries
    // console.log(event.categories[0].id)
    if(event.categories[0].id === "wildfires"){

      return ([{  //each event in array of events
        type: "Feature",
        properties: {
          cluster: false,
          fire_id: event.id,
          title: event.title,
          url: event.sources[0].url
          //you can add any fields you want in properties
        },
        geometry: { //data that allows supercluster to place points on the map
          type: "Point",
          coordinates: [
            event.geometry[0].coordinates[0], //longitude
            event.geometry[0].coordinates[1] //latitude
          ]
        }
      }])
    } else {
      return [];
    }
  }
  );



  // console.log('points: ');
  // console.log(points);

  const { clusters, supercluster } = useSupercluster({ //supercluster returns the two variables in the {}
    points, //points Array of your markers. must be called points
    bounds,
    zoom,
    options: {radius: 75, maxZoom: 20}
  })

  // console.log(clusters);


  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        mapId = {MAP_ID}
        options = {mapOptions}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.defaultZoom}
        yesIWantToUseGoogleMapApiInternals //grants us access to google maps api internals
        onGoogleApiLoaded={({map}) => { //object from which we can extract google map instance
          mapRef.current = map; //setting our map reference to our instance of the google map
        }}
        onChange={({zoom, bounds}) => {
          setZoom(zoom); //retreiving the zoom from map instance
          setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]); //retrieving current boundaries from map
        }}
      >

        {clusters.map(cl => {
          const [longitude, latitude] = cl.geometry.coordinates;
          //below extracts the values from cl.properties. [nameinproperties] : [name of our new variable]
          const {cluster: isCluster, point_count: pointCount} = cl.properties; //setting some variables for rest of function below

          if(isCluster){
            return <FireCluster 
              key={cl.id}
              className="fire-cluster-wrapper" 
              clusterSize={pointCount}
              totalCount={points.length}
              lng={longitude}
              lat={latitude}
              zoomIn={() => {
                const expansionZoom = Math.min( supercluster.getClusterExpansionZoom(cl.id), 20); //larger number is more zoomed in, 20 is max

                mapRef.current.setZoom(expansionZoom); //zoom in
                mapRef.current.panTo({lat: latitude, lng: longitude}); //set x y coordinates to center on the cluster
                console.log("testing CLUSTER " + cl.id);
              }}/>
          } 
          else{ //if its not a cluster, it's a cluster of just one fire, so it has the properties of the fire in it
            return <FireMarker 
              key={cl.properties.fire_id}
              className="fire-marker-wrapper" 
              lng={cl.geometry.coordinates[0]}
              lat={cl.geometry.coordinates[1]} 
              title={cl.properties.title}
              fire_id={cl.properties.fire_id}
              url={cl.properties.url}
              zoomIn={() => {
                // const expansionZoom = Math.min( supercluster.getClusterExpansionZoom(cl.id), 20); //larger number is more zoomed in, 20 is max

                mapRef.current.setZoom(Math.max(zoom, 8)); //zoom in
                mapRef.current.panTo({lat: latitude, lng: longitude}); //set x y coordinates to center on the cluster
                console.log(zoom);
                // console.log("testing CLUSTER " + cl.id);
              }}/>
                // ()=> setLocationInfo({ id: event.id, title: event.title })
          }

        })}

        {/* list of markers to be rendered */}
        {/* {markers}  */}

        {/* {points.map(fire => {
          return <FireMarker 
            key={fire.properties.fire_id}
            className="fire-marker-wrapper" 
            lng={fire.geometry.coordinates[0]}
            lat={fire.geometry.coordinates[1]} 
            
            onClick={
              () => {console.log("testing " + fire.properties.fire_id + " " + fire.properties.title)}
              // ()=> setLocationInfo({ id: event.id, title: event.title })
            }
          />
        })} */}

        {/* <FireMarker className="fire-marker-wrapper" lat={34.0344088} lng={-117.7805787}/> */}
      </GoogleMapReact>
    </div>
  );
}