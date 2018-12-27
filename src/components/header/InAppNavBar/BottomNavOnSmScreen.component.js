import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { withWindowWidthListener } from '../../ResponsiveComponent/ResponsiveComponent';

const styles = {
    root: {
        width: '100vw',
        position: 'fixed',
        bottom: '0px',
        backgroundColor: '#E8E8E8',
        height: '64px'
    },
};

class BottomNavOnSmScreen extends React.Component {
    constructor(props) {
        super(props);
        const { pathname } = this.props.history.location;
        if (pathname === '/dashboard') {
            this.state = {
                value: 0
            }
        } else if (pathname === '/marketplace') {
            this.state = {
                value: 1
            }
        } else if (pathname === '/create') {
            this.state = {
                value: 2
            }
        } else {
            this.state = {
                value: undefined
            }
        }
    }

    componentWillUpdate(prevProps) {
        if (prevProps.width !== this.props.width) {
            const { pathname } = this.props.history.location;
            if (pathname === '/dashboard') {
                this.setState({ ...this.state, value: 0 })
            } else if (pathname === '/marketplace') {
                this.setState({ ...this.state, value: 1 })
            } else if (pathname === '/create') {
                this.setState({ ...this.state, value: 2 })
            } else {
                this.setState({ ...this.state, value: undefined })
            }
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
        if (value === 0) {
            this.props.history.push('/dashboard')
        } else if (value === 1) {
            this.props.history.push('/marketplace')
        } else if (value === 2) {
            this.props.history.push('/create')
        }
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        if (this.props.width <= 768) {
            return (
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction style={(value === 0) ? { color: 'rgb(145,53,161)' } : { color: '#777' }} label="Dashboard" icon={<DashboardIcon />} />
                    <BottomNavigationAction style={(value === 1) ? { color: 'rgb(145,53,161)' } : { color: '#777' }} label="Marketplace" icon={<ShoppingCartIcon />} />
                    <BottomNavigationAction style={(value === 2) ? { color: 'rgb(145,53,161)' } : { color: '#777' }} label={this.props.modeFilter === 'Advertiser' ? 'Request' : 'Create'} icon={<PlaylistAddIcon />} />
                </BottomNavigation>
            );
        } else {
            return null;
        }

    }
}

BottomNavOnSmScreen.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withWindowWidthListener(withStyles(styles)(BottomNavOnSmScreen));