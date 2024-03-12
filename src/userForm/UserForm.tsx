// Render Prop
import { Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import BackgroundAssets from "../commonComponents/BackgroundAssets";
import CustomSelect, { Option } from "./CustomSelect";

function UserForm() {
  //this is just mock data to be populated later
  const options: Option[] = [
    { value: "Username", label: "Username 1" },
    { value: "Example", label: "Example 2" },
    { value: "Here", label: "Here 3" },
  ];

  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  return (
    <div
      id="pageContainer"
      className="h-screen w-full flex flex-col justify-center items-center overflow-hidden overscroll-none"
    >
      <BackgroundAssets />
      <div
        className="flex flex-col bg-off_white w-4/5 h-2/5 rounded-2xl shadow-3xl px-8 py-7 justify-around overflow-hidden lg:w-3/5"
        id="formContainer"
      >
        <div className="flex flex-col gap-1.5">
          <h1 className="text-dark_text text-2xl lg:text-3xl">Find a User</h1>
          <h2 className="text-ligher_text text-sm lg:text-base">
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

                  setFieldValue("username", value ? value.value : "");
                }}
                options={options}
                value={selectedValue || null}
                className="w-full"
                placeholder="Enter a Username"
              />

              <label className="text-dark_text text-sm">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="mr-4 ml-0.5 bg-dark_off_white lg:mb-8"
                />
                Remember This User
              </label>
              <button
                type="submit"
                disabled={!selectedValue || isSubmitting}
                className={`h-10 rounded-md px-2.5 ${
                  !selectedValue ? "bg-gray-400" : "bg-primary_blue"
                } text-off_white self-end`}
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
