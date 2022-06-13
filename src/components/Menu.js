import { useState, useRef } from "react";


import '../styles/Menu.css';

import { Icon } from "@iconify/react";
import DatePicker from 'react-datepicker';
import Hamburger from 'hamburger-react'; // https://hamburger-react.netlify.app/

import "react-datepicker/dist/react-datepicker.css";
import Switch from "./Switch";

const Menu = ({tClustering, clusteringEnabled, setStartDate, setEndDate, defaultStartDate, startDate, endDate}) => {

    const today = new Date();
    const years = Array.from(Array(5), (e,i)=>i + today.getFullYear() - 4);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [showMenu, setShowMenu] = useState(true)


    function toggleShowMenu() {
        //instead of setting to !showMenu, we take the previous value and invert it
        setShowMenu(prev => !prev, console.log('showMenu = ' + showMenu));
        console.log()
    }

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
        // const date = new Date(input)
        // const correctDate = new Date( date.getTime() - date.getTimezoneOffset() * -60000 ); //account for timezone offset

        if(input > endDate){
            setEndDate(input);
        }

        setStartDate(input);

    }

    function handleEndDate(input){
        // const date = new Date(input)
        // const correctDate = new Date( date.getTime() - date.getTimezoneOffset() * -60000 ); //account for timezone offset
        // console.log(correctDate);
        if(input < startDate){
            setStartDate(input);
        }

        setEndDate(input);
    }

    function resetStartDate(){
        setStartDate(defaultStartDate);
    }

    function resetEndDate(){
        setEndDate(today);
    }

    function customHeader( //custom header for dropdown calendar selector
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled){
            return (
                <div className={'custom-header'}>
                    {/* <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button> */}

                    <Icon icon={'akar-icons:chevron-left'}
                        className={'calendar-button'}
                        onClick={decreaseMonth} 
                        disabled={prevMonthButtonDisabled}>
                    </Icon>

                    <select
                        className={'calendar-select'}
                        value={months[date.getMonth()]}
                        onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>

                    <select
                        className={'calendar-select'}
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>

                    {/* <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button> */}
                    <Icon icon={'akar-icons:chevron-right'}
                        className={'calendar-button'}
                        onClick={increaseMonth} 
                        disabled={nextMonthButtonDisabled}>
                    </Icon>

                </div>

            )
    }



    return (
        <div className={(showMenu ? "menu" : "menu menu-closed")}>
            {/* <Icon icon={'akar-icons:chevron-up'} className="menu-toggle" onClick={toggleShowMenu}></Icon> */}
            {/* <div class={"menu-btn" + (showMenu ? " open" : "")} onClick={toggleShowMenu}> */}
            <div className="menu-toggle">
                {/* <div class="menu-btn__burger"></div> */}
                <Hamburger 
                    // class={"menu-toggle"}
                    size={24}
                    toggled={showMenu} 
                    toggle={toggleShowMenu} />
            </div>
            <div className={"menu-header" + (showMenu ? " shown" : " hidden")}>
                <h1 className="menu-title">Preferences</h1>
                
            </div>
            <div className={"menu-body" + (showMenu ? " shown" : " hidden")}>
                <div className="menu-row cluster-section">
                    
                    <label className="cluster-label">
                        <span>Enable Clustering</span>
                        <Switch
                            onChange={handleCheckbox}
                            isChecked={clusteringEnabled}
                        />
                        {/* <input id="cluster-toggle" type="checkbox" onChange={handleCheckbox} defaultChecked={clusteringEnabled}/> */}
                    </label>
                    
                    {/* <label htmlFor="cluster-toggle">Enable Clustering</label> */}
                </div>
                <div className="date-section">
                    <div className="menu-row">
                        <p className="menu-description">Start Date:</p>
                        {/* <input 
                            className="date-picker"
                            onChange={e => handleStartDate(e.target.value)}
                            type="date" 
                            id="start" 
                            name="start-date" 
                            value={dateToString(startDate)} 
                            min="2018-01-01" 
                            max={dateToString(new Date())}></input> */}
                        
                        <div className={'date-reset-wrapper'}>
                            <Icon icon={'icon-park-outline:undo'}
                                onClick={resetStartDate}
                                className={'reset-button'}>
                            </Icon>
                            <DatePicker 
                                renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => ( customHeader(date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled)
                                )}
                                selected={startDate} 
                                onChange={date => handleStartDate(date)}/>
                        </div>
                    </div>
                    <div className="menu-row">
                        <p className="menu-description">End Date:</p>
                        {/* <input
                            className="date-picker"
                            onChange={e => handleEndDate(e.target.value)}
                            type="date" 
                            id="start" 
                            name="end-date" 
                            value={dateToString(endDate)} 
                            min={"2018-01-01" } 
                            max={dateToString(new Date())}></input> */}
                        <div className="date-reset-wrapper">
                            <Icon icon={'icon-park-outline:undo'}
                                onClick={resetEndDate}
                                className={'reset-button'}>
                            </Icon>
                            <DatePicker 
                                renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => ( customHeader(date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled)
                                )}
                                selected={endDate} 
                                onChange={date => handleEndDate(date)}/>
                        </div>
                    </div>
                    

                </div>
                    
                
            </div>
            <div className={"menu-footer" + (showMenu ? " shown" : " hidden")}>
                <p>powered by NASA EONET and Google Maps API</p>
            </div>
        </div>
    )
}

export default Menu;