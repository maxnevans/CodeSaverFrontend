import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class DataSourceFile extends PureComponent {
    static propTypes = {
        fileNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    };
    constructor(props) {
        super(props);
    }

    render() {
        const fileItems = this.props.fileNames.map(fileName => (
            <div className="code-source-file-name" key={fileName}>{fileName}</div>
        ));

        const dropAreaContent = this.props.fileNames.length > 0 ? fileItems : 'Drop your file right here...';

        return (
            <div className="code-source-files">
                {dropAreaContent}
            </div>
        );
    }
}

export default DataSourceFile;

