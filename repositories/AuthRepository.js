import Repository, { baseUrl } from './Repository';
import cbor from 'cbor';

class AuthRepository {
    async postRegister(params) {
        const data = cbor.encode(params)
        const reponse = await Repository.post(
            `${baseUrl}/auth-public/register`,
            data
        )
        .then((response) => {
            // console.log(cbor.decode(reponse.data));
            const data = cbor.decode(response.data)
            return data;
        })
        .catch((error) => {
            return error;
        });
        return reponse;
    }

    async postLogin(params) {
        const reponse = await Repository.post(
            `${baseUrl}/auth/login`,
            null,
            {
                headers: params,
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            return data;
        })
        .catch((error) => {
            return error;
        });
        return reponse;
    }

    async postLogout(params) {
        const reponse = await Repository.post(
            `${baseUrl}/auth/logout`,
            null,
            {
                headers: params,
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            console.log('success logout')
        })
        .catch((error) => {
            let result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async getStatus(xa) {
        const reponse = await Repository.get(
            `${baseUrl}/auth/status`,
            { 
                headers: xa, 
                responseType: "arraybuffer" 
            }
        )
        .then((response) => {
            let result = cbor.decode(response.data)
            return result;
        })
        .catch((error) => {
            let result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async getDataUser(xa){
        const reponse = await Repository.get(
            `${baseUrl}/baseuserpublic`,
            { 
                headers: xa, 
                responseType: "arraybuffer" 
            }
        )
        .then((response) => {
            let result = cbor.decode(response.data)
            return result;
        })
        .catch((error) => {
            let result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }
    async updateDataUser(params){
        const data = cbor.encode(params.data)
        const reponse = await Repository.put(
            `${baseUrl}/baseuserpublic`,
            data,
            { 
                headers: params,
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            let result = cbor.decode(response.data)
            return result;
            // return response
        })
        .catch((error) => {
            let result = cbor.decode(error.response.data)
            return result;
            // return error
        });
        return reponse;
    }
}

export default new AuthRepository();
