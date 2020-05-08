import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Confirm extends PureComponent {
    static propTypes = {
        returnValue: PropTypes.func.isRequired,
        popPopup: PropTypes.func.isRequired,
        options: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.onPositiveClick = this.onPositiveClick.bind(this);
        this.onNegativeClick = this.onNegativeClick.bind(this);
    }

    onPositiveClick(e) {
        e.preventDefalt();

        this.props.returnValue(this.props.options?.positiveValue ?? true);
        this.props.popPopup();
    }

    onNegativeClick(e) {
        e.preventDefalt();

        this.props.returnValue(this.props.options?.negativeValue ?? false);
        this.props.popPopup();
    }

    render() {
        return (
            <div className="confirm-popup">
                <div className="message">{this.prop.options?.message ?? "Are you sure?"}</div>
                <div className="choices">
                    <button onClick={this.onPositiveClick}>{this.props.options?.positiveCaption ?? "Confirm"}</button>
                    <button onClick={this.onNegativeClick}>{this.props.options?.negativeCaption ?? "Decline"}</button>
                </div>
            </div>
        );
    }
}