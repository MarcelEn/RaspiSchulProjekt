import React, { Component } from 'react';
import { connect } from 'react-redux';



import Login from '../Login/Login.jsx';
import Registration from '../Registration/Registration.jsx';
import { Route, BrowserRouter } from 'react-router-dom';


import { popupId } from '../../constants';
import { actions } from '../../actions';
import CenteredSpinner from '../../components/CenteredSpinner/CenteredSpinner';
import Main from '../Main/Main';
import Wrapper from '../../components/Wrapper/Wrapper';
import { PopupWrapper, Popup } from '../../components/Popup/Popup';
import AddCalendar from '../AddCalendar/AddCalendar';
import ManageCalendar from '../ManageCalendar/ManageCalendar';
import UserSettings from '../UserSettings/UserSettings';
import EditAppointment from '../EditAppointment/EditAppointment';
import CreateCalendar from '../CreateCalendar/CreateCalendar';
import LockMobileView from '../../components/LockMobileView/LockMobileView';


class App extends Component {
    componentWillMount() {
        if (this.props.data.tokenIsSet) {
            this.props.validateAppToken();
        }
    }
    componentDidUpdate() {
        // TODO: move this in validateAppToken
        if (!this.props.data.firstInit && this.props.data.tokenIsValidated) {
            this.props.fetchRemoteDataInit();
        }
    }
    render() {
        return (
            <BrowserRouter>
                {
                    this.props.data.tokenLoading ?
                        <CenteredSpinner />
                        :
                        this.props.data.tokenIsValidated ?
                            <Wrapper>
                                <LockMobileView />
                                <Main />
                                <PopupWrapper
                                    closePopup={this.props.closePopup}
                                    setPopupId={this.props.setPopupId}
                                    popupId={this.props.ui.popupId}
                                    showPopup={this.props.ui.showPopup}
                                >

                                    <Popup id={popupId.ADD_CALENDAR}>
                                        <AddCalendar />
                                    </Popup>
                                    <Popup id={popupId.MANAGE_CALENDAR}>
                                        <ManageCalendar />
                                    </Popup>
                                    <Popup id={popupId.USER_SETTINGS}>
                                        <UserSettings />
                                    </Popup>
                                    <Popup id={popupId.EDIT_APPOINTMENT}>
                                        <EditAppointment />
                                    </Popup>
                                    <Popup id={popupId.CREATE_CALENDAR}>
                                        <CreateCalendar />
                                    </Popup>
                                </PopupWrapper>
                            </Wrapper>
                            :
                            <Wrapper>
                                <Route exact path="/" component={Login} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/registration" component={Registration} />
                            </Wrapper>
                }
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data.appData,
        ui: state.ui.appUi
    };
}

function mapDispatchToProps(dispatch) {
    return {
        validateAppToken: () => { dispatch(actions.validateAppToken()) },
        fetchRemoteDataInit: () => { dispatch(actions.fetchRemoteDataInit()) },
        sendLogout: () => { dispatch(actions.sendLogout()) },
        closePopup: () => { dispatch(actions.closePopup()) },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)