/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/*
Local CSS
*/
import './TinyWallet.component.css'

/*
React Bootstrap
*/
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/*
NEM SDK
*/
import nem from 'nem-sdk';
import {formatNumberAbbr} from "../../../common/format";
import {walletState} from "../../../common/wallet-state";
import {FComponent} from "../../../common/f-component";
import {isEqual} from "lodash";
import {getJson} from "../../../common/api/method/get-json";


class TinyWallet extends FComponent {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            xqc_balance: 'Loading...',
            eqc_balance: 'Loading...',
        }

        this.onUnmount(walletState.onChange(() => this.forceUpdate()));
    }

    componentDidUpdate(prevProps) {
        if(!isEqual(prevProps.profile, this.props.profile)) {
            this.getBalance(this.props.profile.nem_address);
        }
    }

    sleep(milliseconds) {
        console.log('sleeping');

        var start = new Date().getTime();

        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    getBalance = async (address) => {
        if (this.props.currencyFilter === 'XQC') {
            // const { allApis: { getJson } } = this.props;
            let walletUrl = `https://nis.qchain.co/account/mosaic/owned`;

            let resp = await getJson(walletUrl, { queryParams: { address: address.split('-').join('')}, fromBaseUrl: false});

            if(resp.data) {
                let balance = resp.data.data.find(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc').quantity;
                walletState.setState(balance);
            }
        } else if (this.props.currencyFilter === 'EQC') {

        } else {

        }
    };

    render() {
        let _walletBalance = walletState.getState();

        // console.log(_walletBalance);

        return (
            <LinkWithTooltip
                tooltip_body={
                    (this.props.currencyFilter === 'EQC'
                        ? <span><strong>ETH address:</strong> {this.props.eth_address}</span>
                        : <span><strong>NEM address:</strong> {this.props.profile.nem_address}</span>
                    )
                }
            >

                <div className='tiny-wallet-container' style={{ cursor: 'default' }}>
                    <p className='tiny-wallet-title'>CURRENT BALANCE</p>

                    {/* {
                        (this.props.currencyFilter === 'EQC'
                            ? <WalletBalanceRenderer balance={this.state.eqc_balance} />
                            : <WalletBalanceRenderer balance={this.get_XQC_balance(this.props.profile.nem_address)} />
                            // : <WalletXqcRenderer balance={this.state.xqc_balance} />
                        )
                    } */}
                    {/*this.props.currencyFilter === 'EQC' ? this.state.eqc_balance : this.get_XQC_balance(this.props.profile.nem_address)*/}

                    <WalletBalanceRenderer
                        balance={!_walletBalance ? `Loading...` : `${formatNumberAbbr(_walletBalance, this.props.currencyFilter)} ${this.props.currencyFilter}`}/>

                </div>

            </LinkWithTooltip>
        );
    }
}

const WalletBalanceRenderer = ({ balance }) => (
    <div className='tiny-currency-item'>
        <span className='tiny-wallet-currency-label'>{balance}</span>
    </div>
)


const mapStateToProps = (state) => {
    return {
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        profile: state.ProfileReducer.profile,
        nem_address: state.ProfileReducer.profile.nem_address,
        eth_address: state.ProfileReducer.profile.eth_address,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

function LinkWithTooltip({ tooltip_body, children }) {
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="NEM or ETH address">{tooltip_body}</Tooltip>}>
            {children}
        </OverlayTrigger>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TinyWallet);
