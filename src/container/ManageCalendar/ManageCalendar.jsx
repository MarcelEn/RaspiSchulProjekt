import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';
import { FormGroup, Grid, PageHeader } from 'react-bootstrap';
class ManageCalendar extends Component {
    constructor(props) {
        super(props);
    }
    handleUserinput(proxy) {
        this.props.setManageCalendarInputField(proxyToName(proxy), proxyToValue(proxy));
    }
    render() {
        return (
            <Grid>
                <PageHeader>
                    Kalender verwalten
                </PageHeader>
                <FormGroup>

                </FormGroup>
            </Grid>
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