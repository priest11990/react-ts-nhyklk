import React from "react";
import "./login.css";
import { GoogleLogin } from "react-google-login";
import googleLogo from "../../assets/google.png";
import { SHA256 } from "crypto-js";
import { Login as apiLogin } from "../../_services/api";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { compose } from 'redux'
import { withCookies } from "react-cookie";

interface IAccountInfoState {
  email: string;
  password: string;
  remember: boolean;
}

class Login extends React.Component<{ history: any, t: any, cookies: any }, IAccountInfoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember: false,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  // Hanlde events
  handleChange(event: any) {
    const target = event.target;
    const name = target.name;
    let value;
    if (name === "remember") {
      value = target.checked;
    } else {
      value = target.value;
    }
    const newState = { [name]: value } as Pick<
      IAccountInfoState,
      keyof IAccountInfoState
    >;
    this.setState(newState);
  }
  
  handleSubmit(event: any) {
    this.login(this.state.email, this.state.password).then((res) => {
      if (res) {
        this.props.history.push("/");
      } else {
        // handle error message
        console.log(res);
      }
    });
    event.preventDefault();
  }

  // Promise handling request to api
  login(email: string, password: string) {
    const { cookies } = this.props;
    let promise = new Promise((resolve, reject) => {
      let passwordHash = SHA256(password);
      apiLogin(email, passwordHash.toString())
        .then((response) => {
          if (this.state.remember) {
            cookies.set("GreenMarketToken", response.data.token, {
              maxAge: 2147483647
            })
          } else {
            cookies.set("GreenMarketToken", response.data.token)
          }
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
    // call this.login
    console.log(response);
  };

  // Render webpage
  render() {
    const { t } = this.props
    return (
      <div className="loginPage bg-main flex justify-center text-center">
        <div className="md:w-3/6 m-auto">
          <h1 className="text-8xl font-bold text-white">Logo</h1>
          <form onSubmit={this.handleSubmit}>
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
            <label className="flex justify-between mt-8 ml-4 mr-4">
              <span>
                <input
                  id="rememberMeBtn"
                  type="checkbox"
                  className="form-checkbox"
                  onChange={this.handleChange}
                  name="remember"
                />
                <span className="ml-3 text-white">{t('remember-me')}</span>
              </span>
              <span
                className="text-white" /* use React.Router to forgot password route */
              >
                {t('forgot-password')}
              </span>
            </label>
            <button
              type="submit"
              className="w-full block mt-12 text-salmon font-bold text-2xl rounded-full pt-1 pb-2 focus:outline-none bg-white hover:bg-opacity-80 hover:bg-white"
            >
              {t('login')}
            </button>
          </form>
          <div className="text-white separator pt-4 mb-6 pl-4 pr-4">
            {t('sign-in-with')}
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
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
          <p className="text-white mt-6">
            {t('new-member')}&nbsp;
            <Link className="font-bold underline" to="/register">
              {t('create-account')}
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default compose<React.ComponentType<any>>(
  withTranslation(),
  withCookies
)(Login);
