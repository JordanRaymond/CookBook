import { useState, useEffect } from './node_modules/react'
const axios = require('./node_modules/axios')

export const useAxio = (requestType, url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState(null)

  //   fetch('https://swapi.co/api/people')
  useEffect(() => {
    setIsLoading(true)
    
    console.log('Sending Http request to URL: ' + url)
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.')
        }
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setFetchedData(data)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }, dependencies)

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
  return [isLoading, fetchedData]
}