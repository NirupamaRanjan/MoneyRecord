import React, { Component } from "react";
import about_2 from "../../images/about_2.jpg";
import { Cart, CreditCard, Wallet } from "react-bootstrap-icons";
import Load from "../Spinner/Loader";
class HomePage extends Component {
  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
  }
  state = { email: "", loading: true };
  // setUp = () => {
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha",
  //     {
  //       size: "invisible",
  //       callback: function (response) {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         this.onSignInSubmit();
  //       },
  //     }
  //   );
  // };
  // onSignInSubmit = (event) => {
  //   event.preventDefault();
  //   this.setUp();
  //   var phoneNumber = "+919687713204";
  //   var appVerifier = window.recaptchaVerifier;
  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(phoneNumber, appVerifier)
  //     .then(function (confirmationResult) {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //     })
  //     .catch(function (error) {
  //       // Error; SMS not sent
  //       // ...
  //     });
  // };
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div style={{ zIndex: "2" }}>
            <Load />
          </div>
        ) : (
          <div class="site-section" id="next">
            <div class="container">
              <div class="row mb-5">
                <div
                  class="col-md-4 text-center aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay=""
                >
                  <Wallet size={60}></Wallet>
                  <h3 class="card-title">Money Savings</h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                  <div id="recaptcha"></div>
                </div>

                <div
                  class="col-md-4 text-center aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <Cart size={60} style={{ color: "Red" }}></Cart>
                  <h3 class="card-title">Online Shoppings</h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
                <div
                  class="col-md-4 text-center aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <CreditCard size={60} style={{ color: "Blue" }}></CreditCard>
                  <h3 class="card-title">Credit / Debit Cards</h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>

              <div class="row">
                <div
                  class="col-lg-6 mb-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay=""
                >
                  <figure class="circle-bg">
                    <img
                      src={about_2}
                      alt="Free Website Template by Free-Template.co"
                      class="img-fluid"
                    />
                  </figure>
                </div>
                <div
                  class="col-lg-5 ml-auto aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div class="mb-4">
                    <h3 class="h3 mb-4 text-black">Amortization Computation</h3>
                    <p>
                      A small river named Duden flows by their place and
                      supplies it with the necessary regelialia.
                    </p>
                  </div>

                  <div class="mb-4">
                    <form action="#">
                      <div class="form-group d-flex align-items-center">
                        <input
                          type="text"
                          class="form-control mr-2"
                          placeholder="Enter your email"
                          value={this.state.email}
                          onChange={(event) => {
                            this.setState({ email: event.target.value });
                          }}
                        />
                        <input
                          type="submit"
                          class="btn btn-primary"
                          value="Submit Email"
                          onClick={() => {
                            window.Email.send({
                              SecureToken:
                                "5ce46d7f-3fc8-47d6-b582-f3d97c95d92f",
                              To: `${this.state.email}`,
                              From: "noreplay.elpayment@gmail.com",
                              Subject: "Hello ",
                              Body: " Welcome user.",
                            });
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;
