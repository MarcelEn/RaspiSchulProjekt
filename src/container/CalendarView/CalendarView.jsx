import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import CalendarDay from '../../components/CalendarDay/CalendarDay'


class CalendarView extends Component {
    render() {
        return (
            <div className={style.maxSize}>
                <CalendarDay date="2018-05-14" />
                <CalendarDay date="2018-05-15" />
                <CalendarDay date="2018-05-16" />
                <CalendarDay date="2018-05-17" />
                <CalendarDay date="2018-05-18" />
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