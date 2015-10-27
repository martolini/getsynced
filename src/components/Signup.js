import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Parse from 'parse';
import { Link, History } from 'react-router';

const Signup = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },

  handleParseError(error) {
    this.setState({errorMessage: error.message});
  },

  createUser() {
    let that = this;
    let user = new Parse.User();
    user.set('username', this.state.email);
    user.set('email', this.state.email);
    user.set('password', this.state.password);
    user.signUp(null, {
      success(_user) {
        that.history.pushState(null, '/team/create');
      },
      error: function(user, error) {
        that.handleParseError(error);
      }
    });
  },

  handleSubmit(e) {
    this.setState({errorMessage: ''});
    e.preventDefault();
    this.createUser();
  },

  render() {
    let alert = (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close" onClick={this.handleParseError.bind(this, {message: ''})}>×</button>
        <strong>Oh snap,</strong> { this.state.errorMessage }
      </div>
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Sign up</h4>
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
                          valueLink={this.linkState('email')}/>
                    </div>
                  </div>
                    <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-fw"></i>
                      </span>
                      <input className="form-control" type="password" placeholder="******"
                          valueLink={this.linkState('password')}/>
                    </div>
                  </div>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-lg">Sign up</button>
                </form>
              </div>
              <div className="panel-footer">
                <Link to="/login">Already have an account? Log in here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Signup;
