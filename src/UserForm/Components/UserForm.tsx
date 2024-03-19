// Render Prop
import { useQuery } from "@tanstack/react-query";
import { Field, Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { octokit } from "../../../environment/apiKey";
import Drawer from "../../Navigation/Drawer";

interface Option {
  value: string;
  label: string;
}

function UserForm() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Option> | null>(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (searchTerm?.trim() === "" || searchTerm === null) {
      return;
    }

    let searchTermContainsInOptions = false;
    const latestOptions = options;

    if (searchTerm?.trim() !== "") {
      searchTermContainsInOptions = latestOptions.some((option) =>
        option.label
          .toLowerCase()
          .includes(searchTerm?.trim().toLowerCase() as string)
      );

      if (!searchTermContainsInOptions) {
        getUsers();
      }
    } else {
      setOptions([]);
    }
  }, [searchTerm, options]);

  const getUsers = async () => {
    if (searchTerm) {
      try {
        const res = await octokit.request(
          `GET https://api.github.com/search/users?q=${searchTerm?.trim()}`
        );
        let data: any;
        if (res.status === 200) {
          data = res.data;
        } else {
          // Handle errors appropriately
          console.error("Request failed with status:", res.status);
        }
        const newOptions =
          data?.items?.map((user: { login: string }) => ({
            value: user.login,
            label: user.login,
          })) ?? [];
        setOptions(newOptions); // Set options to the newly fetched data
        return newOptions;
      } catch (error) {
        console.error("Error fetching usernames:", error);
        setOptions([]);
        return [];
      }
    }
  };

  useQuery({
    queryKey: ["searchUsernames", searchTerm?.trim()],
    queryFn: getUsers,
    enabled: false,
  });

  let timeoutId: NodeJS.Timeout;

  const handleInputChange = (
    inputValue: string,
    actionMeta: { action: string }
  ) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setSearchTerm(inputValue); // Assuming setSearchTerm is your state setter function
    }, 300);
  };

  const handleSelectChange = (
    selectedOption: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    setSelectedOption(selectedOption as SingleValue<Option>);
  };

  return (
    <>
      <div
        id="pageContainer"
        className="h-screen w-full flex flex-col justify-center items-center absolute"
      >
        <div
          className="flex flex-col bg-off_white w-4/5 h-2/5 rounded-2xl shadow-3xl px-8 py-7 justify-around lg:w-3/5"
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
                errors.username = "Invalid username address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Submitting form...");
              console.log("Username:", values.username);
              console.log("Remember Me:", values.rememberMe);
              // Reset the form
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col justify-center items-start gap-5">
                <div className="w-full z-50">
                  <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    onInputChange={handleInputChange}
                    options={options}
                    placeholder="Enter a Username"
                  />
                </div>
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
                  disabled={!selectedOption || isSubmitting}
                  className={`h-10 rounded-md px-3.5 ${
                    !selectedOption ? "bg-gray-400" : "bg-primary_blue"
                  } text-off_white self-end btn`}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="p-5">
        <Drawer username={""} />
      </div>
    </>
  );
}

export default UserForm;
