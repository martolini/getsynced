import React from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';

const possibleIntegrations = [
// {
//   name: 'Slack',
//   slug: 'slack',
//   description: 'Get daily updates in any slack channel, and post the update directly from slack',
//   imageUrl: 'https://edgebet.heyupdate.com/images/integrations/slack/logo_120.png?v=20151023181814'
// },
{
  name: 'Github',
  slug: 'github',
  description: 'Automatically add any work through Github to the daily updates',
  imageUrl: 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png'
}];

const Integrations = React.createClass({
  render() {
    let integrations = possibleIntegrations.map((integration, index) => {
      return (
        <Link to={ '/team/integrations/' + integration.slug } className='list-group-item' key={index}>
          <div className="row">
            <div className="col-xs-1">
              <img className="img img-responsive" src={integration.imageUrl} />
            </div>
            <div className="col-xs-8">
              <h4 className="list-group-item-heading">{ integration.name }</h4>
              <span className="list-group-item-text">{ integration.description }</span>
            </div>
            <div className="col-xs-3">
              <button type="button" className="btn btn-primary pull-right">Add</button>
            </div>
          </div>
        </Link>
      );
    })
    return (
      <div>
        <div className="list-group">
          { integrations }
        </div>
      </div>
    );
  }
});

module.exports = Integrations;
