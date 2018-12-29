/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './ActivitiesTables.component.css';

/*
Children Components
*/
import ActiveListing from './ActiveListing/ActiveListing.component';
import ActiveRequest from './ActiveRequest/ActiveRequest.component';
import ActiveContract from './ActiveContract/ActiveContract.component';
import OfferList from './OfferList/OfferList.component';
import InactiveContract from './InactiveContract/InactiveContract.component';
import Invoice from './Invoice/Invoice.component';

/*
React Bootstrap
*/
import { Tabs, Tab } from 'react-bootstrap';
import {PendingContract} from "./PendingContract/PendingContract";


class ActivitiesTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIdx: 0
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.modeFilter !== this.props.modeFilter) {
            this.setState({activeIdx: 0})
        }
    }

    render() {
        const { allApis, modeFilter, history, currencyFilter, profile } = this.props;
        const { activeIdx } = this.state;

        let list = [
            {
                title: "Offers",
                render: () => <OfferList/>,
                condition: modeFilter === "Advertiser"
            },
            {
                title: "Active Listings",
                render: () => <ActiveListing/>,
                condition: modeFilter !== "Advertiser"
            },
            {
                title: "Active Requests",
                render: () => <ActiveRequest/>,
                condition: modeFilter === "Advertiser"
            },
            {
                title: "Active Contracts",
                render: () => <ActiveContract/>,
                condition: true
            },
            {
                title: "Pending Contracts",
                render: () => <PendingContract {...{currencyFilter, modeFilter}}/>,
                condition: true
            },
            {
                title: "Past Contracts",
                render: () => <InactiveContract/>,
                condition: true
            },
            {
                title: "Invoices",
                render: () => <Invoice/>,
                condition: modeFilter === "Advertiser"
            },
            {
                title: "Payments",
                render: () => <Invoice isPublisher isPayment/>,
                condition: modeFilter !== "Advertiser"
            },
        ];

        return <div className='dashboard-tables-container'>
            <h2 className='dashboard-tables-title'>Participating Activities</h2>
            <Tabs
                activeKey={activeIdx}
                onSelect={(activeIdx) => this.setState({ activeIdx })}
                id='dashboard-tables-tabs'
                style={{ paddingLeft: '10%', paddingRight: '10%' }}
                className='table-tabs'
                unmountOnExit={true}
            >
                { list
                    .filter((l) => l.condition)
                    .map((l, key) => (
                        <Tab
                            eventKey={key}
                            title={l.title}
                            key={key}
                        >
                            { React.cloneElement(l.render(), { allApis, history, profile }) }
                        </Tab>
                    ))
                }
            </Tabs>
        </div>
    }
}


export default ActivitiesTables;
