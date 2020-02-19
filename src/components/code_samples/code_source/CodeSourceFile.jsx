import React, {PureComponent} from "react";

class CodeSourceFile extends PureComponent {
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

export default CodeSourceFile;

