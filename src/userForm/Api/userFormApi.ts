//fetch the users from the github api

import { SetStateAction } from "react";
import { octokit } from "../../../environment/apiKey";
import { Option } from "../../Models/interfaces";

//populate the options array with the fetched data
export const getUsers = async (
  searchTerm: string | null
): Promise<Option[] | undefined> => {
  if (searchTerm) {
    try {
      const res = await octokit.request(
        `GET https://api.github.com/search/users?q=${searchTerm?.trim()}&per_page=100`
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
      return newOptions;
    } catch (error) {
      console.error("Error fetching usernames:", error);
      return [];
    }
  }
};
