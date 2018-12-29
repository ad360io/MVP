/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withWindowWidthListener } from '../../ResponsiveComponent/ResponsiveComponent';

/*
React Bootstrap Components
*/
import { Button } from 'react-bootstrap';

/*
Material UI Components
*/
// import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

/*
Action
*/
import { openDrawer, closeDrawer, drawerRequest, setKeyword } from '../../../actions/MarketplaceActions';

/*
Local CSS
*/
import './MarketplaceFilter.component.css';

/*
Children Components
*/
import AdFormatFilter from './AdFormatFilter/AdFormatFilter.component';
import PurchaseRangeSelector from './PurchaseRangeSelector/PurchaseRangeSelector.component';
import KeywordFilter from './KeywordFilter/KeywordFilter.component';
import SortingSelector from './SortingSelector/SortingSelector.component';
import {withStyles} from "@material-ui/core";


/**
 * MarketplaceFilter Component
 */
class MarketplaceFilter extends Component {

    constructor(props) {
        super(props)

        // function binding
        this.decideTitle = this.decideTitle.bind(this);
        this.decideHidden = this.decideHidden.bind(this);
        this.onWindowWidthUpdate = this.onWindowWidthUpdate.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    onWindowWidthUpdate() {
        // Dynamically close the drawer for small screen
        //             open  the drawer for medium to big screen

    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        if (window.innerWidth <= 768) {
            this.props.closeDrawer();
        }
        else {
            this.props.openDrawer();
        }
    }

    decideTitle() {
        if (this.props.modeFilter === 'Advertiser') return 'Sort Content Listings';
        else return 'Sort Content Requests'
    }

    decideHidden() {
        if (this.props.width <= 768) {
            return 'none';
        } else {
            return 'inline-block';
        }
    }

    render() {
        const { filters, onChange, classes } = this.props;

        return (
            <div className='marketplace-filter-container' >
                <Button
                    className='btn-open-filter-drawer'
                    onClick={() => this.props.openDrawer()}
                >
                    Click Me to Set Filters
                </Button>
                <Drawer
                    // docked={true}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        hideBackdrop: true
                    }}
                    // width={300}
                    // zDepth={1}
                    // onRequestChange={this.props.onDrawerRequestChange}
                    // className='filter-drawer'
                    variant="permanent"
                    open={this.props.isDrawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >

                    <div className='filter-heading-container'>
                        <p className='filter-heading'>Filter</p>
                    </div>

                    <h4 className='filter-title'>{this.decideTitle()}</h4>
                    <AdFormatFilter {...{filters, onChange}} />

                    <br />

                    <div>
                        <h4 className='filter-title'>Keyword Search</h4>
                        <KeywordFilter
                            {... {
                                onChange: (value) => onChange({...filters, keyword: value})
                            }}
                            // onChange={this.props.onKeywordChange}
                        />
                    </div>

                    <br /><br />

                    { this.props.modeFilter === 'Advertiser' && (
                        <div>
                            <h4 className='filter-title'>Max Purchase</h4>
                            <PurchaseRangeSelector
                                {...{
                                    filters,
                                    onChange: (budget) => onChange({...filters, budget})
                                }}
                            />

                            <br />
                        </div>
                    )}

                    <div>
                        <h4 className='filter-title' style={{ textAlign: 'left', marginLeft: '25px' }}>Sort By</h4>
                        <SortingSelector
                            dropdown={this.props.width <= 768}
                            {...{
                                filters,
                                onChange: (sortingType) => onChange({...filters, sortingType})
                            }}

                        />
                    </div>

                </Drawer>
            </div>
        )
    }
}

const FilterDivider = () => (
    <Divider style={{ marginTop: '5%' }} />
)

const mapStateToFilterProps = (state) => {
    return {
        isDrawerOpen: state.MarketplaceFilterReducer.isDrawerOpen,
        modeFilter: state.MenuBarFilterReducer.modeFilter,
    }
}

const mapDispatchToFilterProps = (dispatch) => {
    return {
        onDrawerRequestChange: (open) => {
            dispatch(drawerRequest(open))
        },
        closeDrawer: () => {
            dispatch(closeDrawer())
        },
        openDrawer: () => {
            dispatch(openDrawer())
        },
        onKeywordChange: (keyword) => {
            dispatch(setKeyword(keyword));
        }
    }
};

const styles = theme => ({
    drawerPaper: {
        width: '300px',
        overflowX: 'hidden',
        marginTop: '64px',
        height: 'calc(100% - 73px - 64px)',
    }
});


export default withStyles(styles)(withWindowWidthListener(connect(
    mapStateToFilterProps,
    mapDispatchToFilterProps
)(MarketplaceFilter)));
