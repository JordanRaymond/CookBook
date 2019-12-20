import React from 'react'
import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"

import { useHistory, Link } from "react-router-dom"

const Presentation = () => {
    return (
        <section className="presentation-section">
            <Container>
                <div className="justify-content-center text-center align-items-center">
                    <div>
                        <h1 className="display-3">
                            Cook Book,
                            <br />
                            a neet way of storing
                            <br />
                            recipes.
                        </h1>
                    </div>
                    <div>
                        <p className="lead">
                            All your recipes in on place.
                        </p>
                    </div>
                    <div>
                        <Link to="/login" className="btn btn-lg btn-primary mx-1">Login</Link>
                        <Link to="/register" className="btn btn-lg btn-dark mx-1">Register</Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Presentation