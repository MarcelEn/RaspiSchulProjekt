import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import CalendarDay from '../../components/CalendarDay/CalendarDay'
import VerticalHourLegend from '../../components/VerticalHourLegend/VerticalHourLegend';
import { Collapse } from 'react-bootstrap';
const week = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag'
]


class CalendarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            in: true
        }
    }
    render() {
        return (
            <div className={style.maxSize}>
                <div className={style.weekDays}>
                    {
                        week.map(
                            day =>
                                <div key={day} className={style.weekDay}>
                                    <b>{day}</b>
                                </div>
                        )
                    }
                </div>
                <div className={this.state.in ? style.tableWrapperBig : style.tableWrapperSmall}>
                    <div className={style.tableInnerWrapper}>
                        <div className={style.time}>
                            <VerticalHourLegend day="legend" legend />
                        </div>
                        <div className={style.responsiveWidth}>
                            <CalendarDay day={1} date="2018-05-14" />
                            <CalendarDay day={2} date="2018-05-15" />
                            <CalendarDay day={3} date="2018-05-16" />
                            <CalendarDay day={4} date="2018-05-17" />
                            <CalendarDay day={5} date="2018-05-18" />
                            <CalendarDay day={6} date="2018-05-19" />
                            <CalendarDay day={7} date="2018-05-20" />
                        </div>
                    </div>
                </div>
                <div className={style.infoPanel}>
                </div>
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