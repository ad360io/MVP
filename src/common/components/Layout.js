import React from "react";
import {css} from "emotion"

let appLayout = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
    
    .app-header {
        position: fixed;
        z-index: 6;
    }
    
    .app-content {
        flex: 1;
        margin-bottom: 73px;
    }
    
    .app-footer {
        // position: fixed;
        // bottom: 0;
        // z-index: 50;
        // width: 100%;
    }
`;

export class Layout extends React.Component {

    render () {
        const { header, content, footer } = this.props;

        return (
            <div className={appLayout}>
                <div className="app-header">
                    {header}
                </div>
                <div className="app-content">
                    {content}
                </div>

                <div className="app-footer">
                    {footer}
                </div>
            </div>
        )
    }
}
