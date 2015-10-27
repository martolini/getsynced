import React from 'react';

import {
  PanelGroup,
  Panel
} from 'react-bootstrap';
import io from 'socket.io-client';

import SlackSlashCommand from './SlackSlashCommand';

export default React.createClass({

  componentDidMount() {
    let host = document.location.protocol + '//' + document.location.host;
    let socket = io.connect('http://localhost:5000');
    socket.on('new_update', data => {
      console.log(data);
    });
  },

  panelStepOne() {
    return (
      <PanelGroup defaultActiveKey="1" accordion>
        <Panel header="Add service integration" bsStyle="primary" bsSize="xs" eventKey="1">
          Picture of it here
        </Panel>
        <Panel header="Add slash command" bsStyle="primary" bsSize="xs" eventKey="2">
          Picture here
        </Panel>
        <Panel header="Title" bsStyle="primary" bsSize="xs" eventKey="3">
          <p>Select a command to type to send the update, we use <code>/getsynced</code></p>
          <p className="text-muted">ex</p>
          <code>/getsynced Focused on customer support.</code>
        </Panel>
        <Panel header="Title" bsStyle="primary" bsSize="xs" eventKey="4">
          <input className="form-control" type="text" placeholder="http/" />
        </Panel>
      </PanelGroup>
    );
  },

  render() {
    return (
      <div>
        <h3>Let's integrate Slack</h3>
        <SlackSlashCommand />
      </div>
    );
  }
});
