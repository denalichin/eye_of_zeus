import { useState, useRef } from "react";

import '../styles/Menu.css';

const Menu = ({tClustering, clusteringEnabled}) => {


    function handleCheckbox() {
        // console.log('handle checkbox');
        tClustering();
    }

    return (
        <div className="menu">
            <div className="menu-header">
                <h1 className="menu-title">Options</h1>
                <div className="menu-toggle">x</div>
            </div>
            <div className="menu-body">
                <div className="menu-row">
                    <input type="checkbox" onChange={handleCheckbox} defaultChecked={clusteringEnabled}/>
                    <p>Enable Clustering</p>
                </div>
                <p>Date slider</p>
                
            </div>
            <div className="menu-footer">
                <p>powered by NASA EONET and Google MAPS API</p>
            </div>
        </div>
    )
}

export default Menu;