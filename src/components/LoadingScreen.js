import { useEffect, useRef, useState } from "react";

import lottie from 'lottie-web'

import {useLottie} from 'lottie-react'
import Lottie from 'lottie-react'


import earthAnimation from '../lottie_earth_animation.json';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({isLoading}) => { //need {} or else it is passed as an object, not a boolean

    const [visible, setVisibility] = useState(isLoading);
    useEffect( ()=> {
        setVisibility(isLoading);
    },[isLoading]);

    console.log(isLoading);

    return (
        <div className={"loading-screen" + (isLoading? ' visible' : ' invisible')}>

{/* className = {"fire-marker-icon" + (selected ? ' selected' : '')} */}
            <Lottie className={"loading-animation"+ (isLoading? ' visible' : ' invisible')}
                animationData={earthAnimation}
                loop= {true}
                autoplay={true}/>
            <p className="loading-text">Initializing...</p>
        </div>
  );

}

export default LoadingScreen;


  // const container = useRef(null);

    // useEffect(() => {
    //     Lottie.loadAnimation({
    //         container: container.current,
    //         renderer: 'svg',
    //         loop: true,
    //         autoplay: true,
    //         animationData: require(earthAnimation)
    //     })
    // }, []);



    // return(<h1>Loading...</h1>)

    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: earthAnimation,
    //     rendererSettings: {
    //     //   preserveAspectRatio: "xMidYMid slice",
    //       height: 30,
    //       background: black
    //     }
    //   };
    
    // const { View } = useLottie(defaultOptions);

    // return View;

    // return (
    //   <div>
    //     <Lottie 
    //       options={defaultOptions}
    //       height={400}
    //       width={400}
    //     />
    //   </div>
    // );