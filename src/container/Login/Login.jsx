import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginDumb from '../../components/Login/Login.jsx';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';



//TODO: Connect Login to Middleware
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            stayLoggedIn: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserinput = this.handleUserinput.bind(this);
        this.handleStayLoggedInCheckbox = this.handleStayLoggedInCheckbox.bind(this);
    }

    handleSubmit() {
        this.props.sendLoginData(this.state);
    }
    handleUserinput(proxy) {
        this.setState({ [proxyToName(proxy)]: proxyToValue(proxy) })
    }
    handleStayLoggedInCheckbox() {
        this.setState({ stayLoggedIn: !this.state.stayLoggedIn })
    }
    render() {
        return (
            <LoginDumb
                {...this.state}

                loading={this.props.loading}
                error={this.props.error}

                handleStayLoggedInCheckbox={this.handleStayLoggedInCheckbox}
                handleSubmit={this.handleSubmit}
                handleUserinput={this.handleUserinput}
            />
        );
    }
}

function mapStateToProps(state) {
    return state.data.loginData;
}

function mapDispatchToProps(dispatch) {
    return {
        sendLoginData: loginData => { dispatch(actions.sendLoginData(loginData)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)