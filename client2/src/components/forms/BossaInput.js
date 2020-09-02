import React, { useState } from "react"

function haveValue(value) {
  return value && value.length > 0
}

function printErrors(errors) {
  let msgs = []
  let i = 0
  if (Array.isArray(errors)) {
    msgs = errors.map((error) => (
      <p key={i++} className={`${!error || "error"}`}>
        {error.message}
      </p>
    ))
  }

  return msgs
}

const Input = (props) => {
  let {
    label,
    type = "text",
    placeholder = "placeholder",
    isValid = false,
    errors,
    optional = false,
    fullWith,
    onChange,
    value,
    handleInputBlur,
    onKeyDown,
    isTouched,
    dark,
    className,
    ...rest
  } = props

  let [isFocus, setIsFocus] = useState(false)

  const getInputClasses = () => {
    let classes = ""
    if (isFocus) classes += "focus "

    if (
      (type === "text" || type === "email" || type === "password") &&
      haveValue(value)
    ) {
      classes += "has-content "
      classes += !isValid ? "invalid " : "valid "
    } else {
      classes += optional ? "optional " : ""
      if (!isValid && isTouched) classes += "invalid "
    }

    return classes
  }

  const getLabelClass = () => {
    if (isFocus || haveValue(value)) return "float"

    return ""
  }

  const handleFocus = (event) => {
    setIsFocus(true)
  }

  const handleBlur = (event) => {
    setIsFocus(false)
    handleInputBlur(event)
  }

  return (
    <div className={`bossa-input`}>
      <div
        className={`bossa-input-container ${fullWith && "fw"} ${
          dark && "dark"
        }  ${className != undefined ? className : ""}`}
      >
        <div className={`effect ${getInputClasses()}`}>
          <input
            onFocus={handleFocus}
            onChange={onChange}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            value={value}
            className={`bossa-input`}
            type={type}
            {...rest}
          />
        </div>
        <label className={getLabelClass()}>{label || placeholder}</label>
        <span className="focus-border">
          <i></i>
        </span>
        {printErrors(errors)}
      </div>
    </div>
  )
}

export default Input

// <div className="custom-control custom-checkbox mb-3">
//     <input type="checkbox" className="custom-control-input" id="customCheck1" />
//     <label className="custom-control-label" for="customCheck1">Remember password</label>
// </div>
