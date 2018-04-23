import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainDumb from '../../components/Main/Main';


import { actions } from '../../actions';

class Main extends Component {
    render() {
        return (
            <MainDumb
                setPopupId={this.props.setPopupId}
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
        setPopupId: id => { dispatch(actions.setPopupId(id)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)