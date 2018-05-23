import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

class EditAppointment extends Component {
    render() {
        return (
            <h1>Hallo :)</h1>
        );
    }
}

function mapStateToProps(state) {
    return {
    }

}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment)