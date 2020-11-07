import React, { Component } from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import {
  addUsersAPI,
  passBookEntryAPI,
  getAllRecordAPI,
  deleteAllDataAPI,
  addAllRecordAPI,
  passBookEntryUser1API,
  getAllRecordUser1API,
  deleteAllDataUser1API,
  addAllRecordUser1API,
} from "../../ApiServiceProvider";

class payment extends Component {
  state = {
    recordtracer: [],
    totalRecord: "",
    recordtraceruser1: [],
    totalRecorduser1: "",
  };
  componentDidMount() {
    this.recordDeletion();
    this.recordDeletionUser1();
  }

  recordDeletion = () => {
    getAllRecordAPI().then((fetchusers) => {
      this.setState(
        {
          recordtracer: fetchusers.items,
          totalRecord: fetchusers.items.length,
        },
        () => {
          if (this.state.totalRecord !== 0) {
            this.state.recordtracer.map((user) => deleteAllDataAPI(user.id));
          }
        }
      );
    });
  };
  recordDeletionUser1 = () => {
    getAllRecordUser1API().then((fetchusers) => {
      this.setState(
        {
          recordtraceruser1: fetchusers.items,
          totalRecorduser1: fetchusers.items.length,
        },
        () => {
          if (this.state.totalRecorduser1 !== 0) {
            this.state.recordtraceruser1.map((user1) =>
              deleteAllDataUser1API(user1.id)
            );
          }
        }
      );
    });
  };

  recordProcedure = (Description) => {
    this.props.values.user.Entries.map((record) => addAllRecordAPI(record));
    passBookEntryAPI(
      this.props.values.user,
      this.props.values.transactionMode,
      this.props.values.checkNo,
      this.props.values.amount,
      Description
    );
    getAllRecordAPI().then((fetchusers) => {
      this.setState(
        {
          recordtracer: fetchusers.items,
          totalRecord: fetchusers.items.length,
        },
        () =>
          addUsersAPI(this.props.values.user, this.state.recordtracer).then(
            this.recordDeletion(),
            setTimeout(() => window.location.reload(), 1000)
          )
      );
    });
  };
  recordProcedureUser1 = (Description) => {
    this.props.values.user1.Entries.map((record) =>
      addAllRecordUser1API(record)
    );
    passBookEntryUser1API(
      this.props.values.user1,
      this.props.values.transactionMode,
      this.props.values.checkNo,
      this.props.values.amount,
      Description
    );
    getAllRecordUser1API().then((fetchusers) => {
      this.setState(
        {
          recordtraceruser1: fetchusers.items,
          totalRecorduser1: fetchusers.items.length,
        },
        () =>
          addUsersAPI(
            this.props.values.user1,
            this.state.recordtraceruser1
          ).then(this.recordDeletionUser1())
      );
    });
  };

  payment = () => {
    if (
      this.props.values.user.id === "" ||
      this.props.values.particulars === "" ||
      (this.props.values.transactionMode === "A/C to A/C" &&
        this.props.values.user1.id === "")
    ) {
      alert("Please Confirm your A/C.");
    } else {
      if (+this.props.values.amount !== 0) {
        if (
          this.props.values.transactionMode === "Withdraw" ||
          this.props.values.transactionMode === "Cash"
        ) {
          if (this.props.values.transactionMode === "Withdraw") {
            if (+this.props.values.user.balance >= +this.props.values.amount) {
              this.props.values.user.balance =
                +this.props.values.user.balance - +this.props.values.amount;
              alert("Transaction successful!");
              this.recordProcedure(this.props.values.particulars);
            } else {
              alert("Insufficient Balance!");
            }
          } else {
            this.props.values.user.balance =
              +this.props.values.user.balance + +this.props.values.amount;
            alert("Transaction successful!");
            this.recordProcedure(this.props.values.particulars);
          }
        } else {
          if (
            +this.props.values.user1.balance >= +this.props.values.amount &&
            this.props.values.checkNo !== ""
          ) {
            this.props.values.user1.balance =
              +this.props.values.user1.balance - +this.props.values.amount;
            this.props.values.user.balance =
              +this.props.values.user.balance + +this.props.values.amount;
            alert("Transaction successful!");

            this.recordProcedureUser1(this.props.values.particulars);
            setTimeout(() => {
              this.recordProcedure(this.props.values.particulars);
            }, 2000);
          } else {
            this.props.values.checkNo === ""
              ? alert("Enter check number.should 6 digits only.")
              : alert("Enter Amount!!!!");
          }
        }
      } else {
        alert("Enter amount");
      }
    }
  };
  render() {
    return (
      <div>
        <div id="recaptcha"></div>
        <Table>
          <React.Fragment>
            {" "}
            <tr>
              <td>
                {" "}
                <FormControl
                  type="text"
                  class="form-control"
                  name="particulars"
                  value={this.props.values.particulars}
                  onChange={this.props.account}
                  id="tdstyle"
                  placeholder="Description/Particulars"
                  onBlur={this.props.account}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <FormControl
                  type="text"
                  class="form-control"
                  name="search"
                  value={this.props.values.search}
                  onChange={this.props.account}
                  id="tdstyle"
                  placeholder="Account"
                  onBlur={this.props.account}
                  required
                />{" "}
                <Button onClick={this.props.findACC} size="sm" variant="link">
                  Confirm
                </Button>
              </td>
              <td>
                <FormControl
                  type="number"
                  class="form-control"
                  name="amount"
                  value={this.props.values.amount}
                  onChange={this.props.account}
                  id="tdstyle"
                  placeholder="Amount"
                  onBlur={this.props.account}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <Button onClick={this.payment}>Pay</Button>{" "}
              </td>
            </tr>
          </React.Fragment>
        </Table>
      </div>
    );
  }
}

export default payment;
