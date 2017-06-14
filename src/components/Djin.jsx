import React, {Component} from 'react';
import {Card, Image, Button } from 'semantic-ui-react';

class Djin extends Component {
    constructor(props) {
        super(props);
        this.state={
            likes: 0,
            repins: 0
        }
    }
    render() {

        return (
            <Card className='djin-card' raised>
                <Image src='http://s00.yaplakal.com/pics/pics_original/4/6/8/8310864.jpg'/>
                <Card.Content>
                    <Card.Header>Funny Cat</Card.Header>
                    <Card.Meta>Free Code Camp</Card.Meta>
                    <Button size='mini' color='teal' floated='left'><i className="fa fa-thumbs-o-up" aria-hidden="true"/> {this.state.likes}</Button>
                    <Button size='mini' color='olive' floated='right'><i className="fa fa-retweet" aria-hidden="true"/> {this.state.repins}</Button>
                </Card.Content>
            </Card>
        )

    }
}

export default Djin;