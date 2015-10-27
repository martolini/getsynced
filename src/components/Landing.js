import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default React.createClass({

  render() {
    return (
      <Panel>
        <h1>getsyncedio?</h1>
        <Link to='/create' className='btn btn-success btn-lg'>Get started</Link>
      </Panel>
    );
  }
});
