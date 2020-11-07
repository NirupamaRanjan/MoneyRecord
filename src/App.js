import React, { Component } from "react";
import Login from "./component/Login/Login";
import HomePage from "./component/HomePage/HomePage";
import Customer from "./component/CustomerDetails/index";
import { Route, Switch, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./css/style.css";
import { Online, Offline } from "react-detect-offline";
import "./App.css";
import CreditDebitForm from "./component/CreditDebitForm/Form";
import PassBook from "./ShowPassBook/index";
export default class App extends Component {
  state = {
    modal: false,
    oldPathName: "",
    pathName: "",
  };
  componentDidMount() {
    this.setState({ pathName: window.location.pathname });
  }
  routingHandler = (path) => {
    if (window.location.pathname !== `/CreditDebitForm`) {
      this.setState({
        modal: this.state.pathName === `/${path}` ? true : false,
        pathName:
          this.state.pathName !== `/${path}` ? `/${path}` : this.state.pathName,
        oldPathName: path,
      });
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  render() {
    return (
      <React.Fragment>
        <Online>
          <header id="header" class="fixed-top">
            <div class="container">
              <div class="logo float-left">
                <h1 class="text-light">
                  <a href="">
                    <span>KhataBook</span>
                  </a>
                </h1>
              </div>

              <nav class="nav-menu float-right d-none d-lg-block">
                {window.location.pathname === "/" ? null : (
                  <ul>
                    <li>
                      <Link
                        to={`HomePage`}
                        onClick={() => this.routingHandler("HomePage")}
                      >
                        <h6
                          style={{
                            color:
                              window.location.pathname === "/HomePage"
                                ? "White"
                                : null,
                          }}
                        >
                          Home
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`Customer`}
                        onClick={() => {
                          this.routingHandler("Customer");
                        }}
                      >
                        <h6
                          style={{
                            color:
                              window.location.pathname === "/Customer"
                                ? "White"
                                : null,
                          }}
                        >
                          CustomerList
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`CreditDebitForm`}
                        onClick={() => {
                          this.routingHandler("CreditDebitForm");
                        }}
                      >
                        <h6
                          style={{
                            color:
                              window.location.pathname === "/CreditDebitForm"
                                ? "White"
                                : null,
                          }}
                        >
                          Credit/Debit
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <li>
                        <Link
                          to={`PassBook`}
                          size="sm"
                          onClick={() => this.routingHandler("PassBook")}
                        >
                          <h6
                            style={{
                              color:
                                window.location.pathname === "/PassBook"
                                  ? "White"
                                  : null,
                            }}
                          >
                            Show Entries
                          </h6>
                        </Link>
                        <Button
                          onClick={() => window.location.replace("/")}
                          variant="link"
                        >
                          Log Out
                        </Button>
                      </li>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </header>
          <hr />
          <Switch>
            {window.location.pathname === "/" ? (
              <Route path="/" exact component={Login} />
            ) : (
              <section style={{ minHeight: "500px" }}>
                <Route path="/HomePage" component={HomePage} />
                <Route path="/Customer" component={Customer} />
                <Route path="/CreditDebitForm" component={CreditDebitForm} />
                <Route path="/PassBook" component={PassBook} />
              </section>
            )}
          </Switch>
          <section id="contact" class="contact section-bg">
            <div style={{ textAlign: "center" }}>
              <h4>ContactUs</h4>
              <p>
                <h6>A108 Adam Street New York, NY 535022</h6>
              </p>
              <p>
                <h6>info@example.com</h6>
              </p>
              <p>
                <h6>+1 5589 55488 55s</h6>
              </p>
            </div>
          </section>
          <footer id="footer">
            <div class="container">
              <div class="copyright">
                &copy; Copyright{" "}
                <strong>
                  <span>KhataBook</span>
                </strong>
                . All Rights Reserved
              </div>
              <div class="credits">
                Designed by{" "}
                <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
          </footer>
        </Online>
        <Offline>
          <div style={{ textAlign: "center" }}>
            <p>
              <h3>
                You are not connected with internet.Check your internet
                connection.
              </h3>
            </p>
          </div>
        </Offline>
      </React.Fragment>
    );
  }
}
