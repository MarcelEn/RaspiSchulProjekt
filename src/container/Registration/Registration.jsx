import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegistrationDumb from '../../components/Registration/Registration.jsx';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';

//TODO: Connect Registration to middleware and implement error features in the dumb Component
class Registration extends Component {
    constructor(props) {
        super(props);
        this.handleUserinput = this.handleUserinput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordRepeateLeave = this.handlePasswordRepeateLeave.bind(this);
        this.shouldDisableSubmitButton = this.shouldDisableSubmitButton.bind(this);
        this.lookupUsername = this.lookupUsername.bind(this);
    }

    handleUserinput(proxy) {
        const name = proxyToName(proxy);
        if (name === 'username') {
            this.props.setRegistrationUsernameInUse(false);
        }
        if (name === 'password' || name === 'repeatPassword') {
            this.props.setRegistrationInputField(name, proxyToValue(proxy));
            this.props.setRegistrationInputField('displayPasswordError', false);
        } else {
            this.props.setRegistrationInputField(name, proxyToValue(proxy));
        }
    }

    handleSubmit() {
        this.props.sendRegistrationData(this.props.ui);
    }

    shouldDisableSubmitButton() {
        const oneIsMissing = Object.keys(this.props.ui).find(key => this.props.ui[key] === '');
        if (oneIsMissing || this.props.ui.password !== this.props.ui.repeatPassword || this.props.data.usernameInUse) {
            return true;
        }
        return false;
    }

    handlePasswordRepeateLeave() {
        if (this.props.ui.password !== this.props.ui.repeatPassword && this.props.ui.repeatPassword !== '') {
            this.props.setRegistrationInputField('displayPasswordError', true);
        } else {
            this.props.setRegistrationInputField('displayPasswordError', false);
        }
    }

    lookupUsername(proxy) {
        const username = proxyToValue(proxy);
        if (username !== '') {
            this.props.lookupRegistrationUsername(username);
        }
    }

    render() {
        return (
            <RegistrationDumb
                {...this.props.ui}

                disableSubmitButton={this.shouldDisableSubmitButton()}

                lookupUsername={this.lookupUsername}
                handleSubmit={this.handleSubmit}
                handleUserinput={this.handleUserinput}
                handlePasswordRepeateLeave={this.handlePasswordRepeateLeave}
                usernameInUse={this.props.data.usernameInUse}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data.registrationData,
        ui: state.ui.registrationUi
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendRegistrationData: registrationData => { dispatch(actions.sendRegistrationData(registrationData)) },
        lookupRegistrationUsername: username => { dispatch(actions.lookupRegistrationUsername(username)) },
        setRegistrationInputField: (name, value) => { dispatch(actions.setRegistrationInputField(name, value)) },
        setRegistrationUsernameInUse: status => { dispatch(actions.setRegistrationUsernameInUse(status)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)