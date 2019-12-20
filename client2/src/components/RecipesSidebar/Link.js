import React from "react"
import { NavLink as RouterLink } from "react-router-dom"

const Link = ({ to, text, isActive, ...rest }) => {
  return (
    <li className={`${isActive && "active"}`}>
      <RouterLink to={to} {...rest}>
        {text}
      </RouterLink>
    </li>
  )
}

export default Link
