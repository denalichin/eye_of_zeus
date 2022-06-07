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
  const [clusteringEnabled, setClustering] = useState(true);
  const defaultStartDate = new Date(2018, 0, 1)
  const [startDate, setStartDate] = useState(defaultStartDate); //months are 0 index, days start with 1
  const [endDate, setEndDate] = useState(new Date());


  useEffect(() => {

    console.log(startDate.toLocaleDateString());
    console.log(endDate);

    const fetchEvents = () => {
      setLoading(true);
      const res = fetch(NASA_EONET)
        .then(res => {
          if(res.ok){
            console.log("res.ok")
            console.log(res);
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

  function toggleClustering() {
    //console.log will show previous state since setclustering is
    // console.log("before set to: " + clusteringEnabled);
    setClustering(clusteringEnabled => !clusteringEnabled);
  }

  function clusterStatus(){ //test function
    console.log(clusteringEnabled);
  }

  return (
   <div className="background">
     {/* <div className="Menu">Testing</div> */}
     {/* <LoadingScreen className="loading-screen"/> */}
     {/* {loading ? <LoadingScreen/> : null}  */}
     <LoadingScreen isLoading={loading} /> 

     <Menu 
      tClustering={toggleClustering} 
      clusteringEnabled={clusteringEnabled}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      defaultStartDate={defaultStartDate}
      startDate={startDate}
      endDate={endDate}/>

     {/* {!loading ? <MapComponent eventData={eventData}/> : <LoadingScreen/>} */}
     <MapComponent 
      eventData={eventData} 
      clusteringEnabled={clusteringEnabled}
      startDate={startDate}
      endDate={endDate}/>
     {/* <ReactMap/> */}
   </div>
  );
}

export default App;
