import React, { Component } from "react";
import coreApp from "../../core/app";
import CodeSampleEditor from "./CodeSampleEditor";
import CodeSampleListItem from "./CodeSampleListItem";


class List extends Component {
    constructor(props) {
        super(props);

        this.state = {list: []};

        this.codeEditHandler = this.codeEditHandler.bind(this);
        this.codeDeleteHandler = this.codeDeleteHandler.bind(this);
    }

    componentDidMount() {
        coreApp.getList()
            .then(list => this.setState({list}))
            .catch(error => console.log(error));
    }

    codeEditHandler(sampleId) {
        console.log('should edit sample with id: ', sampleId);
    }

    codeDeleteHandler(sampleId) {
        console.log('should delete sample with id: ', sampleId);
    }

    render() {
        if (this.state.list.length == 0)
            return null;

        const listItems = this.state.list.map(item => <CodeSampleListItem key={item.id} 
            codeId={item.id} codeName={item.name} codeCreated={item.created_time} codeEdited={item.edited_time} 
            onCodeEdit={this.codeEditHandler} onCodeDelete={this.codeDeleteHandler}/>);

        return (
            <div>{listItems}</div>
        );
    }
}

export default List;