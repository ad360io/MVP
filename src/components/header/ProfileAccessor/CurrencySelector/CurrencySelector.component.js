/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/*
Local CSS
*/
import './CurrencySelector.component.css';

/*
React Bootstrap
*/
import { ButtonGroup, Button } from 'react-bootstrap';
import { setCurrency } from '../../../../actions/HeaderActions';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


class CurrencySelector extends React.Component {
    handleCurrencyClick = (currency) => {
        const { patchUserMetadata } = this.props.auth;
        let newUserMetadata = { currency };
        patchUserMetadata(newUserMetadata, this.props.history);
    }

    render() {
        return (
            <ButtonGroup bsSize='small' className='currency-selector'>
                <Button
                    active={this.props.currencyFilter === 'XQC'}
                    onClick={() => this.handleCurrencyClick('XQC')}
                    style={{ width: 65 }}
                >
                    XQC
                </Button>

                <LinkWithTooltip
                    tooltip_body={'We are currently working on connecting to the Ethereum blockchain for EQC.'}
                >
                    <Button
                        active={this.props.currencyFilter === 'EQC'}
                        // onClick={() => this.handleCurrencyClick('EQC')}
                        style={{ width: 65 }}
                    >
                        EQC
                    </Button>
                </LinkWithTooltip>

                <LinkWithTooltip
                    tooltip_body={'We are planning to integrate PayPal as a payment method in the future.'}
                >
                    <Button
                        active={this.props.currencyFilter === 'PayPal'}
                        // onClick={() => this.handleCurrencyClick('PayPal')}
                        style={{ width: 65 }}
                    >
                        PayPal
                    </Button>
                </LinkWithTooltip>
            </ButtonGroup>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currencyFilter: state.MenuBarFilterReducer.currencyFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (currency) => {
            dispatch(setCurrency(currency))
        },
    }
}

function LinkWithTooltip({ tooltip_body, children }) {
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="XQC or EQC selector">{tooltip_body}</Tooltip>}>
            {children}
        </OverlayTrigger>
    );
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencySelector));
