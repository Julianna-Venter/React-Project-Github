// Render Prop
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import "./userForm.css";

const UserForm = () => (
  <div>
    <h1>The Form Heading</h1>
    <Formik
      initialValues={{ username: "", rememberMe: false }}
      validate={(values) => {
        const errors: Partial<FormikValues> = {};
        if (!values.username) {
          errors.username = "Required";
        } else if (!/^[A-Za-z0-9_]{3,15}$/i.test(values.username)) {
          errors.username = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        //when the form is submitted, the values are displayed in an alert
        //write the values to json file if rememberMe is checked, and then that is the list of saved users that you will display on the saved menu

        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="userForm">
          <Field
            type="text"
            name="username"
            placeholder="Enter your username"
            className="userInput"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="errorLable"
          />

          <label>
            <Field type="checkbox" name="rememberMe" className="rememberMe" />
            Remember This User
          </label>

          <button type="submit" disabled={isSubmitting} className="submitBtn">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default UserForm;
