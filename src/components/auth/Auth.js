/*
Auth0 Libs
*/
import auth0 from 'auth0-js';

/*
Networking
*/
import axios from 'axios';

/*
Actions
*/
import { setCurrency, setMode } from '../../actions/HeaderActions';
import {getJson} from "../../common/api/method/get-json";
import {isEmpty} from "lodash";
import {postJson} from "../../common/api/method/post-json";
import {patchJson} from "../../common/api/method/patch-json";


/**
 * Component that handles all auth0 operations.
 */
export default class Auth {

    constructor(store) {
        this.store = store;
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.setSession = this.setSession.bind(this);
        this.logout = this.logout.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.renewToken = this.renewToken.bind(this);
        this.scheduleRenewal = this.scheduleRenewal.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getProfile = this.getProfile.bind(this);
        // this.handleProfileOnAuthenticated = this.handleProfileOnAuthenticated.bind(this);
        this.dispatchProfile = this.dispatchProfile.bind(this);
        // this.updateUserMetadata = this.updateUserMetadata.bind(this);
        this.patchUserMetadata = this.patchUserMetadata.bind(this);

        this.scheduleRenewal();
    }

    tokenRenewalTimeout;
    userProfile;

    auth0 = new auth0.WebAuth({
        domain: 'qchain.auth0.com',
        clientID: 'ip3jdlT8udp8hVobDn5Q2k67eEDvSSIj',
        redirectUri: `${window.location.protocol}//${window.location.host}/auth-callback`,
        responseType: 'token',
        scope: 'openid email profile role'
    });

    login() {
        this.auth0.authorize();
    }

