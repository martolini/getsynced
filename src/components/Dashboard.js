import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';


export default React.createClass({

  render() {
    if (!this.props.user) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            { React.cloneElement(this.props.children, { user: this.props.user }) }
          </div>
        </div>
      </div>
    );
  },

});
