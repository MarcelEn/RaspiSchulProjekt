import React from 'react';
import style from './style_module.css';
import { Grid, Row, PageHeader } from 'react-bootstrap';

const LockMobileView = props => (
    <div className={style.LockMobileView}>
        <Grid>
            <Row>
                <PageHeader>
                    Mobile View wird noch nicht untersützt.
                </PageHeader>
            </Row>
        </Grid>
    </div>
)

export default LockMobileView;