import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

import Nav from "react-bootstrap/Nav"
// import NavDropdown from "react-bootstrap/NavDropdown"
// import Form from "react-bootstrap/Form"
// import FormControl from "react-bootstrap/FormControl"
// import Button from "react-bootstrap/Button"

const Header = () => {

    const { user, logout } = useContext(AuthContext)
    console.log(user)
    return (
        <Navbar variant="dark" expand="md" className="header">
            <Navbar.Brand href="/">COOK BOOK</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {/* <Nav>
                    <Nav.Link href="#link1">Portfolio</Nav.Link>
                </Nav> */}
                { user != null && 
                    <Nav>
                        <NavDropdown title={user.username} id="basic-nav-dropdown">
                            {/*<NavDropdown.Divider />*/}
                            <NavDropdown.Item href="#logout" onClick={() => logout()}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )

}

export default Header