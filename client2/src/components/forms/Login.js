import React, { useState, useEffect } from "react"
import { useAuthentication } from "../../contexts/AuthContext"

import { useHistory, Link } from "react-router-dom"

import { Col, Row, Container } from "react-bootstrap"

import BossaInput from "./BossaInput"
import { Redirect } from "react-router-dom"
import ReactLoading from "react-loading" // Unistall ?

import FormInputs from "../../lib/Validation/FormInputs"
import FormInput from "../../lib/Validation/Input"
import {
  IsRequired,
  MinLength,
  IsEmail,
} from "../../lib/Validation/rulesStrategies"

const Login = (props) => {
  const [isAuth, setIsAuth] = useState(false)
  const [waitingForRes, setWaitingForRes] = useState(false)
  const [errors, setErrors] = useState([])
  const [formInputs, setFormInputs] = useState(
    new FormInputs({
      email: new FormInput([new IsRequired(), new IsEmail()]),
      password: new FormInput([new IsRequired(), new MinLength(6)]),
    })
  )

  const { user, pending, login } = useAuthentication()

  useEffect(() => {
    setIsAuth(user != null)
  }, [])

  const handleInputChange = (event) => {
    let formCopy = Object.assign(Object.create(formInputs), formInputs)
    formCopy.updateInput(event)

    const inputName = event.target.name

    formCopy.input(inputName).validate()
    formCopy.input(inputName).isTouched = true

    setFormInputs(formCopy)
  }

  const handleInputBlur = (event) => {
    let formCopy = Object.assign(Object.create(formInputs), formInputs)

    formCopy.validate()

    setFormInputs(formCopy)
  }

  const handleSubmit = async (event, formInputs) => {
    event.preventDefault()

    console.log("here")
    console.log(formInputs)
    let formCopy = Object.assign(Object.create(formInputs), formInputs)
    const formIsValid = formCopy.validate()

    if (formIsValid) {
      try {
        setWaitingForRes(true)

        const { successful, message } = await login(
          formCopy.input("email").value,
          formCopy.input("password").value
        )

        if (successful) {
          props.history.push("/")
        } else {
          let errors = []
          errors.push(`Login failed: ${message}`)

          setWaitingForRes(false)
          setFormInputs(formCopy)
          setErrors(errors)
        }
      } catch (err) {
        console.log(`Login.js: login err: ${err}`)
        let errors = []
        errors.push(`Login failed: ${err.message}`)

        setWaitingForRes(false)
        setFormInputs(formCopy)
        setErrors(errors)
      }
    } else {
      formCopy.validateAllInputs()
      setFormInputs(formCopy)
    }
  }

  const handleKeyDown = (event) => {
    // 13 is the enter key
    if (event.keyCode === 13) {
      let formCopy = Object.assign(Object.create(formInputs), formInputs)
      const inputName = event.target.name

      formCopy.input(inputName).validate()
      setFormInputs(formCopy)

      handleSubmit(event, formCopy)
    }
  }

  return user != null ? (
    <Redirect to={"/"} push={true} />
  ) : (
    <Container>
      <Row>
        <Col sm={9} md={7} lg={5} className="mx-auto">
          <div className="card card my-5">
            <div className="card-body">
              <Row>
                <Col>
                  <div className={`auth-card-header`}>
                    <h5 className={`auth-header-title login`}>{"Sign In "}</h5>
                    <Link to="/register">
                      <h5 className={`auth-header-title register`}>
                        {"REGISTER >"}
                      </h5>
                    </Link>
                  </div>
                </Col>
              </Row>
              <form className="form">
                {errors.length > 0 &&
                  errors.map((err) => (
                    <p className="invalid" key={err}>
                      {err}
                    </p>
                  ))}
                <BossaInput
                  label="Email"
                  type="email"
                  placeholder="email"
                  fullWith
                  required
                  name="email"
                  isValid={formInputs.input("email").isValid}
                  errors={formInputs.input("email").errors}
                  value={formInputs.input("email").value}
                  isTouched={formInputs.input("email").isTouched}
                  onChange={handleInputChange}
                  handleInputBlur={handleInputBlur}
                  dark
                />
                <BossaInput
                  className="mb-4"
                  label="Password"
                  type="password"
                  placeholder="password"
                  required
                  fullWith
                  name="password"
                  isValid={formInputs.input("password").isValid}
                  errors={formInputs.input("password").errors}
                  value={formInputs.input("password").value}
                  isTouched={formInputs.input("password").isTouched}
                  onChange={handleInputChange}
                  handleInputBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  dark
                />
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  onClick={(e) => handleSubmit(e, formInputs)}
                  type="submit"
                >
                  {/* Loading animation */}
                  {waitingForRes ? (
                    <div className="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
                {/* <div className="custom-control custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember password
                  </label>
                </div> */}
                <hr className="my-4" />
                <button
                  className="btn btn-lg btn-google btn-block text-uppercase"
                  type="submit"
                >
                  <img
                    src="google-icon.svg"
                    alt="google icone"
                    height="20"
                    width="20"
                  />
                  <i className="fab fa-google mr-2"></i> Continue with Google
                </button>
                <button
                  className="btn btn-lg btn-facebook btn-block text-uppercase"
                  type="submit"
                >
                  <img
                    src="facebook-2.svg"
                    alt="facebook icone"
                    height="20"
                    width="20"
                  />
                  <i className="fab fa-facebook-f mr-2"></i> Sign in with
                  Facebook
                </button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
