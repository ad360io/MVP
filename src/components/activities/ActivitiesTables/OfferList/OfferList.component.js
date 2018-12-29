/*
Core Libs
*/
import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

/*
React Bootstrap Components
*/
import { Button } from 'react-bootstrap';
import { Popover, OverlayTrigger } from 'react-bootstrap';

import Divider from '@material-ui/core/Divider';
import {myOffersViewApi} from "../../../../common/api/services/my-offers-view-api";
import {LoadingPanel} from "../../../../common/components/LoadingPanel";
import {walletApi} from "../../../../common/api/services/wallet-api";
import {DateUtils} from "../../../../common/utils/date-utils";
import {contractApi} from "../../../../common/api/services/contract-api";
import {
    OfferDialogConfirmation,
    offerDialogConfirmationService
} from "./OfferDialogConfirmation";
import {walletState} from "../../../../common/wallet-state";


/**
 * OfferList Component
 * User should be able to create a new smart contract when accepting a invite
 * Invite listing should be removed from list after action is performed.
 */
class OfferList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            activeOffers: null,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { allApis: {getJson}} = this.props;

        let resp = await myOffersViewApi(getJson);

        this.setState({activeOffers: resp.data});

        /*

        const activeListingURL = "https://marketplacedb.qchain.co/my_offers_view";
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        axios.get(activeListingURL, config)
            .then((response) => {
                this.setState({
                    ...this.state,
                    finished: true,
                    activeOffers: response.data
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    ...this.state,
                    finished: true,
                    err: err
                })
            })

        */

        this.setState({nem_address: this.props.nem_address});
        this.setState({eth_address: this.props.eth_address});
    };

    render() {
        let { activeOffers } = this.state;
        const { allApis } = this.props;

        if( activeOffers == null ) return <LoadingPanel/>;

        return (
            <div className='invite-list-container'>
                <div className='table-responsive' style={{ height: '100%', margin: '2% 0 2% 0', minHeight: '320px' }}>
                    {(activeOffers.length === 0) ?
                        <p style={{ textAlign: 'center' }}>You don't have any offers right now.</p> :
                        ( <table className='table table-bordered mb-0'>
                            <thead className='thead-default'>
                            <tr>
                                <th>Offer Detail</th>
                                <th style={{ width: '25%', textAlign: 'center' }}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            { activeOffers.map((offer, i) =>
                                <OfferRenderer
                                    key={'offer' + i}
                                    {...{
                                        allApis,
                                        offer,
                                        onRemoveOffer: (id) => this.setState({activeOffers: activeOffers.filter((a) => a.id !== id)}),
                                    }}
                                />
                            )}
                            </tbody>
                        </table>
                        )
                    }
                    <OfferDialogConfirmation/>
                </div>
            </div>
        );
    }

}

class OfferRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            actionInfo: ''
        };
    }

    makePayment = async(newBalance) => {
        return await walletState.setState(newBalance);
        // const { allApis : { patchJson }, offer } = this.props;
        // return await walletApi(patchJson, { payload : { [`${offer.currency.toLowerCase()}_balance`] :  newBalance} })
    };

    acceptOffer = async () => {
        const { allApis: { getJson }, offer } = this.props;
        this.setState({isProcessing: true});

        // const walletURL = `https://marketplacedb.qchain.co/wallet_view`;

        let _walletBalance = walletState.getState();

        // let resp = await walletApi(getJson);
        // let balance = resp.data[0];

        let startDate = new Date(offer.start_date);
        let endDate = new Date(offer.end_date);


        offerDialogConfirmationService.openModal({
            open: true,
            options: {
                title: "Confirmation",
                content: "Are you sure to accept this offer?",
                btnTitle: "Accept",
                btnAction: () => this.makeContract(),
                btnType: "success"
            }
        });

        /*
        if(_walletBalance) {
            let newBalance = _walletBalance - (offer.price * DateUtils.dateDiffInDays(startDate, endDate));

            if(newBalance >= 0) {
                offerDialogConfirmationService.openModal({
                    open: true,
                    options: {
                        title: "Confirmation",
                        content: "Are you sure to accept this offer?",
                        btnTitle: "Accept",
                        btnAction: () => this.makeContract(newBalance),
                        btnType: "success"
                    }
                });

                // this.makeContract(newBalance)

            } else {
                this.setState({
                    isProcessing: false,
                    actionInfo: `Insufficient ${offer.currency}`
                })
            }
        }
        */
    };

    makeContract = async () => {
        const { allApis : { postJson }, offer } = this.props;

        let startDate = new Date(offer.start_date);
        let endDate = new Date(offer.end_date);

        const payload = {
            name: offer.topic,
            advertiser: localStorage.getItem('role'),
            publisher: offer.sender,
            start_date: offer.start_date,
            end_date: offer.end_date,
            currency: offer.currency,
            // TODO: calculate payout_cap depending on either one time payment or price/day
            payout_cap: offer.price,
            // payout_cap: offer.price * DateUtils.dateDiffInDays(startDate, endDate),
            contentlisting: offer.listing_id,
            contentspacelisting: null,
            status: "Pending"
        };

        try {
            await contractApi(postJson, {payload})
            this.patchListing();
            this.deleteOffer();
        } catch (e) {

        }


        // this.makePayment();
    };

    patchListing = async() => {
        const { allApis: { patchJson }, offer } = this.props;
        return await patchJson(`/listing`, { queryParams: { id: `eq.${offer.listing_id}` }, payload: { isactive: false } });
    };

    handleDeclineOffer() {
        this.deleteOffer();
    }

    deleteOffer = async () => {
        const { allApis: { delJson }, offer, onRemoveOffer } = this.props;
        let resp = await delJson(`/offer`, { queryParams: { id: `eq.${offer.id}` } });

        if(resp) {
            onRemoveOffer(offer.id)
        }
    };

    getInfoPopover = () => {
        let startDate = new Date(this.props.offer.start_date);
        let endDate = new Date(this.props.offer.end_date);
        return (
            <Popover title={this.props.offer.sender_name + ' sent you an offer!'} id={'popover' + this.props.offer.id}>
                <strong>Content Type</strong> {this.props.offer.ad_format} <br />
                <Divider />
                <strong>Start Date</strong> {this.props.offer.start_date} <br />
                <strong>End Date</strong> {this.props.offer.end_date} <br />
                <Divider />
                {/* <strong>Pricing</strong> {this.props.offer.price} {this.props.offer.currency} per day<br /> */}
                {/* <strong>Total</strong> {this.props.offer.price * dateDiffInDays(startDate, endDate)} {this.props.offer.currency} */}
                <strong>Price</strong> {this.props.offer.price} {this.props.offer.currency}
                <Divider />
                <strong>Message</strong><br />
                {this.props.offer.message}
            </Popover>
        )
    }

    handleOkayClick = () => {
        this.setState({
            ...this.state,
            actionInfo: ''
        })
    };

    render() {
        console.log(this.props.offer);

        return (
            <Fragment>

                <tr className='offer-renderer-tr'>
                    <td style={{paddingTop: '16px'}}>
                        <OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={this.getInfoPopover()}>
                            <a style={{cursor: 'pointer'}}> {this.props.offer.topic} ({this.props.offer.currency})
                                - {this.props.offer.sender_name}</a>
                        </OverlayTrigger>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        {
                            (this.state.isProcessing)
                                ? <span style={{color: '#777777'}}>Processing Action...</span>
                                : <div>
                                    {
                                        (this.state.actionInfo.length > 0) ?
                                            <div>
                                                {this.state.actionInfo}
                                                <Button style={{marginLeft: '5px'}}
                                                        onClick={() => this.handleOkayClick()}>okay...</Button>
                                            </div>
                                            : (<div>
                                                <Button
                                                    bsStyle='success'
                                                    onClick={() => this.acceptOffer()}
                                                    style={{marginRight: '10px'}}
                                                > Accept </Button>
                                                <Button
                                                    bsStyle='danger'
                                                    onClick={() => {
                                                        // this.handleDeclineOffer()
                                                        offerDialogConfirmationService.openModal({
                                                            open: true,
                                                            options: {
                                                                title: "Confirmation",
                                                                content: "Are you sure to decline this offer?",
                                                                btnTitle: "Decline",
                                                                btnAction: () => this.handleDeclineOffer(),
                                                                btnType: "danger"
                                                            }
                                                        });
                                                    }}
                                                >
                                                    Decline
                                                </Button>
                                            </div>)
                                    }
                                </div>
                        }
                    </td>
                </tr>

            </Fragment>
        )
    }
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return (Math.ceil((utc2 - utc1) / _MS_PER_DAY) + 1 === 0 ? 1 : Math.ceil((utc2 - utc1) / _MS_PER_DAY) + 1);
}

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.profile,
        nem_address: state.ProfileReducer.profile.nem_address,
        eth_address: state.ProfileReducer.profile.eth_address,
    }
}

export default connect(
    mapStateToProps
)(OfferList);
