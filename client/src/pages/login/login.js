import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services";
import { ROUTE } from "../../routes";

const initialState = {
    username: '',
    password: '',
}

export function Login() {
    const [loginState, setLoginState] = useState(initialState);
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();

    const handleInput = (event) => {
        setLoginState({
            ...loginState,
            [event.target.name]: event.target.value
        })
    }

    const login = async () => {
        try {
            setError(undefined);
            await AuthService.login(loginState);
            navigate(ROUTE.ROOT);
        } catch (err) {
            setError("Invalid credentials.")
        }
    }

    return (
        <div className="page-container">
            <div className="authentication-form">
                <Form className="form-validation">
                    <div className="form-title">
                        Login
                    </div>

                    <div className="username-input input-box">
                        <Form.Group>
                            <Form.Label>Username</Form.Label>

                            <Form.Control
                                type="text"
                                name="username"
                                autoComplete="username"
                                maxLength="30"
                                onChange={handleInput}
                                onBlur={handleInput}
                            />
                        </Form.Group>
                    </div>

                    <div className="password-input input-box">
                        <Form.Group>
                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                type="password"
                                name="password"
                                autoComplete="password"
                                onChange={handleInput}
                                onBlur={handleInput}
                            />
                        </Form.Group>
                    </div>

                    <div className="validation-txt">
                        {!!error && (<div className="err-txt">{error}</div>)}
                    </div>

                    <div className="btn-row">
                        <Button onClick={login}>Login</Button>

                        <Link to="/register">Register</Link>
                    </div>

                </Form>
            </div>
        </div>
    )
}