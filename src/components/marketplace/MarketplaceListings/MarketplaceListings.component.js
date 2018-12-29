/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './MarketplaceListings.component.css';

/*
Children Component
*/
import ListingCard from './ListingCard/ListingCard.component';

import { Pagination } from 'react-bootstrap';
import ErrorPage from '../../ErrorPage/ErrorPage.component';
import CircularProgress from '@material-ui/core/CircularProgress';

const pageSize = 5;
/**
 * Marketplace Listings contains array of Listing Cards
 * Filtering of data is done here, which isn't ideal
 *         Future Task: * auto load on scroll should happen here
 */
class MarketplaceListings extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Display Title of Listings Component
     * Purely for presentational purposes
     * @param {Number} listingSize size of the listing array after filtering
     */
    getTitle = (listingSize) => {
        const listingType = (this.props.modeFilter === 'Advertiser' ? 'Content Listings' : 'Content Requests');
        const isEmpty = (listingSize > 0 ? '' : 'No ')
        return isEmpty + listingType + ' Available';
    }

    render() {
        const { listing, total, currentPageNum, onChangePage } = this.props;

        if(listing == null) return <div className='loading-container'><CircularProgress className='marketplace-listing-loading' size={100}/> </div>;

        let pages = Math.ceil(total / pageSize);

        return (
            <div className='marketplace-listings-container'>
                <div className='marketplace-title-container'>
                    <p className='marketplace-title'>{this.getTitle(total)}</p>
                </div>

                { listing.map((listing, i) => (
                    <ListingCard key={'listingCard' + i} listing={listing} modeFilter={this.props.modeFilter} />
                ))}

                <div style={{ textAlign: 'center' }}>
                    <Pagination className='listing-pages' bsStyle='small'>
                        { Array(pages).fill(1).map((_, i) => (
                            <Pagination.Item
                                key={'listingPage' + i}
                                active={i + 1 === currentPageNum}
                                onClick={() => onChangePage(i + 1)}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        listings: state.MarketplaceDataReducer.db.listings,
        totalListingCount: state.MarketplaceDataReducer.total,
        currentPageNumber: state.MarketplaceFilterReducer.currentPageNumber,
        fetched: state.MarketplaceDataReducer.fetched,
        fetching: state.MarketplaceDataReducer.fetching,
        hasError: state.MarketplaceDataReducer.hasError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPageItemClick: (page) => {
            dispatch({
                type: 'SET_PAGE_NUMBER',
                value: page
            })
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketplaceListings);
