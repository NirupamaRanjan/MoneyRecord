import React, { Component } from "react";
import Load from "../component/Spinner/Loader";
import "./main.css";
import Searching from "../component/SearchAndPagiAndAddUser/index";
import { FormControl, Button } from "react-bootstrap";
import {
  getUsersAPI,
  getAllRecordAPI,
  deleteAllDataAPI,
  addAllRecordAPI,
  showPassBookEntriesAPI,
} from "../ApiServiceProvider";
class UserTable extends Component {
  state = {
    user: [],
    search: "",
    searchProperty: "",
    id: "",
    totalItems: "",
    activePage: 1,
    pageLimit: 10,
    sortOrder: "",
    recordtracer: [],
    totalRecord: "",
  };

  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
    this.recordClearProcess();
  }
  recordClearProcess = () => {
    getAllRecordAPI().then((fetchusers) => {
      this.setState(
        {
          recordtracer: fetchusers.items,
          totalRecord: fetchusers.items.length,
        },
        () => {
          if (this.state.totalRecord !== 0) {
            this.state.recordtracer.map((user) => deleteAllDataAPI(user.id));
            this.setState({ totalRecord: "", recordtracer: [] });
          }
          if (this.state.searchProperty !== "") {
            this.findEntries();
          }
        }
      );
    });
  };
  getEntries = () => {
    showPassBookEntriesAPI(this.state, true).then((fetchusers) => {
      this.setState({
        recordtracer: fetchusers.items,
        totalRecord: fetchusers.total,
        user: [],
      });
    });
  };
  findEntries = () => {
    this.setState({ search: this.state.searchProperty }, () =>
      getUsersAPI(this.state, true)
        .then((fetchusers) => {
          this.setState(
            {
              // users: fetchusers.items.contactVault,
              user:
                fetchusers.items.length !== 0
                  ? fetchusers.items[0].Entries
                  : [],
              totalItems: fetchusers.total,
              search: "",
            },
            () => this.state.user.map((record) => addAllRecordAPI(record))
          );
        })
        .then(() => this.getEntries())
    );
  };
  onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value, activePage: 1, loader: true }, () => {
      if (name !== "searchProperty") {
        this.getEntries();
      }
    });
  };
  pageChangeHandler = (page, limit) => {
    this.setState(
      {
        activePage: page,
        pageLimit: limit,
        loader: true,
      },
      () => {
        this.getEntries();
      }
    );
  };
  render() {
    var count = 0;
    return (
      <React.Fragment>
        <table
          style={{ tableLayout: "fixed" }}
          class="table table-hover table-borderless table-responsive-lg"
        >
          <tr>
            <td>
              <FormControl
                placeholder="Search Account"
                type="search"
                value={this.state.searchProperty}
                onChange={this.onChangeHandler}
                name="searchProperty"
              ></FormControl>
            </td>
            <td>
              <Button variant="info" onClick={this.recordClearProcess}>
                Search
              </Button>
            </td>
          </tr>
        </table>
        {this.state.recordtracer.length === 0 ? (
          <div align="center">
            <h4>Enter Existing A/C Number.</h4>
          </div>
        ) : (
          <div class="limiter">
            <Searching
              items={Math.ceil(this.state.totalRecord / this.state.pageLimit)}
              limit={this.state.pageLimit}
              searchKey={this.state.search}
              activePage={this.state.activePage}
              onChange={this.onChangeHandler}
              onAddUserClick={this.newUserButtonClickHandler}
              onPageChange={this.pageChangeHandler}
            />
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
                      <th>Date</th>
                      <th colSpan="2">Particulars</th> <th>Check No.</th>
                      <th>Debit</th>
                      <th>Credit</th>
                      <th>Balance</th>
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
                      {this.state.recordtracer.map((userobj, id) => {
                        return (
                          <tr key={id}>
                            <td>{++count}</td>
                            <td>{userobj.date}</td>
                            <td colSpan="2">{userobj.Particulars}</td>
                            <td>{userobj.checkNo}</td>
                            <td>{userobj.Debit}</td>
                            <td>{userobj.Credit}</td>
                            <td>{userobj.balance}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default UserTable;
