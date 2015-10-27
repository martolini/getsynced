import React from 'react';

import { Modal } from 'react-bootstrap';

export default React.createClass({

  getInitialState() {
    return {
      showModal: false,
      step: 1,
      update: (<div className="well">
                <i className="fa fa-fw fa-spinner fa-spin"></i>
                Waiting...
              </div>
              )
    };
  },

  close() {
    this.setState({showModal: false});
  },

  open() {
    this.setState({step: 1,showModal: true});
  },

  nextStep() {
    this.setState({step: this.state.step + 1});
  },

  render() {
    let modalData = this.getModalData();
    return (
      <div className="list-group-item">
        <div className="row">
          <div className="col-xs-9">
            <h4 className="list-group-item-heading">Post updates from Slack</h4>
            <span>Every day after work, we write <code>/getsynced Focused on customer support.</code><br />Just like that, everyone is updated.</span>
          </div>
          <div className="col-xs-3">
            <button className="btn btn-success btn-lg pull-right" onClick={this.open}>
              Yes, please
            </button>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{ modalData.title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { modalData.body}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary btn-lg" onClick={this.nextStep}>
            Next<i className="fa fa-arrow-right fa-fw"></i></button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },

  getModalData() {
    switch(this.state.step) {
      case 1:
        return {
          title: 'Step 1 - Configure integrations',
          body: (
            <div>
              <p>Click on your team name in Slack and select <strong>Configure integrations</strong></p>
              <img src="//getsynced.parseapp.com/configure_integrations.png" className="img img-responsive" />
            </div>
          )
        };
      case 2:
        return {
          title: 'Step 2 - Slash Command',
          body: (
            <div>
              <p>Search (or scroll down) to find <strong>Slash Commands</strong></p>
                <img src="//getsynced.parseapp.com/slash_commands.png" className="img img-responsive" />
            </div>
          )
        };
      case 3:
        return {
          title: 'Step 3 - Choose a command',
          body: (
            <div>
              <p>This is the command you will use in slack. We use <code>/getsynced</code></p>
              <img src="//getsynced.parseapp.com/choose_command.png" className="img img-responsive" />
            </div>
          ),
        };
      case 4:
        return {
          title: 'Step 4 - Enter webhook url',
          body: (
            <div>
              <p>Enter the following url [ url ] into the URL field</p>
              <img src="//getsynced.parseapp.com/add_webhook_url.png" className="img img-responsive" />
            </div>
          )
        };
      case 5:
        return {
          title: 'Done! Let\'s test',
          body: (
            <div>
              <p>If you haven't already - scroll down and press <strong className="text-success">Save Integration</strong>.</p>
              <p>Open up Slack and type <code>/getsynced My first update</code>. If you chose something else as the command, replace that with <code>getsynced</code>. Your update will appear here.</p>
              <div className="well">{ this.state.update }</div>
              <p className="text-muted">Feel free to change the description, add autocomplete for slack and mess around with the rest of the settings.</p>
            </div>
          )
        };
    }
  }
});
