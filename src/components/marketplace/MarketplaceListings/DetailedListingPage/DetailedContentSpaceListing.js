import React from "react";
// import {Card, CardText, CardTitle} from "material-ui";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import Divider from '@material-ui/core/Divider';
import {Alert, OverlayTrigger, Tooltip} from "react-bootstrap";

import DetailedImageSlider from "./DetailedImageSlider/DetailedImageSlider.component";
import {walletApi} from "../../../../common/api/services/wallet-api";
import {DateUtils} from "../../../../common/utils/date-utils";
import {contractApi} from "../../../../common/api/services/contract-api";
import {marketplaceApi} from "../../../../common/api/services/marketplace-api";
import {invoiceApi} from "../../../../common/api/services/invoice-api";
import {Cancel} from "@material-ui/icons";
import {walletState} from "../../../../common/wallet-state";
import {makeOfferModalService} from "./MakeOfferSection/MakeOfferSectionModal";
import {getWalletBalance} from "../../../header/TinyWallet/TinyWallet.component";
import {isEmpty} from "lodash";

export class DetailedContentSpaceListing extends React.Component {

    buyItem = async () => {
        const { allApis : { getJson }, item } = this.props;
        // let resp = await walletApi(getJson);

        let _walletBalance = walletState.getState();
        //wallet balance
        // let balance = resp.data[0];

        let startDate = new Date(item.date_added);
        let endDate = new Date(item.expiration_date);

        if(_walletBalance) {
            // let newBalance = _walletBalance - (item.price * DateUtils.dateDiffInDays(startDate, endDate));
            let newBalance = _walletBalance - (item.price);

            if(newBalance >= 0) {
                this.makeContract();
            } else {
                this.setState({
                    issue: ''
                })
            }
        } else {
            alert('You need to set up your wallet before you can buy listings.');
        }

        // if(_walletBalance) {
        //     this.makeContract();
        // }
    };

    makeContract = async () => {
        const { allApis : { postJson }, item } = this.props;

        let startDate = new Date(item.date_added);
        let endDate = new Date(item.expiration_date);

        const payload = {
            name: item.name,
            advertiser: localStorage.getItem('role'),
            publisher: item.owner,
            start_date: item.date_added,
            end_date: item.expiration_date,
            currency: item.currency,
            // payout_cap: item.price * DateUtils.dateDiffInDays(startDate, endDate),
            payout_cap: item.price,
            contentspacelisting: item.id,
            contentlisting: null,
            status: "Pending"
        };

        let resp = await contractApi(postJson, {payload});

        this.inactivateListing();
        this.makePayment();
        this.getContract();
    };

    inactivateListing = async () => {
        const { allApis : { patchJson }, item } = this.props;
        return await marketplaceApi(
            patchJson,
            { queryParams: { id: `eq.${item.id}` }, payload: { isactive: false }}
        );
    };

    makePayment = async () => {
        const { profile } = this.props;
        walletState.setState(await getWalletBalance(profile.nem_address));
    };

    getContract = async () => {
        const { allApis : { getJson }, item } = this.props;
        let resp = await contractApi(getJson, { queryParams: { contentspacelisting: `eq.${item.id}` } });

        //contract
        this.createInvoiceAfterContract(resp.data[0])
    };

    createInvoiceAfterContract = async (contract) => {
        const { allApis : { postJson } } = this.props;

        const payload = {
            contract: contract.number,
            currency: contract.currency,
            amount: Number.parseFloat(contract.payout_cap),
            due_date: contract.end_date,
            tx_hash: 'somehash',
            paid: false
        };

        let resp = await invoiceApi(postJson, {payload});

        console.log('create invoice');
    };

    getPayoutCap = () => {
        const { item } = this.props;

        let startDate = new Date(item.date_added);
        let endDate = new Date(item.expiration_date);

        return {
            // amount: item.price * DateUtils.dateDiffInDays(startDate, endDate),
            amount: item.price,
            days: DateUtils.dateDiffInDays(startDate, endDate)
        };
    };

    render () {
        const { item, decideImage, bought, processing, issue, emailVerified, pathToOwnerProfile, onBack, modeFilter, isOwner } = this.props;

        let payoutCap = this.getPayoutCap();

        return (
            <div className='detailed-listing-renderer'>
                <div className='cancel-button' onClick={() => onBack()}>
                    <Cancel/>
                </div>

                <div className='detailed-image-container'>
                    <Card>
                        <CardContent>
                            <DetailedImageSlider imageSrc={decideImage(item.images, item.ad_format)} />

                        </CardContent>
                    </Card>
                    <div className='detailed-listing-action-section'>
                        {/* <a className='detailed-listing-action'>Save this listing</a>
                        <Divider /> */}
                        {/* <a className='detailed-listing-action'>Add to watch list</a>
                        <Divider /> */}
                    </div>
                </div>

                <Card className='listing-concrete-details-container'>
                    <CardHeader
                        title={item.name}
                    />

                    <Divider />

                    <CardContent className='listing-details-text'>
                        <div className='details-text'>
                            <p>Content Type: {item.ad_format} {item.classtype}</p>

                            <p>Content Medium: {item.medium}</p>

                            <p>Promotion Duration: {item.date_added.slice(0, 10)} to {item.expiration_date}</p>
                        </div>

                        {
                            (bought)
                                ? <Alert bsStyle='success'>Congratulations! You've bought this listing!</Alert>
                                : <div className='buy-section'>
                                    <div className='price-section'>
                                        {/* <span>Price: {item.price} {item.currency} per day</span>
                                        <br/>
                                        <span><strong>Total</strong>: {payoutCap.amount} {item.currency}</span>
                                        { (payoutCap.days > 1) && (<span> for {payoutCap.days} days</span>) } */}
                                        <span><strong>Price</strong>: {payoutCap.amount} {item.currency}</span>
                                    </div>
                                    <div className='buy-btn-section'>
                                        { isOwner ? (
                                            <OverlayTrigger placement="top" overlay={<Tooltip id="buy-it">This is your own listing.</Tooltip>}>
                                                <Button className='buy-button' variant='outlined' style={{backgroundColor: '#fefefe'}}>Buy It Now!</Button>
                                            </OverlayTrigger>
                                        ) : (
                                            <Button className='buy-button'
                                                    onClick={() => this.buyItem()}
                                                    variant='outlined'
                                                    color='primary'
                                                    style={{backgroundColor: '#fefefe'}}
                                                    disabled={processing || issue.length > 0 || emailVerified === false || modeFilter !== "Advertiser"}
                                            >
                                                {
                                                    (issue.length > 0)
                                                        ? issue
                                                        : 'Buy It Now!'
                                                }
                                            </Button>
                                        )}
                                    </div>
                                </div>
                        }

                        <div className='details-text' style={{ marginTop: '24px' }}>{item.description}</div>
                    </CardContent>
                </Card>

                <div className='poster-info-container'>
                    <Card>
                        <CardHeader
                            title={`Publisher`}
                        />
                        <CardContent>
                            <p>{!isEmpty(item.publisher_nickname) ? item.publisher_nickname : item.publisher_name}</p>
                        </CardContent>
                    </Card>
                    <div className='detailed-listing-action-section'>
                        {/* <a className='detailed-listing-action'>Add publisher to favorites</a>
                        <Divider /> */}
                        {/* <a className='detailed-listing-action'>Contact this publisher</a>
                        <Divider /> */}
                    </div>
                </div>
            </div>
        )
    }
}
