import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import locationIcon from '@iconify/icons-mdi/fire'

import '../styles/FireMarker.css';

const FireMarker = ({lat, lng, fire_id, title, url, zoomIn, date}) => {


    // let timer = 0;
    // let delay = 200;
    // let prevent = false;
  

    // function singleclick() {
    //   timer = setTimeout(function() {
    //     if (!prevent) {
    //       console.log('singleclick')
    //     }
    //     prevent = false;
    //   }, delay);
    // }

    // function doubleclick(){
    //   clearTimeout(timer);
    //   prevent = true;
    //   console.log('doubleclick')
    // }


    const [visibility, setVisibility] = useState(false)
    const [selected, setSelected] = useState(false); //keeps track if marker is selected

    function handleClick() {
        // zoomIn();

        if(visibility && !selected){
            setSelected(true);
        }
        else {
            setVisibility(!visibility);
            setSelected(!selected)
        }

        console.log("handleclick");
    };

    function handleMouseEnter() {
        setVisibility(true);
        console.log("handle mouse enter");
    };

    function handleMouseLeave() {
        if(!selected){ //if marker not selected, make it invisible when mouse leaves
            setVisibility(false);
        }
        
        console.log("handle mouse leave");
    };

    return(
        <div className="fire-marker">
            <Icon icon={locationIcon} 
                className = {"fire-marker-icon" + (selected ? ' selected' : '')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                // onClick={singleclick} 
                // onDoubleClick = {doubleclick}
                >
                </Icon>
            {/* <div className="circle"></div> */}
            <div className={"description-box" + (visibility ? ' visible' : ' invisible')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="description-inner-box">
                    <p className="description description-title">{title}</p>
                    <p className="description">{'DATE: ' + date}</p>
                    <p className="description">{'COORD: (' + lat + ' , ' + lng + ')'}</p>
                    <p className="description">{"ID: " + fire_id}</p>
                </div>
                    <a href={url} target="_blank" className="more-info">{'MORE INFO'}</a>

            </div>
           
        </div>
    )
}

export default FireMarker;