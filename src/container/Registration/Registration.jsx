import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegistrationDumb from '../../components/Registration/Registration.jsx';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';

//TODO: Connect Registration to middleware and implement error features in the dumb Component
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: '',
            displayPasswordError: false
        }
        this.handleUserinput = this.handleUserinput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordRepeateLeave = this.handlePasswordRepeateLeave.bind(this);
        this.shouldDisableSubmitButton = this.shouldDisableSubmitButton.bind(this);
    }

    handleUserinput(proxy) {
        const name = proxyToName(proxy);
        if (name === 'password' || name === 'repeatPassword') {
            this.setState({ [name]: proxyToValue(proxy), displayPasswordError: false })
        } else {
            this.setState({ [name]: proxyToValue(proxy) })
        }
    }

    handleSubmit() {
        console.log(this.state);
    }
    shouldDisableSubmitButton() {
        const oneIsMissing = Object.keys(this.state).find(key => this.state[key] === '');
        if (oneIsMissing || this.state.password !== this.state.repeatPassword) {
            return true;
        }
        return false;
    }

    handlePasswordRepeateLeave() {
        if (this.state.password !== this.state.repeatPassword && this.state.repeatPassword !== '') {
            this.setState({ displayPasswordError: true })
        } else {
            this.setState({ displayPasswordError: false })
        }
    }

    render() {
        return (
            <RegistrationDumb
                {...this.state}

                disableSubmitButton={this.shouldDisableSubmitButton()}

                handleSubmit={this.handleSubmit}
                handleUserinput={this.handleUserinput}
                displayPasswordError={this.state.displayPasswordError}
                handlePasswordRepeateLeave={this.handlePasswordRepeateLeave}
            />
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        fetchServerSideTime: () => { dispatch(actions.fetchServerSideTime()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)