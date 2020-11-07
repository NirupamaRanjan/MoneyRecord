import React, { Component } from "react";
import Load from "../Spinner/Loader";
import bg from "../../img/slide_3.jpg";
import "./login.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class Login extends Component {
  state = {
    user: {
      id: "",
      pass: "",
    },
    fieldError: {
      idError: "",
      passError: "",
    },
    loading: false,
    box: false,
  };
  userDetailChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    let input = `${[name]}`;
    let field = `${[name]}Error`;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
    this.validation(input, field, value);
  };

  validation = (input, field, value) => {
    let pattern;
    let msg;
    if (input === "pass") {
      pattern = value.length <= 7;
      msg = "Weak Password!";
    }
    if (input === "id") {
      pattern = value.length <= 5;
      msg = "Invalid !";
    }
    this.setState({
      errorDialog: true,
      fieldError: {
        ...this.state.fieldError,
        [field]: value.length === 0 ? "Required!" : pattern ? `${msg}` : "",
      },
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ textAlignLast: "center" }}>
          {this.state.loading && <Load></Load>}
        </div>
        <div>
          {!this.state.loading && (
            <div class="limiter" style={{ backgroundImage: `url(${bg})` }}>
              <div class="container-login100" style={{ zIndex: 2 }}>
                <div class="wrap-login100">
                  <form class="login100-form validate-form">
                    <span class="login100-form-title p-b-34 p-t-27">
                      Log in
                    </span>

                    <div
                      class="wrap-input100 validate-input "
                      data-validate="Enter username"
                    >
                      <input
                        class="input100"
                        name="id"
                        placeholder="ID Number"
                        onChange={this.userDetailChangeHandler}
                      />
                      <span class="focus-input100" data-placeholder=""></span>
                    </div>
                    <h6 style={{ color: "red" }}>
                      {this.state.fieldError.idError}
                    </h6>
                    <div
                      class="wrap-input100 validate-input"
                      data-validate="Enter password"
                    >
                      <input
                        class="input100"
                        type="password"
                        name="pass"
                        placeholder="Password"
                        onChange={this.userDetailChangeHandler}
                      />
                      <span class="focus-input100" data-placeholder=""></span>
                    </div>
                    <h6 style={{ color: "red" }}>
                      {this.state.fieldError.passError}
                    </h6>
                    <div class="contact100-form-checkbox">
                      <input
                        class="input-checkbox100 "
                        id="ckb1"
                        type="checkbox"
                        name="remember-me"
                      />
                      <label class="label-checkbox100" for="ckb1">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <Button
                        variant="link"
                        onClick={() => {
                          if (
                            this.state.user.id === "U00001" &&
                            this.state.user.pass === "98799000"
                          ) {
                            window.location.replace("/HomePage");
                          } else {
                            alert("Invalid ID or password!");
                          }
                        }}
                      >
                        <Link>
                          <h5>Log In</h5>
                        </Link>
                      </Button>

                      <Button variant="link" style={{ paddingLeft: "100px" }}>
                        <Link>
                          <h6>Forgot Password?</h6>
                        </Link>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
