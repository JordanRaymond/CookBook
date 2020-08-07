import React, { useState, useEffect, useRef } from 'react'

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

function setCharAt(str, index, chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

// document.addEventListener('DOMContentLoaded', () => {
//     for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
//         const pattern = el.getAttribute("placeholder"),
//             slots = new Set(el.dataset.slots || "_"),
//             prev = (j => Array.from(pattern, (c, i) => slots.has(c) ? j = i + 1 : j))(0),
//             first = [...pattern].findIndex(c => slots.has(c)),

//             accept = new RegExp(el.dataset.accept || "\\d", "g"),

//             clean = input => {
//                 input = input.match(accept) || [];
//                 return Array.from(pattern, c =>
//                     input[0] === c || slots.has(c) ? input.shift() || c : c
//                 );
//             },

//             format = () => {
//                 const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
//                     i = clean(el.value.slice(0, i))
//                             .findIndex(c => slots.has(c));

//                     return i < 0 ? prev[prev.length-1] : back ? prev[i-1] || first : i;
//                 });

//                 el.value = clean(el.value).join``;
//                 el.setSelectionRange(i, j);
//                 back = false;
//             };

//         let back = false;
        
//         el.addEventListener("keydown", (e) => back = e.key === "Backspace");
//         el.addEventListener("input", format);
//         el.addEventListener("focus", format);
//         el.addEventListener("blur", () => el.value === pattern && (el.value=""));
//     }
// });

const MaskInput = (props) => {
    const [mask, setMask] = useState()
    const [value, setValue] = useState('')
    const [slotsIndexes, setSlotsIndexes] = useState([])
    const input = useRef(null)

    // in the MaskInput the placeholder something like: _h_m or __/__/__ aka the mask
    // data slots are the chars that represent emplacement for the input value like in: dd/mm the dataSlots would be: dm
    // dataAccept is a regex <- Todo
    let {
        label, placeholder="placeholder", dataSlots, dataAccept,
        isValid=false, errors, 
        optional=false, fullWith, 
        onChange, handleInputBlur, onKeyDown,
        ...rest
    } = props

    useEffect(() => {
        setMask(placeholder)
        setValue(placeholder)
        initSlotsIndexes(placeholder)
      }, []);

    const handleOnFocus = (event) => {
        const index = slotsIndexes[0]
        console.log(slotsIndexes)
        setCursorPos(index)
        event.preventDefault()
    }

    const handleOnKeyDown = (event) => {
        const key = event.key
        const cursorAt = event.target.selectionStart // Index of the cursor

        console.log(`keyDown cursotAt: ${cursorAt}`)
        console.log(`keyDown key: ${key}`)
        
        handleCursorPosition(cursorAt, key)
    }

    const handleOnChange = (event) => {
        const cursorAt = event.target.selectionStart // Index of the cursor
        console.log(`onChange cursor: ${cursorAt}`)
        console.log(`onChange value: ${event.target.value}`)

        if (slotsIndexes.includes(cursorAt - 1)) {
            // validate with dataAccept
            // get value
            // replace value 
            let valueCpy = value
            valueCpy = setCharAt(valueCpy, cursorAt - 1, "a")
            setValue(valueCpy)  
            setCursorPos(getNextSlotsPos(cursorAt))

            // move cursor next data slot
        }

        //  onChange(event)
    }

    const handleKeyUp = (event) => {
        const key = event.key
        const cursorAt = event.target.selectionStart // Index of the cursor

        console.log(`keyUp cursotAt: ${cursorAt}`)
        console.log(`keyUp Key: ${key}`)
        console.log(`==================`)

    }

    const initSlotsIndexes = (placeholder) => {
        let slotsIndexesCpy = slotsIndexes;

        [...placeholder].forEach((char, i) => {
            if(dataSlots.includes(char)) {
                slotsIndexesCpy.push(i)
            }
        })

        setSlotsIndexes(slotsIndexesCpy)
    }
    
    const handleOnClick = (event) => {
        const cursorAt = event.target.selectionStart 
        if (!slotsIndexes.includes(cursorAt)) {
            setCursorPos(getNextSlotsPos(cursorAt + 1))
        }
    }

    const handleCursorPosition = (cursorAt, key, isMouseEvent = false) => {
        if (key === "ArrowRight") {
            if (!slotsIndexes.includes(cursorAt + 1)) {
                setCursorPos(getNextSlotsPos(cursorAt + 1))
            }
        } else if (key === "ArrowLeft") {
            if (!slotsIndexes.includes(cursorAt - 1)) {
                setCursorPos(getPrevSlotsPos(cursorAt - 1))
            }
        }
    }

    const getNextSlotsPos = (cursorPos) => {
        let nextPos = null
        slotsIndexes.forEach(value => {
            if (!nextPos && value >= cursorPos) {
                console.log(value)
                nextPos = value
            }
        })

        return nextPos ? nextPos : slotsIndexes[slotsIndexes.length-1]
    }

    const getPrevSlotsPos = (cursorPos) => {
        let prevPos = null

        for (let i = cursorPos - 1; i > 0; i--) {
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

    const isOptional = optional && value.length === 0 
    return ( 
        <div className="form-input-container">
            <label>{label || placeholder}</label>
            <input 
                ref={input} 
                onFocus={handleOnFocus} 
                onKeyDown={handleOnKeyDown}
                onKeyUp={handleKeyUp}
                onClick={handleOnClick}
                onChange={handleOnChange} 
                // onBlur={handleInputBlur} 
                // onKeyDown={onKeyDown} 
                value={value}
                className={`form-input ${fullWith && 'fw'} ${!isValid ? 'invalid' : 'valid'} ${isOptional ? 'optional'  : ""}`} 
                type={"text"} 
                placeholder={placeholder} 
                {...rest}  
            />
            {printErrors(errors)}
        </div>
     )
}
 
export default MaskInput