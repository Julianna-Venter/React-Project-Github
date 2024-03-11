// Render Prop
import { Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import CustomSelect from "./CustomSelect";

function UserForm() {
  const options = [
    { value: "Username", label: "Username 1" },
    { value: "Example", label: "Example 2" },
    { value: "Here", label: "Here 3" },
    // Add more options as needed
  ];

  const [selectedValue, setSelectedValue] = useState<any>(null);

  return (
    <div
      id="pageContainer"
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <div className="w-[600px] h-[550px] bg-primary_blue absolute -z-20 rotate-45 rounded-badge left-[-18.5rem] top-[-15rem] flex-0"></div>
      <div className="w-[300px] h-[150px] border-solid border-12 border-secondary_orange absolute rounded-badge -z-10 left-[6rem] top-[-8rem] rotate-45 flex-0"></div>
      <div className="w-[600px] h-[550px] bg-primary_blue absolute -z-20 rotate-45 rounded-badge right-[-15rem] bottom-[-25rem] flex-0"></div>
      <div className="w-[300px] h-[150px] border-solid border-12 border-secondary_orange absolute rounded-badge -z-10 right-[-14rem] bottom-[4rem] rotate-45 flex-0"></div>
      <div
        className="flex flex-col bg-off_white w-4/5 h-2/5 rounded-2xl shadow-3xl px-8 py-7 justify-around"
        id="formContainer"
      >
        <div className="flex flex-col gap-1.5">
          <h1 className="text-dark_text text-2xl">Find a User</h1>
          <h2 className="text-ligher_text text-sm">
            Enter the Github username of the account you would like to view.
          </h2>
        </div>
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
          {({ isSubmitting, setFieldValue }) => (
            <Form className="w-full flex flex-col justify-center items-start gap-5">
              <CustomSelect
                onChange={(value) => {
                  setSelectedValue(value);
                  setFieldValue("username", value ? value.value : ""); // Assuming "value" should be set as the username
                }}
                options={options}
                value={selectedValue || ""}
                className="w-full"
                placeholder="Enter a Username"
              />

              <label className="text-dark_text text-sm">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="mr-4 bg-dark_off_white"
                />
                Remember This User
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-10 rounded-md px-2.5 bg-primary_blue text-off_white self-end"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserForm;
