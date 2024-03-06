// Render Prop
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";

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
        setTimeout(() => {
          //when the form is submitted, the values are displayed in an alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="text"
            name="username"
            placeholder="Enter your username"
          />
          <ErrorMessage name="username" component="div" />

          <label>
            <Field type="checkbox" name="rememberMe" />
            Remember Me
          </label>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default UserForm;
