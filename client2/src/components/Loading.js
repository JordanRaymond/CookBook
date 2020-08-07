import React from 'react'
import ReactLoading from 'react-loading';


function Loading() {
    return (
        <div className="centered">
            <ReactLoading type={'bars'} color={"#ffffff"} height="25%" width="200px"/>   
        </div>
    )
}

export default Loading
