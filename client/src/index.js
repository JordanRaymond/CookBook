import React from 'react'
import { render } from 'react-dom'
import App from './Components/App.js'
import { CookiesProvider } from 'react-cookie'
import { SnackbarProvider } from 'notistack'

const Root = () => {
    return (
        <CookiesProvider>
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </CookiesProvider>
    )
}

const rootElement = document.getElementById("root")
render(<Root />, rootElement)
