import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainDumb from '../../components/Main/Main';


import { actions } from '../../actions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.formatOwnCalendar = this.formatOwnCalendar.bind(this);
    }
    formatOwnCalendar() {
        return this.props.calendarData.filter(
            calendar => calendar.owner_id === this.props.userId
        )
    }
    render() {
        return (
            <MainDumb
                setPopupId={this.props.setPopupId}
                ownCalendars={this.formatOwnCalendar()}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.data.appData.userId,
        calendarData: state.data.appData.calendarData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPopupId: id => { dispatch(actions.setPopupId(id)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)