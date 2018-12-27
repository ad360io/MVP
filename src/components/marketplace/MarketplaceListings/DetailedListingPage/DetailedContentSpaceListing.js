import React from "react";
// import {Card, CardText, CardTitle} from "material-ui";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import Divider from '@material-ui/core/Divider';
import {Alert} from "react-bootstrap";

import DetailedImageSlider from "./DetailedImageSlider/DetailedImageSlider.component";
import {walletApi} from "../../../../common/api/services/wallet-api";
import {DateUtils} from "../../../../common/utils/date-utils";
import {contractApi} from "../../../../common/api/services/contract-api";
import {marketplaceApi} from "../../../../common/api/services/marketplace-api";
import {invoiceApi} from "../../../../common/api/services/invoice-api";
import {Cancel} from "@material-ui/icons";
import {walletState} from "../../../../common/wallet-state";

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
            let newBalance = _walletBalance - (item.price * DateUtils.dateDiffInDays(startDate, endDate));

            if(newBalance >= 0) {
                this.makeContract(newBalance);
            } else {
                this.setState({
                    issue: ''
                })
            }
        }
    };

    makeContract = async (newBalance) => {
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
            payout_cap: item.price * DateUtils.dateDiffInDays(startDate, endDate),
            contentspacelisting: item.id,
            contentlisting: null,
            status: "Pending"
        };

        let resp = await contractApi(postJson, {payload});

        this.inactivateListing();
        this.makePayment(newBalance);
        this.getContract();
    };

    inactivateListing = async () => {
        const { allApis : { patchJson }, item } = this.props;
        return await marketplaceApi(
            patchJson,
            { queryParams: { id: `eq.${item.id}` }, payload: { isactive: false }}
        );
    };

    makePayment = async (newBalance) => {
        walletState.setState(newBalance);

        // const { allApis : { patchJson }, item } = this.props;
        // return await walletApi(patchJson, { payload : { [`${item.currency.toLowerCase()}_balance`] :  newBalance} })
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
            tx_hash: 'somehash'
        };

        let resp = await invoiceApi(postJson, {payload});

        console.log('create invoice');
    };

    getPayoutCap = () => {
        const { item } = this.props;

        let startDate = new Date(item.date_added);
        let endDate = new Date(item.expiration_date);

        return {
            amount: item.price * DateUtils.dateDiffInDays(startDate, endDate),
            days: DateUtils.dateDiffInDays(startDate, endDate)
        };
    };

    render () {
        const { item, decideImage, bought, processing, issue, emailVerified, pathToOwnerProfile, onBack, modeFilter } = this.props;

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
                        <a className='detailed-listing-action'>Add to watch list</a>
                        <Divider />
                    </div>
                </div>

                <Card className='listing-concrete-details-container'>
                    <CardHeader
                        title={item.name}
                    />

                    <Divider />

                    <CardContent className='listing-details-text'>
                        <div className='details-text'>
                            <p>Ad Format: {item.ad_format} {item.classtype}</p>

                            <p>Marketing Medium: {item.medium}</p>

                            <p>Promotion Duration: {item.date_added.slice(0, 10)} to {item.expiration_date}</p>
                        </div>

                        {
                            (bought)
                                ? <Alert bsStyle='success'>Congratulations! You've bought this listing!</Alert>
                                : <div className='buy-section'>
                                    <div className='price-section'>
                                        <span>Price: {item.price} {item.currency} per day</span>
                                        <br/>
                                        <span><strong>Total</strong>: {payoutCap.amount} {item.currency}</span>
                                        { (payoutCap.days > 1) && (<span> for {payoutCap.days} days</span>) }
                                    </div>
                                    <div className='buy-btn-section'>
                                        <Button className='buy-button'
                                                onClick={() => this.buyItem()}
                                                variant='outlined'
                                                color='primary'
                                                disabled={processing || issue.length > 0 || emailVerified === false || modeFilter !== "Advertiser"}
                                        >
                                            {
                                                (issue.length > 0)
                                                    ? issue
                                                    : 'Buy It Now!'
                                            }
                                        </Button>
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
                            <p>$PUBLISHER_NAME</p>
                        </CardContent>
                    </Card>
                    <div className='detailed-listing-action-section'>
                        <a className='detailed-listing-action'>Add publisher to favorites</a>
                        <Divider />
                        <a className='detailed-listing-action'>Contact this publisher</a>
                        <Divider />
                    </div>
                </div>
            </div>
        )
    }
}
