import React, { Component } from "react";
import Load from "../Spinner/Loader";
import "../UserTable/main.css";
import * as BT from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";

class UserTable extends Component {
  state = {
    modelview: false,
    ID: "",
    price: "",
    cp: "",
    status: "",
    selname: "",
  };
  onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value, cp: "" });
  };
  render() {
    var count = 0;
    return this.props.user.length === 0 ? (
      <div align="center">
        <h4>No Data Available.</h4>
      </div>
    ) : (
      <div class="limiter">
        {" "}
        <hr />
        <div class="table100 ver3 m-b-110 ">
          <div class="table100-body ">
            <table
              style={{ tableLayout: "fixed" }}
              class="table table-hover table-borderLess table-responsive-lg"
            >
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th colSpan="2">
                    NAME
                    <a href="#">
                      <Icons.ArrowUp
                        size={25}
                        onClick={() =>
                          this.props.onSortingClick("title", "asc")
                        }
                      ></Icons.ArrowUp>
                    </a>
                    <a href="#">
                      <Icons.ArrowDown
                        size={25}
                        onClick={() =>
                          this.props.onSortingClick("title", "desc")
                        }
                      ></Icons.ArrowDown>
                    </a>
                  </th>
                  <th>
                    Phone
                    <a href="#">
                      <Icons.ArrowUp
                        size={25}
                        onClick={() =>
                          this.props.onSortingClick("contect", "asc")
                        }
                      ></Icons.ArrowUp>
                    </a>
                    <a href="#">
                      <Icons.ArrowDown
                        size={25}
                        onClick={() =>
                          this.props.onSortingClick("contect", "desc")
                        }
                      ></Icons.ArrowDown>
                    </a>
                  </th>
                  <th colSpan="2">Email ID</th>

                  <th>Profile</th>
                </tr>
              </thead>
              {this.props.loader ? (
                <tr style={{ textAlignLast: "center" }}>
                  <td colSpan="8">
                    <Load></Load>
                  </td>
                </tr>
              ) : (
                <tbody>
                  {this.props.user.map((userobj, id) => {
                    return (
                      <tr key={id}>
                        <td>{++count}</td>
                        <td colSpan="2">{userobj.title}</td>
                        <td>{userobj.contect}</td>
                        <td colSpan="2">{userobj.Email}</td>
                        <td>
                          <BT.Button variant="link">
                            <Icons.ClipboardData
                              onClick={() =>
                                this.props.onEditUserClick(userobj.id)
                              }
                              color="royalblue"
                              size={25}
                              alt="Show Icon"
                            ></Icons.ClipboardData>
                          </BT.Button>
                          {"/"}
                          <BT.Button variant="link">
                            <Icons.Trash
                              onClick={() =>
                                this.props.onDeleteUserClick(userobj.id)
                              }
                              color="red"
                              size={25}
                              alt="Delete Icon"
                            ></Icons.Trash>
                          </BT.Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default UserTable;
