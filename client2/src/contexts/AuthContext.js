import React, { createContext, useState, useEffect, useContext } from "react"
import {
  isAuthenticate,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister
} from "../lib/api"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  async function checkIsAuth() {
    try {
      const { user } = await isAuthenticate()
      setUser(user)
    } catch (err) {
      console.log(err)
    }
  }

  async function login(email, password) {
    try {
      const { user, message } = await apiLogin(email, password)

      if (user != null) {
        setUser(user)

        return { successful: true, message }
      } else {
        return { successful: false, message }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function register(email, username, password, passwordConf) {
    const { user, message } = await apiRegister(
      email,
      username,
      password,
      passwordConf
    )

    let successful = false
    if (user != null) {
      setUser(user)

      successful = true
    }

    return { successful, message }
  }

  async function logout(email, password) {
    try {
      const { status } = await apiLogout()
      setUser(null)
    } catch (err) {
      console.error(`Logout err: ${err}`)
    }
  }

  useEffect(() => {
    checkIsAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuthentication = () => useContext(AuthContext)

// https://medium.com/trabe/how-we-handle-react-context-e43d303a27a2
// const auth = useMemo({
//     user,
//     login: user => setUser(user),
//     logout: () => setUser(null),
// }, [user]);
