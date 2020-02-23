import React, { PureComponent } from 'react';
import LoginPopup from './popups/LoginPopup';

class Popups extends PureComponent {
    static LOGIN_POPUP = 'login';

    constructor(props) {
        super(props);

        this.loginSuccessHandler = this.loginSuccessHandler.bind(this);
    }

    loginSuccessHandler(userData) {
        this.props.onPopupsChange(this.props.popups.slice(0, -1));
        this.props.onUserChange(userData);
    }

    getCurrentPopupEntry(popups) {
        if (popups.length == 0)
            return {popup: null, data: null};

        return popups[this.props.popups.length - 1];
    }

    getCurrentPopupItem(popupType, popupData) {
        switch(popupType) {
            case Popups.LOGIN_POPUP:
                return <LoginPopup onSuccess={this.loginSuccessHandler}/>;
        }

        return null;
    }

    render() {
        const currentPopup = this.getCurrentPopupEntry(this.props.popups);
        const popupItem = this.getCurrentPopupItem(currentPopup.popup, currentPopup.data);

        const popupClass = popupItem ? 'has-popup' : '';

        return (
            <div className={popupClass + ' popups'} >
                {popupItem}
            </div>
        );
    }
}


export default Popups;