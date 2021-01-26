import React, { useState } from 'react'
import "../styles/eventcom.css";
import GoogleAPICalendar from "google-calendar-react";

function Eventcom({taskEvent}) {
    const [info , setInfo]= useState({
        id : taskEvent.id,
        created : taskEvent.created,
        updated : taskEvent.updated,
        summary : taskEvent.summary,
        start : taskEvent.start,
        end : taskEvent.end,
        description : taskEvent.description 
    })
    const transformdate = ()=>{
        const startdate = new Date(info.start.dateTime).toLocaleDateString();
        const endDate = new Date(info.end.dateTime).toLocaleDateString();
        return {startdate , endDate};    
    }
    const deletethis = ()=>{

    }
    return (
        <div className="eventcom__main">
            <div>{info.summary}</div>
            <div>{info.description}</div>
            <div>{transformdate().startdate}</div>
            <div>{transformdate().endDate}</div>
        </div>
    )
}

export default Eventcom
