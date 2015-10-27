import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Parse from 'parse';
import ParseReact from 'parse-react';
import { History } from 'react-router';
import { Row, Col, Panel } from 'react-bootstrap';

export default React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState() {
    return {
      name: '',
      errorMessage: '',
      fetching: false,
      step: 1
    }
  },

  handleError(message) {
    this.setState({errorMessage: message});
  },

  componentDidMount() {
    this._inputField.focus();
  },

  createTeam(e) {
    e.preventDefault()
    this.setState({fetching: true});
    let name = this.state.name.trim();
    let Team = Parse.Object.extend("Team");
    let team = new Team();
    team.set('name', name);
    let that = this;
    team.save(null, {
      success(result) {
        let mutation = ParseReact.Mutation.Set(that.props.user, {
          team: result.toPlainObject()
        });
        mutation.dispatch();
        that.history.pushState(null, '/team/integrations');
        that.setState({fetching: false});
      },
      error(err) {
        that.handleError(err.message);
        that.setState({fetching: false});
      }
    });
  },

  getAlert() {
    return (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close" onClick={this.handleError.bind(this, '')}>×</button>
        <strong>Oh snap,</strong> { this.state.errorMessage }
      </div>
    );
  },

  render() {
    let alert = (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close" onClick={this.handleError.bind(this, '')}>×</button>
        <strong>Oh snap,</strong> { this.state.errorMessage }
      </div>
    );
    return (
      <Row>
        <Col xs={6} xsOffset={3}>
          <h4>What team should we sync?</h4>
          <Panel>
            <form className="form form-inline">
              <div className="form-group">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-users fa-fw"></i>
                  </span>
                  <input className="form-control" type="text" placeholder="getsynced"
                    valueLink={this.linkState('name')}
                    ref={(ref) => { this._inputField = ref; }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.createTeam}>{ spinner }Sync team</button>
            </form>
          </Panel>
        </Col>
      </Row>
    );
  }
});
