import React from "react";
import {css} from "emotion";
import CircularProgress from '@material-ui/core/CircularProgress'

let loadingPanelCss = css`
    min-height: 320px;
    text-align: center;
    margin: 2%;
`;

export class LoadingPanel extends React.Component {
    render () {
        const { size = 50 } = this.props;

        return (
            <div className={loadingPanelCss}>
                <CircularProgress size={size} thickness={3}/>
            </div>
        )
    }
}
