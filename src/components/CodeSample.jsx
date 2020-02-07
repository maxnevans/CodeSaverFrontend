import React, {PureComponent} from "react";

class CodeSample extends PureComponent {
    constructor() {
        super();
        
        this.getResultOnClick = this.getResultOnClick.bind(this);
    }
    render() {
        return (
            <fieldset>
                <legend>Code sample</legend>
                <button onClick={this.getResultOnClick}>Get result</button>
            </fieldset>
        );
    }

    getResultOnClick(event) {
        event.preventDefault();
        
        fetch(new Request("http://localhost:8080/api/list"))
            .then((response) => {
                console.log('Response status: ', response.status);
                response.json()
                    .then((json) => console.log(json))
                    .catch((error) => console.log('Failed to parse JSON!'));
            })
            .catch((error) => console.log(error));
    }
}

export default CodeSample;