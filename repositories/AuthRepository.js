import Repository, { baseUrl } from './Repository';
import cbor from 'cbor';

class AuthRepository {
    async postRegister(params) {
        const reponse = await Repository.post(
            `${baseUrl}/auth-public/register`,
            null,
            {
                headers: params
            }
        )
        .then((response) => {
            console.log(response);
            return response.data;
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
                headers: params
            }
        )
        .then((response) => {
            return response.data;
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
}

export default new AuthRepository();
