/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './AdFormatFilter.component.css';

/*
Actions
*/
import { setAdFormat, setMedium } from '../../../../actions/MarketplaceActions';

/*
React Bootstrap
*/
import { Button, SplitButton, MenuItem } from 'react-bootstrap';

const bcMediumStringList = ['Written Piece', 'Audio Piece', 'Video Piece', 'Email',
    'Webinar', 'Other',];
const ipMediumStringList = ['Tweet', 'Instagram', 'Twitch', 'Youtube',
    'Facebook', 'Twitter', 'NicoNico', 'Other'];
const spMediumStringList = ['Event', 'Individual', 'Website', 'Artistic Creation',
    'Email Newsletter', 'Other'];
const pjMediumStringList = ['Written Piece', 'Audio Piece', 'Video Piece', 'Other'];

const AdFormatFilter = ({ filters, onChange }) => {

    let adFormatFilter = filters.adFormatFilter;
    let mediumFilter = filters.mediumFilter;

    let onAdFormatClick = (adFormatFilter) => onChange({...filters, adFormatFilter});
    let onMediumClick = (adFormatFilter, mediumFilter) => onChange({...filters, adFormatFilter, mediumFilter});

    return (
        <div>
            <Button
                className='btn-marketing-type'
                onClick={() => {
                    onAdFormatClick('Show All')
                }}
                active={adFormatFilter === 'Show All'}
            >
                Show All
            </Button>
            <SplitButton
                className='split-btn-marketing-type'
                title='Branded Content'
                id='branded-content-menu'
                pullRight
                onClick={() => onAdFormatClick('Branded Content')}
                active={adFormatFilter === 'Branded Content'}
            >
                {
                    bcMediumStringList.map((bcMedium, key) => {
                        return MediumFilterMenuItem('Branded Content', bcMedium, mediumFilter, onMediumClick, key);
                    })
                }
            </SplitButton>
            <SplitButton
                className='split-btn-marketing-type'
                title='Influencer Post'
                id='influencer-post-menu'
                pullRight
                onClick={() => onAdFormatClick('Influencer Post')}
                active={adFormatFilter === 'Influencer Post'}
            >
                {
                    ipMediumStringList.map((ipMedium, key) => {
                        return MediumFilterMenuItem('Influencer Post', ipMedium, mediumFilter, onMediumClick, key);
                    })
                }
            </SplitButton>
            <SplitButton
                className='split-btn-marketing-type'
                title='Sponsorship'
                id='sponsorship-menu'
                pullRight
                onClick={() => onAdFormatClick('Sponsorship')}
                active={adFormatFilter === 'Sponsorship'}
            >
                {
                    spMediumStringList.map((spMedium, key) => {
                        return MediumFilterMenuItem('Sponsorship', spMedium, mediumFilter, onMediumClick, key);
                    })
                }
            </SplitButton>
            <SplitButton
                className='split-btn-marketing-type'
                title='Patron Journalism'
                id='branded-content-menu'
                pullRight
                onClick={() => onAdFormatClick('Patron Journalism')}
                active={adFormatFilter === 'Patron Journalism'}
            >
                {
                    pjMediumStringList.map((pjMedium, key) => {
                        return MediumFilterMenuItem('Patron Journalism', pjMedium, mediumFilter, onMediumClick, key);
                    })
                }
            </SplitButton>
        </div>
    );
};

const MediumFilterMenuItem = (adFormat, medium, mediumFilter, onMediumClick, key) => (
    <MenuItem
        className='medium-menu-item'
        key={`${adFormat}-${medium}-menuitem-${key}`}
        onClick={() => onMediumClick(adFormat, medium)}
        active={mediumFilter === medium}
    >
        {medium}
    </MenuItem>
)

const mapStateToProps = (state) => {
    return {
        adFormatFilter: state.MarketplaceFilterReducer.adFormatFilter,
        mediumFilter: state.MarketplaceFilterReducer.mediumFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdFormatClick: (adFormat) => {
            dispatch(setAdFormat(adFormat, dispatch))
        },
        onMediumClick: (adFormat, medium) => {
            dispatch(setMedium(medium, dispatch, adFormat));
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdFormatFilter)
