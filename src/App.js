import logo from './logo.svg';
import {useState, useEffect} from 'react';
import './App.css';

import MapComponent from './components/MapComponent';
import Menu from './components/Menu';

import { NASA_EONET } from "./keys.js"
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clustering, setClustering] = useState(true);

  useEffect(() => {

    
    const fetchEvents = () => {
      setLoading(true);
      const res = fetch(NASA_EONET)
        .then(res => {
          if(res.ok){
            console.log('success' + res);
            return res.json();
          } else {
            console.log('not successful');
          }
        })
        .then(data => {
          // console.log(data);
          const { events } = data;
          console.log(events);
          setEventData(events);
          setLoading(false);
        })
        .catch(error => console.log('ERROR FOUND: ' + error));
    }

    //https://gomakethings.com/how-to-use-async-and-await-with-vanilla-javascript/
    // const fetchEvents = async () => {
    //   console.log('setLoading true')
    //   setLoading(true);

    //   console.log('await fetch NASA_EONET');
    //   const res = await fetch(NASA_EONET); //waits for fetch to complete before moving on
      
    //   console.log('await res.json');
    //   const { events } = await res.json(); //waits for data to finish
    //   setEventData(events);

    //   setLoading(false);
    //   console.log('setloading false');
    // }

    fetchEvents()
    // console.log("blah");
    console.log(eventData);
  },[])

  // function toggleClustering() {
  //   setClustering(!clustering);
  //   console.log(clustering);
  //   // console.log("hasdfasdf");
  // }

  return (
   <div className="background">
     {/* <div className="Menu">Testing</div> */}
     {/* <LoadingScreen className="loading-screen"/> */}
     {/* {loading ? <LoadingScreen/> : null}  */}
     {/* <button onClick={toggleClustering}>asdf</button> */}
     <LoadingScreen isLoading={loading} /> 

     <Menu />
     {/* {!loading ? <MapComponent eventData={eventData}/> : <LoadingScreen/>} */}
     <MapComponent eventData={eventData}/>
     {/* <ReactMap/> */}
   </div>
  );
}

export default App;
