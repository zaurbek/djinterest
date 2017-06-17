import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Masonry from 'react-masonry-component';

import Djin from './Djin.jsx';

class FrontPage extends Component {
  componentDidMount() {
    this.props.fetchWholeBoard();
  }
  render() {
    let djins = this.props.djins.map((item, index) => (
      <Djin data={item} pinDjin={this.props.pinDjin} likeDjin={this.props.likeDjin} user={this.props.user} auth={this.props.loggedIn} deleteDjin={this.props.deleteDjin} key={item.id}/>
    ));
    return (
      <div>
        <Masonry
          className='djins-div'
          updateOnEachImageLoad
        >
          {djins}
        </Masonry >
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

FrontPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  djins: PropTypes.array,
  fetchWholeBoard: PropTypes.func.isRequired,
  deleteDjin: PropTypes.func.isRequired,
  likeDjin: PropTypes.func.isRequired,
  pinDjin: PropTypes.func.isRequired,
};

export default FrontPage;
