import React from 'react';
import { Link } from 'react-router';
import Parse from 'parse';
import ParseReact from 'parse-react';


const Navbar = React.createClass({

  renderLoggedin() {
    let logoLink = <Link className="navbar-brand" to="/">getsynced.io</Link>;
    // if (!!this.props.user.team) {
    //   logoLink = <Link className="navbar-brand" to="/team/">{ this.props.user.team.name }</Link>;
    // }
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            { logoLink }
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">
              <li>
                <Link
                  to="/team/integrations/"
                  activeClassName="active">
                  <i className="fa fa-fw fa-plug"></i>Integrations
                </Link>
              </li>
            </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="/logout" onClick={this.props.logoutHandler} >Logout</a></li>
              </ul>
          </div>
        </div>
      </nav>
    );
  },

  render() {
    if (!!this.props.user) {
      return this.renderLoggedin();
    }
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">getsynced.io</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/create">Get started</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
