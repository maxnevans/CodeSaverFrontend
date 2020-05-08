import React, { PureComponent } from "react";
import Item from "./ItemContainer";
import PropTypes from "prop-types";


class List extends PureComponent {
    static propTypes = {
        fetchCodeSamples: PropTypes.func.isRequired,
        codeSamples: PropTypes.instanceOf(Map),
        user: PropTypes.object,
    };
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

    componentDidUpdate() {
        if (this.props.user != null && !this.state.didFetch) {
            this.props.fetchCodeSamples();
            this.setState({didFetch: true});
        }

        if (this.props.user == null) {
            this.setState({didFetch: false});
        }
    }

    render() {
        if (this.props.codeSamples.size == 0)
            return null;
            
        const listItems = Array.from(this.props.codeSamples.values())
            .sort((a, b) => (new Date(b.createdTime)) - (new Date(a.createdTime)))
            .map(codeSample => {
            return <Item 
                key={codeSample.id}
                codeSample={codeSample}
            />;
        });

        return (
            <div className="code-list">{listItems}</div>
        );
    }
}

export default List;