import React, { useEffect, useState } from "react";
import GoogleAPICalendar from "google-calendar-react";
import ApiCalendar from 'react-google-calendar-api';
import { deleteuser, isUser, saveuser } from "../usersave";
import Eventcom from "./eventcom";
import DatePicker from "react-date-picker";
import "../styles/calendar.css"
function Calender() {
  const [user, setUser] = useState(false);
  const Isuser = isUser();
  const [listitem, setListitem] = useState([]);
  const [textinput, setTextinput] = useState("");
  const [descinput, setDescinput] = useState("");

  const [loading, setLoading] = useState(false);
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const onhandlechangetext = (event) => {
    setTextinput(event.target.value);
  };

  const onhandlechangedesc = (event) => {
    setDescinput(event.target.value);
  };
  const loadingMsg = () =>
    loading ? (
      <div className="container-fluid app_loader_container row">
        <div className="app_loadingmsg col-6"></div>
      </div>
    ) : (
      <div></div>
    );

  useEffect(() => {
    setUser(Isuser);
    ApiCalendar.onLoad(() => {
      listall();
    });
  }, [user]);

  const signOut = () => {
    ApiCalendar.handleSignoutClick();
    deleteuser();
    setUser(!user);
    setListitem([]);
  };
  const signIN = () => {
    ApiCalendar.handleAuthClick();
    saveuser();
    setUser(!user);
  };

  const listall = () => {
    console.log('done');
    if (ApiCalendar.sign) {
      setLoading(true);
      ApiCalendar.listUpcomingEvents(100,"dilipthakkarnew@gmail.com").then(({ result }) => {
        setLoading(false);
        console.log(result);
        // result.item.sort((a, b) => (a.start > b.start) ? 1 : -1)
  
        setListitem(result.items);
      }).catch(()=>{setLoading(false)});
  
    }
  };

  const addevent = () => {
    const eventFromNow = {
      summary: textinput,
      start: {
        dateTime: startdate.toISOString(),
        timeZone: "Europe/Paris",
      },
      end: {
        dateTime: enddate.toISOString(),
        timeZone: "Europe/Paris",
      },
      description : descinput
    };

    ApiCalendar.createEvent(eventFromNow,"dilipthakkarnew@gmail.com")
      .then((result) => {
        console.log(result);
        listall();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {loadingMsg()}
      {user ? (
        <button
          onClick={() => {
            signOut();
          }}
        >
          sign-out
        </button>
      ) : (
        <button
          onClick={() => {
            signIN();
          }}
        >
          sign-in
        </button>
      )}

      <input onChange={onhandlechangetext} value={textinput} />
      <input onChange={onhandlechangedesc} value={descinput} />
      
      <DatePicker onChange={setStartDate} value={startdate} />
      <DatePicker onChange={setEndDate} value={enddate} />

      <button
        onClick={() => {
          addevent();
        }}
      >
        add
      </button>

      {listitem.map((item) => (
        <div>
          <Eventcom key={item.id} taskEvent={item} />
        </div>
      ))}
    </div>
  );
}

export default Calender;
