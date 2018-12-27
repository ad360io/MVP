/*
Core Libs
*/
import React, { Component } from 'react';
import axios from 'axios';

import './ActiveListing.component.css';
import {contentspaceListingApi} from "../../../../common/api/services/contentspace-listing-api";
import {LoadingPanel} from "../../../../common/components/LoadingPanel";
import isEqual from "lodash/isEqual";
import {OfferDialogConfirmation, offerDialogConfirmationService} from "../OfferList/OfferDialogConfirmation";
import {Button} from "react-bootstrap";

/**
 * ActiveListing Component
 */
class ActiveListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            activeListing: null,
            order: '?order=name.asc',

            orderBy: {
                value: 'name',
                asc: true
            }
        };

        this.loadData(this.state.orderBy);
    }

    componentDidUpdate(prevProps, prevState) {
        if(!isEqual(prevState.orderBy, this.state.orderBy)) {
            this.loadData(this.state.orderBy);
        }
    }

    toggleSort = (sortValue) => {
        let { orderBy } = this.state;

        if (orderBy == null || orderBy.value !== sortValue) {
            this.setState({orderBy: {value: sortValue, asc: true}});
        } else {
            if (orderBy.asc) {
                this.setState({orderBy: {value: sortValue, asc: false}});
            } else {
                this.setState({orderBy: {value: sortValue, asc: true}});
            }
        }
    };

    decideURL = () => {
        if(this.props.reader) {
            return "https://marketplacedb.qchain.co/active_contentspace_listing" + this.state.order + `&owner=eq.${this.props.userId}`;
        }else {
            return "https://marketplacedb.qchain.co/my_active_contentspace_listing" + this.state.order;
        }
    }

    loadData = async (orderBy) => {
        const { allApis: {getJson} } = this.props;

        let queryParams = orderBy ? { order: `${orderBy.value}.${orderBy.asc ? `asc` : `desc`}`} : {};

        let resp = await contentspaceListingApi(getJson, { queryParams });

        this.setState({activeListing: resp.data});
    };

    deleteActiveListing = async (listing) => {
        const { allApis: {patchJson, delJson} } = this.props;

        await patchJson(`/listing`, { queryParams: {id: `eq.${listing.id}`}, payload: { isactive: false } });

        //TODO: delete listing
        // await delJson(`/listing`, { queryParams: {id: `eq.${listing.id}`} });
    };

    render() {
        const {activeListing} = this.state;
        const { history } = this.props;

        if(activeListing == null) return <LoadingPanel/>;

        return (
            <div className='active-listing-container'>
                <div className='table-responsive' style={{ height: '100%', margin: '2% 0 2% 0', minHeight: '320px' }}>
                    { (activeListing.length === 0)
                        ? (<p style={{ textAlign: 'center' }}>You currently have no no active listings.</p>)
                        : (<table className='table table-bordered mb-0'>
                            <thead className='thead-default'>
                                <tr>
                                    <th
                                        className='active-listing-th'
                                        onClick={() => this.toggleSort('name')}>Content Space Title</th>
                                    <th
                                        className='active-listing-th'
                                        onClick={() => this.toggleSort('ad_format')}>Ad Format</th>
                                    <th
                                        className='active-listing-th'
                                        onClick={() => this.toggleSort('medium')}>Medium</th>
                                    <th
                                        className='active-listing-th'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            { activeListing.map((listing, i) => (
                                <tr key={'listingtr' + i}>
                                    <td style={{ color: '#3366BB', cursor: 'pointer' }} onClick={() => history.push(`/listing/${listing.id}`)}>{listing.name}</td>
                                    <td>{listing.ad_format}</td>
                                    <td>{listing.medium}</td>
                                    <td>
                                        <Button
                                            bsStyle='danger'
                                            onClick={() => {
                                                // this.handleDeclineOffer()
                                                offerDialogConfirmationService.openModal({
                                                    open: true,
                                                    options: {
                                                        title: "Confirmation",
                                                        content: "Are you sure to delete this active listing?",
                                                        btnTitle: "Delete",
                                                        btnAction: () => this.deleteActiveListing(listing),
                                                        btnType: "danger"
                                                    }
                                                });
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        )
                    }
                </div>

                <OfferDialogConfirmation/>
            </div>
        )
    }
}


export default ActiveListing;
