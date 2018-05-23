import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';
import { Grid, FormGroup, PageHeader } from 'react-bootstrap';
import AppointmentEditor from '../../components/AppointmentEditor/AppointmentEditor';


class EditAppointment extends Component {
    render() {
        return (
            <Grid>
                <FormGroup>
                    <PageHeader>
                        Termin bearbeiten
                    </PageHeader>
                </FormGroup>
                <AppointmentEditor 
                
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment)