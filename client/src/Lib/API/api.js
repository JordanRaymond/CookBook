const axios = require('axios')

const serverUrl = process.env.REACT_APP_SERVERURL

const login = async (email, password) => {
    const reqBody = {
        email,
        password
    }

    const config = {
        withCredentials : true,
    }

    return axios.post(`${serverUrl}/user/login`, reqBody, config).then(res => {
        if(res.status === 200){ 
            let user = {}
            user.username = res.data.username
            return {
                successful: true, 
                message: res.data.message, 
                user: user 
            }
        }
    }).catch(axiosErrorHandler)
}

const register = async (email, username, password, passwordConf) => {
    const reqBody = {
        email,
        username,
        password,
        passwordConf
    }

    const config = {
        withCredentials : true,
    }

    return axios.post(`${serverUrl}/user/register`, reqBody, config).then(res => {
        if(res.status === 200) return {
            successful: true, 
            message: res.data.message 
        }
    }).catch(axiosErrorHandler)
}

const isAuthenticate = async () => {
    const config = {
        withCredentials : true,
    }

    return axios.get(`${serverUrl}/user/isAuth`, config).then(res => {
        if(res.status === 200) {
            let user = {}
            user.username = res.data.username
            return {
                successful: true, 
                message: res.data.message,
                user: user
            }
        }
        else { 
            if(res.status === 401)
                window.alert('401') // for axios, 401 is an error... See axiosErrorHandler
        }
        

    }).catch(axiosErrorHandler)
}

const getUserRecipes = async () => {
    const config = {
        withCredentials : true,
    }

    return axios.get(`${serverUrl}/user/recipes`, config).then(res => {
        if(res.status === 200) return {
            successful: true, 
            recipes: res.data.recipes 
        }
        else { 
            if(res.status === 401)
                window.alert('401') // for axios, 401 is an error...
        }
        

    }).catch(axiosErrorHandler)
}

const logout = async () => {
    const config = {
        withCredentials : true,
    }

    return axios.post(`${serverUrl}/user/logout`, config).then(res => {
        if(res.status === 200) return {
            successful: true, 
            message: res.data.message 
        }
        else { 
            if(res.status === 401)
                window.alert('401')
        }
        
    }).catch(axiosErrorHandler)
}

const axiosErrorHandler = error => {
    if (error.response) {
        console.log(`error response: ${error.response}`)
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        let successful = false
        const status = error.response.status
        let message = `server responded with a status of ${status}`

        if(error.response.status === 401) {
            successful = false 
            message = error.response.data.message 
        }

        if(error.response.status === 500 ) {
            successful = false   
            message = 'Oups, look like somthing went wrong on our server ¯\\_(ツ)_/¯'
        }
        
        if(error.response.data.message) message = message = error.response.data.message
        return { successful, status, message }

        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        throw new Error('Can\'t connect to the server or the server did not respond')    
        // console.log(error.request)
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
    }

    console.error('Request config: ')
    console.log(error.config)
}

// const getCookie = (cname) => {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);

//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) === ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) === 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return null
// }

export { login, register, isAuthenticate, logout, getUserRecipes } 