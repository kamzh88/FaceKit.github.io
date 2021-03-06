import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import { fireAuth } from './fireApi';
import withAuthProtection from "./withAuthProtection";
import Profile from "./pages/Profile";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import SignUpForm from "./components/SignUpForm";

const ProtectedProfile = withAuthProtection("/login")(Profile);

class App extends Component {

  state = {
    me: fireAuth.currentUser
  };

  componentDidMount() {
    fireAuth.onAuthStateChanged(me => {
      this.setState({ me });
    });
  }

  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      return history.push("/profile");
    });
  };

  handleSignUp = history => (email, password) => {
    console.log(email);
    return fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      return history.push("/profile");
    })
  }

  render() {
    const { me } = this.state;
    const email = _.get(me, "email");

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => (
            <Wrapper>
              <Link to="/login" style={{ marginRight: 16 }}>
                Login
            </Link>
              <Link to="/public" style={{ marginRight: 16 }}>
                Public
            </Link>
              <Link to="/profile">Profile</Link>
              <Home />
            </Wrapper>
          )}
          />
          <Route path="/login" exact render={({ history }) => (
            <Wrapper>
              <Link to="/">Home</Link>
              <LoginForm onSubmit={this.handleSignIn(history)} />
              <Link to="/Signup">SIGNUP</Link>
            </Wrapper>
          )}
          />
          <Route path="/Signup" exact render={({ history }) => (
            <Wrapper>
              <Link to="/">Home</Link>
              <SignUpForm onSubmit={this.handleSignUp(history)}/>
            </Wrapper>
          )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <Wrapper>
                <Link to="/">Home</Link>
                <ProtectedProfile me={this.state.me} displayName={email}{...props} />
              </Wrapper>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
