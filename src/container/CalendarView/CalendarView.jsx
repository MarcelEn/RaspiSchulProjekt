import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
        this.getAppointmentsOfThisWeek = this.getAppointmentsOfThisWeek.bind(this);
        this.filterForThisDay = this.filterForThisDay.bind(this);
    }
    handleAppointmentSelect(appointmentId) {
        console.log(appointmentId)
    }
    getAppointmentsOfThisWeek() {
        return this.props.appointmentData
            .filter(
                appointment => this.props.activeCalendars.find(calendarId => calendarId === appointment.calendar_id)
            )
            .filter(
                appointment =>
                    moment(appointment.start).isBetween(this.props.dateOfMonday, moment(this.props.dateOfMonday).add(6, "day")) ||
                    moment(appointment.end).isBetween(this.props.dateOfMonday, moment(this.props.dateOfMonday).add(6, "day"))
            )
    }
    filterForThisDay(appointments, index) {
        const thisDay = moment(this.props.dateOfMonday).add(index, 'day');

        const start = thisDay.valueOf();
        thisDay.add(1, "day");
        const end = thisDay.valueOf();

        return appointments.filter(
            appointment =>
                moment(appointment.start).isBetween(start, end) ||
                moment(appointment.end).isBetween(start, end)
        )
    }
    render() {
        const appointmentsOfThisWeek = this.getAppointmentsOfThisWeek();
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
                                week.map((day, index) =>
                                    <CalendarDay
                                        appointments={this.filterForThisDay(appointmentsOfThisWeek, index)}
                                        handleAppointmentSelect={this.handleAppointmentSelect}
                                        key={"day-" + day}
                                        day={day}
                                        date={moment(this.props.dateOfMonday).add(index, 'day')}
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
        appointmentData: state.data.appData.appointmentData,
        activeCalendars: state.ui.mainUi.activeCalendars,
        ...state.ui.calendarViewUi,
    }

}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView)