import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormControl, FormGroup, Button, Collapse, Alert, Grid, PageHeader } from 'react-bootstrap';

import style from './style_module.css';

import { actions } from '../../actions';
import { proxyToValue, proxyToName, selectUserId } from '../../globalFunctions';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
import CalendarDetails from '../../components/CalendarDetails/CalendarDetails';

class AddCalendar extends Component {
    constructor(props) {
        super(props);
        this.handleUserinput = this.handleUserinput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }
    handleUserinput(proxy) {
        this.props.setAddCalendarInputField(proxyToName(proxy), proxyToValue(proxy));
    }
    handleSubmit() {
        this.props.sendAddCalendarSearch(this.props.ui);
    }
    handleDescriptionToggle(index) {
        this.props.setAddCalendarShowDescription(index);
    }
    handleSelection(proxy) {
        this.props.toggleAddCalendarSelection(proxyToValue(proxy));
    }
    componentDidUpdate() {
        let neededUserIds = []
        this.props.searchResultsWithData.forEach(result => {
            if (!this.props.userData.find(user => user.user_id === result.owner_id)) {
                neededUserIds.push(result.owner_id)
            }
        });
        if (neededUserIds.length !== 0) {
            this.props.fetchUserDataById(neededUserIds);
        }
    }
    render() {
        return (
            <Grid>
                <FormGroup>
                    <PageHeader>
                        Kalender hinzufügen
                </PageHeader>
                </FormGroup>
                <div className={style.limitWidth}>

                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.props.ui.v}
                            name="titleOrId"
                            placeholder="Kalender - Titel / ID"
                            onChange={this.handleUserinput}
                            disabled={this.props.data.loading}
                        />

                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.props.ui.username}
                            name="username"
                            placeholder="Nutzername"
                            onChange={this.handleUserinput}
                            disabled={this.props.data.loading}
                        />
                    </FormGroup>
                    <Collapse in={this.props.data.error}>
                        <Alert bsStyle="danger">
                            <b>Whoops!</b>
                            <p>
                                Da ist was schief gelaufen :/
                            </p>
                        </Alert>
                    </Collapse>
                    <Collapse in={this.props.ui.titleOrId.length < 4 && this.props.ui.username.length < 4 && !this.props.data.error}>
                        <FormGroup>
                            <Alert bsStyle="warning">
                                Sie müssen mindestens 4 Zeichen eingeben.
                    </Alert>
                        </FormGroup>
                    </Collapse>
                    <FormGroup>
                        <LoadingButton loading={this.props.data.loading}>
                            <div>
                                <Button
                                    className={style.large}
                                    bsStyle="success"
                                    onClick={this.handleSubmit}
                                    disabled={this.props.ui.titleOrId.length < 4 && this.props.ui.username.length < 4}
                                >
                                    Suchen
                        </Button>
                            </div>
                        </LoadingButton>
                    </FormGroup>
                </div>
                <Collapse in={this.props.searchResultsWithData.length > 0}>
                    <div>
                        {
                            this.props.searchResultsWithData.map((data, index) => (
                                <CalendarDetails
                                    calendarData={data}
                                    userData={this.props.userData.find(userData => userData.user_id === data.owner_id)}
                                    isOpen={index === this.props.ui.openedDescription}
                                    handleDescriptionToggle={() => this.handleDescriptionToggle(index)}
                                    handleSelection={this.handleSelection}
                                    selected={this.props.savedCalendars.find(calendar => calendar === data.calendar_id)}
                                    selectAble={this.props.userId !== data.owner_id}
                                    key={'addCalendar-' + index}
                                />
                            ))
                        }
                    </div>
                </Collapse>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const searchResultsWithData = state.data.addCalendarData.searchResults.map(
        calendar_id => state.data.appData.calendarData.find(
            calendar => calendar.calendar_id === calendar_id
        )
    )
    return {
        userId: selectUserId(state),
        data: state.data.addCalendarData,
        searchResultsWithData,
        savedCalendars: state.data.appData.savedCalendars,
        ui: state.ui.addCalendarUi,
        userData: state.data.appData.userData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAddCalendarInputField: (name, value) => { dispatch(actions.setAddCalendarInputField(name, value)) },
        sendAddCalendarSearch: userinput => { dispatch(actions.sendAddCalendarSearch(userinput)) },
        fetchUserDataById: userId => { dispatch(actions.fetchUserDataById(userId)) },
        setAddCalendarShowDescription: index => { dispatch(actions.setAddCalendarShowDescription(index)) },
        toggleAddCalendarSelection: index => { dispatch(actions.toggleAddCalendarSelection(index)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCalendar)