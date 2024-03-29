// Render Prop
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { Option } from "../models/interfaces";
import Drawer from "../navigation/Drawer";
import { getUsers } from "./Api/userFormApi";
import { useUserStore } from "./store";

function UserForm() {
  const navigate = useNavigate({ from: "/profile" });
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Option> | null>(null);

  const addUser = useUserStore((state) => state.addUser);

  //tanstack/react-query hook to fetch the users
  const { data: optionData } = useQuery({
    queryKey: ["searchUsernames", searchTerm?.trim()],
    queryFn: () => getUsers(searchTerm),
    enabled: !!searchTerm, //make this an approved varaible?
  });

  //when the search term, or new options, have changed, check the search term
  //if it exists in the options, let the select do its own filtering. If not, fetch new options
  //if there is nothing typed yet, keep the array empty
  //this logic is curently being reworked on another branch for better efficiency when searching
  useEffect(() => {
    if (searchTerm?.trim() === "" || searchTerm === null) {
      return;
    }

    const latestOptions = optionData;
    let matchSearchTerm = false;

    if (searchTerm?.trim() !== "" && latestOptions) {
      for (const option of latestOptions) {
        let searchOption = option.label;
        const result = searchOption.includes(searchTerm);
        if (result) {
          matchSearchTerm = true;
          break;
        }
      }
      if (!matchSearchTerm) {
        // console.log("cannot find in options, fetching...");
        getUsers(searchTerm);
      } else {
        // console.log("found in options");
      }
    }
  }, [searchTerm, optionData]);

  let timeoutId: NodeJS.Timeout;

  //handle the input change, use debounce to wait for the user to stop typing, then only search
  const handleInputChange = (inputValue: string) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);
  };

  const handleSelectChange = (selectedOption: SingleValue<Option>) => {
    setSelectedOption(selectedOption as SingleValue<Option>);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5 lg:p-0">
      <Drawer username={""} />

      <div
        id="pageContainer"
        className="h-screen w-full flex flex-col justify-center items-center absolute lg:fixed lg:pl-[320px]"
      >
        <div
          className="flex flex-col bg-off-white w-4/5 h-2/5 rounded-2xl shadow-3xl px-8 py-7 justify-around lg:w-3/5"
          id="formContainer"
        >
          <div className="flex flex-col gap-1.5">
            <h1 className="text-dark-text text-2xl lg:text-2xl">Find a User</h1>
            <h2 className="text-ligher-text text-sm lg:text-base">
              Enter the Github username of the account you would like to view.
            </h2>
          </div>
          <Formik
            initialValues={{ username: "", rememberMe: false }}
            onSubmit={(values, { setSubmitting }) => {
              let profileId = selectedOption?.value;

              if (values.rememberMe && profileId) {
                addUser(profileId);
              }

              navigate({
                to: `/profile/${profileId}`,
                params: { profileId },
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col justify-center items-start gap-5">
                <div className="w-full">
                  <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    onInputChange={handleInputChange}
                    options={optionData}
                    placeholder="Enter a Username"
                  />
                </div>
                <label className="text-dark-text text-sm">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="mr-4 ml-0.5 bg-dark-off-white lg:mb-8"
                  />
                  Remember This User
                </label>
                <button
                  type="submit"
                  disabled={!selectedOption || isSubmitting}
                  className={`h-10 rounded-md px-3.5 hover:bg-secondary-orange ${
                    !selectedOption ? "bg-gray-400" : "bg-primary-blue"
                  } text-off-white self-end btn`}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
