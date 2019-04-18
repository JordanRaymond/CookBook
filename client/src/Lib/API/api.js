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
        if(res.status === 200) return {
            successful: true, 
            message: res.data.message 
        }
    }).catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if(error.response.status === 401) return {
                successful: false, 
                message: error.response.data.message 
            }

            // conso10le.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            throw new Error('The request was made but no response was received')
            // console.log(error.request)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
        }

        console.error('Request config: ')
        console.log(error.config)
    })
}

// const login = (username, password) => {
//     var data = null

//     var xhr = new XMLHttpRequest()
//     xhr.withCredentials = true

//     xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === 4) {
//         console.log(this.responseText);
//     }
//     })

//     xhr.open("POST", "http://192.168.2.89:5000/user/login?email=test@test.com&password=123456")
//     xhr.send(data)
// }

const isAuthenticate = async () => {
    const config = {
        withCredentials : true,
    }

    return axios.get(`${serverUrl}/user/isAuth`, config).then(res => {
        if(res.status === 200) return {
            successful: true, 
            message: res.data.message 
        }

    }).catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if(error.response.status === 401) return {
                successful: false, 
                message: error.response.data.message 
            }

            // console.log(error.response.data);
            // console.log(error.response.status); 
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            throw new Error('The request was made but no response was received')
            
            // console.log(error.request)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
        }
        console.error('Request config: ')
        console.log(error.config)
    })
}

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);

    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null
}

export { login, isAuthenticate } 