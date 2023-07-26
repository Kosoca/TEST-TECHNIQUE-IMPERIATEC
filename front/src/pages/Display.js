import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";


function Display() {

    let { id } = useParams();
    const [displayObject, setDisplayObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:1234/displays/byId/${id}`).then((response) => {
            setDisplayObject(response.data);
        });
    }, []);

  return (
    <div className="displayPage">
        <div className="leftSide">
               <div className="display" id="individual">
                 <div className="title"> {displayObject.name_of_user} </div>
                 <div className="body">{displayObject.arrival_hour}</div>
                 <div className="footer">
                  {displayObject.arrival_date} 
                  {<button onClick="">Supprimer l'arrivé</button>}</div>
               </div>
             </div>
     </div>
  );
}

export default Display;