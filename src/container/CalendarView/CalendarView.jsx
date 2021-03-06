import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import style from './style_module.css';

import { popupId } from '../../constants';
import { actions } from '../../actions';
import CalendarDay from '../../components/CalendarDay/CalendarDay'
import VerticalHourLegend from '../../components/VerticalHourLegend/VerticalHourLegend';
import DetailedAppointmentView from '../../components/DetailedAppointmentView/DetailedAppointmentView';


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
        this.getAppointmentsFilteredByCalendarIds = this.getAppointmentsFilteredByCalendarIds.bind(this);
        this.filterForThisDay = this.filterForThisDay.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.checkForNotifications = this.checkForNotifications.bind(this);

        if (props.allowNotifications) {
            const m = moment();
            const millisecondsToNextMinute = 59500 - (m.valueOf() - (moment(m.format("YYYY-MM-DD HH:mm:00")).valueOf()))
            const that = this;

            setTimeout(() => {
                setInterval(() => {
                    that.checkForNotifications();
                    that.forceUpdate();
                }, 1000)
            }, millisecondsToNextMinute)
        }
    }
    getAppointmentsFilteredByCalendarIds() {
        return this.props.appointmentData
            .filter(
                appointment => this.props.activeCalendars.find(calendarId => calendarId === appointment.calendar_id)
            )
    }
    filterForThisDay(appointments, index) {
        const thisDay = moment(this.props.dateOfMonday).add(index, 'day');
        const start = thisDay.valueOf();

        thisDay.add(1, "day");

        const end = thisDay.valueOf();

        return appointments.filter(
            appointment =>
                moment(start).isBetween(appointment.start, appointment.end) ||
                moment(end).isBetween(appointment.start, appointment.end) ||
                moment(appointment.start).isBetween(start, end) ||
                moment(appointment.end).isBetween(start, end)
        )
            .map(
                appointment => {
                    let a = { ...appointment }
                    if (appointment.start < start)
                        a.start = start;
                    if (appointment.end > end)
                        a.end = end;

                    return a;
                }
            )
    }
    handleClose() {
        this.props.toggleCalendarviewDetailedAppointmentId(null);
    }
    checkForNotifications() {
        const now = moment().add(15, "minutes").format("YYYY-MM-DD HH:mm:ss");
        this.getAppointmentsFilteredByCalendarIds()
            .forEach(
                appointment => {
                    if (moment(appointment.start).format("YYYY-MM-DD HH:mm:00") === now)
                        new Notification(appointment.appointment_title, {
                            body: "startet in 15 Minuten",
                            icon: "favicon.png"
                        })
                }
            )
    }
    render() {
        return (
            <div className={style.maxSize}>
                <div className={style.weekDays}>
                    {
                        week.map(
                            day =>
                                <div key={day} className={style.weekDay}>
                                    <div><b>{day}</b></div>
                                </div>
                        )
                    }
                </div>
                <div className={this.props.detailedAppointmentId ? style.tableWrapperSmall : style.tableWrapperBig}>
                    <div className={style.tableInnerWrapper}>
                        <div className={style.time}>
                            <VerticalHourLegend day="legend" legend />
                        </div>
                        <div className={style.responsiveWidth}>
                            {
                                week.map((day, index) =>
                                    <CalendarDay
                                        appointments={this.filterForThisDay(this.getAppointmentsFilteredByCalendarIds(), index)}
                                        handleAppointmentSelect={this.props.toggleCalendarviewDetailedAppointmentId}
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
                    {
                        this.props.detailedAppointmentId ?
                            <DetailedAppointmentView
                                {...this.props.appointmentData.find(
                                    appointment => appointment.appointment_id === this.props.detailedAppointmentId
                                )}
                                handleClose={this.handleClose}
                                handleDelete={this.props.handleCalendarViewDeletion}
                                showEditButtons
                                confirmDeletion={this.props.confirmDeletion}
                                handleEdit={this.props.handleEdit}
                            />
                            :
                            ''
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allowNotifications: state.ui.appUi.allowNotifications,
        appointmentData: state.data.appData.appointmentData,
        activeCalendars: state.ui.mainUi.activeCalendars,
        ...state.ui.calendarViewUi,
    }

}

function mapDispatchToProps(dispatch) {
    return {
        toggleCalendarviewDetailedAppointmentId: id => { dispatch(actions.toggleCalendarviewDetailedAppointmentId(id)) },
        handleCalendarViewDeletion: () => { dispatch(actions.handleCalendarViewDeletion()) },
        handleEdit: () => { dispatch(actions.setPopupId(popupId.EDIT_APPOINTMENT)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView)