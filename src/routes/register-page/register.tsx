import React from "react";
import "./register.css";
import { GoogleLogin } from "react-google-login";
import googleLogo from "../../assets/google.png";
import { SHA256 } from "crypto-js";
import { SignUp as apiSignUp } from "../../_services/api";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

interface IAccountInfoState {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  accountType: string;
}

class Register extends React.Component<{ history: any, t: any }, IAccountInfoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      accountType: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Hanlde events
  handleChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newState = { [name]: value } as Pick<
      IAccountInfoState,
      keyof IAccountInfoState
    >;
    this.setState(newState);
  }

  handleSubmit(event: any) {
    if (this.state.password === this.state.repeatPassword) {
      this.signup(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.accountType
      ).then((res) => {
        if (res) {
          this.props.history.push("/login");
        } else {
          // handle error message
          console.log(res);
        }
      });
    } else {
      console.log("password is different");
    }
    console.log(this.state);
    event.preventDefault();
  }

  // Promise handling request to api
  signup(
    username: string,
    email: string,
    password: string,
    accountType: string
  ) {
    let promise = new Promise((resolve, reject) => {
      let passwordHash = SHA256(password);
      apiSignUp(username, email, passwordHash.toString(), accountType)
        .then((response) => {
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
    return promise;
  }

  // Google login
  responseGoogle = (response: any) => {
    // verify it worked and call this.signup
    console.log(response);
  };

  // Render webpage
  render() {
    const { t } = this.props
    return (
      <div className="registerPage bg-main flex justify-center text-center">
        <div className="md:w-3/6 m-auto">
          <h1 className="text-8xl font-bold text-white">Logo</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="form-input mt-8 block w-full border-2 text-white border-white placeholder-white rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-white focus:outline-none focus:bg-white focus:text-black focus:ring-0 focus:border-transparent"
              name="username"
              type="text"
              placeholder={t('username')}
              onChange={this.handleChange}
            />
            <input
              className="form-input mt-8 block w-full border-2 text-white border-white placeholder-white rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-white focus:outline-none focus:bg-white focus:text-black focus:ring-0 focus:border-transparent"
              name="email"
              type="email"
              placeholder="E-mail"
              onChange={this.handleChange}
            />
            <input
              className="form-input mt-8 block w-full border-2 text-white border-white placeholder-white rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-white focus:outline-none focus:bg-white focus:text-black focus:ring-0 focus:border-transparent"
              name="password"
              type="password"
              placeholder={t('password')}
              onChange={this.handleChange}
            />
            <input
              className="form-input mt-8 block w-full border-2 text-white border-white placeholder-white rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-white focus:outline-none focus:bg-white focus:text-black focus:ring-0 focus:border-transparent"
              name="repeatPassword"
              type="password"
              placeholder={t('repeat-password')}
              onChange={this.handleChange}
            />
            <div className="flex justify-around mt-12">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-black"
                  name="accountType"
                  value="Student"
                  onChange={this.handleChange}
                />
                <span className="ml-2 text-white">Student</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio text-black"
                  name="accountType"
                  value="Host"
                  onChange={this.handleChange}
                />
                <span className="ml-2 text-white">Host</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio text-black"
                  name="accountType"
                  value="ServiceProvider"
                  onChange={this.handleChange}
                />
                <span className="ml-2 text-white">Service Provider</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full block mt-12 text-salmon font-bold text-2xl rounded-full pt-1 pb-2 focus:outline-none bg-white hover:bg-opacity-80 hover:bg-white"
            >
              {t('sign-up')}
            </button>
          </form>
          <div className="text-white separator pt-4 mb-6 pl-4 pr-4">
            {t('sign-up-with')}
          </div>
          <GoogleLogin
            clientId="435001531571-aolerdljkcbrobj2qarsk6u9f87i3nrh.apps.googleusercontent.com"
            jsSrc="https://apis.google.com/js/platform.js"
            render={(renderProps) => (
              <button
                className="rounded-full w-14 h-14 bg-white mx-auto focus:outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img
                  className="w-12 h-12 mx-auto"
                  src={googleLogo}
                  alt="Sign in with Google"
                />
              </button>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        <p className="text-white mt-6">
          {t('have-account')}&nbsp;
          <Link className="font-bold underline" to="/login">
             {t('login')}
          </Link>
        </p>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Register);