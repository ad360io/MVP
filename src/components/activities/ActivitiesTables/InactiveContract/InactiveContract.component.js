/*
Core Libs
*/
import React, {Component} from 'react';

import './InactiveContract.component.css';
import {LoadingPanel} from "../../../../common/components/LoadingPanel";
import isEqual from 'lodash/isEqual';
import {Pagination} from "react-bootstrap";

/**
 * InactiveContract Component
 */

let pageSize = 10;

class InactiveContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // finished: false,
            // err: null,
            inactiveContract: null,
            // order: '?order=name.asc',
            //
            orderBy: {
                value: 'name',
                asc: true
            },
            currentPageNum: 1
        };

        this.loadData(this.state.orderBy);
    }


    loadData = async (orderBy) => {
        let { allApis : { getJson } } = this.props;
        const { currentPageNum } = this.state;

        let headers = {
            Prefer: "count=exact",
            Range: `${pageSize * (currentPageNum - 1)}-${(pageSize * currentPageNum) - 1}`
        };

        let queryParams = orderBy ? { order: `${orderBy.value}.${orderBy.asc ? `asc` : `desc`}`} : {};

        let resp = await getJson(`/inactive_contract_view`, { queryParams, headers });
        let total = +resp.headers['content-range'].split('/')[1];

        this.setState({inactiveContract: resp.data, total});
    };

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

    render() {
        let { inactiveContract, total, currentPageNum } = this.state;

        if(inactiveContract == null) return <LoadingPanel/>;

        let pages = Math.ceil(total / pageSize);

        return (
            <div className='active-listing-container'>
                <div className='table-responsive' style={{ height: '100%', margin: '2% 0 2% 0', minHeight: '320px' }}>
                    { (inactiveContract.length === 0)
                        ? (<p style={{ textAlign: 'center' }}>You currently have no inactive contracts.</p>)
                        : (<table className='table table-bordered mb-0'>
                                <thead className='thead-default'>
                                <tr>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('name')}>Contract Title</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('advertiser_name')}>Advertiser</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('publisher_name')}>Publisher</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('start_date')}>Start Date</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('end_date')}>End Date</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('payout_cap')}>Total Payment</th>
                                </tr>
                                </thead>
                                <tbody>
                                { inactiveContract.map((contract, i) => (
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

                    <Pagination bsSize="small">
                        { Array(pages).fill(1).map((item, key) => (
                            <Pagination.Item
                                key={key}
                                active={key + 1 === currentPageNum}
                                onClick={() =>
                                    this.setState({currentPageNum: key + 1}, () => this.loadData(this.state.orderBy))
                                }
                            >
                                {key + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        )
    }
}


export default InactiveContract;
