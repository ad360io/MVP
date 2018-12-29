/*
Core Libs
*/
import React, { Component } from 'react';
import axios from 'axios';
import './ActiveContract.component.css';
import {LoadingPanel} from "../../../../common/components/LoadingPanel";
import isEqual from "lodash/isEqual";

/**
 * ActiveContract Component
 */
class ActiveContract extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // fetching: false,
            // finished: false,
            err: null,
            activeContract: null,
            // order: '?order=name.asc',

            orderBy: {
                value: "name",
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

    componentDidMount() {

    }

    decideURL = () => {
        if (this.props.reader) {
            return "https://marketplacedb.qchain.co/active_contract_view" + this.state.order + `&or=(publisher.eq.${this.props.userId},advertiser.eq.${this.props.userId})`;
        } else {
            return "https://marketplacedb.qchain.co/my_active_contract_view" + this.state.order;
        }
    }

    loadData = async (orderBy) => {
        const { allApis: { getJson } } = this.props;

        let queryParams = orderBy ? { order: `${orderBy.value}.${orderBy.asc ? `asc` : `desc`}`} : {};

        let resp = await getJson(`/my_active_contract_view`, {queryParams});

        this.setState({activeContract: resp.data});

        /*
        this.setState({ ...this.state, fetching: true })
        const activeContractURL = this.decideURL();
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        axios.get(activeContractURL, config)
            .then((response) => {
                this.setState({
                    ...this.state,
                    finished: true,
                    fetching: false,
                    activeContract: response.data
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    ...this.state,
                    finished: true,
                    fetching: false,
                    err: err
                })
            })
        */
    }

    render() {
        const { activeContract } = this.state;

        if( activeContract == null ) return <LoadingPanel/>;

        return <div className='active-listing-container'>
            <div className='table-responsive' style={{ height: '100%', margin: '2% 0 2% 0', minHeight: '320px' }}>
                { (activeContract.length === 0)
                    ? (<p style={{ textAlign: 'center' }}>You currently have no active contracts.</p>)
                    : (<table className='table table-bordered mb-0'>
                        <thead className='thead-default'>
                            <tr>
                                <th
                                    className='active-contract-th'
                                    onClick={() => this.toggleSort('name')}>Contract Title</th>
                                <th
                                    className='active-contract-th'
                                    onClick={() => this.toggleSort('advertiser_name')}>Advertiser</th>
                                <th
                                    className='active-contract-th'
                                    onClick={() => this.toggleSort('publisher_name')}>Publisher</th>
                                <th
                                    className='active-contract-th'
                                    onClick={() => this.toggleSort('start_date')}>Start Date</th>
                                <th
                                    className='active-contract-th'
                                    onClick={() => this.toggleSort('end_date')}>End Date</th>
                                <th className='active-contract-th'
                                    onClick={() => this.toggleSort('payout_cap')}>Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                        { activeContract.map((contract, i) => (
                            <tr key={'contracttr' + i}>
                                <td>{contract.name}</td>
                                <td>{contract.advertiser_name}</td>
                                <td>{contract.publisher_name}</td>
                                <td>{contract.start_date.slice(0, 10)}</td>
                                <td>{contract.end_date.slice(0, 10)}</td>
                                <td>{contract.payout_cap} {contract.currency}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )
                }
            </div>
        </div>
    }

}


export default ActiveContract;
