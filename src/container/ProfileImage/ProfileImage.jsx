import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Image } from 'react-bootstrap';

import LoginDumb from '../../components/Login/Login.jsx';

import { getUserImageUrlById } from '../../globalFunctions';
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
                    src={getUserImageUrlById(4)}
                    circle
                    onLoad={this.imageIsAvailable}
                />
                :
                <LetterImage
                    letter='asdf'
                />
        );

    }
}

export default ProfileImage;