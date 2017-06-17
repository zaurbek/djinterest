import axios from 'axios';
import React, { Component } from 'react';
import { Card, Image, Button, Modal, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Djin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      repins: 0,
      errorImage: false,
      imageLink: 'http://eadb.org/wp-content/uploads/2013/09/placeholder.jpg',
      modalOpen: false,
    };
  }
  imageLinkChange() {
    this.setState({ imageLink: this.linkInput.value, errorImage: false });
  }
  formSubmit() {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    if (!this.linkInput.value.match(regex)) {
      this.setState({
        errorImage: true,
      });
    } else if (this.linkInput.value.match(regex) && this.linkInput.value.length > 0 && this.titleInput.value.length > 0) {
      this.props.submitDjin({
        image: this.linkInput.value,
        title: this.titleInput.value,
        creatorName: this.props.user.displayName,
        creatorId: this.props.user.id,
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        likes: [],
        pins: [],
        isLoading: false,
      });
      this.clearModal();
    }
  }
  clearModal() {
    this.setState({
      imageLink: 'http://eadb.org/wp-content/uploads/2013/09/placeholder.jpg',
      errorImage: false,
      modalOpen: false,
    });
  }
  openModal() {
    this.setState({
      modalOpen: true
    })
  }
  onError = (e) => {
    console.log('asdfsadcqwecLOOOOOOOOOOOL');
    e.target.src='https://developers.google.com/maps/documentation/static-maps/images/error-image-generic.png';
  }
  render() {
    const colors = [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'teal',
      'blue',
      'violet',
      'purple',
      'pink',
      'brown',
      'grey',
      'black',
    ];
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
    if (this.props.data === 'new') {
      return (
        <Card className="djin-card" raised>
          <Modal open={this.state.modalOpen}
            onClose={() => this.clearModal()}
            size="small"
            dimmer="blurring"
            trigger={
              <Button onClick={()=> this.openModal()}color={randomColor()} size="massive">
                {' '}Add new Djin{' '}
              </Button>
            }
          >
            <Modal.Header>
              Add new Djin:
            </Modal.Header>
            <Modal.Content>
              <Image 
                centered
                size="medium"
                className="modal-img"
                src={this.state.imageLink}
              />
            </Modal.Content>
            <Modal.Actions>
              <Header as="h3" textAlign="left">Title:</Header>
              <div className="ui fluid icon input">
                <input
                  ref={input => this.titleInput = input}
                  type="text"
                  placeholder="Title..."
                />
              </div>
              <Header as="h3" textAlign="left">Image Link:</Header>
              <div className={this.state.errorImage ? 'error field last-input ui fluid icon input' : "last-input ui fluid icon input"}>
                <input
                  onChange={() => this.imageLinkChange()}
                  ref={input => this.linkInput = input}
                  type="text"
                  placeholder="Link to the image..."
                />
              </div>
              <Button color="green" onClick={() => this.formSubmit()}>
                <Icon name="checkmark" />
                Upload
              </Button>
            </Modal.Actions>
          </Modal>

        </Card>
      );
    }
    return (
      <Card className="djin-card" raised>
        <img className='ui image' onError={(e)=>this.onError(e)} src={this.props.data.image} />
        <Card.Content>
          <Card.Header>{this.props.data.title}</Card.Header>
          <Card.Meta><a href={`/user/${this.props.data.creatorId}`} className='card-link' >{this.props.data.creatorName}</a></Card.Meta>
          {this.props.auth?<div>
          <Button loading={this.props.data.isLoading} onClick={()=>this.props.pinDjin(this.props.user.id, this.props.data.id)} disabled={this.props.data.creatorId===this.props.user.id} size="mini" color="olive" floated="right">
            <i className="right-space fa fa-retweet" aria-hidden="true" />
            {this.props.data.pins.length}
          </Button>
          <Button loading={this.props.data.isLoading} onClick={()=>this.props.likeDjin(this.props.user.id, this.props.data.id)} size="mini" color="teal" floated="right">
            <i className="right-space fa fa-thumbs-o-up" aria-hidden="true" />
            {this.props.data.likes.length}
          </Button>
          {this.props.data.creatorId===this.props.user.id?<Button onClick={()=>this.props.deleteDjin(this.props.data.id)}inverted icon='x' circular size='mini' color='red' floated='left'/>:null}
          </div>:null}
        </Card.Content>
      </Card>
    );
  }
}

export default Djin;
