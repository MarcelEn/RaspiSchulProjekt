import React, { Component } from 'react';
import { connect } from 'react-redux';


import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';
import AddCalendarDumb from '../../components/AddCalendar/AddCalendar';


class AddCalendar extends Component {
    constructor(props) {
        super(props);
        this.handleUserinput = this.handleUserinput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
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
    componentDidUpdate() {
        let neededUserIds = []
        this.props.data.searchResults.forEach(result => {
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
            <AddCalendarDumb
                {...this.props.ui}
                {...this.props.data}
                handleUserinput={this.handleUserinput}
                handleSubmit={this.handleSubmit}
                userData={this.props.userData}
                handleDescriptionToggle={this.handleDescriptionToggle}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data.addCalendarData,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCalendar)