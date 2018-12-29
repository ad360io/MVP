import axios from "axios";
import {buildQuery1} from "./get-json";

export const delJson = (url, {queryParams = null, authToken, headers}) => {
    return axios(
        {
            url: `${url}${queryParams ? `?${buildQuery1(queryParams)}` : ``}`,
            method: "delete",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                ...headers
            },
        }
    );
};
