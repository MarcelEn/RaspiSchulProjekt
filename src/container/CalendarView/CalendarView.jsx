import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import CalendarDay from '../../components/CalendarDay/CalendarDay'
import VerticalHourLegend from '../../components/VerticalHourLegend/VerticalHourLegend';


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
            in: false
        }
        this.handleAppointmentSelect = this.handleAppointmentSelect.bind(this);
    }
    handleAppointmentSelect(appointmentId) {
        console.log(appointmentId)
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
                <div className={!this.state.in ? style.tableWrapperBig : style.tableWrapperSmall}>
                    <div className={style.tableInnerWrapper}>
                        <div className={style.time}>
                            <VerticalHourLegend day="legend" legend />
                        </div>
                        <div className={style.responsiveWidth}>
                            {
                                week.map(day =>
                                    <CalendarDay
                                        handleAppointmentSelect={this.handleAppointmentSelect}
                                        key={"day-" + day}
                                        day={day}
                                        date="2018-05-14"
                                    />
                                )
                            }
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