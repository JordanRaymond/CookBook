import axios from "./axios"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const login = async (email, password) => {
  try {
    const [status, data] = await axios.post(`${SERVER_URL}/user/login`, {
      email,
      password
    })

    if (status === 200 || status === 304) {
      let user = {}
      user.username = data.username

      return {
        message: data.message,
        user: user
      }
    } else {
      let message
      if (status === 401) {
        message = "Invalid pasword or email."
      } else if (status == undefined) {
        message = "Server did not respond"
      } else {
        message = `Server responded with a status ${status} ${data !=
          undefined && `and with the message: ${data.message}`}.`
      }
      return {
        message,
        user: null
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const logout = async () => {
  try {
    const [status, data] = await axios.get(`${SERVER_URL}/user/logout`)

    if (status === 200) {
      return {
        status
      }
    } else {
      return {
        status
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const isAuthenticate = async () => {
  try {
    const [status, data] = await axios.get(`${SERVER_URL}/user/isAuth`)

    if (status === 200) {
      let user = {}
      user.username = data.username

      return {
        message: data.message,
        user: user
      }
    } else {
      if (status === 401) {
        return {
          user: null
        }
      } else {
        return {
          user: null
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const register = async (email, username, password, passwordConf) => {
  try {
    const userData = {
      email,
      username,
      password,
      passwordConf
    }

    const [status, data] = await axios.post(
      `${SERVER_URL}/user/register`,
      userData
    )

    if (status === 200 || status === 304) {
      let user = {}
      user.username = data.username

      return {
        message: data.message,
        user: user
      }
    } else {
      let message
      if (status === 400) {
        message = "Invalid pasword, username or email."
      } else if (status == undefined) {
        message = "Server did not respond"
      } else {
        message = `Server responded with a status ${status} ${data !=
          undefined && `and with the message: ${data.message}`}.`
      }
      return {
        message,
        user: null
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const getUserRecipes = async () => {
  try {
    const [status, data] = await axios.get(`${SERVER_URL}/user/recipes`)

    if (status === 200) {
      return {
        status,
        recipes: data.recipes
      }
    } else {
      return {
        status
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const axiosErrorHandler = error => {
  if (error.response) {
    console.log(`error response: ${error.response}`)
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    let successful = false
    const status = error.response.status
    let message = `server responded with a status of ${status}`

    if (error.response.status === 401) {
      successful = false
      message = error.response.data.message
    }

    if (error.response.status === 500) {
      successful = false
      message = "Oups, look like somthing went wrong on our server ¯\\_(ツ)_/¯"
    }

    if (error.response.data.message)
      message = message = error.response.data.message
    return { successful, status, message }

    // console.log(error.response.data)
    // console.log(error.response.status)
    // console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js

    throw new Error("Can't connect to the server or the server did not respond")
    // console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message)
  }

  console.error("Request config: ")
  console.log(error.config)
}

export { login, register, isAuthenticate, logout, getUserRecipes }
