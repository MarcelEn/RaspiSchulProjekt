import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';
import { Grid, PageHeader, Col, Badge } from 'react-bootstrap';
import ListCard from '../../components/ListCard/ListCard';
import EditCalendar from '../../components/EditCalendar/EditCalendar';

class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Grid>
                <PageHeader>
                    Einstellungen
                </PageHeader>
                
            </Grid>
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