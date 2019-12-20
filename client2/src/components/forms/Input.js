import React from 'react'

function printErrors(errors) {
    let msgs = []
    let i = 0
    if(Array.isArray(errors)) {
        msgs = errors.map(error => (
            <p key={i++} className={` ${!error || "error"}`}>{error.message}</p>
        ))
    }

    return msgs
}

const Input = (props) => {

    let {
        label, type="text", placeholder="placeholder", 
        isValid=false, errors, 
        optional, fullWith, 
        onChange, value, handleInputBlur, onKeyDown,
        ...rest
    } = props

    return ( 
        <div className="form-input-container">
            <label>{label || placeholder}</label>
            <input 
                onChange={onChange} onBlur={handleInputBlur} onKeyDown={onKeyDown} value={value} 
                className={`form-input ${fullWith && 'fw'} ${!isValid ? 'invalid' : 'valid'} ${(optional && value.length==0)  && 'optional'}`} 
                type={type} placeholder={placeholder} 
                {...rest}  
            />
            {printErrors(errors)}
        </div>
     )
}
 
export default Input;

// <div className="custom-control custom-checkbox mb-3">
//     <input type="checkbox" className="custom-control-input" id="customCheck1" />
//     <label className="custom-control-label" for="customCheck1">Remember password</label>
// </div>