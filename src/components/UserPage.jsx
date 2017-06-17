import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';

import Djin from './Djin.jsx';

class UserPage extends Component {
  componentDidMount() {
    this.props.fetchUserBoard(this.props.history.location.pathname.slice(6));
  }
  render() {
    let djins = this.props.djins.map((item) => {
      if (item.creatorId === this.props.history.location.pathname.slice(6)||item.pins.indexOf(this.props.history.location.pathname.slice(6))>-1) {
        return <Djin pinDjin={this.props.pinDjin} likeDjin={this.props.likeDjin} deleteDjin={this.props.deleteDjin} key={item.id} auth={this.props.loggedIn} data={item} user={this.props.user}/>;  
        
      }
    });
    return (
      <div>
        <Masonry className='djins-div' updateOnEachImageLoad>
          {this.props.user.id===this.props.history.location.pathname.slice(6)?<Djin data="new" user={this.props.user} submitDjin={(object)=>this.props.submitDjin(object)}/>:null}
          {djins}
        </Masonry>
        <Container text>
          <hr />
          <h4 className="ui right aligned tiny header">
            <a
              href="https://github.com/zzhakupov/react-book-club"
              target="_blank"
            >
              @zzhakupov
            </a>
          </h4>
        </Container>
      </div>
    );
  }
}

UserPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  djins: PropTypes.array,
  submitDjin: PropTypes.func.isRequired,
  fetchUserBoard: PropTypes.func.isRequired,
  deleteDjin: PropTypes.func.isRequired,
  likeDjin: PropTypes.func.isRequired,
  pinDjin: PropTypes.func.isRequired,
};

export default UserPage;
