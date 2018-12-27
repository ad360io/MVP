import axios from "axios";

export const getJson = (url, {queryParams, authToken, headers}) => {
    return axios({
        url: `${url}${queryParams ? `?${buildQuery1(queryParams)}` : ``}`,
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && {'Authorization': `Bearer ${authToken}`}),
            ...headers
        }
    });
};

const buildQuery = (data) => {
    return Object.keys(data).filter((key) => data[key] != null).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&")
};

export const buildQuery1 = (data) => {
    return Object.keys(data).filter((key) => data[key] != null).map((key) => key + "=" + data[key]).join("&")
};
