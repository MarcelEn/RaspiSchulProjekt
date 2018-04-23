import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginDumb from '../../components/Login/Login.jsx';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';


class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserinput = this.handleUserinput.bind(this);
        this.handleStayLoggedInCheckbox = this.handleStayLoggedInCheckbox.bind(this);
    }

    handleSubmit() {
        this.props.sendLoginData(this.props.ui);
    }

    handleUserinput(proxy) {
        this.props.setLoginInputField(proxyToName(proxy), proxyToValue(proxy));
    }

    handleStayLoggedInCheckbox() {
        this.props.setLoginInputField('stayLoggedIn', !this.props.ui.stayLoggedIn);
    }
    render() {
        return (
            <LoginDumb
                {...this.props.ui}
                {...this.props.data}

                handleStayLoggedInCheckbox={this.handleStayLoggedInCheckbox}
                handleSubmit={this.handleSubmit}
                handleUserinput={this.handleUserinput}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data.loginData,
        ui: state.ui.loginUi
    }

}

function mapDispatchToProps(dispatch) {
    return {
        sendLoginData: loginData => { dispatch(actions.sendLoginData(loginData)) },
        setLoginInputField: (name, value) => { dispatch(actions.setLoginInputField(name, value)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)