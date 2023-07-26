import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [listOfDisplays, setListOfDisplays] = useState([]);
  let displayHistory = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:1234/displays").then((response) => {
      setListOfDisplays(response.data);
    });
  }, []);

  return (
    <div>
      {listOfDisplays.map((value, key) => {
        return (
            <div key={key} onClick={() => {displayHistory(`/display/${value.id}`)}} className="display">
            <div className="title"> {value.name_of_user} </div>
            <div className="body">{value.arrival_hour}</div>
            <div className="footer">{value.arrival_date}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;