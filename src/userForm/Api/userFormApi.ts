//fetch the users from the github api

import { octokit } from "../../../environment/apiKey";
import { Option } from "../../models/interfaces";

export const getUsers = async (
  searchTerm: string | null
): Promise<Option[] | undefined> => {
  if (searchTerm) {
    const res = await octokit.request(
      `GET https://api.github.com/search/users?q=${searchTerm?.trim()}&per_page=100`
    );

    if (res.status === 200) {
      const data = res.data;
      const newOptions =
        data?.items?.map((user: { login: string }) => ({
          value: user.login,
          label: user.login,
        })) ?? [];
      return newOptions;
    } else {
      return undefined;
    }
  }
};
