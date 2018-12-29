/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux'

/**
 * Fully presentational component for users to confirm form inputs before submitting
 */
const FormConfirmation = ({ modeFilter, currencyFilter, advertiserForm, publisherForm }) => (
    <div>
        {
            (
                modeFilter === 'Advertiser'
                    ? <AdvertiserFormConfirmation fields={advertiserForm} />
                    : <PublisherFormConfirmation fields={publisherForm} currencyFilter={currencyFilter} />
            )
        }
    </div>
)

const AdvertiserFormConfirmation = ({ fields }) => (
    <div>
        <table className='table table-bordered mb-0'>
            <tbody className='tbody-default'>
                <tr>
                    <td>Content Type</td>
                    <td>{fields.adFormat}</td>
                </tr>
                <tr>
                    <td>Content Medium </td>
                    <td>{fields.medium}</td>
                </tr>
                <tr>
                    <td>Description </td>
                    <td>{fields.description}</td>
                </tr>
                <tr>
                    <td>Content Topic </td>
                    <td>{fields.topic}</td>
                </tr>
            </tbody>
        </table>
    </div>
)

const PublisherFormConfirmation = ({ fields, currencyFilter }) => (
    <div>
        <table className='table table-bordered mb-0'>
            <tbody className='tbody-default'>
                <tr>
                    <td>Content Type</td>
                    <td>{fields.adFormat}</td>
                </tr>
                <tr>
                    <td>Content Medium</td>
                    <td>{fields.medium}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{fields.description}</td>
                </tr>
                <tr>
                    <td>Content Topic</td>
                    <td>{fields.topic}</td>
                </tr>
                <tr>
                    <td>Image URL</td>
                    <td>{fields.imgFile}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td><strong>{fields.price} {currencyFilter}</strong> {fields.timeUnit}</td>
                </tr>
                <tr>
                    <td>Promotion Duration</td>
                    <td><div style={{ width: '50px', float: 'left' }}><strong>From:</strong></div> {fields.dateFrom.toString()}
                        <br />
                        <div style={{ width: '50px', float: 'left' }}><strong>To:</strong></div> {fields.dateTo.toString()}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        advertiserForm: state.CreateListingFormReducer.advertiserForm,
        publisherForm: state.CreateListingFormReducer.publisherForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormConfirmation);
