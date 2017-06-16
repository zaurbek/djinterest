import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Masonry from 'react-masonry-component';

import Djin from './Djin.jsx';

class FrontPage extends Component {
  render() {
    let djins = this.props.djins.map((item, index) => (
      <Djin data={item} key={item.id}/>
    ));
    return (
      <div>
        <Masonry
          className={'djins-div'} // default ''
          updateOnEachImageLoad
        >
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

FrontPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  djins: PropTypes.array,
};

export default FrontPage;
