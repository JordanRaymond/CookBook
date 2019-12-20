import axios from 'axios'

class AxiosWrap {
    constructor() {
        let service = axios.create({
            // headers: { csrf: 'token' },
            withCredentials: true,
        })

        service.interceptors.response.use(this.handleSuccess, this.handleError)
        this.service = service
    }

    handleSuccess(response) {
        return response
    }

    handleError(error) {
        let message = ''
        let status

        if (error.response) {
            // console.log(`error response: ${error.response}`)
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            status = error.response.status

            switch (error.response.status) {
                case 401:
                    message = error.response.data.message
                    break
                case 404:
                    message = 'api found nothing'
                    break
                case 500:
                    message = 'Oups, look like somthing went wrong on our server ¯\\_(ツ)_/¯'
                    break
                default:
                    message = `server responded with a status of ${status}.`
                    break
            }

            if (error.response.data) message += ' ' + error.response.data.message
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            message = 'Can\'t connect to the server or the server did not respond'
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
        }

        return { message, status }
    }

    get(path, callback) {
        return this.service.get(path).then(
            (response) => [response.status, response.data]
        )
    }

    patch(path, payload, callback) {
        return this.service.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload
        }).then(
            (response) => [response.status, response.data]
        )
    }

    post(path, payload) {
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then(
            (response) => [response.status, response.data]
        )
    }
}

export default new AxiosWrap()