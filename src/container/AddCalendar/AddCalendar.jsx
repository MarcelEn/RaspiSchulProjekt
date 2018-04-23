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
    }
    handleUserinput(proxy) {
        this.props.setAddCalendarInputField(proxyToName(proxy), proxyToValue(proxy));
    }
    handleSubmit() {
        this.props.sendAddCalendarSearch(this.props.ui);
    }
    //TODO: make this functional...
    componentDidMount(){
        this.props.fetchUserDataById(['10001', '10002'])
    }
    componentDidUpdate() {
        let neededUserIds = []
        this.props.searchResults.forEach(result => {
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCalendar)