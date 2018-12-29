/*
Core Libs
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
/*
Networking
*/
/*
Local CSS
*/
import './DetailedListingPage.component.css';
/*
Placeholder Images
*/
import branded_content_ph from '../../../../assets/images/branded_content_placeholder.png';
import influencer_marketing_ph from '../../../../assets/images/influencer_marketing_placeholder.png';
import sponsorships_ph from '../../../../assets/images/sponsorships_placeholder.png';
import default_ph from '../../../../assets/images/pug_face.jpg';
import {marketplaceApi} from "../../../../common/api/services/marketplace-api";
import {DetailedRequestListing} from "./DetailedRequestListing";
import {DetailedContentSpaceListing} from "./DetailedContentSpaceListing";
import {isEmpty} from "lodash";


class DetailedListingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            error: null,
            listing: null,
            width: window.innerWidth,
            bought: false,
            processing: false,
            emptyResponse: false,
            offerAmount: -1,
            actionInfo: '',

            detailedItem: null
        };

        // Binding functions
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decideImage = this.decideImage.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        this.loadDetail();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ ...this.state, width: window.innerWidth });
    }

    decideImage(url, marketingType) {
        if (marketingType === 'Branded Content') {
            return branded_content_ph;
        } else if (marketingType === 'Influencer Post') {
            return influencer_marketing_ph;
        } else if (marketingType === 'Sponsorship') {
            return sponsorships_ph;
        } else {
            return default_ph;
        }
    }

    loadDetail = async () => {
        // call on start load to get data
        const { allApis: {getJson}, history } = this.props;

        let resp = await getJson(`/detailed_listing_view`, { queryParams: {id: `eq.${this.props.match.params.id}`}});

        // let r1 = await marketplaceApi(getJson, { queryParams: {id: `eq.${this.props.match.params.id}`}});
        if(isEmpty(resp.data[0])) {
            history.push(`/marketplace`);
        } else {
            this.setState({ detailedItem: resp.data[0]});
        }
    };

    //Split into other component
    handlePathToOwnerProfile = () => {
        this.props.history.push('/q/' + this.state.listing.owner);
    };

    render() {
        // console.log(this.props.match.params.id)
        // make a request to get detailed listing info using ID
        // parse info onto the page

        const { allApis, modeFilter, profile } = this.props;
        const { detailedItem } = this.state;

        if( detailedItem == null ) return <div/>;

        if( detailedItem.classtype === "request" ) {
            return (
                <div className='detailed-listing-container'>
                    <DetailedRequestListing
                        {...{allApis, modeFilter}}
                        onBack={() => this.props.history.goBack()}
                        item={detailedItem}
                        decideImage={this.decideImage}
                        pathToOwnerProfile={this.handlePathToOwnerProfile}
                        isOwner={profile.role === detailedItem.owner}
                    />
                </div>
            )
        }

        return (
            <div className='detailed-listing-container'>
                <DetailedContentSpaceListing
                    {...{allApis, modeFilter, profile}}
                    item={detailedItem}
                    onBack={() => this.props.history.goBack()}

                    decideImage={this.decideImage}
                    bought={this.state.bought}
                    processing={this.state.processing}
                    issue={this.state.actionInfo}
                    emailVerified={this.props.email_verified}
                    pathToOwnerProfile={this.handlePathToOwnerProfile}
                    isOwner={profile.role === detailedItem.owner}
                />
            </div>
        );

        /*
        if (this.state.fetched && !this.state.emptyResponse) {
            if (this.state.listing.classtype === "request") {
                return (
                    <div className='detailed-listing-container'>
                        <DetailedRequestListing
                            listing={this.state.listing}
                            decideImage={this.decideImage}
                            pathToOwnerProfile={this.handlePathToOwnerProfile}
                        />
                    </div>
                )
            } else {
                return <div className='detailed-listing-container'>
                    <DetailedContentSpaceListing
                        {...{allApis}}

                        listing={this.state.listing}
                        decideImage={this.decideImage}
                        onBuy={this.handleBuyItNow}
                        bought={this.state.bought}
                        processing={this.state.processing}
                        issue={this.state.actionInfo}
                        getPayoutCap={this.getPayoutCap}
                        emailVerified={this.props.email_verified}
                        pathToOwnerProfile={this.handlePathToOwnerProfile}
                    />
                </div>
            }
        } else if (this.state.fetched && this.state.emptyResponse) {
            return <Redirect to='/marketplace' />
        } else {
            return <div></div>
        }

        */
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        email_verified: state.ProfileReducer.profile.email_verified,
        profile: state.ProfileReducer.profile
    }
};

export default withRouter(connect(
    mapStateToProps,
)(DetailedListingPage));
