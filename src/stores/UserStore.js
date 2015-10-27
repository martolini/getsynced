import React from 'react';
import Reflux from 'reflux';

import UserActions from '../actions/UserActions';

let user = undefined;

export default Reflux.createStore({
  listenables: [UserActions],

  getInitialState() {
    return user;
  },

  authenticatedUser(_user) {
    user = _user;
    this.trigger(user);
  },

  addedTeam(team) {
    user.team = team;
    this.trigger(user);
  },

  loggedOut() {
    user = undefined;
  },

  getUser() {
    return user;
  }

});
