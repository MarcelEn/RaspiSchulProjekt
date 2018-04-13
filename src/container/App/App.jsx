import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../Login/Login.jsx';
import Registration from '../Registration/Registration.jsx';
import UIWrapper from '../../components/UIWrapper/UIWrapper.jsx';
import { Route } from 'react-router-dom';

import { actions } from '../../actions';

class App extends Component {
    render() {
        return (
            <UIWrapper
                links={[
                    {
                        value: 'Login',
                        path: '/login'
                    },
                    {
                        value: 'Registrieren',
                        path: '/registration'
                    }
                ]}

            >
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
            </UIWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)