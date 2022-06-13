import { useState, useRef } from "react";
import "../styles/Switch.css";


const Switch = ({onChange, isChecked}) => {



    return (
        <div className="switch">
            {/* <label class="switch"> */}
                <input type="checkbox" onChange={onChange} defaultChecked={isChecked}/>
                {/* <input id="cluster-toggle" type="checkbox" onChange={on} defaultChecked={isChecked}/> */}
                <span className="slider round"></span>
            {/* </label> */}
        </div>

    );

}

export default Switch;