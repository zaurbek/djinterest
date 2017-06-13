import React from 'react';
import PropTypes from 'prop-types';
import { Container, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'


const FrontPage = ({ loggedIn }) => (
  <div>
  {loggedIn?<Redirect to="/all"/>:<div><div className='jumbotron'>
                    <div className='jumbo-names'>
                        <h1><i className="fa fa-thumb-tack" aria-hidden="true"/> Djinterest</h1>
                        <h4>Start trading books Today!</h4>
                    </div>
                </div>
                <Container text className='frontpage'>
                    <h1>Features:</h1>
                    <List className='features-list' ordered divided relaxed >
                        <List.Item>
                            <List.Content>
                                <List.Header>As an unauthenticated user, I can login with Twitter.</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>As an authenticated user, I can link to images.</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>As an authenticated user, I can delete images that I've linked to.</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>As an unauthenticated user, I can browse other users' walls of images.</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)
</List.Header>
                            </List.Content>
                        </List.Item>
                    </List>
                    <hr />
                     <h4 className="ui right aligned tiny header"><a href="https://github.com/zzhakupov/react-book-club" target="_blank">@zzhakupov</a></h4>
                </Container></div>}
                </div>
);

FrontPage.propTypes= {
  loggedIn: PropTypes.bool.isRequired
}

export default FrontPage;