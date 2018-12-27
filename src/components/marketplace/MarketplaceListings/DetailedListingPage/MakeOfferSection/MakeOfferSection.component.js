import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Alert} from 'react-bootstrap';
import 'react-day-picker/lib/style.css'
import './MakeOfferSection.component.css';
import {makeOfferModalService, MakeOfferSectionModal} from "./MakeOfferSectionModal";

class MakeOfferSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOffered: false,
        }
    }

    makeOffer = async (options) => {
        const { allApis: { postJson }, listing } = this.props;
        const { offerAmount, offerDateRange, offerMessage } = options;

        const payload = {
            listing_id: listing.id,
            currency: listing.currency,
            price: offerAmount,
            sender: localStorage.getItem('role'),
            receiver: listing.owner,
            owner: listing.owner,
            start_date: offerDateRange.from,
            end_date: offerDateRange.to,
            message: offerMessage
        };

        await postJson(`/offer`, { payload });

        this.setState({isOffered: true});

        return await true;
    };

    static defaultProps = {
        numberOfMonths: 2
    };

    render() {
        const { isOffered } = this.state;
        const { modeFilter } = this.props;

        return (
            <div className='make-offer-button-container'>
                { (isOffered)
                    ? <Alert bsStyle='success'>Congratulations! You've made the offer!</Alert>
                    : <div className='buy-section'>
                        <Button
                            onClick={() => makeOfferModalService.openModal()}
                            className='buy-button'
                            variant='outlined'
                            color='primary'
                            disabled={modeFilter !== "Publisher"}
                        >
                            Make Offer
                        </Button>
                    </div>
                }
                <MakeOfferSectionModal {...{onMakeOffer: this.makeOffer}}/>
            </div>
        )
    }
}

export default MakeOfferSection;
