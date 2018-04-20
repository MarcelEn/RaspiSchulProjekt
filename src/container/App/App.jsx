import React, { Component } from 'react';
import { connect } from 'react-redux';



import Login from '../Login/Login.jsx';
import Registration from '../Registration/Registration.jsx';
import { Route, BrowserRouter } from 'react-router-dom';



import { actions } from '../../actions';
import CenteredSpinner from '../../components/CenteredSpinner/CenteredSpinner';
import Main from '../Main/Main';

class App extends Component {
    componentWillMount() {
        if(this.props.data.tokenIsSet){
            this.props.validateAppToken();
        }
        
    }
    render() {
        return (
            <BrowserRouter>
                {
                    this.props.data.tokenLoading ?
                        <CenteredSpinner />
                        :
                        this.props.data.tokenIsValidated ?
                            <Main />
                            :
                            <div>
                                <Route exact path="/" component={Login} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/registration" component={Registration} />
                            </div>
                }
            </BrowserRouter>
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