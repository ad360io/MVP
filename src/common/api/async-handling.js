import {getJson} from './method/get-json';
import {postJson} from './method/post-json';
import {putJson} from './method/put-json';
import {mapValues} from '../utils/utils';
import {patchJson} from "./method/patch-json";
import {delJson} from "./method/del-json";

let baseUrl = 'https://marketplacedb.qchain.co';

export const createAsyncHandling = (authToken, onUnauthorized) => {

    const jsonResp = (resp) => {
        if (resp && resp.status === 401) {
            onUnauthorized();
            return new Promise(() => {}); // Empty promise

        } else if (resp && resp.status === 404) {
            console.warn('API Not found', resp);
            return new Promise(() => {}); // Empty promise

        } else if (resp && resp.status === 400) {
            return Promise.reject(resp); //return error

        } else {
            return ({
                headers: resp.headers,
                data: resp.data
            });
        }
    };

    return mapValues(
        { getJson, postJson, putJson, patchJson, delJson },
        (method) => (url, {
            queryParams = null,
            payload = null,
            headers = {},
            fromBaseUrl = true
        }) => method( fromBaseUrl ? `${baseUrl}${url}` : url, { queryParams, payload, authToken, headers })
                .then(jsonResp)
                .catch((e) => Promise.resolve({error: true, message: e})),
    );
};

