import { Icon } from "@iconify/react";
import locationIcon from '@iconify/icons-mdi/fire'

import '../styles/FireMarker.css';

const FireMarker = ({lat, lng, fire_id, title, url, onClick}) => {
    return(
        <div className="fire-marker">
            <Icon icon={locationIcon} className = "fire-marker-icon" onClick={onClick}></Icon>
            {/* <div className="circle"></div> */}
            <div className="description-box">
                <p className="description description-title">{title}</p>
                <p className="description">{"ID: " + fire_id}</p>
                <p className="description">{"URL: " + url}</p>
                
            </div>
           
        </div>
    )
}

export default FireMarker;