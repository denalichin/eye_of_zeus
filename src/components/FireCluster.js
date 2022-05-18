import { Icon } from "@iconify/react";
import locationIcon from '@iconify/icons-mdi/fire'

import '../styles/FireCluster.css';

const FireCluster = ({lat, lng, markerCount, onClick}) => {
    return(
        <div className="circle" onClick={onClick}>
            {/* <Icon icon={locationIcon} className = "fire-cluster-icon"></Icon> */}
                 {/* <div className="circle"></div> */}
            <p className="fire-cluster-text">{markerCount}</p>
            
       
        </div>
    )
}

export default FireCluster;