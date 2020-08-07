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
  const [pending, setPending] = useState(true)

  async function checkIsAuth() {
    setPending(true)

    try {
      const { user } = await isAuthenticate()
      setUser(user)
      setPending(false)
    } catch (err) {
      console.log(err)
    }
  }

  async function login(email, password) {
    setPending(true)

    try {
      const { user, message } = await apiLogin(email, password)

      if (user != null) {
        setUser(user)
        setPending(false)

        return { successful: true, message }
      } else {
        return { successful: false, message }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function register(email, username, password, passwordConf) {
    setPending(true)

    const { user, message } = await apiRegister(
      email,
      username,
      password,
      passwordConf
    )

    let successful = false
    if (user != null) {
      setUser(user)
      setPending(false)

      successful = true
    }

    return { successful, message }
  }

  async function logout(email, password) {
    setPending(true)

    try {
      const { status } = await apiLogout()

      setUser(null)
      setPending(false)

    } catch (err) {
      console.error(`Logout err: ${err}`)
    }
  }

  useEffect(() => {
    checkIsAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, register, pending }}>
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
