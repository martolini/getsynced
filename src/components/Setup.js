import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import { Row, Col, Panel, Input, Button , Image } from 'react-bootstrap';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import request from 'superagent';
import socketio from 'socket.io-client';
import { Link } from 'react-router';

export default React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      email: '',
      incomingWebhookUrl: '',
      webhookResultMessage: '',
      password: '',
      emailErrorMessage: '',
      webhookUrlDisabled: false
    };
  },

  createUser(e) {
    e.preventDefault();
    let user = new Parse.User();
    user.set('username', this.state.email);
    user.set('email', this.state.email);
    user.set('password', this.state.password);
    let that = this;
    user.signUp(null, {
      success(_user) {
        that.setState({emailErrorMessage: ''});
      },
      error(user, error) {
        that.setState({emailErrorMessage: error.message});
      }
    });
  },

  testIncomingWebhook(e) {
    e.preventDefault();
    let url = this.state.incomingWebhookUrl.trim();
    if (url.length == 0) {
      return this.setState({webhookResultMessage: 'You need to put in an url.. ?', webhookUrlDisabled: false});
    }
    this.setState({webhookUrlDisabled: true});
    request
      .post('/webhooks/slack/test/')
      .send({
        url: this.state.incomingWebhookUrl
      })
      .end((err, res) => {
        if (!err) {
          let Team = Parse.Object.extend('Team');
          let team = new Team();
          team.set('teamId', this.state.incomingWebhookUrl.split('/')[4])
          team.set('incomingWebhookUrl', this.state.incomingWebhookUrl)
          let that = this;
          team.save(null, {
            success(result) {
              let mutation = ParseReact.Mutation.Set(that.props.user, {
                team: result
              });
              mutation.dispatch()
            },
            error(err) {
              console.log('error....?', err);
            }
          });
          let socket = socketio.connect(document.location.protocol + '//' + document.location.host);
          socket.on(team.get('teamId'), data => {
            this.setState({syncResult: data});
            socket.disconnect();
          });
          this.setState({team: team, webhookResultMessage: 'Great, it works! Now onto the last step.', webhookUrlDisabled: false});
        } else {
          this.setState({webhookUrlDisabled: false, webhookResultMessage: 'Oh, something went wrong. Check the URL once more.'});
        }
      });
  },

  render() {
    let emailInput = (
      <form>
        <Input bsSize='large'
          type="email" addonBefore={<i className="fa fa-fw fa-envelope-o"></i>}
          placeholder='your@email.com'
          valueLink={this.linkState('email')}
        />
        <Input bsSize='large'
          type='password' addonBefore={<i className="fa fa-fw fa-key"></i>}
          placeholder='*****'
          valueLink={this.linkState('password')}
        />
        <Button type="submit" bsStyle="primary" onClick={this.createUser}>Send</Button>
      </form>
    );
    let webhookUrl = 'http://getsynced.io/webhooks/slack/';
    if (!!this.props.user) {
      emailInput = (
        <Input bsSize='large'
          type="email" addonBefore={<i className="fa fa-fw fa-envelope-o text-success"></i>}
          placeholder='your@email.com'
          value={this.props.user.email}
          disabled
          addonAfter={<i className="fa fa-fw fa-check text-success"></i>}
          />
      );
    }
    let syncResult = null;
    if (this.state.syncResult) {
      syncResult = (<p className="lead text-success">
                      { this.state.syncResult.user_name }: {this.state.syncResult.text}
                    </p>
      );
    }
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Panel className="panel-article">
              <h2>Set up getsynced with Slack</h2>
              <Row>
                <Col xs={12} md={12}>
                  <article>
                    <section>
                      <h4>Step one</h4>
                      { emailInput }
                      { this.state.emailErrorMessage && <p className="text-danger">{ this.state.emailErrorMessage }</p>}
                    </section>
                  </article>
                  <article>
                    <section>
                      <h4>Step two</h4>
                      <p className="lead">1. Open slack, click the arrow right next to your team, and <code>Configure Integrations</code></p>
                      <Image className="setup-image" src="//getsynced.parseapp.com/configure_integrations.png" responsive />
                    </section>
                    <section>
                      <p className="lead">2. Search (or scroll down) to find <code>Incoming Webhooks</code></p>
                      <Image className="setup-image" src="//getsynced.parseapp.com/select_incoming_webhook.png" responsive />
                    </section>
                    <section>
                      <p className="lead">3. Select a channel to post the updates to. We use <code>#getsynced</code></p>
                      <Image className="setup-image" src="//getsynced.parseapp.com/add_webhook_integration.png" responsive />
                    </section>
                    <section>
                      <p className="lead">4. Copy the Webhook URL</p>
                      <Image className="setup-image" src="//getsynced.parseapp.com/copy_webhook_url.png" />
                    </section>
                    <section>
                      <p className="lead">5. Post the Webhook URL here to test</p>
                      <Input bsSize="large"
                        type="url"
                        addonBefore={<i className="fa fa-fw fa-globe"></i>}
                        placeholder="https://hooks.slack.com/services/T0D5L32KY/B0D23s9J/Of23U91ADGuOl1OCc"
                        valueLink={this.linkState('incomingWebhookUrl')}
                        disabled={this.state.webhookUrlDisabled || !this.props.user}
                        buttonAfter={<Button onClick={this.testIncomingWebhook} bsStyle="primary">Test the webhook</Button>}
                        />
                      { this.state.webhookResultMessage && <strong className="text-success">{ this.state.webhookResultMessage }</strong> }
                    </section>
                  </article>
                  <article>
                    <section>
                      <h4>Step three</h4>
                      <p className="lead">1. Go back to <code>Configure Integrations</code>, this time select <code>Slash Commands</code></p>
                      <Image className="setup-image" src="//getsynced.parseapp.com/select_slack_commands.png" response />
                    </section>
                    <section>
                      <p className="lead">2. Select a command to use, we use <code>/getsynced</code></p>
                      <Image className="setup-image" src="//getsynced.parseapp.com/choose_command.png" response />
                    </section>
                    <section>
                      <p className="lead">3. Copy the URL below into the URL field on the page.</p>
                      <Image className="setup-image" src="//getsynced.parseapp.com/add_webhook_url.png" response />
                      <br />
                      <br />
                      <div><code>{ webhookUrl }</code></div>
                      <p>On this page you can also add a description, autocomplete text and so forth. We'll keep this setup to a bare minimum.</p>
                    </section>
                    <section>
                      <p className="lead">4. Let's test this!</p>
                      <p>Open up slack and type <code>/getsynced This is a test</code>.</p>
                      { syncResult }
                    </section>
                    <section>
                      <h4>All done. What's next?</h4>
                      <p className="lead">Your entire Slack team can now use the command you set up. Whenever you're done for the day, simply type <code>/getsynced This is what I did today</code>. Your whole team will get a full update 8AM every morning!</p>
                      <ul>
                        <li><Link to='/team/integrations'>More integrations</Link></li>
                        <li><Link to='/team'>Go to your dashboard</Link></li>
                        <li><Link to='/team/invite'>Invite your team members</Link></li>
                      </ul>
                    </section>
                  </article>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
});
