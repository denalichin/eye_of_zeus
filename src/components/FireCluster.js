import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import locationIcon from '@iconify/icons-mdi/fire'

import '../styles/FireCluster.css';

const FireCluster = ({lat, lng, clusterSize, totalCount, zoomIn}) => { //totalCount = total number of markers generated on map
    
    const [visibility, setVisibility] = useState(false)
    const maxIconSize = 12;
    const minIconSize = 11;

    function handleClick() {
        zoomIn();

        // if(visibility && !selected.current){
        //     selected.current = true;
        // }
        // else {
        //     setVisibility(!visibility);
        //     selected.current = !selected.current;
        // }

        console.log("handleclick");
    };

    function handleMouseEnter() {
        setVisibility(true);
        console.log("handle mouse enter");
    };

    function handleMouseLeave() {
        // if(!selected.current){ //if marker not selected, make it invisible when mouse leaves
            setVisibility(false);
        // }
        
        console.log("handle mouse leave");
    };

    
    return(
        <div 
            // className="circle" 
            // style={{
            //     width: `${1 + (clusterSize/totalCount) * 20}rem`,
            //     height: `${1 + (clusterSize/totalCount) * 20}rem`
            // }}
            onClick={zoomIn}
            >
            <div className="border-circle">
                <Icon icon={locationIcon} 
                    className = "fire-cluster-icon"
                    style={{
                        // fontSize: `${1 + (clusterSize/totalCount) * 20}rem`
                        fontSize: `${maxIconSize - (minIconSize * (1-(clusterSize/totalCount)))}rem`
                        }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                ></Icon>
            </div>

                 {/* <div className="circle"></div> */}
            {/* <p className="fire-cluster-text">{clusterSize}</p> */}

            <div className={"description-box" + (visibility ? ' visible' : ' invisible')}>
                <p className="description description-title">{'FIRE CLUSTER'}</p>
                <p className="description">{'FIRE COUNT: ' + clusterSize}</p>

            </div>
            
       
        </div>
    )
}

export default FireCluster;