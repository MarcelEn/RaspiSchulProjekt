import React, { Component } from 'react';

import { Image } from 'react-bootstrap';

import { getUserImageUrlByUsername } from '../../globalFunctions';
import LetterImage from '../../components/LetterImage/LetterImage';

class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageAvailable: false
        }
        this.imageIsAvailable = this.imageIsAvailable.bind(this);
    }
    imageIsAvailable() {
        this.setState({ imageAvailable: true })
    }
    render() {
        return (
            this.state.imageAvailable ?
                <Image
                    src={getUserImageUrlByUsername(this.props.username)}
                    circle
                    onLoad={this.imageIsAvailable}
                />
                :
                <LetterImage
                    firstname={this.props.firstname}
                    lastname={this.props.lastname}
                />
        );

    }
}

export default ProfileImage;