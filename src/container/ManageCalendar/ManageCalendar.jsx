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
        this.handleEditInput = this.handleEditInput.bind(this);
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

    handleEditInput(proxy) {
        let name, value;

        if (typeof proxy === 'string') {
            name = 'calendar_description';
            value = proxy;
        } else {
            name = proxyToName(proxy);
            value = proxyToValue(proxy);
        }

        if (name === 'visibility')
            value = parseInt(value, 10);

        this.props.setManageCalendarInputField(name, value)
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
                            calendarData={this.props.editingCalendar}
                            userId={this.props.userId}
                            handleEditInput={this.handleEditInput}
                            cancelManageCalendarEditing={this.props.cancelManageCalendarEditing}
                            handleSave={this.props.handleSave}
                            loading={this.props.loading}
                            error={this.props.error}
                            success={this.props.success}
                            
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
        loading: state.data.manageCalendarData.loading,
        error: state.data.manageCalendarData.error,
        success: state.data.manageCalendarData.success,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startManageCalendarEditing: calendarId => { dispatch(actions.startManageCalendarEditing(calendarId)) },
        setManageCalendarInputField: (name, value) => { dispatch(actions.setManageCalendarInputField(name, value)) },
        cancelManageCalendarEditing: () => { dispatch(actions.cancelManageCalendarEditing()) },
        handleSave: () => { dispatch(actions.saveManageCalendarEditing()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalendar)