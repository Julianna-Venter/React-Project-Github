const iDB = window.indexedDB;

const request = iDB.open("UserFormDatabase", 1);

request.onerror = function (event) {
  console.error("Database error: ", event);
};

request.onupgradeneeded = function () {
  const db = request.result;
  const objectStore = db.createObjectStore("users", { keyPath: "id" });
  objectStore.createIndex("username", "username", { unique: true });
  objectStore.createIndex("bookmarked", "bookmarked", { unique: false });
};

request.onsuccess = function () {
  const db = request.result;
  const transaction = db.transaction("users", "readwrite");
  const store = transaction.objectStore("users");
  const userIndex = store.index("username");
  const bookmarkIndex = store.index("bookmarked");

  store.put({ id: 1, username: "octocat", bookmarked: false }); // Add a user

  const getRequest = store.get(1); // Get a user
};
