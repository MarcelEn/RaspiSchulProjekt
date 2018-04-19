import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PulseLoader } from 'react-spinners'


import Login from '../Login/Login.jsx';
import Registration from '../Registration/Registration.jsx';
import UIWrapper from '../../components/UIWrapper/UIWrapper.jsx';
import { Route } from 'react-router-dom';



import { actions } from '../../actions';
import CenteredSpinner from '../../components/CenteredSpinner/CenteredSpinner';

class App extends Component {
    componentWillMount() {
        if(this.props.data.tokenIsSet){
            this.props.validateAppToken();
        }
        
    }
    render() {
        return (
            <UIWrapper
                links={
                    this.props.data.tokenIsValidated ?
                        [
                            {
                                value: this.props.data.logoutLoading ? <PulseLoader margin="0px" /> : 'Logout',
                                action: this.props.data.logoutLoading ? () => { } : this.props.sendLogout
                            }
                        ]
                        :
                        []
                }
            >
                {
                    this.props.data.tokenLoading ?
                        <CenteredSpinner />
                        :
                        this.props.data.tokenIsValidated ?
                            <div>
                                
                            </div>
                            :
                            <div>
                                <Route exact path="/" component={Login} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/registration" component={Registration} />
                            </div>
                }
            </UIWrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data.appData,
        // ui: state.ui.appUi
    };
}

function mapDispatchToProps(dispatch) {
    return {
        validateAppToken: () => { dispatch(actions.validateAppToken()) },
        sendLogout: () => { dispatch(actions.sendLogout()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)