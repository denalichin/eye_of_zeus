import { useState, useRef } from "react";
import "../styles/Switch.css";


const Switch = ({onChange, isChecked}) => {



    return (
        <div class="switch">
            {/* <label class="switch"> */}
                <input type="checkbox" onChange={onChange} defaultChecked={isChecked}/>
                {/* <input id="cluster-toggle" type="checkbox" onChange={on} defaultChecked={isChecked}/> */}
                <span class="slider round"></span>
            {/* </label> */}
        </div>

    );

}

export default Switch;