import React from "react";
import {LoadingPanel} from "../../../../common/components/LoadingPanel";
import {PendingContractModal} from "./PendingContractModal";

export class PendingContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingContract: null,
            selectedItem: null
        };

        this.getPendingContract();
    }

    getPendingContract = async () => {
        const { allApis: { getJson }} = this.props;
        let resp = await getJson(`/my_pending_contract_view`);

        this.setState({pendingContract: resp.data});
    };

    render () {
        const { pendingContract, selectedItem } = this.state;
        const { allApis, currencyFilter, profile, modeFilter } = this.props;

        if(pendingContract == null) return <LoadingPanel/>;

        return (
            <div className='active-listing-container'>
                <div className='table-responsive' style={{ height: '100%', margin: '2% 0 2% 0', minHeight: '320px' }}>
                    { (pendingContract.length === 0)
                        ? (<p style={{ textAlign: 'center' }}>You currently have no pending contracts.</p>)
                        : (<table className='table table-bordered mb-0'>
                                <thead className='thead-default'>
                                <tr>
                                    <th
                                        className='inactive-contract-th'>Contract Title</th>
                                    <th
                                        className='inactive-contract-th'
                                        >Advertiser</th>
                                    <th
                                        className='inactive-contract-th'
                                        >Publisher</th>
                                    <th
                                        className='inactive-contract-th'
                                        >Start Date</th>
                                    <th
                                        className='inactive-contract-th'
                                        >End Date</th>
                                    <th
                                        className='inactive-contract-th'
                                        >Total Payment</th>
                                </tr>
                                </thead>
                                <tbody>
                                { pendingContract
                                    .filter((c) => c.currency === currencyFilter)
                                    .map((contract, i) => (
                                    <tr
                                        key={'contracttr' + i}
                                        onClick={() => {
                                            modeFilter === "Advertiser" && (
                                                this.setState({selectedItem: contract},
                                                    () => this.contractModal.toggle()
                                                )
                                            )

                                        }}
                                    >
                                        <td style={{ color: '#3366BB', cursor: 'pointer' }}>{contract.name}</td>
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

                { selectedItem && (
                    <PendingContractModal
                        ref={(elem) => this.contractModal = elem}
                        {...{
                            selectedItem,
                            afterClose: (success) => {
                                if(success) {
                                    this.getPendingContract()
                                }
                                this.setState({selectedItem: null})
                            },
                            allApis,
                            profile
                        }}
                    />
                )}
            </div>
        )
    }
}
