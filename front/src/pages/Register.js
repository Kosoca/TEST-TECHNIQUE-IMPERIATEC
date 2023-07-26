import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"

function Register() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchemaYup = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(10).max(64).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:1234/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchemaYup}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputAddDisplay"
            name="username"
            placeholder="Votre nom..."
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputAddDisplay"
            name="password"
            placeholder="Mot de passe..."
          />

          <button type="submit">S'enregistrer</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;