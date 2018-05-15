import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';

class CalendarView extends Component {
    render() {
        return (
            <div>
                
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView)