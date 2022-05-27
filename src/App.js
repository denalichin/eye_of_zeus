import logo from './logo.svg';
import {useState, useEffect} from 'react';
import './App.css';

import MapComponent from './components/MapComponent';

import { NASA_EONET } from "./keys.js"
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch(NASA_EONET);
      const { events } = await res.json();
      setEventData(events);

      setLoading(false);
    }

    fetchEvents();

    console.log(eventData);
  },[])

  return (
   <div className="background">
     <div className="Menu">Testing</div>
     {/* <LoadingScreen className="loading-screen"/> */}
     {!loading ? <MapComponent eventData={eventData}/> : <LoadingScreen/> /*shorthand if else statement*/}
     {/* <ReactMap/> */}
   </div>
  );
}

export default App;
