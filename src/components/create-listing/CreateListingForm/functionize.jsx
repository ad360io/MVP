import React from "react";

export class Functionize extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};

        props.refState((state) => this.setState(state));
    }

    render() {
        const {render} = this.props;
        let result = render(this.state);
        return result;
    }
}
