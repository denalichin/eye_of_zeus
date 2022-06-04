import { useState, useRef } from "react";

import '../styles/Menu.css';

const Menu = ({tClustering, clusteringEnabled, setStartDate, setEndDate, startDate, endDate}) => {


    function handleCheckbox() {
        // console.log('handle checkbox');
        tClustering();
    }

    function dateToString(date){
        const year =  date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;


        return year + "-" + month + "-" + day;
    }

    //handles if we pick a later date than the enddate with start date
    function handleStartDate(input){
        //date comes in as a string
        const date = new Date(input)
        const correctDate = new Date( date.getTime() - date.getTimezoneOffset() * -60000 ); //account for timezone offset

        if(correctDate > endDate){
            setEndDate(correctDate);
        }

        setStartDate(correctDate);

    }

    function handleEndDate(input){

        console.log(input);
        const date = new Date(input)
        const correctDate = new Date( date.getTime() - date.getTimezoneOffset() * -60000 ); //account for timezone offset
        console.log(correctDate);
        if(correctDate < startDate){
            setStartDate(correctDate);
        }

        setEndDate(correctDate);
    }



    return (
        <div className="menu">
            <div className="menu-header">
                <h1 className="menu-title">Options</h1>
                <div className="menu-toggle">x</div>
            </div>
            <div className="menu-body">
                <div className="menu-row cluster-section">
                    <input id="cluster-toggle" type="checkbox" onChange={handleCheckbox} defaultChecked={clusteringEnabled}/>
                    <label htmlFor="cluster-toggle">Enable Clustering</label>
                </div>
                <div className="menu-row date-section">
                    <div className="date-div">
                        <p>Start Date:</p>
                        <input 
                            className="date-picker"
                            onChange={e => handleStartDate(e.target.value)}
                            type="date" 
                            id="start" 
                            name="start-date" 
                            value={dateToString(startDate)} 
                            min="2018-01-01" 
                            max={dateToString(new Date())}></input>
                    </div>
                    <div className="date-div">
                        <p>End Date:</p>
                        <input
                            className="date-picker"
                            onChange={e => handleEndDate(e.target.value)}
                            type="date" 
                            id="start" 
                            name="end-date" 
                            value={dateToString(endDate)} 
                            min={"2018-01-01" } 
                            max={dateToString(new Date())}></input>
                    </div>
                    

                </div>
                    
                
            </div>
            <div className="menu-footer">
                <p>powered by NASA EONET and Google MAPS API</p>
            </div>
        </div>
    )
}

export default Menu;