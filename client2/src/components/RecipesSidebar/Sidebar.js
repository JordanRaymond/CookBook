import React from "react"

const Sidebar = ({ title, children }) => {
  return (
    <div className="sidebar">
      {title != null && title.length != 0 && (
        <div className="sidebar-header">
          <h1>{title}</h1>
        </div>
      )}

      <ul className="list-unstyled ul-container">{children}</ul>
    </div>
  )
}

export default Sidebar
