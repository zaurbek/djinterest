import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Masonry from 'react-masonry-component';

import Djin from './Djin.jsx';

class FrontPage extends Component {

  render() {
      let childElements = this.props.djins.map((element,index) => (
                <Djin data={element} />
            ));
      return (
          <div>
              <Masonry
                  className={'djins-div'} // default ''
                  updateOnEachImageLoad={true}
                >
                  {childElements}
                </Masonry>
              <Container text>
              <hr />
              <h4 className="ui right aligned tiny header">
                  <a href="https://github.com/zzhakupov/react-book-club" target="_blank">@zzhakupov</a>
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
