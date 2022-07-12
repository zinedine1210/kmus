import axios from 'axios';
export const baseDomain = 'https://adm.kmus.org'; // API for products (PRODUCTION MODE)
const baseDomainAPI = 'https://adm.kmus.org/kmus-service'; // API for product (PRODUCTION MODE)

export const customHeaders = {
    Accept: 'application/json',
};


export const baseUrl = `${baseDomainAPI}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const cborHeaders = {
    Accept: 'application/cbor',
};

export const cborUrl = axios.create({
    baseUrl,
    headers: cborHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
