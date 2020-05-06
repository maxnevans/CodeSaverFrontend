import React, { PureComponent } from 'react';
import AuthPopup from './popups/AuthContainer';
import { AUTH_POPUP } from './PopupTypes';

class Popups extends PureComponent {

    #getPopup(type) {
        switch(type) {
            case AUTH_POPUP:
                return <AuthPopup />
        }
        return null;
    }

    render() {
        if (this.props.currentPopup == null)
            return null;

        this.#getPopup(this.props.currentPopup.popupType);

        return (
            <div className={'has-popup popups'} >
                {popup}
            </div>
        );
    }
}


export default Popups;