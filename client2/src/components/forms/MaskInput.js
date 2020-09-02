import React, { useState, useEffect, useRef } from "react"

function haveValue(value) {
  return value && value.length > 0
}

function printErrors(errors) {
  let msgs = []
  let i = 0
  if (Array.isArray(errors)) {
    msgs = errors.map((error) => (
      <p key={i++} className={` ${!error || "error"}`}>
        {error.message}
      </p>
    ))
  }

  return msgs
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str
  return str.substr(0, index) + chr + str.substr(index + 1)
}

const MaskInput = (props) => {
  const [mask, setMask] = useState()
  const [slotsIndexes, setSlotsIndexes] = useState([])
  const [isFocus, setIsFocus] = useState(false)

  const input = useRef(null)

  // In the MaskInput the placeholder something like: _h_m or __/__/__ aka the mask.
  // Data slots are the characters that represent emplacement for the input value like in: dd/mm the dataSlots would be: dm
  // dataAccept is a regex <- Todo
  let {
    label,
    name,
    placeholder,
    dataSlots,
    dataAccept,
    isValid = false,
    errors,
    optional = false,
    fullWith,
    handleInputBlur,
    onKeyDown,
    setValue,
    value,
    isTouched,
    ...rest
  } = props

  let backspaceWasPress = false
  let checkForBackspace = false

  useEffect(() => {
    setMask(placeholder)
    setValue(name, placeholder, false)
    initSlotsIndexes(placeholder)
  }, [])

  // ===== Events by order of executions =====

  /**
   * @summary Set the cursor at the beggining
   * @param {*} event
   */
  const handleOnFocus = (event) => {
    const index = slotsIndexes[0]
    setCursorPos(index)

    // Prevent cursor being set to end bcs of the mask
    event.preventDefault()
    setIsFocus(true)
  }

  /**
   * @summary Check if the user clicked on a input slot and reset the cursor if
   * @param {*} event
   */
  const handleOnClick = (event) => {
    const cursorAt = event.target.selectionStart

    if (!isValidPosition(cursorAt)) {
      setCursorPos(getNextSlotsPos(cursorAt + 1))
    }
  }

  const handleOnKeyDown = (event) => {
    const cursorAt = event.target.selectionStart // Index of the cursor
    let key = event.key

    if (key === "Unidentified" || event.keyCode === 229) {
      checkForBackspace = true
    }

    // window.alert(
    //   `key: ${event.key} keyCode: ${event.keyCode} charCode: ${event.charCode}`
    // )

    if (key === "Backspace" || key === 8) {
      backspaceWasPress = true
    } else {
      backspaceWasPress = false
    }

    // Arrow keys
    handleCursorPosition(cursorAt, key, event)
  }

  const handleOnChange = (event) => {
    let cursorAt = event.target.selectionStart // Index of the cursor

    cursorAt = handleOnKeyDownOverflow(cursorAt)

    if (checkForBackspace) {
      if (event.target.value && event.target.value.length < value.length) {
        backspaceWasPress = true
      }
    }

    if (backspaceWasPress) {
      handleBackspace(cursorAt, event)
    } else if (slotsIndexes.includes(cursorAt - 1)) {
      // TODO validate with dataAccept (regex)
      let valueCpy = value
      let changedIndex = cursorAt - 1
      valueCpy = setCharAt(
        valueCpy,
        cursorAt - 1,
        event.target.value[changedIndex]
      )

      setValue(name, valueCpy)
      setCursorPos(getNextSlotsPos(cursorAt))
    }
  }

  const handleBlur = (event) => {
    handleInputBlur(event)
    setIsFocus(false)
  }

  // keyUp
  // !=====! ================== !=====!

  /**
   * @summary On key down the cursor move right automaticly, prevent the overflow
   * @param {*} cursorAt
   */
  const handleOnKeyDownOverflow = (cursorAt) => {
    if (cursorAt > slotsIndexes[slotsIndexes.length - 1] + 1)
      cursorAt = slotsIndexes[slotsIndexes.length - 1] + 1

    return cursorAt
  }

  const isValidPosition = (cursorPosition) => {
    let isValid = true
    if (!slotsIndexes.includes(cursorPosition)) {
      if (cursorPosition !== slotsIndexes[slotsIndexes.length - 1]) {
        isValid = false
      }
    }

    return isValid
  }

  const handleCursorPosition = (cursorAt, key, event) => {
    if (key === "ArrowRight") {
      if (!isValidPosition(cursorAt + 1)) {
        setCursorPos(getNextSlotsPos(cursorAt + 1))
      }
    } else if (key === "ArrowLeft") {
      if (!isValidPosition(cursorAt - 1)) {
        setCursorPos(getPrevSlotsPos(cursorAt - 1))
      }
    }
  }

  const handleBackspace = (cursorAt, event) => {
    let index = cursorAt
    if (!isValidPosition(cursorAt)) {
      index = getPrevSlotsPos(cursorAt)
    }

    let valueCpy = value
    valueCpy = setCharAt(valueCpy, index, mask[index])

    setValue(name, valueCpy)
    setCursorPos(index)
  }

  const getNextSlotsPos = (maskIndex) => {
    if (maskIndex === slotsIndexes[slotsIndexes.length - 1] + 1) {
      return slotsIndexes[slotsIndexes.length - 1] + 1
    }

    let nextPos = null
    slotsIndexes.forEach((value) => {
      if (!nextPos && value >= maskIndex) {
        nextPos = value
      }
    })

    return nextPos ? nextPos : slotsIndexes[slotsIndexes.length - 1] + 1
  }

  const getPrevSlotsPos = (maskIndex) => {
    let prevPos = null

    for (let i = maskIndex - 1; i > 0; i--) {
      if (slotsIndexes.includes(i)) {
        prevPos = i

        break
      }
    }

    return prevPos ? prevPos : slotsIndexes[0]
  }

  const setCursorPos = (newPos) => {
    window.requestAnimationFrame(() => {
      input.current.setSelectionRange(newPos, newPos)
    })
  }

  const initSlotsIndexes = (mask) => {
    let slotsIndexesCpy = slotsIndexes

    ;[...mask].forEach((char, i) => {
      if (dataSlots.includes(char)) {
        slotsIndexesCpy.push(i)
      }
    })

    setSlotsIndexes(slotsIndexesCpy)
  }

  const getInputClasses = () => {
    let classes = ""
    classes += "has-content "

    if (isFocus) classes += "focus "

    if (haveValue(value) && isTouched) {
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

  const isOptional = optional && value.length === 0
  return (
    <div className="bossa-input">
      <div className={`bossa-input-container ${fullWith && "fw"}`}>
        <div className={`effect ${getInputClasses()}`}>
          <input
            name={name}
            ref={input}
            onFocus={handleOnFocus}
            onKeyDown={handleOnKeyDown}
            onClick={handleOnClick}
            onChange={handleOnChange}
            onBlur={handleBlur}
            value={value}
            className={`bossa-input`}
            type={"text"}
            spellCheck="false"
            placeholder={placeholder}
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

export default MaskInput
