import { Icon } from "@iconify/react";
import locationIcon from '@iconify/icons-mdi/fire'

import '../styles/FireMarker.css';

const FireMarker = ({lat, lng, onClick}) => {
    return(
        <div className="fire-marker" onClick={onClick}>
            <Icon icon={locationIcon} className = "fire-icon"></Icon>
            {/* <div className="circle"></div> */}
        </div>
    )
}

export default FireMarker;