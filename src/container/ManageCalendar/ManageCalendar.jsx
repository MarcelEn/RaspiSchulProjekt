import React, { Component } from 'react';
import { connect } from 'react-redux';


import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';
import ManageCalendarDumb from '../../components/ManageCalendar/ManageCalendar';

class ManageCalendar extends Component {
    constructor(props) {
        super(props);
    }
    handleUserinput(proxy) {
        this.props.setManageCalendarInputField(proxyToName(proxy), proxyToValue(proxy));
    }
    render() {
        return (
            <ManageCalendarDumb

            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalendar)