import React, { PureComponent } from "react";
import Item from "./ItemContainer";


class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            didFetch: false,
        };
    }
    componentDidMount() {
        if (!this.state.didFetch) {
            this.props.fetchCodeSamples();
            this.setState({didFetch: true});
        }
    }
    render() {
        if (this.props.codeSamples.size == 0)
            return null;

        const listItems = Array.from(this.props.codeSamples.values()).map(codeSample => <Item 
            key={codeSample.id}
            {...codeSample}
        />);

        return (
            <div className="code-list">{listItems}</div>
        );
    }
}

export default List;