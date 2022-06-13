import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import locationIcon from '@iconify/icons-mdi/fire'

import '../styles/FireCluster.css';

const FireCluster = ({lat, lng, clusterSize, totalCount, zoomIn, children, mapRef, expansionZoom}) => { //totalCount = total number of markers generated on map
    
    const [visibility, setVisibility] = useState(false)
    const maxIconSize = 12;
    const minIconSize = 11;

    function handleClick() {
        mapRef.current.setZoom(expansionZoom) //zoom in for the cluster
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
        console.log(children);
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
            
            >
            <div className="border-circle">
                <Icon icon={locationIcon} 
                    className = "fire-cluster-icon"
                    style={{
                        fontSize: `${1 + (clusterSize/totalCount) * 20}rem`
                        // fontSize: `${maxIconSize - (minIconSize * (1-(clusterSize/totalCount)))}rem`
                        }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={zoomIn}
                    // onClick={handleClick}
                ></Icon>
            </div>

                 {/* <div className="circle"></div> */}
            {/* <p className="fire-cluster-text">{clusterSize}</p> */}

            <div className={"cluster-description-box" + (visibility ? ' visible' : ' invisible')}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
                <p className="cluster-description-title">{'FIRE CLUSTER'}</p>
                <p className="description">{'FIRE COUNT: ' + clusterSize}</p>
                <div class="fire-list">
                    {/* {children[0].properties.fire_id} */}
                    {/* {children.map((c) => {<li key={c.properties.fire_id}>asdf</li>})} */}
                    {children.map((fire) =>
                        <p className="fire-list-row"
                            onClick={()=>{
                                console.log("yoohoooo");
                                const [longitude, latitude] = fire.geometry.coordinates;
                                mapRef.current.panTo({lat: latitude, lng: longitude});
                                mapRef.current.setZoom(10);
                            }}
                            key={fire.properties.fire_id}>{fire.properties.title}</p>
                        // <p key={item.something_unique}>{item}</p>
                    )
                    }
                </div>
            </div>
            
       
        </div>
    )
}

export default FireCluster;