import React from "react";
import {addRemove} from './utils/cols';

export class FComponent extends React.Component {
    onUnmounts = [];
    onChangeds = [];
    onMounts = [];
    mounted = false;

    // constructor(props, context, updater) {
    //     super(props, context, updater);
    // }

    componentDidMount() {
        this.mounted = true;
        this.onMounts.forEach((l) => l());
    }

    componentWillUnmount() {
        this.mounted = false;
        this.onUnmounts.forEach((l) => l());
    }

    // componentDidUpdate(prevProps) {
    //     this.onChangeds.forEach((l) => l(prevProps));
    // }

    setState(newState, cb) {
        if (this.mounted) {
            super.setState(newState, cb);
        } else {
            this.state = Object.assign(this.state, newState);
            cb && cb();
        }
    }

    forceUpdate() {
        if (this.mounted) {
            super.forceUpdate();
        }
    }

    onMount = addRemove(this.onMounts);
    onUnmount = addRemove(this.onUnmounts);
    onChanged = addRemove(this.onChangeds);

    onChanged1(f) {
        const done = f();
        if (done) {
            return;
        }

        const removeListener = this.onChanged(() => {
            const done = f();
            if (done) {
                removeListener();
            }
        });
    };
}
