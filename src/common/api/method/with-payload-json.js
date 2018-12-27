import axios from "axios";
import {buildQuery1} from "./get-json";

export const withPayloadJson = (method) => (url, {queryParams, payload, authToken, headers}) => {
    return axios(
        {
            url: `${url}${queryParams ? `?${buildQuery1(queryParams)}` : ``}`,
            method: method,
            // body: data == null ? undefined : JSON.stringify(data),
            data: payload,
            headers: {
                // 'Content-Type': 'application/json',
                ...(authToken && {'Authorization': `Bearer ${authToken}`}),
                ...headers
            },
        }
    );
};

