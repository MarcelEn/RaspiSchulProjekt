import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';
import { Grid, PageHeader, Col, Badge } from 'react-bootstrap';
import ListCard from '../../components/ListCard/ListCard';
import EditCalendar from '../../components/EditCalendar/EditCalendar';


class ManageCalendar extends Component {
    constructor(props) {
        super(props);
        this.filterEditableCalendarData = this.filterEditableCalendarData.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
    }

    filterEditableCalendarData() {
        return this.props.calendarData.filter(
            calendar =>
                calendar.owner_id === this.props.userId ||
                calendar.visibility === 2
        )
    }
    handleEditButton(calendarId) {
        this.props.startManageCalendarEditing(
            this.props.calendarData.find(
                calendar => calendar.calendar_id === calendarId
            )
        );
    }
    render() {
        return (
            <Grid>
                <PageHeader>
                    Kalender bearbeiten
                </PageHeader>
                {
                    this.props.editingCalendar ?

                        <EditCalendar

                        />

                        :

                        this.filterEditableCalendarData().map(
                            (calendar, index) =>
                                <div key={'editCalendar-' + index}>
                                    <ListCard>
                                        <Col xsOffset={1}>
                                            {calendar.calendar_title}
                                            {' '}
                                            <Badge
                                                className={style.badge}
                                                onClick={() => this.handleEditButton(calendar.calendar_id)}
                                            >
                                                ...
                                        </Badge>
                                        </Col>
                                    </ListCard>
                                    <hr />
                                </div>
                        )
                }
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        editingCalendar: state.ui.manageCalendarUi.editingCalendar,
        calendarData: state.data.appData.calendarData,
        userId: state.data.appData.userId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startManageCalendarEditing: calendarId => { dispatch(actions.startManageCalendarEditing(calendarId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalendar)