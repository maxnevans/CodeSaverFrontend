import React, { PureComponent } from 'react';
import AuthPopup from './popups/AuthContainer';
import ConfirmPopup from './popups/ConfirmContainer';
import ChangePasswordPopup from './popups/ChangePasswordContainer';
import { AUTH_POPUP, CONFIRM_POPUP, PASSWORD_CHANGE_POPUP } from './PopupTypes';
import PropTypes from "prop-types";

class Popups extends PureComponent {
    static propTypes = {
        stack: PropTypes.arrayOf(PropTypes.object).isRequired,
        currentPopup: PropTypes.object,
    };

    _getPopup(type) {
        switch (type) {
            case AUTH_POPUP:
                return <AuthPopup />;
            case CONFIRM_POPUP:
                return <ConfirmPopup />;
            case PASSWORD_CHANGE_POPUP:
                return <ChangePasswordPopup />;
        }
        return null;
    }

    render() {
        if (this.props.currentPopup == null)
            return null;

        const hidden = this.props.stack.length == 0;
        const popup = this._getPopup(this.props.currentPopup.popupType);

        return (
            <div className={'popups' + (hidden ? "hidden" : "")} >
                {popup}
            </div>
        );
    }
}


export default Popups;