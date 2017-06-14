import React, { Component } from 'react';
import {Menu, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

class TopMenu extends Component {
  render() {
    return (
      <Menu inverted color='blue'>
    <Menu.Item><Link to='/' className='logo'><i className="fa fa-thumb-tack" aria-hidden="true"/> Djinterest</Link></Menu.Item>
    <Menu.Item><a href='https://github.com/zzhakupov/djinterest' target="_blank">Source on <i className="fa fa-github" aria-hidden="true"/> Github</a></Menu.Item>
    <Menu.Menu position="right">
      {this.props.loggedIn ? <Menu.Item>
            <Link to='/'>All djins</Link>
          </Menu.Item>
          :null}
      {this.props.loggedIn ? <Menu.Item>
            <Link to='/my'>My djins</Link>
          </Menu.Item>
          :null}
      {this.props.loggedIn
        ? <Menu.Item><img className="profile_img" src={this.props.user.photos[0].value}/> {this.props.user.displayName}</Menu.Item>
        : null}
      {this.props.loggedIn
        ? <Menu.Item>
            <a href='/logout'>Logout</a>
          </Menu.Item>
        : <Menu.Item>
          <a
            className='button ui primary'
            href='/login/twitter'>
            <i className="fa fa-twitter" aria-hidden="true"/>  Login with Twitter
          </a>
        </Menu.Item>}
    </Menu.Menu>
  </Menu>
    )
  }
  
}

TopMenu.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object
};

export default TopMenu;