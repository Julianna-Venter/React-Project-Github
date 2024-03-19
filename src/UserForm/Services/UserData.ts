import { SetStateAction, useEffect, useState } from "react";

const [searchTerm, setSearchTerm] = useState("");
const [options, setOptions] = useState([
  { value: "Username", label: "Username 1" },
  { value: "Example", label: "Example 2" },
  { value: "Here", label: "Here 3" },
]);

useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    if (searchTerm.trim() !== "") {
      fetchUsernames();
    } else {
      setOptions([]); // Clear options if search term is empty
    }
  }, 500); // Debounce delay in milliseconds

  return () => clearTimeout(delayDebounceFn);
}, [searchTerm]); // Trigger effect when searchTerm changes

const fetchUsernames = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch usernames");
    }
    const data = await response.json();
    const newOptions = data.items.map((user: { login: any }) => ({
      value: user.login,
      label: user.login,
    }));
    setOptions(newOptions); // Set options to the newly fetched data
  } catch (error) {
    console.error("Error fetching usernames:", error);
  }
};

const handleInputChange = (event: {
  target: { value: SetStateAction<string> };
}) => {
  setSearchTerm(event.target.value);
};

// <div>
//         <h1>Search Usernames</h1>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleInputChange}
//           placeholder="Search usernames..."
//         />
//         <ul>
//           {options.map(
//             (option: {
//               value: Key | null | undefined;
//               label:
//                 | string
//                 | number
//                 | boolean
//                 | ReactElement<any, string | JSXElementConstructor<any>>
//                 | Iterable<ReactNode>
//                 | ReactPortal
//                 | null
//                 | undefined;
//             }) => (
//               <li key={option.value}>{option.label}</li>
//             )
//           )}
//         </ul>
//       </div>

// const queryClient = useQueryClient();

// const { data } = useQuery({
//   queryKey: ["posts"],
//   queryFn: getPosts(),
//   staleTime: 60000,
//   //if there are no changes to this fetch within 60 seconds, it will refetch (with certain caviats)
//   refetchInterval: 60000,
//   //this one will actually refetch every 60 seconds no matter what
//   gcTime: 60000,
//   //timeout for when react will delete and garbage collect the data
// });

// const { mutate, isError } = useMutation({
//   mutationFn: (newPost) =>
//     fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       body: JSON.stringify(newPost),
//       headers: { "Content-type": "application/json; charset=UTF-8" },
//     }).then((res) => res.json()),
//   onSuccess: (newPost) => {
//     // queryClient.invalidateQueries({ queryKey: ["posts"] });
//     //this is to refetch data if a mutation has occurred
//     queryClient.setQueryData(["posts"], (oldPosts: any) => [
//       ...oldPosts,
//       newPost,
//     ]);
//     //actually adds new data to cached data, so doesn't refetch/invalidate
//   },
// });

// if (error || isError) return <div>There was an error!</div>;
// if (isLoading) return <div>Loading...</div>;
{
  /* <button
    onClick={() =>
      mutate({
        userId: 5000,
        id: 4000,
        title: "this is the title",
        body: "this is the body",
      })
    }
  >
    Add Post
  </button>
  {data &&
    data.map((todo: { id: string; title: string; body: string }) => (
      <div>
        <h4>ID: {todo.id} </h4>
        <h4>Title: {todo.title} </h4>
        <h4>Body: {todo.body} </h4>
      </div>
    ))} */
}

export { options };
// 'https://jsonplaceholder.typicode.com/todos'

// const getPosts = () =>
//   fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
//     res.json()
//   );
