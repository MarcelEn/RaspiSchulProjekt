import React, { Component } from 'react';
import {connect} from 'react-redux';

import WelcomeToReact from '../../components/welcometoreact/WelcomeToReact.jsx';

import {actions} from '../../actions';

class App extends Component {
  render() {
    return (
        <WelcomeToReact 
            message={this.props.ui.message}
            fetchServerSideTime={this.props.fetchServerSideTime}
            serverSideTime={this.props.data.serverSideTime}
        />
    );
  }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        fetchServerSideTime: () => {dispatch(actions.fetchServerSideTime())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)