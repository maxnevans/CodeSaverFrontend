import React, { Component } from "react";
import CodeSample from "./CodeSample";
import coreApp from "../../core/app";

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {list: []};
    }

    componentDidMount() {
        coreApp.getList()
            .then(list => this.setState({list}))
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.list.length == 0)
            return null;

        const listItems = this.state.list.map(item => <CodeSample key={item.id} codeId={item.id} createdTime={item.created_time} />);

        return (
            <div>{listItems}</div>
        );
    }
}

export default List;