import React, { PureComponent } from "react";
import CodeSampleListItem from "./CodeSampleListItem";


class List extends PureComponent {
    static defaultProps = {
        list: []
    }

    constructor(props) {
        super(props);

        this.codeEditHandler = this.codeEditHandler.bind(this);
        this.codeDeleteHandler = this.codeDeleteHandler.bind(this);
    }

    codeEditHandler(sampleId) {
        this.props.onEdit(sampleId);
    }

    codeDeleteHandler(sampleId) {
        this.props.onDelete(sampleId);
    }       

    render() {
        if (this.props.list.length == 0)
            return null;

        const listItems = this.props.list.map(item => <CodeSampleListItem key={item.id} 
            codeId={item.id} codeName={item.name} codeCreated={item.created_time} codeEdited={item.edited_time} 
            onCodeEdit={this.codeEditHandler} onCodeDelete={this.codeDeleteHandler}/>);

        return (
            <div>{listItems}</div>
        );
    }
}

export default List;