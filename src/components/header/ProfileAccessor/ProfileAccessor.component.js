import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import AccessibilityIcon from '@material-ui/icons/AccessibilityNewRounded';
import Paper from '@material-ui/core/Paper';

import { NavLink } from 'react-router-dom';

import CurrencySelector from './CurrencySelector/CurrencySelector.component';
import ModeSelector from './ModeSelector/ModeSelector.component';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    profileImage: {
        backgroundColor: '#D6DBDF',
        borderRadius: '5px',
        padding: '2px',
        height: '42px',
        marginTop: '-2px'
    },
    profileButton: {
        // borderColor: '##34495E',
        height: '52px',
        marginTop: '6px',
        borderRadius: '5px',
    },
    menuItem: {
        width: '200px',
        fontSize: '12px',
        height: '16px',
    },
    menuList: {
        marginTop: '0px',
        marginBottom: '0px',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    filterSection: {
        whiteSpace: 'normal',
        width: '200px',
        fontSize: '12px',
        margin: 0,
        height: 120
    }

});

class ProfileAccessor extends React.Component {
    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    handleViewProfile = () => {
        this.handleClose({ target: null });
        this.props.history.push('/profile');
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        if (typeof this.props.profile !== 'undefined' && this.props.profile.avatar_url.length > 0) {
            return (
                <div className={classes.root}>
                    <div>
                        <Button
                            buttonRef={node => {
                                this.anchorEl = node;
                            }}
                            aria-owns={open ? 'menu-list-grow' : null}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                            className={classes.profileButton}
                        >

                            <div className='profile-accessor-image'>
                                <img src={this.props.profile.avatar_url} className={classes.profileImage} alt='Profile image' />
                            </div>


                        </Button>
                        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id="menu-list-grow"
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList className={classes.menuList}>
                                            <MenuItem
                                                disableRipple
                                                disableTouchRipple
                                                style={{ cursor: 'default' }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                className={classes.filterSection}
                                            >
                                                <FilterRenderer auth={this.props.auth} />
                                            </MenuItem>

                                            <Divider />

                                            <MenuItem
                                                className={classes.menuItem}
                                                onClick={this.handleViewProfile}
                                            >
                                                <div>
                                                    <NavLink style={{ textDecoration: 'none' }} to='/profile'>
                                                        <AccessibilityIcon style={{ display: 'inline-flex', verticalAlign: 'middle', fontSize: 18, marginRight: '25px' }} />
                                                        View / Edit Profile
                                                    </NavLink>
                                                </div>
                                            </MenuItem>

                                            <Divider />

                                            <MenuItem
                                                className={classes.menuItem}
                                                onClick={() => this.props.onLogout()}
                                            >
                                                <ExitToAppIcon style={{ fontSize: 16, marginRight: '25px' }} />
                                                Logout
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}


const FilterRenderer = ({ auth }) => (
    <div>
        <p>I am</p>
        <ModeSelector auth={auth} />
        <p style={{ marginTop: 5 }}> currently using</p>
        <CurrencySelector auth={auth} />
    </div>
)

ProfileAccessor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileAccessor);
