/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import './Marketplace.component.css';

/*
Children Components
*/
import MarketplaceFilter from './MarketplaceFilter/MarketplaceFilter.component';
import MarketplaceListings from './MarketplaceListings/MarketplaceListings.component';
import Footer from '../footer/Footer.component';

import {marketplaceApi} from "../../common/api/services/marketplace-api";


/**
 * Marketplace Component
 *      displays accurate listings base on filters
 *      filters set in MarketplaceFilter is sent to Redux state.
 *          Future Task: * Dynamic loading the listing (automate pagination)
 */
const pageSize = 5;

class Marketplace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listing: null,
            total: 0,
            currentPageNum: 1,
            filters: {
                budget: 100.001,
                adFormatFilter: 'Show All',
                mediumFilter: '',
                sortingType: 'Date Added',
                keyword: ''
            }
        };

        this.getData();
    }

    getParamQuery = () => {
        const { modeFilter, currencyFilter } = this.props;
        const { filters : {budget, sortingType, adFormatFilter, mediumFilter, keyword} } = this.state;

        let sortValue = {
            'Date Added'           : 'id.desc',
            'Price (Low - High)'   : 'price',
            'Price (High - Low)'   : 'price.desc'
        }[sortingType] || null;

        // or=("
        //     + "name.ilike.*" + this.props.keyword + "*,"
        //     + "owner_name.ilike.*" + this.props.keyword + "*,"
        //     + "description.ilike.*" + this.props.keyword + "*)"

        return {
            ...( modeFilter === "Advertiser" ? { classtype: `eq.listing` } : { classtype: `eq.request`}),
            ...(!isEmpty(keyword) && {or: `(name.ilike.*${keyword}*,description.ilike.*${keyword}*)`}),
            ...( sortValue != null && {order : sortValue} ),
            ...( adFormatFilter !== 'Show All' &&
                {
                    ad_format: `eq.${encodeURIComponent(adFormatFilter)}`,
                    ...(!isEmpty(mediumFilter) ? { medium: `eq.${encodeURIComponent(mediumFilter)}`} : {})
                }
            ),
            currency: `eq.${currencyFilter}`,
            price: `lte.${budget * 1000}`,
            isactive: `is.true`
        }
    };

    getData = async() => {
        const { allApis : {getJson} } = this.props;
        const { currentPageNum } = this.state;

        let r1 = await getJson(`/account`);
        console.log(r1);

        let queryParams = this.getParamQuery();

        let headers = {
            Prefer: "count=exact",
            Range: `${pageSize * (currentPageNum - 1)}-${(pageSize * currentPageNum) - 1}`
        };

        let resp = await getJson(`/detailed_listing_view`, {queryParams, headers});

        let total = +resp.headers['content-range'].split('/')[1];

        this.setState({listing: resp.data, total})
    };

    componentDidMount() {
        document.title = "Qchain - Marketplace";
    }

    componentDidUpdate(prevProps) {
        if(prevProps.modeFilter !== this.props.modeFilter) {
            this.getData();
        }
    }

    render() {
        const {
            filters,
            listing, total, currentPageNum
        } = this.state;

        return (
            <div className='marketplace-container'>
                <MarketplaceFilter
                    {...{
                        filters,
                        onChange: (filters) => this.setState({ filters, listing: null }, () => this.getData())
                    }}
                />
                <MarketplaceListings
                    {...{
                        listing, total, currentPageNum,
                        onChangePage: (page) => this.setState({ currentPageNum: page }, () => this.getData())
                    }}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
    }
};

export default connect(
    mapStateToProps,
)(Marketplace);
