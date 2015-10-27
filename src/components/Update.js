import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import UserStore from '../stores/UserStore';


export default React.createClass({
  mixins: [ParseReact.Mixin, LinkedStateMixin],

  getInitialState() {
    return {
      updateText: ''
    };
  },

  handleSubmitUpdate(e) {
    e.preventDefault();
    let update = ParseReact.Mutation.Create('Update', {
      team: this.props.user.team,
      user: Parse.User.current(),
      text: this.state.updateText
    });
    update.dispatch();
    this.setState({updateText: ''});
  },

  render() {
    if (!this.data.updates) {
      return <div>Loading...</div>
    }
    let updates = this.data.updates.map(update => {
      return (
        <div key={update.id} className="list-group-item">{ update.text }</div>
      );
    });
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <h4>Write an update</h4>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Did customer support, apparently all our users love the new update from @someone"
                  valueLink={this.linkState('updateText')} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmitUpdate} >Send</button>
            </form>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="list-group">
              { updates }
            </div>
          </div>
        </div>
      </div>
    );
  },

  observe(nextProps, nextState) {
    if (!!nextProps.user) {
      let query = new Parse.Query("Update");
      query.include('User');
      query.equalTo('team', nextProps.user.team);
      query.descending('createdAt');
      return {
        updates: query
      };
    }
  }
});
