import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainDumb from '../../components/Main/Main';


import { actions } from '../../actions';

class Main extends Component {
    render() {
        return (
            <MainDumb

            />
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //validateAppToken: () => { dispatch(actions.validateAppToken()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)