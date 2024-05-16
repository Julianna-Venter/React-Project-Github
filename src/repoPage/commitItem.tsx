import { CommitItem } from "../models/interfaces";

function commitItem(commitItem: CommitItem) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} | ${hours}:${minutes}`;
  };

  return (
    <div className="w-full flex flex-col xl:grid xl:grid-cols-4 border-[1.5px] border-solid border-lighter-text/30 p-3 rounded-md gap-5 items-start lg:items-center">
      <label className="col-span-2">{commitItem.commit.message}</label>
      <div className="flex gap-5 col-span-2 lg:justify-between">
        <label className="font-light">
          <div className="flex gap-2">
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-semibold lg:font-normal">
              {commitItem.commit.author.name}
            </span>
          </div>
        </label>
        <label className="font-light">
          {formatDate(commitItem.commit.author.date)}
        </label>
      </div>
    </div>
  );
}

export default commitItem;
