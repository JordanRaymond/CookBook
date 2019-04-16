import React from 'react'
import { render } from 'react-dom'
import App from './Components/App.js'
import { CookiesProvider } from 'react-cookie'

const Root = () => {
    return (
        <CookiesProvider>
            <App />
        </CookiesProvider>
    )
}

const rootElement = document.getElementById("root")
render(<Root />, rootElement)
