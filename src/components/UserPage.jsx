import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';

import Djin from './Djin.jsx';

class UserPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchUserBoard(this.props.history.location.pathname.slice(6));
  }
  render() {
    let djins = this.props.djins.map((item, index) => {
      return <Djin key={item.id} data={item} user={this.props.user}/>;
    });
    console.log(this.props.history.location.pathname.slice(6));
    return (
      <div>
        <Masonry className={'djins-div'} updateOnEachImageLoad>
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
};

export default UserPage;
