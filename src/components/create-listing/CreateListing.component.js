/*
Core Libs
*/
import React, {Component} from 'react';
/*
Local CSS
*/
import './CreateListing.component.css'
/*
Children Components
*/
import CreateListingForm from './CreateListingForm/CreateListingForm.component'
import CreateListingWizard from "./CreateListingForm/CreateListingWizard";
import RequiredFormFields, {getRequiredData} from "./CreateListingForm/RequiredFormFields/RequiredFormFields.component";
import OptionalFormFields from "./CreateListingForm/OptionalFormFields/OptionalFormFields.component";
import FormConfirmation from './CreateListingForm/FormConfirmation/FormConfirmation.component';
import {Confirmation} from "./CreateListingForm/FormConfirmation/Confirmation";
import {connect} from "react-redux";
/**
 * Create Listing Component
 */
class CreateListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newListing: {},
            loading: false,
            success: false
        }
    }

    componentDidMount() {
        document.title = "Qchain - Create";
        // window.scrollTo(0, 0);
    }

    steps = [
        {
            title: "Required Information",
            render: ({formInfo}) => <RequiredFormFields {...{formInfo, newListing: this.state.newListing}}/>,
            onChange: () => {
                this.setState({newListing: {...this.state.newListing, ...getRequiredData() }})
            }
        },
        {
            title: "Optional Information",
            render: ({formInfo}) => <OptionalFormFields {...{formInfo, modeFilter: this.props.modeFilter}}/>
        },
        {
            title: "Confirmation",
            render: ({formInfo}) =>
                <Confirmation
                    {...{
                        formInfo, newListing: this.state.newListing,
                        modeFilter: this.props.modeFilter,
                        currencyFilter: this.props.currencyFilter
                    }}
                />
        },
    ];

    createListing = async () => {
        const { newListing } = this.state;
        const { modeFilter, currencyFilter, allApis: {postJson} } = this.props;

        let expirationDate = new Date();  // today
        let numberOfDaysToAdd = 14;       // number of days to delay expiration
        // For advertisers requests, make the listing expire in 2 weeks (14 days) from current day.
        expirationDate.setDate(expirationDate.getDate() + numberOfDaysToAdd);

        let payload = {
            name: newListing.topic,
            description: newListing.description,
            medium: newListing.mediumFormat,
            url: null,
            currency: currencyFilter,
            ad_format: newListing.adFormat,

            ...(modeFilter === 'Advertiser' ? {
                date_added: new Date().toISOString().slice(0, 10),
                expiration_date: expirationDate,
                price: 0,
                classtype: "request",
                advertiser: localStorage.getItem('role'),
                publisher: 'none',
                owner: localStorage.getItem('role'),
                isactive: true,
            } : {
                date_added: newListing.from,
                expiration_date: newListing.to,
                price: newListing.price,
                classtype: "listing",
                advertiser: 'none',
                publisher: localStorage.getItem('role'),
                owner: localStorage.getItem('role'),
            })
        };

        this.setState(({loading: true}));

        let resp = await postJson(`/listing`, {payload});

        this.setState(({success: true, loading: false}))
    };

    render() {
        const { success, loading } = this.state;
        const { modeFilter, currencyFilter } = this.props;

        return (
            <div style={{ 'position': 'relative' }}>
                <div className='create-container'>
                    {/*<CreateListingForm />*/}

                    <CreateListingWizard
                        {...{
                            modeFilter, currencyFilter,
                            success, loading,
                            title: modeFilter === 'Advertiser' ? 'Request Content' : 'Create Content Listing',
                            steps: this.steps,
                            onCreate: this.createListing,
                            onReset: () => this.setState({success: false, newListing: {}})
                        }}
                    />
                </div>
            </div>
        )
    }
}


export default connect(
    (state) => ({
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter
    })
)(CreateListing);
