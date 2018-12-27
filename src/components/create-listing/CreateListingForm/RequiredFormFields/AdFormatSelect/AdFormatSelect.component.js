/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
React Bootstrap
*/
import { Button, ButtonGroup } from 'react-bootstrap';

/*
Local CSS
*/
import './AdFormatSelect.component.css';

/*
Helper Component
*/
import SelectButtonGroup from './SelectButtonGroup.component';


class AdFormatSelect extends Component {
    
    showMedium = () => {
        let currentMediumStringList = this.getMediumStringList();
        if (currentMediumStringList !== null) {
            return <div>
                <p className='ad-format-selector-title'>Select Medium</p>
                <ButtonGroup justified >
                    {
                        currentMediumStringList.map((mediumString, index) => {
                            if (index < currentMediumStringList.length / 2) {
                                return <MediumButton
                                    currentMediumValue={this.getCurrentMediumValue()}
                                    mediumString={mediumString}
                                    onMediumClick={this.props.onMediumClick}
                                    key={mediumString + "_" + index}
                                />
                            } else {
                                return null;
                            }
                        })
                    }
                </ButtonGroup>
                <ButtonGroup justified style={{ marginBottom: '25px' }}>
                    {
                        currentMediumStringList.map((mediumString, index) => {
                            if (index >= currentMediumStringList.length / 2) {
                                return <MediumButton
                                    currentMediumValue={this.getCurrentMediumValue()}
                                    mediumString={mediumString}
                                    onMediumClick={this.props.onMediumClick}
                                    key={mediumString + "_" + index}
                                />
                            } else {
                                return null;
                            }
                        })
                    }
                </ButtonGroup>
            </div>
        } else {
            return null;
        }
    }

    getCurrentAdFormatValue = () => {
        return this.props.modeFilter === 'Advertiser' ? this.props.adv_adFormat : this.props.pub_adFormat;
    }

    getCurrentMediumValue = () => {
        return this.props.modeFilter === 'Advertiser' ? this.props.adv_medium : this.props.pub_medium;
    }

    getMediumStringList = () => {
        /* Variable Naming Abbreviation
        * bc stands for -Braned Content-
        * ip stands for -Influencer Post-
        * sp stands for -Sponsorship-
        * pj stands for -Patron Journalism-
        */
        const bcMediumStringList = ['Written Piece', 'Audio Piece', 'Video Piece', 'Email',
            'Webinar', 'Other',];
        const ipMediumStringList = ['Tweet', 'Instagram', 'Twitch', 'Youtube',
            'Facebook', 'Twitter', 'NicoNico', 'Other'];
        const spMediumStringList = ['Event', 'Individual', 'Website', 'Artistic Creation',
            'Email Newsletter', 'Other'];
        const pjMediumStringList = ['Written Piece', 'Audio Piece', 'Video Piece', 'Other'];

        if (this.getCurrentAdFormatValue() === 'Branded Content') {
            return bcMediumStringList;
        } else if (this.getCurrentAdFormatValue() === 'Influencer Post') {
            return ipMediumStringList;
        } else if (this.getCurrentAdFormatValue() === 'Sponsorship') {
            return spMediumStringList;
        } else if (this.getCurrentAdFormatValue() === 'Patron Journalism') {
            return pjMediumStringList;
        } else {
            return null;
        }

    }

    render() {
        const adFormatStringList = ['Branded Content', 'Influencer Post', 'Sponsorship', 'Patron Journalism'];
        return <div>
            <p className='ad-format-selector-title'>Select Ad Format</p>
            <SelectButtonGroup stringList={this.getMediumStringList()} />
            <ButtonGroup style={{ marginBottom: '25px' }} justified >
                {
                    adFormatStringList.map((adFormatString, index) => {
                        return <AdFormatButton
                            currentAdFormatValue={this.getCurrentAdFormatValue()}
                            adFormatString={adFormatString}
                            onAdFormatClick={this.props.onAdFormatClick}
                            key={adFormatString + "_" + index}
                        />
                    })
                }
            </ButtonGroup>
            {this.showMedium()}
        </div>
    }
}

const MediumButton = ({ currentMediumValue, mediumString, onMediumClick }) => (
    <Button
        className='btn-ad-format-selector'
        onClick={() => onMediumClick(mediumString)}
        active={currentMediumValue === mediumString}
        href="#"
    >
        {mediumString}
    </Button>
)

const AdFormatButton = ({ currentAdFormatValue, adFormatString, onAdFormatClick }) => (
    <Button
        className='btn-ad-format-selector'
        onClick={() => onAdFormatClick(adFormatString)}
        active={currentAdFormatValue === adFormatString}
        href="#"
    >
        {adFormatString}
    </Button>
)

const mapStateToProps = (state) => {
    return {
        adv_adFormat: state.CreateListingFormReducer.advertiserForm.adFormat,
        adv_medium: state.CreateListingFormReducer.advertiserForm.medium,
        pub_adFormat: state.CreateListingFormReducer.publisherForm.adFormat,
        pub_medium: state.CreateListingFormReducer.publisherForm.medium
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { modeFilter } = ownProps;
    return {
        onAdFormatClick: (value) => {
            if (modeFilter === 'Advertiser') {
                dispatch({
                    type: 'SET_ADV_FORM_AD_FORMAT',
                    adFormat: value
                })
            } else {
                dispatch({
                    type: 'SET_PUB_FORM_AD_FORMAT',
                    adFormat: value
                })
            }
        },

        onMediumClick: (value) => {
            if (modeFilter === 'Advertiser') {
                dispatch({
                    type: 'SET_ADV_FORM_MARKETING_MEDIUM',
                    medium: value
                })
            } else {
                dispatch({
                    type: 'SET_PUB_FORM_MARKETING_MEDIUM',
                    medium: value
                })
            }
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdFormatSelect);