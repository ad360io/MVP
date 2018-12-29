/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './Profile.component.css';

/*
React Bootstrap
*/
import { Media, Modal, Button } from 'react-bootstrap';

/*
Children Component
*/
import ProfileEditor from './ProfileEditor/ProfileEditor.component';
import Footer from '../footer/Footer.component';

/*
Networking
*/
import axios from 'axios';
import {isEmpty} from "lodash";


/**
 * Profile Component
 *      represents user and display related activities.
 */
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reader: true,
            fetching: false,
            fetched: false,
            error: null,
            hasError: false,
            profile: {
                name: 'name',
                email: 'email@domain.co',
                picture: ''
            }
        };
    }

    componentWillMount() {
        // if (typeof this.props.match.params.userId === 'undefined') {
        //     this.setState({
        //         ...this.state,
        //         reader: false
        //     });
        // } else {
        //     this.loadProfileData();
        // }
    }

    loadProfileData = () => {
        this.setState({ ...this.state, fetching: true, hasError: false });

        const accountURL = "https://marketplacedb.qchain.co/account?select=email,name,picture&role=eq." + this.props.match.params.userId;
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        axios.get(accountURL, config)
            .then((response) => {
                this.setState({
                    ...this.state,
                    fetching: false,
                    fetched: true,
                    profile: response.data[0]
                })
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    fetching: false,
                    fetched: true,
                    error: error,
                    hasError: true
                })
            })
    }

    getData = () => {
        const { profile } = this.props;
        console.log(profile);
    };

    componentDidMount() {
        document.title = "Qchain - Profile";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.updateIsReader();
        }
    }

    updateIsReader = () => {
        if (typeof this.props.match.params.userId === 'undefined') {
            this.setState({
                ...this.state,
                reader: false
            })
        } else {
            this.setState({ ...this.state, reader: true })
        }
    }

    getAvatarSrc = (profile) => isEmpty(profile.avatar_url) ? profile.picture : profile.avatar_url;

    getNickname = () => {
        return this.state.reader
            ? this.props.profile.name
            : this.props.profile.nickname
    }

    getEmail = () => {
        return this.state.reader
            ? this.state.profile.email
            : this.props.profile.email
    }

    getVerified = () => {
        return this.state.reader ? false : true
    };

    render() {
        const { allApis, profile } = this.props;

        return (
            <div className='profile-container'>
                <div className="profile-header-timeline"/>
                <div className='profile-header'>
                    <Media style={mediaStyle}>
                        <Media.Left align='middle'>
                            <img src={this.getAvatarSrc(profile)} style={{ marginRight: '1vw' }} width='120' height='120' alt='user-avatar' />
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading style={mediaHeadingStyle}>
                                <p style={{ float: 'left' }}>{this.getNickname()}</p>
                                <br />
                            </Media.Heading>

                            {this.getEmail()}
                            <br />
                            {
                                (this.props.currencyFilter === 'EQC'
                                    ? 'ETH address: ' + this.props.profile.eth_address
                                    : 'NEM address: ' + this.props.profile.nem_address
                                )
                            }
                        </Media.Body>

                        { profile.role && <ProfileEditor {...{auth: this.props.auth, profile, allApis}} />}
                    </Media>
                </div>
            </div>
        )
    }
}

const mediaStyle = {
    position: 'relative',
    top: '-65px',
    marginLeft: '10vw',
    fontSize: '14px',
}

const mediaHeadingStyle = {
    marginBottom: '15px',
    fontSize: '2em',
    marginTop: '25px',
}

const mapStateToProps = (state) => {
    return {
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        profile: state.ProfileReducer.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)
