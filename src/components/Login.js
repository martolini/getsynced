import React from 'react';
import Parse from 'parse';

import { Link, History } from 'react-router';


const Login = React.createClass({
  mixins: [History],

  getInitialState() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },

  onChangeEmail(e) {
    this.setState({email: e.target.value});
  },

  onChangePassword(e) {
    this.setState({password: e.target.value});
  },

  handleSubmit(e) {
    e.preventDefault();
    let that = this;
    Parse.User.logIn(this.state.email, this.state.password, {
      success(user) {
        let { location } = that.props;
        if (location.state && location.state.nextPathname) {
          that.history.replaceState(null,
                        location.state.nextPathname);
        }
        else {
          that.history.replaceState(null, '/team');
        }
      },
      error(user, err) {
        that.setState({errorMessage: err.message});
      }
    });
  },

  render() {
    let alert = (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close" data-dismiss="alert">×</button>
        <strong>Oh snap!</strong> { this.state.errorMessage }
      </div>
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Login</h4>
              </div>
              <div className="panel-body">
                { this.state.errorMessage && alert }
                <form className="form-horizontal">
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope-o fa-fw"></i>
                      </span>
                      <input className="form-control" type="email" placeholder="email"
                          value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                  </div>
                    <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-fw"></i>
                      </span>
                      <input className="form-control" type="password" placeholder="******"
                          value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                  </div>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-lg">Login</button>
                </form>
              </div>
              <div className="panel-footer">
                <Link to="/signup">Don't have an account? Sign up here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
