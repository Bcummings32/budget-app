let db;

const request = indexedDB.open("budget", 1);

request.onUpgradeNeeded = function (event) {
    const db =event.target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};

request.onSuccess = function (event) {
    db = event.target.result;
    //check if app is online
    if (navigator.online) {
        checkDatabase();
    }
};

request.onerror = function (event) {

};

function saveRecord (record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");

    store.add(record);
}

function checkDatabase() {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");

    //get records and set to variable
    const getAll = store.getAll();


getAll.onsuccess = function () {
  if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
        .then(() => {
          // delete records if successful
          const transaction = db.transaction(["pending"], "readwrite");
          const store = transaction.objectStore("pending");

          //clear items
          store.clear();
        });
    }
  };

function deletePending() {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  store.clear();
}