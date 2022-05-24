import { Icon } from "@iconify/react";
import locationIcon from '@iconify/icons-mdi/fire'

import '../styles/FireCluster.css';

const FireCluster = ({lat, lng, clusterSize, totalCount, onClick}) => { //totalCount = total number of markers generated on map
    return(
        <div 
            // className="circle" 
            // style={{
            //     width: `${1 + (clusterSize/totalCount) * 20}rem`,
            //     height: `${1 + (clusterSize/totalCount) * 20}rem`
            // }}
            onClick={onClick}
            >
            <Icon icon={locationIcon} className = "fire-cluster-icon"
                style={{
                    fontSize: `${1 + (clusterSize/totalCount) * 30}rem`
                    }}
            ></Icon>

                 {/* <div className="circle"></div> */}
            <p className="fire-cluster-text">{clusterSize}</p>
            
       
        </div>
    )
}

export default FireCluster;