    handleAuthentication(propsHistory) {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult, propsHistory);
            } else if (err) {
                propsHistory.push('/');
                console.log(err);
            }
        });
    }

    setSession(authResult, propsHistory) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('user_id', authResult.idTokenPayload.sub);
        localStorage.setItem('role', authResult.idTokenPayload.app_metadata.role);

        // Push auth0 profile info to redux
        this.handleProfileOnAuthenticated(authResult.idToken);

        // Redirect to /analytics after authenticated.
        propsHistory.replace('/analytics');
        propsHistory.push('/analytics');
        this.scheduleRenewal();
    }

    logout() {
        // Clear info from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('role');
        window.location.reload();
        clearTimeout(this.tokenRenewalTimeout);
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    renewToken() {
        this.auth0.checkSession({}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                this.setSession(result);
            }
        }
        );
    }

    scheduleRenewal() {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        const delay = expiresAt - Date.now();
        if (delay > 0) {
            this.tokenRenewalTimeout = setTimeout(() => {
                this.renewToken();
            }, delay);
        }
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No Access Token found');
        }
        return accessToken;
    }

    getAuthorizationToken = () => {
        const token = localStorage.getItem('id_token');
        if (!token) {
            return null;
        }
        return token;
    }

    getProfile(cb) {
        let accessToken = this.getAccessToken();

        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    handleProfileOnAuthenticated = (authorizationToken) => {
        this.getProfile((err, profile) => {
            if (profile) {
                let headers = { Authorization: `Bearer ${authorizationToken}`};
                getJson(`https://marketplacedb.qchain.co/publisher?role=eq.${profile.app_metadata.role}`, {headers})
                    .then((resp) => {
                        if(isEmpty(resp.data)) {
                            postJson(`https://marketplacedb.qchain.co/publisher`, {
                                payload: {
                                    name: profile.nickname,
                                    role: profile.app_metadata.role,
                                    nem_address: profile['https://auth.qchain.co/user_metadata'].nem_address
                                }, headers}
                            );
                        }
                    })
                ;

                this.dispatchProfile(profile, {
                    ...profile['https://auth.qchain.co/user_metadata'],
                });
            }
            if (err) console.log(err)
        })
    }

    /**
     * Dispatch auth0 profile info to Redux store
     * @param {Object} profile       Served from getProfile method
     * @param {Object} user_metadata Served from profile object's user_metadata field
     */
    dispatchProfile(profile, user_metadata) {

        // For some reasons, there are cases where user created on auth0 doesn't have user_metadata field
        if (typeof user_metadata === 'undefined') {
            // Declare placeholding fields for UI
            let value = {
                role: profile.role,
                name: profile.name,
                email: profile.email,
                nickname: profile.nickname,
                avatar_url: profile.picture,
                nem_address: '',
                eth_address: '',
                currency: 'XQC',
                mode: 'Advertiser',
                email_verified: false
            };

            this.store.dispatch({
                type: 'SET_PROFILE',
                value
            })
        } else {
            // Some fields desired for profile page is undefined, check and use placeholding values if needed.
            let name = user_metadata.name;
            let email = (typeof user_metadata.email === 'undefined' || user_metadata.email === ''
                ? profile.email
                : user_metadata.email);
            let nickname = (typeof user_metadata.nickname === 'undefined' || user_metadata.nickname === ''
                ? profile.nickname
                : user_metadata.nickname);
            let avatar_url = (typeof user_metadata.picture === 'undefined' || user_metadata.picture === ''
                ? profile.picture
                : user_metadata.picture);
            let nem_address = (typeof user_metadata.nem_address === 'undefined' || user_metadata.nem_address === ''
                ? ''
                : user_metadata.nem_address);
            let eth_address = (typeof user_metadata.eth_address === 'undefined' || user_metadata.eth_address === ''
                ? ''
                : user_metadata.eth_address);
            let currency = (typeof user_metadata.currency === 'undefined' || user_metadata.currency === ''
                ? 'XQC'
                : user_metadata.currency);
            let mode = (typeof user_metadata.mode === 'undefined' || user_metadata.mode === ''
                ? 'Advertiser'
                : user_metadata.mode);

            // Group profile related values and dispatch using SET_PROFILE.
            let value = {
                role: profile.role,
                name,
                email,
                nickname,
                avatar_url,
                nem_address,
                eth_address,
                email_verified: profile.email_verified,
                nem_pk_enc: user_metadata.nem_pk_enc
            };

            this.store.dispatch({
                type: 'SET_PROFILE',
                value
            });

            // Dispatch currency and mode separately since they are not directly related to profile
            this.store.dispatch(setCurrency(currency));
            this.store.dispatch(setMode(mode));
        }
    }

    updateUserMeta = (meta_data) => {
        let myIdToken = localStorage.getItem('id_token');
        let auth0Manager = new auth0.Management({
            domain: 'qchain.auth0.com',
            token: myIdToken,
            _sendTelemetry: false,
        });

        let userId = localStorage.getItem('user_id');

        auth0Manager.patchUserMetadata(userId, meta_data, ( err, profile) => {
            if(err) {
                console.log(err);
            }
            // console.log(profile);
            this.dispatchProfile(profile, profile.user_metadata);
        })
    };
    /**
     * Provide a user_metadata object to be updated into auth0 scope ( THIS CALL SIGNS USER OUT AFTER UPDATE )
     * This method is used on ProfileEditor component.
     * @param {Object} newMetadata object with already declared fields will update values, undeclared fields will be appended.
     */
    //TODO: refactor updateUserMetadata and combine with updateUserMeta
    updateUserMetadata = (newMetadata) => {
        //TODO: refactor instance Management
        // Instantiate Auth0 Management API endpoint
        let myIdToken = localStorage.getItem('id_token');
        let auth0Manager = new auth0.Management({
            domain: 'qchain.auth0.com',
            token: myIdToken,
            _sendTelemetry: false,
        });

        // Target user by using user_id, and each users should only have their own user_id and not others'.
        let myUserId = localStorage.getItem('user_id');

        return new Promise((resolve, reject) => {
            auth0Manager.patchUserMetadata(
                myUserId,
                newMetadata,
                (err, newProfile) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // Update PostgreSQL account name with new nickname from profile editor.
                        const nameURL = `https://marketplacedb.qchain.co/account?role=eq.${localStorage.getItem('role')}`;
                        const config = {
                            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
                        };
                        const payload = {
                            nickname: newMetadata.nickname,
                            name: newMetadata.name,
                            email: newMetadata.email,
                            picture: newMetadata.picture,
                        };

                        axios.patch(nameURL, payload, config)
                            .then((resp) => {
                                setTimeout(() => this.logout(), 5 * 1000);
                                resolve();
                                // success, logout to reload view
                                // this.logout();
                            })
                            .catch((err) => {
                                console.log("SET NAME ERR");
                                console.log(err);
                                reject(err);
                            })
                    }
                }
            )
        })
    };

    /**
     * Similar to updateUserMetadata, but this doesn't log users out
     * @param {*} newMetadata new user_metadata object to be updated in auth0 scope.
     * @param {*} history     history from BrowserRouter to update access / id token to avoid relogging in.
     */
    patchUserMetadata(newMetadata, history) {
        let idToken = localStorage.getItem('id_token');
        let auth0Manager = new auth0.Management({
            domain: 'qchain.auth0.com',
            token: idToken,
            _sendTelemetry: false,
        });
        let userId = localStorage.getItem('user_id');
        auth0Manager.patchUserMetadata(
            userId,
            newMetadata,
            (err, newProfile) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // update access / id token in local storage
                    this.handleAuthentication(history);
                    // dispatch new profile to store
                    this.dispatchProfile(newProfile, newProfile['user_metadata']);
                }
            }

        )
    }
}
