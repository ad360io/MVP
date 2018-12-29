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

/*
Children Component
*/
// import NemEndpoint from '../../nem-endpoint/NemEndpoint.component';


/**
 * Wallet Component should display accurate balances
 */
class TinyWallet extends FComponent {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            xqc_balance: 'Loading...',
            eqc_balance: 'Loading...',
        }

        /* CONFIG */
        this.mainnet_NIS = 'http://san.nem.ninja';
        this.testnet_NIS = 'http://192.3.61.243';

        this.NEM_port = 7890;

        this.NEM_mainnet_networkId = 104;
        this.NEM_testnet_networkId = -104;

        // this.NEM_node_URI = this.mainnet_NIS;
        this.NEM_node_URI = this.testnet_NIS;

        // this.NEM_networkId = nem.model.network.data.mainnet.id;
        this.NEM_networkId = nem.model.network.data.testnet.id;


        /* Create connection to NIS supernode */
        this.endpoint = nem.model.objects.create('endpoint')(this.NEM_node_URI, this.NEM_port);

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
            walletState.setState(await getWalletBalance(address));

        } else if (this.props.currencyFilter === 'EQC') {

        } else {

        }
    };

    render() {
        let _walletBalance = walletState.getState();

        return (
            <LinkWithTooltip
                tooltip_body={
                    (this.props.currencyFilter === 'EQC'
                        ? (this.props.eth_address
                            ? <span><strong>ETH address:</strong> {this.props.eth_address}</span>
                            : <span>You need to set up a NEM wallet before you can view your EQC balance.</span>
                          )

                        : (this.props.profile.nem_address
                            ? <span><strong>NEM address:</strong> {this.props.profile.nem_address}</span>
                            : <span>You need to set up a NEM wallet before you can view your XQC balance.</span>
                          )
                    )
                }
            >

                <div className='tiny-wallet-container' style={{ cursor: 'default' }}>
                    <p className='tiny-wallet-title'>CURRENT BALANCE</p>

                    {/* {
                        (this.props.currencyFilter === 'EQC'
                            ? <WalletBalanceRenderer balance={this.state.eqc_balance} />
                            : <WalletBalanceRenderer balance={this.get_XQC_balance(this.props.profile.nem_address)} />
                        )
                    } */}

                    {(this.props.profile.nem_address
                        ? <WalletBalanceRenderer
                            balance={_walletBalance == null ? `Loading...` : `${formatNumberAbbr(_walletBalance, this.props.currencyFilter)} ${this.props.currencyFilter}`} />
                        : <a href="/profile" style={{ color: '#AF1F00' }}>Set up NEM wallet</a>
                    )}
                </div>

            </LinkWithTooltip>
        );
    }
}

export let getWalletBalance = async (address) => {
    let walletUrl = `https://nis.qchain.co/account/mosaic/owned`;

    let resp = await getJson(walletUrl, { queryParams: { address: address.split('-').join('')}, fromBaseUrl: false});

    if(resp.data) {
        let item = resp.data.data.find(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc');
        return await ( (item && item.quantity) ? item.quantity : 0 );
    }
};

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

export function LinkWithTooltip({ tooltip_body, children }) {
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
