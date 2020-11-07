export var addUsersAPI = function (addUserDetails, record) {
  return fetch(
    addUserDetails.id
      ? `http://localhost:3010/Customer/${addUserDetails.id}`
      : `http://localhost:3010/Customer`,
    {
      method: addUserDetails.id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: addUserDetails.title,
        contect: addUserDetails.contect,
        Email: addUserDetails.Email,
        accountNumber: `2028105100${addUserDetails.id}`,
        balance: addUserDetails.id ? addUserDetails.balance : 0,
        Entries: addUserDetails.id ? record : [],
      }),
    }
  );
};

export var getUsersAPI = function (Param, isGetTotalCount) {
  var propertyName = window.location.pathname === "/Customer" ? "q" : "title";

  var search =
    Param.transactionMode === "A/C to A/C"
      ? Param.checkFirst
        ? Param.search1
        : Param.search
      : Param.search;

  return fetch(
    search
      ? `http://localhost:3010/Customer?${propertyName}=${search}&_sort=${Param.sortBy}&_order=${Param.sortOrder}&_page=${Param.activePage}&_limit=${Param.pageLimit}`
      : `http://localhost:3010/Customer?_sort=${Param.sortBy}&_order=${Param.sortOrder}&_page=${Param.activePage}&_limit=${Param.pageLimit}`,
    {
      headers: { X_Total_Count: getUsersAPI.length },
    }
  ).then((response) => {
    if (isGetTotalCount) {
      return response.json().then((items) => {
        return {
          items,
          total: response.headers.get("X-Total-Count"),
        };
      });
    }
    return response.json();
  });
};

export var deleteUsersAPI = function (userobj) {
  return fetch(`http://localhost:3010/Customer/${userobj}`, {
    method: "DELETE",
  }).then((response) => {
    return response.json();
  });
};

export var getUserByIDAPI = function (userid) {
  return fetch(`http://localhost:3010/Customer/${userid}`).then((response) => {
    return response.json().then((items) => {
      return {
        items,
      };
    });
  });
};

export var getAllRecordAPI = function () {
  return fetch(`http://localhost:3010/recordtracer`, {
    headers: { X_Total_Count: getAllRecordAPI.length },
  }).then((response) => {
    return response.json().then((items) => {
      return {
        items,
        total: response.headers.get("X-Total-Count"),
      };
    });
  });
};

export var passBookEntryAPI = function (
  addUserDetails,
  transactionMode,
  check,
  amount,
  description
) {
  return fetch(`http://localhost:3010/recordtracer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: new Date().toLocaleString(),
      Particulars: description,
      Debit:
        transactionMode === "Withdraw" || transactionMode === "A/C to A/C"
          ? amount
          : "-",
      Credit: transactionMode === "Cash" ? amount : "-",
      balance: addUserDetails.balance,
      checkNo: check !== "" ? check : "-",
    }),
  });
};

export var showPassBookEntriesAPI = function (Param, isGetTotalCount) {
  return fetch(
    Param.search
      ? `http://localhost:3010/recordtracer?q=${Param.search}&_sort=${Param.sortBy}&_order=${Param.sortOrder}&_page=${Param.activePage}&_limit=${Param.pageLimit}`
      : `http://localhost:3010/recordtracer?_sort=${Param.sortBy}&_order=${Param.sortOrder}&_page=${Param.activePage}&_limit=${Param.pageLimit}`,
    {
      headers: { X_Total_Count: showPassBookEntriesAPI.length },
    }
  ).then((response) => {
    if (isGetTotalCount) {
      return response.json().then((items) => {
        return {
          items,
          total: response.headers.get("X-Total-Count"),
        };
      });
    }
    return response.json();
  });
};
export var deleteAllDataAPI = function (userobj) {
  return fetch(`http://localhost:3010/recordtracer/${userobj}`, {
    method: "DELETE",
  }).then((response) => {
    return response.json();
  });
};
export var addAllRecordAPI = function (addUserDetails) {
  return fetch(`http://localhost:3010/recordtracer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: addUserDetails.date,
      Particulars: addUserDetails.Particulars,
      Debit: addUserDetails.Debit,
      Credit: addUserDetails.Credit,
      balance: addUserDetails.balance,
      checkNo: addUserDetails.checkNo,
    }),
  });
};

export var deleteAllDataUser1API = function (userobj) {
  return fetch(`http://localhost:3010/recordtracer1/${userobj}`, {
    method: "DELETE",
  }).then((response) => {
    return response.json();
  });
};
export var addAllRecordUser1API = function (addUserDetails) {
  return fetch(`http://localhost:3010/recordtracer1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: addUserDetails.date,
      Particulars: addUserDetails.Particulars,
      Debit: addUserDetails.Debit,
      Credit: addUserDetails.Credit,
      balance: addUserDetails.balance,
      checkNo: addUserDetails.checkNo,
    }),
  });
};
export var getAllRecordUser1API = function () {
  return fetch(`http://localhost:3010/recordtracer1`, {
    headers: { X_Total_Count: getAllRecordAPI.length },
  }).then((response) => {
    return response.json().then((items) => {
      return {
        items,
        total: response.headers.get("X-Total-Count"),
      };
    });
  });
};

export var passBookEntryUser1API = function (
  addUserDetails,
  transactionMode,
  check,
  amount,
  description
) {
  return fetch(`http://localhost:3010/recordtracer1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: new Date().toLocaleString(),
      Particulars: description,
      Debit: transactionMode === "Withdraw" ? amount : "-",
      Credit:
        transactionMode === "Cash" || transactionMode === "A/C to A/C"
          ? amount
          : "-",
      balance: addUserDetails.balance,
      checkNo: check !== "" ? check : "-",
    }),
  });
};
