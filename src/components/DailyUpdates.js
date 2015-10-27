import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';

const Dashboard = React.createClass({
  mixins: [ParseReact.Mixin],
  observe() {
    return {
      updates: new Parse.Query('DailyUpdates');
    }
  }
  render() {
    return (
      <h1>What did you do today?</h1>
    );
  }
});

module.exports = Dashboard;
