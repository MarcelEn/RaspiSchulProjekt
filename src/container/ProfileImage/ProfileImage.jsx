import React, { Component } from 'react';

import { Image } from 'react-bootstrap';

import style from '../../components/LetterImage/style_module.css';
import hide from './style_module.css';
import { getUserImageUrlByUserId } from '../../apiConnector';
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
        if (this.state.imageAvailable) {
            return (
                <Image
                    className={style.roundedImage}
                    src={getUserImageUrlByUserId(this.props.userId)}
                    circle
                    onLoad={this.imageIsAvailable}
                />
            )
        } else {
            return (
                <span>
                    <Image
                        className={hide.hide}
                        src={getUserImageUrlByUserId(this.props.userId)}
                        circle
                        onLoad={this.imageIsAvailable}
                    />
                    <LetterImage
                        firstname={this.props.firstname}
                        lastname={this.props.lastname}
                    />
                </span>
            )
        }
    }
}

export default ProfileImage;