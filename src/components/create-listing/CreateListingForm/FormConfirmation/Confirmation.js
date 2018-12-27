import React from "react";

export class Confirmation extends React.Component {
    render () {
        //imgFile, currencyFilter, timeUnit
        this.props.formInfo && this.props.formInfo({valid: true});

        let { from, to, adFormat, mediumFormat, topic, price, description } = this.props.newListing;

        return (
            <div>
                <table className='table table-bordered mb-0'>
                    <tbody className='tbody-default'>
                        <tr>
                            <td>Marketing Type </td>
                            <td>{adFormat}</td>
                        </tr>
                        <tr>
                            <td>Marketing Medium </td>
                            <td>{mediumFormat}</td>
                        </tr>
                        <tr>
                            <td>Description </td>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <td>Content Topic </td>
                            <td>{topic}</td>
                        </tr>
                        {/*

                        { imgFile && (
                            <tr>
                                <td>Image URL </td>
                                <td>{imgFile}</td>
                            </tr>
                        ) }

                        { price && (
                            <tr>
                                <td>Price</td>
                                <td><strong>{price} {currencyFilter}</strong> {timeUnit}</td>
                            </tr>
                        )}

                        */}


                        { from && to && (
                            <tr>
                                <td>Promotion Duration </td>
                                <td><div style={{ width: '50px', float: 'left' }}><strong>From:</strong></div> {from.toString()}
                                    <br />
                                    <div style={{ width: '50px', float: 'left' }}><strong>To:</strong></div> {to.toString()}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
