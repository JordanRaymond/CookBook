import React from "react"

const Item = ({ text, isActive, ...rest }) => {
  return (
    <li className={`${isActive && "active"}`}>
      <button className="item" {...rest}>
        {text}
      </button>
    </li>
  )
}

export default Item
