import React, { useState } from "react"
import Collapse from "react-bootstrap/collapse"

const Dropdown = ({ children, text, isActive }) => {
  const [open, setOpen] = useState(false)

  return (
    <li className={`${isActive ? "active" : ""}`}>
      <button
        className="dropdown-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {text}
      </button>
      <Collapse in={open}>
        <ul className="list-unstyled">{children}</ul>
      </Collapse>
    </li>
  )
}

export default Dropdown
