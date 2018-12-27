/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './Activities.component.css';

/*
React Bootstrap
*/
import { Media, Modal, Button } from 'react-bootstrap';

/*
Children Component
*/
import ActivitiesTables from './ActivitiesTables/ActivitiesTables.component';
import Footer from '../footer/Footer.component';

/*
Networking
*/
import axios from 'axios';


/**
 * Activities Component
 *      represents user and display related activities.
 */
class Activities extends Component {

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
        }
    }

    componentWillMount() {
        if (typeof this.props.match.params.userId === 'undefined') {
            this.setState({
                ...this.state,
                reader: false
            })
        }else {
            this.loadProfileData();
        }
    }

    loadProfileData = () => {
        console.log('1231');
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

    componentDidMount() {
        document.title = "Qchain - Profile";
        // window.scrollTo(0, 0);
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

    getAvatarSrc = () => {
        return this.state.reader
            ? this.state.profile.picture
            : this.props.profile.avatar_url
    }

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
        return this.state.reader
            ? false
            : true
    }


    render() {
        const { allApis, modeFilter, currencyFilter, history } = this.props;

        return (
            <div style={{ marginTop: '100px' }}>
                <ActivitiesTables
                    reader={this.state.reader}
                    userId={this.props.match.params.userId}
                    {...{allApis, modeFilter, history, currencyFilter}}
                />
            </div>
        )
    }
}

const mediaStyle = {
    marginTop: '235px',
    marginLeft: '10vw',
    fontSize: '14px',
};

const mediaHeadingStyle = {
    marginBottom: '15px',
    fontSize: '2em',
    marginTop: '25px',
};

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
)(Activities)
