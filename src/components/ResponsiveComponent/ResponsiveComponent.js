import React, { Component } from 'react';

export function withWindowWidthListener(WrappedComponent) {
    return class extends Component {

        constructor(props) {
            super(props);

            // Using window.innerWidth in state to acheive responsiveness
            this.state = {
                width: window.innerWidth,
            }

            // Binding functions
            this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        }

        componentDidMount() {
            this.updateWindowDimensions();
            window.addEventListener('resize', this.updateWindowDimensions);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.updateWindowDimensions);
        }

        updateWindowDimensions() {
            this.setState({ ...this.state, width: window.innerWidth });
        }

        render() {
            return <WrappedComponent width={this.state.width} {...this.props} />
        }
    }
}