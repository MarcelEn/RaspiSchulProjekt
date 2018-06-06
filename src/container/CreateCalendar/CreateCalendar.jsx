import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';
import { Grid, PageHeader, Col, Badge } from 'react-bootstrap';


class ManageCalendar extends Component {
    render() {
        return (
            <Grid>
                <PageHeader>
                    Kalender erstellen
                </PageHeader>
                
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