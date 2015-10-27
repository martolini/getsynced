import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createHistory } from 'history'

import Parse from 'parse';
import { initializeParse } from './utils/parse';

import App from './components/App';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Update from './components/Update';
import Integrations from './components/Integrations';
import SlackIntegration from './components/SlackIntegration';
import NotFoundPage from './components/NotFoundPage';
import CreateTeam from './components/CreateTeam';
import Setup from './components/Setup';

initializeParse();

function requireAuth(nextState, replaceState) {
  let user = Parse.User.current();
  if (!user) {
    return replaceState({nextPathname: nextState.location.pathname}, '/login');
  }
}

function checkRedirect(nextState, replaceState) {
  let user = Parse.User.current();
  if (user) {
    let team = user.get('team');
    if (!team) {
      return replaceState({nextPathname: nextState.location.pathname}, '/team/create');
    } else {
      return replaceState({nextPathname: nextState.location.pathname}, '/team');
    }
  }
}

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path='create' components={Setup} />
      <Route path="login" component={Login} />
      <Route path="team" component={Dashboard} onEnter={requireAuth}>
        <IndexRoute component={Update} />
        <Route path="integrations" component={Integrations} />
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
  ), document.getElementById('app'));
