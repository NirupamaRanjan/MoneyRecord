import React from "react";

const NewUsers = props => {
  return (
    <button
      onClick={props.onAddUserClick}
      style={{
        height: "20px",
        witdh: "150px",
        position: "absolute",
        right: "20px"
      }}
    >
      Add New User
    </button>
  );
};

export default NewUsers;
