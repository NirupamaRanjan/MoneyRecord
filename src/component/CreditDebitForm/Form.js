import React, { Component } from "react";
import { Dropdown, Button, Table, FormControl } from "react-bootstrap";
import { getUsersAPI } from "../../ApiServiceProvider";
import Payment from "./payment";

class Form extends Component {
  state = {
    transactionMode: "",
    search: "20281051000",
    search1: "20281051000",
    amount: "",
    accFrom: "",
    accTo: "",
    user: { id: "" },
    user1: { id: "" },
    checkFirst: true,
    particulars: "",
  };
  selectedValue = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
    if (name === "transactionMode") {
      this.validateMode();
    }
  };
  validateMode = () => {
    this.setState({
      search: "",
      search1: "",
      amount: "",
      accFrom: "",
      accTo: "",
      user: { id: "" },
      user1: { id: "" },
      checkNo: "",
      particulars: "",
    });
  };
  searchHandler = () => {
    (this.state.transactionMode === "A/C to A/C"
      ? !this.state.checkFirst && this.state.search.length !== 0
      : this.state.checkFirst && this.state.search.length !== 0) ||
    (this.state.checkFirst && this.state.search1.length !== 0)
      ? getUsersAPI(this.state, true).then((fetchusers) => {
          fetchusers.items.length !== 0
            ? this.setState(
                {
                  user: fetchusers.items[0],
                  totalItems: fetchusers.total,
                },
                () => {
                  alert("Account Detected!");
                  if (
                    !this.state.checkFirst &&
                    this.state.search === this.state.search1
                  ) {
                    alert("Same A/C selected.");
                  }
                  if (this.state.transactionMode === "A/C to A/C") {
                    this.setState({
                      user1: this.state.checkFirst
                        ? this.state.user
                        : this.state.user1,
                      user: this.state.checkFirst
                        ? { ...this.state.user, id: "" }
                        : this.state.user,
                      checkFirst: false,
                    });
                  }
                }
              )
            : { id: "" } && alert("Account Doesn't Exist!");
        })
      : alert(
          "Enter A/C and check Number properly.Check Number should be 6 digit only."
        );
  };
  componentDidMount() {
    this.setState({
      user: { ...this.state.user, id: "" },
      user1: { ...this.state.user, id: "" },
      transactionMode: "",
      checkNo: "",
    });
  }
  render() {
    return (
      <div>
        <Table>
          <tr>
            <td>
              Select Transaction Method.
              <ul>
                <li>
                  <Dropdown
                    onSelect={(ekey, e) =>
                      this.selectedValue({
                        target: {
                          value: e.currentTarget.innerText,
                          name: "transactionMode",
                        },
                      })
                    }
                  >
                    <Dropdown.Toggle variant="Link" id="dropdown-basic">
                      Debit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Cash</Dropdown.Item>
                      <Dropdown.Item>A/C to A/C</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Button
                    variant="Link"
                    onClick={() =>
                      this.setState({ transactionMode: "Withdraw" }, () =>
                        this.validateMode()
                      )
                    }
                  >
                    Withdraw
                  </Button>
                </li>
              </ul>
            </td>
          </tr>
          <tr>{this.state.transactionMode}</tr>
          {this.state.transactionMode === "Withdraw" ||
          this.state.transactionMode === "Cash" ? (
            <Payment
              values={this.state}
              account={this.selectedValue}
              findACC={this.searchHandler}
            />
          ) : this.state.transactionMode === "A/C to A/C" ? (
            <React.Fragment>
              From
              <tr>
                <td>
                  {" "}
                  <FormControl
                    type="text"
                    class="form-control"
                    name="search1"
                    value={this.state.search1}
                    onChange={this.selectedValue}
                    id="tdstyle"
                    placeholder="Account Number"
                    onBlur={this.selectedValue}
                    required
                  />
                  <Button onClick={this.searchHandler} size="sm" variant="link">
                    Confirm
                  </Button>
                </td>
                <td>
                  <FormControl
                    type="number"
                    class="form-control"
                    name="checkNo"
                    value={this.state.checkNo}
                    onChange={this.selectedValue}
                    id="tdstyle"
                    placeholder="Check Number"
                    onBlur={this.selectedValue}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {this.state.user1.id !== "" && (
                    <React.Fragment>
                      To
                      <Payment
                        values={this.state}
                        account={this.selectedValue}
                        findACC={this.searchHandler}
                      />
                    </React.Fragment>
                  )}
                </td>
              </tr>
            </React.Fragment>
          ) : null}
        </Table>
      </div>
    );
  }
}

export default Form;
