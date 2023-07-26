import React from "react";
import * as Yup from 'yup';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';


function AddDisplay() {

  const initialValues = {
    name_of_user: "",
    arrival_hour: "",
    arrival_date: ""
  };


  const validationSchemaYup = Yup.object().shape({
    name_of_user: Yup.string().min(3).max(25).required("Le nom de l'utilisateur est obligatoire."),
    arrival_hour: Yup.string().length(5).matches(/(\d){2}:(\d){2}/).required("L'heure d'arrivée est obligatoire."),
    arrival_date: Yup.date().default(() => new Date()).required("La date d'arrivée est obligatoire."),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:1234/displays", data,
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }
  )};

  return (
    <div className="addDisplayPage">
        <Formik 
          initialValues={initialValues} 
          onSubmit={onSubmit}
          validationSchema={validationSchemaYup}
        >
            <Form className="formContainer">
                <label>Nom de la personne arrivée :</label>
                <ErrorMessage name="name_of_user" component="span"/>
                <Field 
                autocomplete="off"
                id="inputAddDisplay" 
                name="name_of_user" 
                placeholder="pierre, paul, jacque..."
                />
                <label>Heure d'arrivée :</label>
                <ErrorMessage name="arrival_hour" component="span"/>
                <Field 
                autocomplete="off"
                id="inputAddDisplay" 
                name="arrival_hour" 
                placeholder="heure (Ex: 10:10) ?"
                />
                <label>Date d'arrivée :</label>
                <ErrorMessage name="arrival_date" component="span"/>
                <Field 
                autocomplete="off"
                id="inputAddDisplay" 
                name="arrival_date" 
                placeholder="date (Ex : 1999-01-01) ?"/
                >
                <button type="submit">Ajouter l'arrivée</button>
            </Form>
        </Formik>
    </div>
  );
}

export default AddDisplay;