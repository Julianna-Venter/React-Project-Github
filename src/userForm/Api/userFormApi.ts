//fetch the users from the github api

import { octokit } from "../../../environment/apiKey";
import { Option } from "../../models/interfaces";

//populate the options array with the fetched data
export const getUsers = async (
  searchTerm: string | null
): Promise<Option[] | undefined> => {
  if (searchTerm) {
    try {
      const res = await octokit.request(
        `GET https://api.github.com/search/users?q=${searchTerm?.trim()}&per_page=100`
      );

      console.log("fetching...");

      if (res.status === 200) {
        const data = res.data;
        const newOptions =
          data?.items?.map((user: { login: string }) => ({
            value: user.login,
            label: user.login,
          })) ?? [];
        return newOptions;
      } else {
        // Handle errors appropriately
        console.error("Request failed with status:", res.status);
        return [];
      }
    } catch (error) {
      console.error("Error fetching usernames:", error);
      return [];
    }
  }
};
