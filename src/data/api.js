import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030'

async function requests(method, url, data) {
    const option = {
        method,
        headers: {}
    }

    if (data != undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data)
    }

    const userData = getUserData();

    if (userData) {
        option.headers['X-Authorization'] = userData.accessToken
    }

    try {
        const response = await fetch(host + url, option);

        if (!response.ok) {
            const err = await response.json();

            if (response.status == 403 && err.message == 'Invalid access token') {
                clearUserData();
            }

            throw new Error(err.message)
        }

        if (response.status == 204) {
            return response;
        }else{
            return response.json();
        }
    } catch (err) {
        alert(err.message)
        throw err
    }
}

export const get = (url) => requests('get', url);
export const post = (url, data) => requests('post', url, data);
export const put = (url, data) => requests('put', url, data);
export const del = (url) => requests('delete', url);