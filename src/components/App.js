import React from 'react';
import Reflux from 'reflux';
import Parse from 'parse';
import ParseReact from 'parse-react';
import { Link, History } from 'react-router';
require('./App.css');

import Navbar from './Navbar';


const App = React.createClass({
  mixins: [History, ParseReact.Mixin],

  handleLogout(e) {
    e.preventDefault();
    Parse.User.logOut();
    document.location = '/';
  },

  render() {
    let teamName;
    if (!!this.data.user && this.data.user.team) {
      teamName = this.data.user.team.name;
    }
    return (
      <div>
        <Navbar
          user={this.data.user}
          logoutHandler={this.handleLogout}
        />
        <div className="container">
          { React.cloneElement(this.props.children, {user: this.data.user}) }
        </div>
      </div>
    )
  },

  observe() {
    if (!Parse.User.current()) {
      return {
        user: ParseReact.currentUser
      };
    }
    let query = new Parse.Query('_User');
    query.include('team');
    return {
      user: query.observeOne(Parse.User.current().id)
    };
  }
});

module.exports = App;
