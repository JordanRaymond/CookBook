import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

import Nav from "react-bootstrap/Nav"
// import NavDropdown from "react-bootstrap/NavDropdown"
// import Form from "react-bootstrap/Form"
// import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

const Header = () => {

    const { user, logout } = useContext(AuthContext)
    console.log(user)
    return (
        <Navbar variant="dark" expand="md" className="header">
            <Navbar.Brand href="/">Cook Book</Navbar.Brand>
            {
            user != null && 
                <Nav className="justify-content-end">
                    <NavDropdown title={user.username} id="basic-nav-dropdown">
                        {/*<NavDropdown.Divider />*/}
                        <NavDropdown.Item href="#action/3.1" onClick={() => logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            }
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link href="#link1">Pages</Nav.Link>
                    <Nav.Link href="#link1">Blog</Nav.Link>
                    <Nav.Link href="#link1">Portfolio</Nav.Link>
                    <Nav.Link href="#link1">Elements</Nav.Link>
                    <Nav.Link href="#link1">Support</Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="outline-info mx-3">Buy</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default Header